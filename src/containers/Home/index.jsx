import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { PromiseState } from 'react-refetch';
import moment from 'moment';
import { withRouter } from 'react-router';
import _ from 'lodash';
import {
  metricsSwitchOn,
  version
} from 'app.config';
import Cookies from 'js-cookie';

import BTable from '../../components/BTable';
import Paper from '../../components/Paper';
import Connect from '../../components/util/Connect';
import Perf from '../../components/util/Perf';
import {
  STATS_OFFLINE_SERIAL,
  STATS_SLOT_QUERY
} from '../../components/HttpService';
import { slotMap, FillDefaultTimeLine } from '../../components/HttpService/FetchSlotData';
import GeoMap from '../../components/util/GeoMap';
import NumberFormat from '../../components/util/NumberFormat';
import Visits from './Visits';
import Timelines from './Timelines';
import Areas from './Areas';
import Incidents from './Incidents';

import './index.scss';

const API_STRATEGIES = 'nebula/strategies';
const API_STATISTICS_VISITS = 'platform/network/statistics';
const API_STATISTICS_ALERTS = 'platform/alarm/statistics';
const API_STATISTICS_LISTS = 'platform/alarm/valid_count';
const API_STATISTICS_HOUR = 'platform/alarm/statistics_detail';

const TIMESTAMP = 'timestamp';
const TODAY = 'TODAY';
const YESTERDAY = 'YESTERDAY';
const THIS_WEEK = 'THIS_WEEK';
const LAST_WEEK = 'LAST_WEEK';
const INCIDENT_LIST = 'INCIDENT_LIST';
const WHITE_LIST = 'WHITE_LIST';

const alert = {
  [TODAY]: 0,
  [YESTERDAY]: 0,
  [THIS_WEEK]: 0,
  [LAST_WEEK]: 0,
  [INCIDENT_LIST]: 0,
  [WHITE_LIST]: 0
};

const username = Cookies.get('username');

const appID = 'DashBoard';

