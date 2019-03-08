import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import _ from 'lodash';
import URI from 'urijs';
import {
  version
} from 'app.config';
import Cookies from 'js-cookie';

import Notification from '../../components/Notification';

import Timeline from './Timeline';
import Search from './Search';
import ResultTable from './ResultTable';
import SvgIcon from '../../components/SvgIcon';
import HttpService from '../../components/HttpService';
import DownLoadFile from '../../components/util/DownLoadFile';

import './index.scss';

const notification = Notification.getNewInstance();

const API_TIMELINE_ALERTS = 'platform/alarm/statistics';
const API_ALERTS = 'platform/notices';
const API_ALERTS_DETAIL = 'platform/notices/trigger_event';
const API_STRATEGIES = 'nebula/strategies';
const API_TAGS = 'nebula/tags';
const API_EXPORT = 'platform/notices/export';

const ACTION = 'action';
const ACTION_DEFAULT = 'ACTION_DEFAULT';
const ACTION_INSERT = 'ACTION_INSERT';
const ACTION_DELETE = 'ACTION_DELETE';

const TIMESTAMP = 'timestamp';
const FORM_KEY = 'key';
const FORM_CHECK_TYPE = 'checkType';
const FORM_STRATEGY = 'strategy';
const FORM_TAGS = 'tag';
const FORM_SCENE_TYPE = 'sceneType';
const FORM_DECISION = 'decision';
const FORM_FROM_TIME = 'fromtime';
const FORM_END_TIME = 'endtime';
const FORM_FILTER_EXPIRE = 'filter_expire';
const FORM_OFFSET = 'offset';
const FORM_LIMIT = 'limit';
const FORM_TEST = 'test';

const username = Cookies.get('username');

const appID = 'Alerts';
const httpRequestParam = {
  appID,
  module: 2
};

class Alerts extends Component {
  static propTypes = {
    location: PropTypes.oneOfType([PropTypes.object]).isRequired
  };

  constructor(props) {
    super(props);

    this.state = {
      form: {
        [TIMESTAMP]: moment().valueOf()
      },
      [TIMESTAMP]: moment().valueOf(),
      timeline: [],
      [ACTION]: ACTION_DEFAULT,
      strategies: [],
      allTags: [],
      items: [],
      itemDetail: [],
      exporting: false,
      limit: 15,
      offset: 1,
      count: 0
    };
  }

  componentDidMount() {
    // 用户访问/刷新页面 写入Tracker
    if (window.threathunterTracker) {
      window.threathunterTracker.setData({
        version,
        username,
        module: 2,
        appID,
        level: 1,
        message: 'visit'
      });
    }

    this.fetchTimelineAndStrategies();
  }

  // 获取“风险名单数”和搜索结果
  fetchTimelineAndStrategies() {
    const { location } = this.props;

    const query = URI(location.search).query(true);
    this.setState({
      [FORM_KEY]: _.get(query, 'keyword'),
      [FORM_STRATEGY]: _.get(query, FORM_STRATEGY),
      [FORM_TAGS]: _.get(query, FORM_TAGS),
      [FORM_SCENE_TYPE]: _.get(query, FORM_SCENE_TYPE)
    });

    const to = moment().valueOf();
    const from = moment(to).startOf('hour').subtract(3, 'months').valueOf();
    const timestamp = Number(_.get(query, 'timestamp', to));

    this.handleChange(timestamp, TIMESTAMP);

    this.handleChange(moment(timestamp).startOf('hour').valueOf(), FORM_FROM_TIME);
    if (timestamp === moment(timestamp).startOf('hour').valueOf()) {
      this.handleChange(moment(timestamp).endOf('hour').valueOf(), FORM_END_TIME);
    } else {
      this.handleChange(timestamp, FORM_END_TIME);
    }

    // 发送请求
    HttpService.all([
      // 搜索结果
      HttpService.get({
        httpRequestParam,
        url: API_STRATEGIES,
        params: { app: 'nebula' }
      }),
      // 搜索结果
      HttpService.get({
        httpRequestParam,
        url: API_TAGS
      }),
      // 风险名单数
      HttpService.get({
        httpRequestParam,
        url: API_TIMELINE_ALERTS,
        loadingIn: '.chart',
        params: { fromtime: from, endtime: to }
      })
    ], {
      onSuccess: (results) => {
        console.log(results)
        // 搜索结果
        this.dealSearchItems(results[0], results[1]);
        // 风险名单数
        this.dealTimeline(results[2].result, timestamp);
      }
    });
  }

