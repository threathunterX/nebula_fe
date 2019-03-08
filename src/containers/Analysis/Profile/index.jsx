import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import moment from 'moment';
import URI from 'urijs';
import _ from 'lodash';

import TabSelector from '../../../components/TabSelector';
import Selector from '../../../components/Selector';
import HttpService, {
  STATS_OFFLINE_SERIAL
} from '../../../components/HttpService';
import FetchSlotData, { slotMap, FillDefaultTimeLine } from '../../../components/HttpService/FetchSlotData';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn
} from '../../../components/Table';

import PieChart from './PieChart';
import BarChart from './BarChart';
import LineChart from './LineChart';
import LocateInfo from './LocateInfo';

import './index.scss';

import {
  KEY,
  KEY_TYPE,
  KEY_TYPES,
  DEFAULT_FORM,
  URI_PROFILES,
  ACTION_RETRIEVE_PROFILE,
  ACTION_RETRIEVE_VISITS,
  userVariables
} from './constants';

const keyTypes = _.map(KEY_TYPES, (value, key) => ({ text: value, value: key }));

@withRouter
class Profile extends Component {
  static propTypes = {
    history: PropTypes.oneOfType([PropTypes.object]).isRequired,
    location: PropTypes.oneOfType([PropTypes.object]).isRequired
  };

  constructor(props) {
    super(props);

    const form = _.cloneDeep(DEFAULT_FORM);

    this.state = {
      index: 0,
      forms: [form],
      profiles: [],
      visits: [],
      gettingProfiles: false
    };
  }

  componentDidMount() {
    let forms = [];
    const querys = URI(this.props.location.search).query(true);
    _.forEach(
      _.keys(KEY_TYPES),
      (key) => {
        _.forEach(
          _.concat(querys[key] || [], []),
          (item, index) => {
            const form = Object.assign(_.cloneDeep(DEFAULT_FORM), { [KEY_TYPE]: key, [KEY]: item });
            forms.push(form);
            this.state.index = index;
            this.handleSubmit(form, ACTION_RETRIEVE_PROFILE);
            this.handleSubmit(form, ACTION_RETRIEVE_VISITS);
          });
      }
    );
    if (forms.length === 0) {
      forms = this.state.forms;
    }

    this.handleChange(forms, 'forms');
  }

  // 搜索框回车搜索
  onSearchSubmit(e, form, index) {
    e.preventDefault();

    this.state.forms[index][KEY] = e.target.keyword.value;

    this.handleSubmit.bind(this)(form, ACTION_RETRIEVE_PROFILE);
    this.handleSubmit.bind(this)(form, ACTION_RETRIEVE_VISITS);
  }

  // 删除页签
  removeForms(forms, index) {
    let form = _.filter(forms, (item, i) => (i !== index));
    if (form.length === 0) {
      form = [_.cloneDeep(DEFAULT_FORM)];
    }

    let select = this.state.index;
    if (select < 0) {
      select = 0;
    } else if (select >= form.length) {
      select = form.length - 1;
    }
    this.handleChange(form, 'forms');
    this.handleChange(select, 'index');
  }

  handleSubmit(value, key) {
    const { profiles, index, visits } = this.state;

    switch (key) {
      case ACTION_RETRIEVE_PROFILE: {
        this.setState({
          gettingProfiles: true
        });

        const params = _.cloneDeep(value);
        delete params[KEY_TYPE];
        HttpService.post({
          url: URI_PROFILES,
          external: true,
          params,
          onSuccess: (results) => {
            const { status, result, msg } = results;

            this.setState({
              gettingProfiles: false,
              profiles: _.set(profiles, index, status === 200 ? result : new Error(msg))
            });
          },
          onError: () => {
            this.setState({
              gettingProfiles: false
            });
          }
        });

        const query = URI(this.props.location.search).query(true);
        const { key_type } = value;

        this.props.history.push(
          URI('/analysis/profiles')
            .query(Object.assign(query, {
              [key_type]: _.concat(_.get(query, key_type), value.key)
            }))
            .toString()
        );
        break;
      }
      case ACTION_RETRIEVE_VISITS: {
        const timestamp = moment().valueOf();

        const from = moment(timestamp).startOf('hour').subtract(30, 'days').valueOf();
        // 获取数据变量
        const var_list = [
          // 点击数
          slotMap.USER_DYNAMIC_COUNT
        ];

        // 发送请求
        FetchSlotData({
          url: STATS_OFFLINE_SERIAL,
          loadingIn: '.trend-area-container,.click-chart',
          params: Object.assign(
            _.pick(value, [KEY_TYPE, KEY]),
            {
              from_time: from,
              end_time: timestamp,
              var_list
            }
          ),
          onSuccess: (result) => {
            const data = FillDefaultTimeLine(result.values, from, timestamp, var_list);

            // 格式化点击数
            const visitsRes =
              _.map(data, item => ({ x: item.time_frame, y: _.get(item[slotMap.USER_DYNAMIC_COUNT], 'value') }));

            this.setState({
              visits: _.set(visits, index, visitsRes)
            });
          }
        });
        break;
      }
      default:
    }
  }