@Connect('Home')(() => ({
  // 获取“网络访问量”
  fetchVisitsStatistics: () => ({
    visitStatistics: {
      url: API_STATISTICS_VISITS,
      loadingIn: '.visit',
      then: (data) => {
        // 【网络访问量】前5分钟为0（无流量进入） 写入Tracker
        if (window.threathunterTracker &&
          (!data.result || _.get(data['result'][data.result.length - 1], 'count') === 0)
        ) {
          window.threathunterTracker.setData({
            version,
            username,
            module: 11,
            appID,
            level: 3,
            message: 'network_traffic_0'
          });
        }
        // 返回数据
        return {
          value: _.map(data.result, (item) => {
            const { time_frame, count } = item;
            return { x: time_frame, y: count };
          })
        };
      }
    }
  }),
  // 获取“风险名单数”
  fetchAlerts: params => ({
    alertsStatistics: {
      url: API_STATISTICS_ALERTS,
      body: params,
      then: (data) => {
        const alertNew = _.reduce(
          {
            [TODAY]: { date: moment(), span: 'day' }, // 今日
            [YESTERDAY]: { date: moment().subtract(1, 'days'), span: 'day' }, // 昨日
            [THIS_WEEK]: { date: moment(), span: 'week' }, // 本周
            [LAST_WEEK]: { date: moment().subtract(1, 'weeks'), span: 'week' } // 上周
          },
          (result, value, key) => {
            const { date, span } = value;
            const from = date.startOf(span).valueOf();
            const to = date.endOf(span).valueOf();
            const count = _.sumBy(
              _.filter(
                data.result,
                item => _.inRange(item.time_frame, from, to)
              ),
              (item) => {
                // console.log(item)
                const { production_count, test_count } = item;
                return production_count + test_count;
              }
            );

            return Object.assign(result, { [key]: count });
          },
          {}
        );

        Object.assign(alert, alertNew);
        return {
          value: _.map(data.result, (item) => {
            const { time_frame, production_count, test_count } = item;
            return { x: time_frame, y: production_count + test_count };
          })
        };
      }
    }
  }),
  // 获取“当前有效风险名单”
  fetchListsStatistics: () => ({
    listsStatistics: {
      url: API_STATISTICS_LISTS,
      loadingIn: '.list'
    }
  }),
  // 获取所有策略信息
  fetchStrategies: {
    url: API_STRATEGIES,
    body: { app: 'nebula' }
  },
  // 风险事件详情
  fetchIncidents: (url, params) => ({
    incidentsFetch: {
      url,
      loadingIn: '.wb-risk-items',
      body: params
    }
  }),
  // 获取“报警区域分布、被攻击URL、本小时命中策略”
  fetchCurrentHourStatistics: params => ({
    hourStatistics: {
      url: API_STATISTICS_HOUR,
      loadingIn: '.warning-load',
      body: params,
      then: (data) => {
        let { url, strategy } = data;
        const { location } = data;

        url = _.sortBy(url, ['count']).reverse();
        strategy = _.sortBy(strategy, ['count']).reverse();

        const areas = _.map(location, (item) => {
          const { count, value } = item;

          const coordinate = _.get(GeoMap, value, [0, 0]);
          return [...coordinate, count, value];
        });

        return {
          value: [
            url,
            strategy,
            areas
          ]
        };
      }
    }
  }),
  // 获取点击数
  fetchClicks: (params) => {
    // 非当前小时请求，endtime修改
    const now = moment().startOf('hour').valueOf();
    const end_time = now - 1;
    const offlineParams = _.cloneDeep(params);
    offlineParams.end_time = end_time;

    const paramsSlot = {
      dimension: params.key_type === 'total' ? 'global' : params.key_type,
      variables: params.var_list,
      timestamp: now
    };

    return {
      clicksOffline: {
        url: STATS_OFFLINE_SERIAL,
        body: offlineParams,
        loadingIn: '.timeline',
        then: (result) => {
          const value = FillDefaultTimeLine(
            result.values,
            offlineParams.from_time,
            end_time,
            offlineParams.var_list
          );

          // 点击数 四天内有数据为0  写入Tracker
          if (window.threathunterTracker) {
            const dataNone = _.filter(
              value.slice(value.length - 95, value.length),
              o => !_.get(o[slotMap.TOTAL_DYNAMIC_COUNT], 'value')
            );
            // 数据有断点
            if (dataNone.length > 0) {
              window.threathunterTracker.setData({
                version,
                username,
                appID,
                module: 11,
                level: 3,
                message: 'offline_data_missing'
              });
            }
          }
          // 格式化点击数
          return {
            value: _.map(value, item => ({
              x: item.time_frame,
              y: _.get(item[slotMap.TOTAL_DYNAMIC_COUNT], 'value')
            }))
          };
        }
      },
      clicksSlot: {
        url: STATS_SLOT_QUERY,
        method: 'POST',
        body: JSON.stringify(paramsSlot),
        then: (result) => {
          const value = FillDefaultTimeLine(
            {
              [now]: result.values
            },
            now,
            params.end_time,
            params.var_list
          );

          // 点击数 当天数据为0  写入Tracker
          if (window.threathunterTracker) {
            const resultCountObj = _.get(result.values, slotMap.TOTAL_DYNAMIC_COUNT);
            // 数据有断点
            if (!_.get(resultCountObj, 'value')) {
              window.threathunterTracker.setData({
                version,
                username,
                module: 11,
                appID,
                level: 2,
                message: 'live_data_0'
              });
            }
          }
          // 格式化点击数
          return {
            value: _.map(value, item => ({
              x: item.time_frame,
              y: _.get(item[slotMap.TOTAL_DYNAMIC_COUNT], 'value')
            }))
          };
        }
      }
    };
  }
}))
@withRouter
class Home extends Component {
  static propTypes = {
    history: PropTypes.oneOfType([PropTypes.object]).isRequired,
    fetchVisitsStatistics: PropTypes.func.isRequired,
    fetchAlerts: PropTypes.func.isRequired,
    fetchListsStatistics: PropTypes.func.isRequired,
    fetchIncidents: PropTypes.func.isRequired,
    fetchCurrentHourStatistics: PropTypes.func.isRequired,
    fetchClicks: PropTypes.func.isRequired,
    visitStatistics: PropTypes.instanceOf(PromiseState),
    alertsStatistics: PropTypes.instanceOf(PromiseState),
    listsStatistics: PropTypes.instanceOf(PromiseState),
    fetchStrategies: PropTypes.instanceOf(PromiseState),
    incidentsFetch: PropTypes.instanceOf(PromiseState),
    hourStatistics: PropTypes.instanceOf(PromiseState),
    clicksOffline: PropTypes.instanceOf(PromiseState),
    clicksSlot: PropTypes.instanceOf(PromiseState)
  };
  static defaultProps = {
    visitStatistics: undefined,
    alertsStatistics: undefined,
    clicksOffline: undefined,
    clicksSlot: undefined,
    listsStatistics: undefined,
    fetchStrategies: undefined,
    incidentsFetch: undefined,
    hourStatistics: undefined
  };

