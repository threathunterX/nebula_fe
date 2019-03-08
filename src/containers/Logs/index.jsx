import React, { Component } from 'react';
import moment from 'moment';
import _ from 'lodash';
import Pagination from 'rc-pagination';

import Paper from '../../components/Paper';
import HttpService from '../../components/HttpService';
import PopConfirm from '../../components/PopConfirm';
import EasyToast from '../../components/EasyToast';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn
} from '../../components/Table';
import SearchForm from './SearchForm';
import SearchDialog from './SearchDialog';
import {
  KEY_ACTION,
  KEY_FORM,
  KEY_FORMS,
  KEY_RESULT,
  KEY_OFFSETS,
  KEY_TIMESTAMP,
  KEY_ERROR,
  ACTION_DEFAULT,
  ACTION_VALIDATE_FORM,
  ACTION_CREATE_FORM,
  ACTION_RETRIEVE_FORM,
  ACTION_DELETE_FORM,
  DEFAULT_FORM
} from './constants';
import Notification from '../../components/Notification';
import Toast from '../../components/Toast';
import NumberFormat from '../../components/util/NumberFormat';

import './index.scss';

// const URI_FILTERS = 'platform/logquery_config';
const PERSISTENT_QUERY = 'platform/persistent_query';
const PERSISTENT_QUERY_DATA = 'platform/persistent_query/data';
const PROGRESS_QUERY = 'platform/persistent_query/progress';
const DOWNLOAD_URL = 'persistent_query/download';
// const API_LOGS = 'platform/logquery';
const API_EVENTS = 'nebula/events';
const notification = Notification.getNewInstance();
const page_count = 20;

const ERROR_EMPTY_DATE = '日期不能为空';
const ERROR_EVENT_TYPE = '类型不能为空';
const ERROR_CONDITION = '搜索条件不能为空';
const ERROR_TAGS = '标签不能为空';

class Logs extends Component {
  static getProcessIcon(status, process, error) {
    switch (status) {
      case 'success':
        return <i className="iconfont icon-checkcircleo" />;
      case 'process':
        return <i className="iconfont progress-percent">{process}</i>;
      case 'failed':
        return (
          <i className="iconfont icon-crosscircleo">
            <span title={error}>
              {error}
            </span>
          </i>
        );
      case 'wait':
        return '等待';
      default:
        return null;
    }
  }

  // 获取进度条
  static getProcessBar(status, process) {
    switch (status) {
      case 'success':
        return <div className="progress progress-success" />;
      case 'process':
        return <div className="progress" style={{ width: process }} />;
      case 'failed':
        return <div className="progress progress-error" style={{ width: process }} />;
      default:
        return <div className="progress" style={{ width: process }} />;
    }
  }

  constructor(props) {
    super(props);
    this.state = {
      [KEY_ACTION]: ACTION_DEFAULT,
      [KEY_FORM]: _.cloneDeep(DEFAULT_FORM),
      [KEY_FORMS]: [],
      events: [],
      [KEY_OFFSETS]: {},
      [KEY_TIMESTAMP]: moment().valueOf(),
      [KEY_ERROR]: {},
      searchTitle: '添加日志查询',
      processInfo: [],
      getProcess: false
    };
  }

  componentDidMount() {
    this.fetchFilters();
    this.fetchEvents();
  }

  // 获取进度
  getProcess(flag) {
    HttpService.get({
      url: PROGRESS_QUERY,
      onSuccess: (data) => {
        const { status, result, msg } = data;

        // 继续循环获取进度
        if (status === 200) {
          _.forEach(result, (item) => {
            if (item.status === 'wait' || item.status === 'process') {
              this.state.getProcess = true;
            }
          });
          this.setState({
            processInfo: result
          });
        } else {
          notification.error({ message: msg });
          this.state.getProcess = true;
        }

        if (!flag) {
          setTimeout(() => {
            if (location.hash === '#/logs' && this.state.getProcess) {
              this.getProcess(flag);
            }
          }, 10000);
        }
      }
    });
  }