  // 风险名单数
  dealTimeline(data) {
    const timeline = _.map(data, (item) => {
      const {
        time_frame,
        production_count,
        test_count
      } = item;

      return {
        x: time_frame,
        y: production_count + test_count
      };
    });

    this.setState({ timeline });

    // 风险名单数 四天内有数据为0  写入Tracker
    if (window.threathunterTracker) {
      const dataTemp = data.slice(data.length - 96, data.length);
      // 当前小时数据
      const dataNone = _.filter(
        dataTemp,
        ({ production_count, test_count }) => !!(production_count + test_count)
      );
      // 无数据
      if (dataNone.length === 0) {
        window.threathunterTracker.setData({
          version,
          username,
          module: 2,
          appID,
          level: 3,
          message: 'offline_data_missing'
        });
      }
    }
  }

  // 搜索结果
  dealSearchItems(data, tagsResult) {
    const { status, values } = data;

    const status2 = tagsResult.status;
    const tagsValues = tagsResult.values;

    let strategies = [];
    let allTags = [];
    if (status === 200) {
      strategies = _.map(values, (item) => {
        const { name } = item;
        return ({ text: name, value: name });
      });
    }

    if (status2 === 0) {
      allTags = _.map(tagsValues, (item) => {
        const { name } = item;
        return ({ text: name, value: name });
      });
    }

    this.setState({
      strategies,
      allTags
    });

    this.fetchAlerts();
  }

  // 获取“搜索结果”
  fetchAlerts() {
    const { filter_expire, fromtime, endtime, timestamp } = this.state;

    const params = _.pick(this.state, [
      FORM_KEY,
      FORM_CHECK_TYPE,
      FORM_STRATEGY,
      FORM_TAGS,
      FORM_SCENE_TYPE,
      FORM_DECISION,
      FORM_FILTER_EXPIRE,
      FORM_OFFSET,
      FORM_LIMIT,
      FORM_TEST
    ]);

    if (!filter_expire) {
      if (_.toInteger(fromtime) === 0 && _.toInteger(endtime) === 0) {
        _.assign(params, {
          [FORM_FROM_TIME]: moment(timestamp).startOf('hour').valueOf(),
          [FORM_END_TIME]: timestamp
        });
      } else {
        params[FORM_FROM_TIME] = fromtime;
        params[FORM_END_TIME] = endtime;
      }
    }

    HttpService.get({
      httpRequestParam,
      url: API_ALERTS,
      loadingIn: '.result-table',
      params,
      onSuccess: (data) => {
        // const { status, values } = data;
        // if (status === 0) {
          this.setState({ items: data.result.notices, count: 0 });
        // } else {
        //   this.setState({ items: [], count: 0 });
        // }
      },
      onError: () => {
        notification.error('服务异常，请重试。');
      }
    });
  }

  fetchAlertsDetail(key, strategy) {
    this.setState({ itemDetail: [] });
    const { filter_expire, fromtime, endtime, timestamp } = this.state;

    const params = _.pick(this.state, [
      // FORM_KEY,
      FORM_CHECK_TYPE,
      // FORM_STRATEGY,
      FORM_TAGS,
      FORM_SCENE_TYPE,
      FORM_DECISION,
      FORM_FILTER_EXPIRE,
      FORM_OFFSET,
      FORM_TEST
    ]);

    if (!filter_expire) {
      if (_.toInteger(fromtime) === 0 && _.toInteger(endtime) === 0) {
        _.assign(params, {
          [FORM_FROM_TIME]: moment(timestamp).startOf('hour').valueOf(),
          [FORM_END_TIME]: timestamp
        });
      } else {
        params[FORM_FROM_TIME] = fromtime;
        params[FORM_END_TIME] = endtime;
      }
    }

    params[FORM_KEY] = key;
    params[FORM_STRATEGY] = strategy;

    HttpService.get({
      httpRequestParam,
      url: API_ALERTS_DETAIL,
      params,
      onSuccess: (data) => {
        const { status, values } = data;
        if (status === 200) {
          this.setState({ itemDetail: values });
        }
      }
    });
  }