  constructor(props) {
    super(props);
    this.state = {
      timestamp: 0,
      keyword: '',
      areas: []
    };
  }

  componentDidMount() {
    // 用户访问/刷新页面 写入Tracker
    if (window.threathunterTracker) {
      window.threathunterTracker.setData({
        version,
        username,
        module: 11,
        appID,
        level: 1,
        message: 'visit'
      });
    }

    // 获取“网络访问量”
    this.props.fetchVisitsStatistics();

    const to = moment().valueOf();
    const from = moment(to)
      .startOf('hour')
      .subtract(3, 'months')
      .valueOf();

    this.state.timestamp = to;

    this.props.fetchAlerts({
      fromtime: from,
      endtime: to
    });

    // 获取数据变量
    const var_list = [
      // 点击数
      slotMap.TOTAL_DYNAMIC_COUNT
    ];
    // 获取“点击数”
    this.props.fetchClicks({
      key_type: 'total',
      from_time: from,
      end_time: to,
      var_list
    });

    // 获取“当前有效风险名单”
    this.props.fetchListsStatistics();
  }

  componentWillUpdate() {
    if (metricsSwitchOn) {
      Perf.start('Home_Update');
    }
  }

  componentDidUpdate() {
    if (metricsSwitchOn) {
      const cost = Perf.stop('Home_Update');
      console.log(`Home_Update: cost__${cost}ms`);
      Perf.writeInflux('', 'Home', cost);
    }
  }

  handleChange(value, key) {
    this.setState({ [key]: value });
  }