  handleChange(value, key) {
    this.setState(_.set(this.state, key, value));
  }

  handleSubmit(value, key) {
    const { forms, error } = this.state;

    switch (key) {
      case ACTION_VALIDATE_FORM: {
        const {
          fromtime,
          endtime,
          event_name,
          terms
        } = value;

        this.setState({
          [KEY_ERROR]: Object.assign(error, {
            [ERROR_EMPTY_DATE]: (_.isNil(fromtime) || _.isNil(endtime)),
            [ERROR_EVENT_TYPE]: event_name === '',
            [ERROR_CONDITION]: (
              _.filter(
                terms, term => term.left === '' ||
                term.op === '' ||
                term.right === '' ||
                _.get(term.right, 0) === '').length > 0
            ),
            [ERROR_TAGS]: _.filter(value.show_cols, col => col !== 'timestamp').length === 0
          })
        });
        break;
      }
      case ACTION_CREATE_FORM: {
        const params = value;
        if (_.get(params, 'show_cols').indexOf('timestamp') < 0) {
          params.show_cols.push('timestamp');
        }

        HttpService.post({
          url: PERSISTENT_QUERY,
          params,
          onSuccess: (result) => {
            const { status, msg } = result;

            if (status !== 200) {
              switch (status) {
                case 500:
                  // notification.error({ message: msg });
                  this.setState({
                    toastVisible: true,
                    notificationInfo: msg
                  });
                  return;
                default:
                  notification.error({ message: '保存失败' });
                  return;
              }
            }
            this.fetchFilters();
          },
          onError: (e) => {
            if (e.message === '503') {
              notification.error({ message: '创建失败' });
            } else {
              notification.error({ message: '保存失败' });
            }
          }
        });
        break;
      }
      case ACTION_RETRIEVE_FORM: {
        const { id, page } = value;
        const params = {
          id,
          page,
          page_count
        };

        if (_.findIndex(forms, { id }) < 0) {
          this.handleChange(Object.assign(value, { id }), `forms.${forms.length}`);
        }

        HttpService.get({
          url: PERSISTENT_QUERY_DATA,
          params,
          loadingIn: '.result',
          onSuccess: (data) => {
            const { status, msg: errorTemp } = data;
            const { offsets } = this.state;

            if (status !== 200) {
              notification.error({ message: errorTemp });
              return;
            }

            const result = Object.assign(data.result, { id });

            this.setState({
              result,
              offsets: _.setWith(offsets, `${id}`, page)
            });
          },
          onError: () => {
            notification.error({ message: '查询失败' });
          }
        });
        break;
      }
      case ACTION_DELETE_FORM:
        HttpService.delete({
          url: `${PERSISTENT_QUERY}/${value}`,
          onSuccess: (data) => {
            const { status, msg } = data;
            if (status === 200) {
              this.fetchFilters();
              const form = _.filter(forms, item => item.id !== value);

              if (value === _.get(this.state.result, 'id')) {
                this.handleChange(undefined, KEY_RESULT);
              }
              this.handleChange(form, KEY_FORMS);

              notification.success({ message: '删除成功' });
            } else {
              notification.error({ message: msg });
            }
          },
          onError: () =>
            notification.error({ message: '删除失败' })
        });
        break;
      default:
    }
  }

  // 初始化获取数据
  fetchFilters() {
    HttpService.get({
      url: PERSISTENT_QUERY,
      onSuccess: (data) => {
        const { status, result, msg } = data;

        if (status === 200) {
          // 获取进度
          if (result.length > 0) {
            const {
              getProcess
            } = this.state;
            this.getProcess(getProcess);
          }
          this.setState({
            forms: result
          });
        } else {
          notification.error({ message: msg });
        }
      }
    });
  }

  fetchEvents() {
    HttpService.get({
      url: API_EVENTS,
      onSuccess: (data) => {
        const { status, values } = data;

        if (status === 0) {
          this.setState({ events: values });
        }
      }
    });
  }