  handleChange(value, key) {
    this.setState(_.set(this.state, key, value));
  }

  render() {
    const {
      forms,
      visits,
      profiles,
      index,
      gettingProfiles
    } = this.state;

    const form = _.get(forms, index);
    const result = _.get(profiles, index);
    const query = URI(this.props.location.search).query(true);

    return (
      <div className="wd-profile container">
        <h1 className="title">用户档案</h1>
        <TabSelector
          selectIndex={index}
          items={_.map(forms, item => ({ text: item.key ? item.key : '搜索用户' }))}
          onAppend={() => {
            this.handleChange(forms.length, 'index');
            this.handleChange(_.cloneDeep(DEFAULT_FORM), `forms.${forms.length}`);
          }}
          onRemove={(removeIndex) => {
            this.removeForms(forms, removeIndex);
            this.handleChange(_.filter(profiles, (item, i) => (i !== removeIndex)), 'profiles');
            const key_type = _.get(forms[removeIndex], KEY_TYPE);

            this.props.history.push(
              URI('/analysis/profiles')
                .query(Object.assign(query, {
                  [key_type]: _.filter(
                    _.concat(_.get(query, key_type), []),
                    item => (item !== forms[removeIndex].key)
                  )
                }))
                .toString()
            );
          }}
          onSelect={({ index: i }) => this.handleChange(i, 'index')}
        />
        {
          _.isNil(result) || result instanceof Error ? (
            <div key={moment().valueOf()}>
              <div className="search-content">
                <Selector
                  className="type-selection"
                  selectorType="list"
                  dataList={keyTypes}
                  value={_.find(keyTypes, { value: _.get(form, KEY_TYPE) })}
                  onChange={({ value }) => this.handleChange(value, `forms.${index}.${KEY_TYPE}`)}
                />

                <form
                  style={{ display: 'inline-block' }}
                  onSubmit={(e) => {
                    this.onSearchSubmit(e, form, index);
                  }}
                >
                  <input
                    type="text"
                    name="keyword"
                    className="search-input"
                    defaultValue={_.get(form, KEY)}
                    onBlur={e => _.set(this.state, `forms.${index}.${KEY}`, e.target.value)}
                    placeholder={`请输入${_.get(_.find(keyTypes, { value: _.get(form, KEY_TYPE) }), 'text', 'User')}`}
                  />
                </form>
                {
                  gettingProfiles ?
                    (
                      <button disabled className="main-btn large-btn">
                        <i className="iconfont icon-loading" />
                      </button>
                    ) :
                    (
                      <button
                        className="main-btn large-btn"
                        onClick={() => {
                          this.handleSubmit(form, ACTION_RETRIEVE_PROFILE);
                          this.handleSubmit(form, ACTION_RETRIEVE_VISITS);
                        }}
                      >搜索
                      </button>
                    )
                }
              </div>
              {
                result instanceof Error ? <p className="search-tip">档案信息查询失败</p> : null
              }
            </div>
          ) : (
            <div className="search-result">
              <div className="card-list-container">
                <div className="card-item warning-count">
                  <i className="iconfont icon-meh" />

                  <p>
                    报警
                    <span>{_.get(result, userVariables.VISIT_ALARM_INCREMENT_TIMES, 0)}</span>
                    次
                  </p>

                  <div className="bottom-text">{_.get(result, userVariables.ACCOUNT_USERNAME)}</div>
                </div>
                <div className="card-item">
                  <i className="iconfont icon-enviromento" />

                  <p>{_.get(result, userVariables.ACCOUNT_REGISTER_IP, '未知')}</p>

                  <div className="bottom-text">注册时间 {
                    _.get(result, userVariables.ACCOUNT_REGISTER_TIME) > 0 ?
                      moment(_.toInteger(_.get(result, userVariables.ACCOUNT_REGISTER_TIME))).format('YYYY.MM.DD') :
                      ''
                  }</div>
                </div>
                {
                  (times => (
                    <div className="card-item">
                      <i className="iconfont icon-mail" />

                      <p>{_.get(result, userVariables.ACCOUNT_CHANGE_MAIL) || _.get(result, userVariables.ACCOUNT_MAIL, '未绑定邮箱')}</p>

                      <div>
                        <span className="label">{times > 0 ? `修改${times}次` : '未修改过'}</span>
                      </div>
                      {
                        times > 0 ? (
                          <span
                            className="bottom-text last-update"
                          >最近修改于{
                            moment(_.toInteger(_.get(result, userVariables.ACCOUNT_MAIL_LAST_CHANGE_TIMESTAMP))).format('YYYY.MM.DD')
                          }</span>
                        ) : null
                      }
                    </div>
                  ))(_.toInteger(_.get(result, userVariables.ACCOUNT_MAIL_CHANGE_TIMES)))
                }
                {
                  (times => (
                    <div className="card-item">
                      <i className="iconfont icon-mobile" />

                      <p>{_.get(result, userVariables.ACCOUNT_CHANGE_MOBILE) || _.get(result, userVariables.ACCOUNT_MOBILE, '未绑定手机号')}</p>

                      <div>
                        <span className="label">{times > 0 ? `修改${times}次` : '未修改过'}</span>
                      </div>
                      {times > 0 ? <span className="bottom-text last-update">最近修改于{
                        moment(_.toInteger(_.get(result, userVariables.ACCOUNT_MOBILE_LAST_CHANGE_TIMESTAMP))).format('YYYY.MM.DD')
                      }</span> : null}
                    </div>
                  ))(_.toInteger(_.get(result, userVariables.ACCOUNT_MOBILE_CHANGE_TIMES)))
                }
              </div>
              <div className="locate-info-container">
                <LocateInfo dataList={_.get(result, userVariables.VISIT_CITY, {})} />

                <div className="table-container">
                  <Table fixedHeader>
                    <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
                      <TableRow>
                        <TableHeaderColumn>IP</TableHeaderColumn>
                        <TableHeaderColumn>市</TableHeaderColumn>
                        <TableHeaderColumn>日期</TableHeaderColumn>
                      </TableRow>
                    </TableHeader>
                    <TableBody deselectOnClickaway={false} displayRowCheckbox={false} showRowHover>
                      {
                        _.map(
                          _.get(result, userVariables.ACCOUNT_LOGIN_LAST10_TIMESTAMP_PROFILE),
                          (value, i) => {
                            const timestamp = value;
                            // 取地址
                            const locationKey = userVariables.ACCOUNT_GEO_LAST10_PROFILE;
                            const location = _.get(result, `${locationKey}.${i}`, '-');
                            // 取IP
                            const ipKey = userVariables.ACCOUNT_IP_LAST10_PROFILE;
                            const ip = _.get(result, `${ipKey}.${i}`, '-');
                            return (
                              <TableRow key={i}>
                                <TableRowColumn>{ip}</TableRowColumn>
                                <TableRowColumn>{location}</TableRowColumn>
                                <TableRowColumn>{moment(_.toInteger(timestamp)).format('YYYY.MM.DD')}</TableRowColumn>
                              </TableRow>
                            );
                          }
                        )
                      }
                    </TableBody>
                  </Table>
                </div>
              </div>
              <div className="bar-chart-container">
                <div className="title">
                  <span>最后访问：</span>
                  <span
                    className="last-visit"
                  >{_.get(result, userVariables.ACCOUNT_LAST_VISIT_IP)}&nbsp;&nbsp;&nbsp;&nbsp;{_.get(result, userVariables.ACCOUNT_LAST_VISIT_TIMESTAMP) > 0 ? moment(_.toInteger(_.get(result, userVariables.ACCOUNT_LAST_VISIT_TIMESTAMP))).format('YYYY.MM.DD HH:mm:ss') : '无'}</span>
                  <span className="label">最近30天</span>
                </div>
                {
                  _.get(visits, index) ?
                    <LineChart dataList={_.get(visits, index)} /> : null
                }
                <div className="mark-container">
                  <i className="mark-item gradient" />
                  <span>用户访问次数</span>
                </div>
              </div>
              <BarChart
                dataList={_.map(_.get(result, userVariables.VISIT_HOUR_MERGE), (value, key) => ({
                  x: key,
                  y: value
                }))}
              />
              <PieChart
                dataList={
                  _.map(
                    _.pick(result, [
                      userVariables.VISIT_CITY,
                      userVariables.VISIT_UA,
                      userVariables.VISIT_DEVICE
                    ]),
                    value => (_.map(value, (v, key) => ({ text: key, value: v })))
                  )
                }
              />
            </div>
          )
        }
      </div>
    );
  }
}

export default Profile;