  render() {
    const {
      timestamp,
      keyword
    } = this.state;

    const {
      visitStatistics,
      alertsStatistics,
      listsStatistics,
      fetchStrategies,
      incidentsFetch,
      hourStatistics,
      clicksOffline,
      clicksSlot,
      history
    } = this.props;

    // 网络访问量
    let visits = [];
    if (visitStatistics && visitStatistics.fulfilled) {
      visits = visitStatistics.value;
    }

    // 获取“当前有效风险名单”
    if (listsStatistics && listsStatistics.fulfilled) {
      const { incident_list, white_list } = listsStatistics.value;
      Object.assign(alert, {
        [INCIDENT_LIST]: incident_list, // 风险名单
        [WHITE_LIST]: white_list// 白名单
      });
    }

    // 获取“当前有效风险名单”
    let strategies;
    if (fetchStrategies && fetchStrategies.fulfilled) {
      const { status, values } = fetchStrategies.value;

      if (status === 200) {
        strategies = values;
      }
    }

    // 获取“风险事件详情”
    let incidents = [];
    if (incidentsFetch && incidentsFetch.fulfilled) {
      const { items } = incidentsFetch.value;
      incidents = items;
    }

    // 获取“报警区域分布、被攻击URL、本小时命中策略”
    let urls;
    let strategy;
    let areas = [];
    if (hourStatistics && hourStatistics.fulfilled) {
      [urls, strategy, areas] = hourStatistics.value;
    }

    // 风险名单数
    let alerts = [];
    if (alertsStatistics && alertsStatistics.fulfilled) {
      alerts = alertsStatistics.value;
    }
    // 点击数
    let clicks = [];
    let clicksAllFetch;
    if (clicksOffline && clicksSlot) {
      clicksAllFetch = PromiseState.all([clicksOffline, clicksSlot]);
    }
    if (clicksAllFetch && clicksAllFetch.fulfilled) {
      const [offline, slot] = clicksAllFetch.value;
      clicks = offline.concat(slot);
    }

    return (
      <div className="wb-home container" >
        <h1>总览/DashBoard</h1>
        <div>
          <section className="visit" >
            <Visits items={visits} />
          </section>
          <section>
            <Paper className="alert" >
              <h2>风险名单数<span className="tag" >每天</span></h2>
              <div className="comparison" >
                <div>
                  <em>{NumberFormat(parseInt(alert[TODAY], 10))}</em>
                  <p>今日</p>
                </div>
                <div>
                  <em>{NumberFormat(parseInt(alert[YESTERDAY], 10))}</em>
                  <p>昨日</p>
                </div>
              </div>
            </Paper>
          </section>
          <section>
            <Paper className="alert" >
              <h2>风险名单数<span className="tag" >每周</span></h2>
              <div className="comparison" >
                <div>
                  <em>{NumberFormat(parseInt(alert[THIS_WEEK], 10))}</em>
                  <p>本周</p>
                </div>
                <div>
                  <em>{NumberFormat(parseInt(alert[LAST_WEEK], 10))}</em>
                  <p>上周</p>
                </div>
              </div>
            </Paper>
          </section>
          <section className="list" >
            <Paper>
              <h2>当前有效风险名单<span className="tag" >当前</span></h2>
              <div className="comparison" >
                <div>
                  <em>{NumberFormat(parseInt(alert[INCIDENT_LIST], 10))}</em>
                  <p>风险名单</p>
                </div>
                <div>
                  <em>{NumberFormat(parseInt(alert[WHITE_LIST], 10))}</em>
                  <p>白名单</p>
                </div>
              </div>
            </Paper>
          </section>
        </div>
        <div className="charts" >
          <section className="timeline" >
            <Timelines
              alerts={alerts}
              clicks={clicks}
              onChange={value => this.handleChange(value, TIMESTAMP)}
            />
          </section>
          <section>
            <Areas
              timestamp={timestamp}
              items={areas}
              onReload={() => {
                const params = {
                  fromtime: moment(this.state.timestamp).startOf('hour').valueOf(),
                  endtime: this.state.timestamp
                };
                this.props.fetchCurrentHourStatistics(params);
              }}
            />
          </section>
        </div>
        <div>
          <section>
            <Paper>
              <h2>被攻击URL</h2>
              <BTable
                className="attacked-url warning-load"
                data={urls}
                columns={[{
                  title: 'URL',
                  key: 'value',
                  render: (text, record) => (
                    <span
                      className="url-text"
                      title={record.value}
                      onClick={() => history.push(`/analysis/page/${encodeURIComponent(record.value)}`)}
                      role="presentation"
                    >{record.value}</span>
                  )
                }, {
                  title: '数量',
                  dataIndex: 'count',
                  key: 'count',
                  width: 70
                }]}
                fixedHeader
                bodyHeight="calc(100% - 41px)"
              />
            </Paper>
          </section>
          <section>
            <Paper>
              <h2>本小时命中策略</h2>
              <BTable
                className="hour-strategies warning-load"
                data={strategy}
                updateType="all"
                columns={[{
                  title: '规则状态',
                  dataIndex: 'test',
                  key: 'test',
                  width: 80,
                  render: text => (
                    text ? '测试' : '上线'
                  )
                }, {
                  title: '触发规则',
                  dataIndex: 'value',
                  key: 'value',
                  width: '35%',
                  render: value => (
                    <span
                      className="name-text"
                      title={value}
                      onClick={
                        () => history.push(`/alerts?strategy=${value}&timestamp=${timestamp}`)
                      }
                      role="presentation"
                    >{value}</span>
                  )
                }, {
                  title: '策略说明',
                  dataIndex: 'remark',
                  key: 'remark',
                  render: (text, record) => _.get(_.find(strategies, { name: record.value }), 'remark', '已删除')
                }, {
                  title: '数量',
                  dataIndex: 'count',
                  key: 'count',
                  width: 70
                }]}
                fixedHeader
                bodyHeight="calc(100% - 41px)"
              />
            </Paper>
          </section>
        </div>
        <div>
          <section className="wb-risk-items" style={{ overflow: 'auto' }} >
            <Incidents
              timestamp={timestamp}
              keyword={keyword}
              items={incidents}
              onReload={() => {
                let url = 'platform/risks/realtime';
                const params = { keyword: this.state.keyword };

                if (!moment(this.state.timestamp).startOf('hour').isSame(moment().startOf('hour'))) {
                  url = 'platform/risks/history';
                  Object.assign(params, {
                    start_time: moment(this.state.timestamp).startOf('hour').valueOf(),
                    end_time: this.state.timestamp
                  });
                }
                this.props.fetchIncidents(url, params);
              }}
              onChange={(value, key) => this.handleChange(value, key)}
            />
          </section>
        </div>
      </div>
    );
  }
}

export default Home;