  render() {
    const {
      action,
      events,
      form,
      forms,
      result,
      offsets,
      error,
      processInfo,
      searchTitle,
      toastVisible,
      notificationInfo
    } = this.state;

    const timestamp = moment().valueOf();

    return (
      <div className="wd-logs container">
        <h1>日志查询</h1>
        <section className="queries">
          <Paper>
            <ul key={timestamp}>
              {
                _.map(forms, (item, index) => {
                  const selected = _.eq(item, form);
                  const { id } = item;
                  const processItem = _.find(processInfo, { id });
                  const status = _.get(processItem, 'status');
                  const process = `${Math.floor(_.get(processItem, 'progress', 0) * 100)}%`;
                  return (
                    <li key={index} className="item">
                      {
                        selected ? (
                          <i
                            className="iconfont icon-caretdown"
                            onClick={() => this.handleChange(_.cloneDeep(DEFAULT_FORM), KEY_FORM)}
                            role="presentation"
                          />
                        ) : (
                          <i
                            className="iconfont icon-caretright"
                            onClick={() => this.handleChange(item, KEY_FORM)}
                            role="presentation"
                          />
                        )
                      }
                      <i className="index">#{index + 1}</i>
                      <span className="remark-col" title={item.remark}>{item.remark}</span>
                      <div className="progress-container">
                        {
                          Logs.getProcessBar(status, process)
                        }
                      </div>
                      {
                        Logs.getProcessIcon(status, process, _.get(processItem, 'error', ''))
                      }
                      <div className="icons">
                        {
                          status === 'success' ? (
                            <EasyToast overlay="查看结果">
                              <i
                                className="iconfont icon-eyeo"
                                onClick={() => {
                                  // this.handleChange(res, KEY_RESULT);
                                  this.handleSubmit(
                                    { id: item.id, page: 1 },
                                    ACTION_RETRIEVE_FORM
                                  );
                                }}
                                role="presentation"
                              />
                            </EasyToast>
                          ) : null
                        }
                        <EasyToast overlay="克隆">
                          <i
                            className="iconfont icon-copy"
                            onClick={() => {
                              this.handleChange(ACTION_CREATE_FORM, KEY_ACTION);
                              this.handleChange(_.cloneDeep(item), KEY_FORM);
                              this.handleChange(moment().valueOf(), KEY_TIMESTAMP);
                              this.handleChange('克隆日志查询', 'searchTitle');
                            }}
                            role="presentation"
                          />
                        </EasyToast>
                        <PopConfirm
                          trigger="click"
                          placement="topRight"
                          overlay="一旦删除不可恢复，确认删除？"
                          onConfirm={(e, confirm) =>
                          confirm && this.handleSubmit(id, ACTION_DELETE_FORM)}
                          align={{
                            offset: ['23', '0']
                          }}
                        >
                          <i className="iconfont icon-delete" />
                        </PopConfirm>
                      </div>
                      {
                        selected ? (
                          <SearchForm
                            readOnly
                            events={events}
                            form={form}
                            error={error}
                            onChange={(value, key) => this.handleChange(value, key)}
                          />
                        ) : null
                      }
                    </li>
                  );
                })
              }
              <li>
                <a
                  className="btn-insert"
                  onClick={() => {
                    this.handleChange(ACTION_CREATE_FORM, KEY_ACTION);
                    this.handleChange(_.cloneDeep(DEFAULT_FORM), KEY_FORM);
                    this.handleChange(moment().valueOf(), KEY_TIMESTAMP);
                    this.handleChange('添加日志查询', 'searchTitle');
                  }}
                  role="presentation"
                >
                  <i className="iconfont icon-plus" />添加查询
                </a>
              </li>
            </ul>
          </Paper>
        </section>
        {
          result ? (() => {
            const id = _.get(result, 'id');
            const offset = _.get(offsets, `${id}`, 1);
            const formItem = _.find(forms, { id });
            const show_cols = _.filter(formItem.show_cols, item => item !== 'timestamp');
            const logs = _.get(result, 'values');
            const fileSize = NumberFormat(_.get(result, 'filesize'), 'byte');

            return (
              <section className="result">
                <Paper>
                  <header>
                    <h2>
                      <span>#{_.findIndex(forms, { id }) + 1} 搜索结果</span>
                      <a
                        className="btn-download default-btn main-btn large-btn"
                        href={`${DOWNLOAD_URL}/${_.get(result, 'download_path')}`}
                      >
                        <i className="iconfont icon-upload" />导出
                      </a>
                      <span className="size">{`${fileSize.value.toFixed(2)}${fileSize.unit}`}</span>
                    </h2>
                  </header>
                  <Table fixedHeader>
                    <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
                      <TableRow>
                        <TableHeaderColumn className="timestamp">Click Time</TableHeaderColumn>
                        {
                          _.map(show_cols, (item, key) => (
                            <TableHeaderColumn key={key}>{item}</TableHeaderColumn>
                          ))
                        }
                      </TableRow>
                    </TableHeader>
                    {
                      _.isEmpty(logs) ? (
                        <div className="empty">未搜索到相关日志</div>
                      ) : (
                        <TableBody
                          deselectOnClickaway={false}
                          displayRowCheckbox={false}
                          showRowHover
                        >
                          {
                            _.map(
                              logs,
                              (item, i) => {
                                const { timestamp: timestmp } = item;

                                return (
                                  <TableRow key={i}>
                                    <TableRowColumn
                                      className="timestamp"
                                      tooltip={moment(_.toInteger(timestmp)).format('YYYY/MM/DD HH:mm:ss')}
                                    >{moment(_.toInteger(timestmp)).format('YYYY/MM/DD HH:mm:ss')}</TableRowColumn>
                                    {
                                      _.map(show_cols, (key, index) =>
                                        (<TableRowColumn
                                          key={index}
                                          tooltip={_.get(item, key, '')}
                                        >{_.get(item, key, '')}</TableRowColumn>)
                                      )
                                    }
                                  </TableRow>
                                );
                              }
                            )
                          }
                        </TableBody>
                      )
                    }
                  </Table>
                  <div className="pagination-container">
                    <Pagination
                      className="ant-pagination"
                      current={_.toInteger(offset)}
                      pageSize={page_count}
                      total={_.get(result, 'total')}
                      onChange={(value) => {
                        this.handleSubmit(Object.assign(_.find(forms, { id }),
                          { page: value }),
                          ACTION_RETRIEVE_FORM);
                      }}
                    />
                  </div>
                </Paper>
              </section>
            );
          })() : null
        }
        {
          (() => {
            const visible = _.includes([ACTION_CREATE_FORM], action);

            return (
              <SearchDialog
                className="log-search-dialog"
                timestamp={this.state.timestamp}
                visible={visible}
                events={events}
                title={searchTitle}
                form={form}
                error={error}
                onChange={(value, key) => this.handleChange(value, key)}
                onSubmit={() => {
                  this.handleSubmit(form, ACTION_VALIDATE_FORM);
                  if (Object.values(this.state[KEY_ERROR]).indexOf(true) >= 0) {
                    return;
                  }
                  this.handleChange(ACTION_DEFAULT, KEY_ACTION);
                  this.handleSubmit(form, ACTION_CREATE_FORM);
                  this.handleChange(_.cloneDeep(DEFAULT_FORM), KEY_FORM);
                }}
                onReset={() => {
                  this.handleChange(ACTION_DEFAULT, KEY_ACTION);
                  this.handleChange(_.cloneDeep(DEFAULT_FORM), KEY_FORM);
                  this.handleChange({}, KEY_ERROR);
                }}
              />
            );
          })()
        }
        <Toast visible={toastVisible} onClose={() => this.setState({ toastVisible: false })}>
          {notificationInfo}
        </Toast>
      </div>
    );
  }
}

export default Logs;