  // 处理状态变化
  handleChange(value, key) {
    const result = (() => {
      switch (key) {
        case TIMESTAMP:
          return (
            value ? {
              [TIMESTAMP]: value,
              [FORM_FROM_TIME]: undefined,
              [FORM_END_TIME]: undefined
            } : {
              [TIMESTAMP]: value
            }
          );
        case FORM_FILTER_EXPIRE:
          return {
            [FORM_FILTER_EXPIRE]: value,
            offset: 1,
            xxx: moment().valueOf()
          };
        case FORM_TEST: {
          const formTextResult = {
            xxx: moment().valueOf()
          };

          if (!value) {
            delete this.state[FORM_TEST];
          } else {
            Object.assign(formTextResult, { [FORM_TEST]: value });
          }

          return formTextResult;
        }
        case 'accept':
          if (!value) {
            delete this.state.accept;
          }
          return {
            [FORM_DECISION]: value ? 'accept' : undefined,
            xxx: moment().valueOf(),
            accept: value
          };
        default: {
          const list = _.set(this.state, key, value);
          return {
            ...list
          };
        }
      }
    })();

    this.setState(result);
  }

  handleSubmit(value, key) {
    if (_.isNull(value)) {
      this.setState({ action: ACTION_DEFAULT });
      return;
    }

    switch (key) {
      case ACTION_INSERT:
        HttpService.post({
          httpRequestParam,
          url: API_ALERTS,
          params: [value],
          onSuccess: (data) => {
            const { status } = data;
            if (status === 0) {
              this.setState({ action: ACTION_DEFAULT });
              this.fetchAlerts();
            } else {
              notification.error({ message: '保存失败' });
            }
          },
          onError: () => {
            notification.error({ message: '保存失败' });
          }
        });
        break;
      case ACTION_DELETE:
        HttpService.delete({
          httpRequestParam,
          url: `${API_ALERTS}?key=${value.key}&fromtime=${value.fromtime}&endtime=${value.endtime}`,
          // params: value,
          onSuccess: () => {
            this.setState({ action: ACTION_DEFAULT });
            this.fetchAlerts();
          },
          onError: () => {
            notification.error({ message: '删除失败' });
          }
        });
        break;
      default:
    }
  }

  // 导出名单
  exportList() {
    const { filter_expire } = this.state;
    const params = _.pick(this.state, [
      FORM_KEY,
      FORM_CHECK_TYPE,
      FORM_STRATEGY,
      FORM_TAGS,
      FORM_SCENE_TYPE,
      FORM_DECISION,
      FORM_FILTER_EXPIRE,
      FORM_OFFSET,
      FORM_TEST
    ]);

    if (!filter_expire) {
      params[FORM_FROM_TIME] = this.state[FORM_FROM_TIME];
      params[FORM_END_TIME] = this.state[FORM_END_TIME];
    }

    // 导出名单
    this.setState({ exporting: true });
    HttpService.get({
      httpRequestParam,
      url: API_EXPORT,
      params,
      onSuccess: (data) => {
        this.setState({ exporting: false });
        const { status, values, msg } = data;
        if (status === 200) {
          values.forEach((path) => {
            DownLoadFile(path);
          });
          notification.success({ message: '导出成功' });
        } else {
          notification.error({ message: msg });
        }
      },
      onError: () => {
        this.setState({ exporting: false });
        notification.error({ message: '导出失败' });
      }
    });
  }

  // 跳转报告页面
  toReport() {
    const params = _.pick(this.state, [
      FORM_KEY,
      FORM_CHECK_TYPE,
      FORM_STRATEGY,
      FORM_TAGS,
      FORM_SCENE_TYPE,
      FORM_DECISION,
      FORM_TEST
    ]);

    const { filter_expire, fromtime, endtime, timestamp } = this.state;

    if (!filter_expire) {
      if (_.toInteger(fromtime) === 0 && _.toInteger(endtime) === 0) {
        _.assign(params, {
          [FORM_FROM_TIME]: moment(timestamp).startOf('hour').valueOf(),
          [FORM_END_TIME]: timestamp
        });
      } else {
        params[FORM_FROM_TIME] = fromtime;
        params[FORM_END_TIME] = endtime;
      }
    }

    let paramStr = '';

    Object.keys(params).forEach((key) => {
      if (params[key] instanceof Array) {
        // 数组处理
        params[key].forEach((item) => {
          paramStr += `${key}=${item}&`;
        });
      } else if (params[key] !== undefined) {
        paramStr += `${key}=${params[key]}&`;
      }
    });

    paramStr = paramStr.substr(0, paramStr.length - 1);
    window.open(`/#/alerts/report?${paramStr}`);
  }

  render() {
    const {
      timestamp,
      count,
      limit,
      offset = 1,
      timeline,
      items,
      itemDetail,
      action,
      strategies,
      allTags,
      xxx,
      test,
      accept,
      exporting,
      filter_expire
    } = this.state;

    const { location } = this.props;

    let statistics;

    return (
      <div className="wd-name-list container">
        <h1 className="title">风险名单管理</h1>
        <Timeline
          selected={timestamp}
          items={timeline}
          onChange={(value) => {
            this.setState({
              [FORM_FILTER_EXPIRE]: false
            });
            this.handleChange(1, 'offset');
            this.handleChange(value, TIMESTAMP);
            this.handleChange(value, 'timestamp2');
            this.handleChange(moment(value).startOf('hour').valueOf(), FORM_FROM_TIME);
            this.handleChange(value, FORM_END_TIME);
          }}
        />
        <Search
          action={action}
          timestamp={this.state.form.timestamp}
          timestamp2={this.state.timestamp2}
          searchTime={_.pick(this.state, [FORM_FROM_TIME, FORM_END_TIME])}
          strategies={strategies}
          tags={allTags}
          onChange={(value, key) => this.handleChange(value, key)}
          onSubmit={(value, key) => this.handleSubmit(value, key)}
          query={URI(location.search).query(true)}
        />

        <div className="result-container">
          {statistics}
          <div className="result-table loader">
            <h2>
              <span className="result-title">搜索结果</span>

              <div
                className={`item-list test-list ${test ? 'active' : ''}`}
                onClick={() => this.handleChange(!test, FORM_TEST)}
                role="presentation"
              >
                <SvgIcon iconName="cup" />
                <span>测试名单</span>
              </div>
              <div
                className={`item-list ${accept ? 'active' : ''}`}
                onClick={() => this.handleChange(!accept, 'accept')}
                role="presentation"
              >
                <SvgIcon iconName="flag" />
                <span className="white-list">白名单</span>
              </div>

              <button
                className="ghost-btn middle-btn"
                disabled={filter_expire || items.length === 0}
                onClick={() => {
                  this.toReport();
                }}
              >
                <span>风险名单分析</span>
              </button>

              <button
                className="main-btn middle-btn"
                disabled={exporting || items.length === 0}
                onClick={() => {
                  this.exportList();
                }}
              >
                <i className={`iconfont ${exporting ? 'icon-loading' : 'icon-upload'}`} />
                {exporting ? null : (<span>导出名单</span>)}
              </button>

            </h2>
            <ResultTable
              {...{ count, items, limit, offset }}
              items={items}
              itemDetail={itemDetail}
              timestamp={timestamp}
              xxx={xxx}
              onChange={(value, key) => this.handleChange(value, key)}
              onGetDetail={(key, strategy) => this.fetchAlertsDetail(key, strategy)}
              onReload={() => this.fetchAlerts()}
              onSubmit={(value, key) => this.handleSubmit(value, key)}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default Alerts;
