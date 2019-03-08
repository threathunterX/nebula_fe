import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import { findDOMNode } from 'react-dom';
import _ from 'lodash';
import moment from 'moment';
import URI from 'urijs';
import {
  version
} from 'app.config';
import Cookies from 'js-cookie';

import UserClickChart from '../Component/UserClickChart';
import TimeCharts from '../Component/TimeCharts';
import ClickStreamTable from '../Component/ClickStreamTable';
import './index.scss';

import HttpService, {
  STATS_OFFLINE_SERIAL
} from '../../../components/HttpService';
import FetchSlotData, { slotMap, FillDefaultTimeLine } from '../../../components/HttpService/FetchSlotData';
import { AnalysisMap } from '../Component/constant';
import Notification from '../../../components/Notification';
import FormSearchInput from '../../../components/FormSearchInput';

const notification = Notification.getNewInstance();

const API_CLICKS_PERIOD = 'platform/behavior/clicks_period';
const API_CLICKS_PERIOD_NOW = 'platform/online/clicks_period';
const API_VISIT_STREAM = 'platform/behavior/visit_stream';
const API_VISIT_STREAM_NOW = 'platform/online/visit_stream';
const API_CLICKS = 'platform/behavior/clicks';
const API_CLICKS_NOW = 'platform/online/clicks';
const KEY_DID = 'did';

const username = Cookies.get('username');

const appID = 'Analysis';
const module = 43;
const httpRequestParam = {
  appID,
  module
};

@withRouter
class DIDClickAnalysis extends Component {
  static propTypes = {
    location: PropTypes.oneOfType([PropTypes.object]).isRequired,
    history: PropTypes.oneOfType([PropTypes.object]).isRequired,
    match: PropTypes.oneOfType([PropTypes.object]).isRequired
  };

  constructor(props) {
    super(props);
    const { match: { params } } = this.props;

    this.state = {
      keyword: decodeURIComponent(params.key) || '',
      dataList: [{}, {}],
      tableSearchValue: [],
      timestamp: 0,
      visitStreamFrom: 0,
      visitStreamTo: 0,
      clicks: [],
      clicksDetail: [],
      detailEndTime: 0,
      scatterSelectIndex: -1,
      stream: [],
      visitStreamValues: [],
      selectedPoint: {},
      selectCol: 'IP'
    };
  }

  componentDidMount() {
    // 趋势统计
    this.fetchRelatedStatistics();

    // 用户访问/刷新页面 写入Tracker
    if (window.threathunterTracker) {
      window.threathunterTracker.setData({
        version,
        username,
        module,
        appID,
        level: 1,
        message: 'visit'
      });
    }
  }

  // 搜索
  onSearchSubmit(keyword) {
    this.props.history.push(`/analysis/did/clickStream/${encodeURIComponent(keyword)}`);

    this.fetchRelatedStatistics();
  }

  // 选择列表联动散点图
  onSelectIndexChange(index) {
    const {
      dataList,
      selectCol,
      stream
    } = this.state;

    for (let i = 0; i < stream.length; i += 1) {
      const item = stream[i];
      if (dataList[0][index] &&
        item.x === dataList[0][index].timestamp &&
        item.yText === dataList[0][index][AnalysisMap[selectCol]]) {
        this.setState({
          scatterSelectIndex: index,
          selectedPoint: {
            x: item.x,
            y: item.y,
            value: item.value
          }
        });
        return;
      }
    }

    this.setState({
      scatterSelectIndex: index,
      selectedPoint: {}
    });
  }

  setScatterSelectIndex(param) {
    const {
      dataList,
      selectCol,
      moreData
    } = this.state;

    for (let i = 0; i < dataList[0].length; i += 1) {
      const item = dataList[0][i];
      if (param.value.x === item.timestamp &&
        param.value.yText === item[AnalysisMap[selectCol]]) {
        /* eslint react/no-find-dom-node: "off" */
        const tableBody = findDOMNode(this.clickStreamTable).querySelector('.nebula-body-table');
        const tableItem = tableBody.querySelectorAll('.nebula-table-row')[i];
        // 选中列滚动到第一行
        tableBody.scrollTop = tableItem.offsetTop;

        this.setState({
          scatterSelectIndex: i,
          selectedPoint: {
            x: param.value.x,
            y: param.value.y,
            value: param.value.value
          }
        });
        return;
      }
    }

    // 匹配完毕，无对应数据
    if (moreData) {
      notification.warning({
        message: '未找到相对应内容，可能已被搜索条件过滤掉。'
      });
    } else {
      notification.warning({
        message: '超出点击详情加载范围，请点击“查看更多”加载所有内容。'
      });
    }
  }

  // 选择列
  setSelectCol(selectCol) {
    const {
      visitStreamValues
    } = this.state;

    const values = visitStreamValues;
    let stream = [];
    const countList = {};
    let key;
    switch (selectCol) {
      case 'USER':
        key = 'uid';
        break;
      case 'IP':
        key = 'ip';
        break;
      default:
        key = AnalysisMap[selectCol];
    }

    values.forEach((item) => {
      if (!countList[item[key]]) {
        countList[item[key]] = {
          [key]: item[key],
          count: 0
        };
      } else {
        (countList[item[key]].count) += 1;
      }
    });

    const sortList = _.sortBy(Object.values(countList), ['count']);
    sortList.reverse();
    const result = sortList.slice(0, 15);

    values.forEach((item) => {
      if (_.find(result, { [key]: item[key] })) {
        stream.push({
          x: item.timestamp,
          y: item[key],
          yText: item[key],
          value: item.if_notice ? 1 : 0
        });
      } else {
        // 如果不是限制的15个数据其中的数据，则合并为其他栏
        stream.push({
          x: item.timestamp,
          y: '···',
          yText: item[key],
          value: item.if_notice ? 1 : 0
        });
      }
    });

    if (stream.length > 2000) {
      stream = stream.slice(0, 2000);
      notification.warning({
        message: '点击事件过多无法显示全部，如需查看详细请缩短时间范围'
      });
    }

    this.setState({
      stream,
      selectCol
    });
  }

  // 趋势统计
  fetchRelatedStatistics() {
    const { match: { params } } = this.props;
    const to = moment().valueOf();
    const from = moment(to).startOf('hour').subtract(3, 'months').valueOf();

    const { location } = this.props;
    const timestamp = _.get(URI(location.search).query(true), 'timestamp', to);

    this.setState({ timestamp: Number(timestamp) });

    // 获取数据变量
    const var_list = [
      // 点击数
      slotMap.DID_DYNAMIC_COUNT
    ];

    // 发送请求
    FetchSlotData({
      httpRequestParam,
      url: STATS_OFFLINE_SERIAL,
      loadingIn: '.trend-area-container,.click-chart',
      params: {
        key: decodeURIComponent(params.key),
        key_type: KEY_DID,
        from_time: from,
        end_time: to,
        var_list
      },
      onSuccess: (result) => {
        const value = FillDefaultTimeLine(result.values, from, to, var_list);

        // 格式化点击数
        const clicks = _.map(value, item => ({
          x: item.time_frame,
          y: _.get(item[slotMap.DID_DYNAMIC_COUNT], 'value')
        }));

        this.setState({ clicks });

        // 四天内无数据  写入Tracker
        if (window.threathunterTracker) {
          const data = _.filter(clicks, o => !!o.y);
          // 无数据
          if (data.length === 0) {
            window.threathunterTracker.setData({
              version,
              username,
              module,
              appID,
              level: 3,
              message: 'query'
            });
          }
        }
      }
    });
  }

  fetchVisitStream(data) {
    const { match: { params } } = this.props;

    const startOfHour = moment().startOf('hour').valueOf();
    let url = API_VISIT_STREAM;
    if (data.from >= startOfHour) {
      url = API_VISIT_STREAM_NOW;
    }

    HttpService.get({
      httpRequestParam,
      url,
      loadingIn: '#timeChart',
      params: {
        key: decodeURIComponent(params.key),
        key_type: KEY_DID,
        from_time: data.from,
        end_time: data.to
      },
      onSuccess: (dataset) => {
        const values = dataset.values || [];
        let stream = [];
        const countList = {};
        const {
          selectCol
        } = this.state;
        let key;
        switch (selectCol) {
          case 'USER':
            key = 'uid';
            break;
          case 'IP':
            key = 'ip';
            break;
          default:
            key = AnalysisMap[selectCol];
        }
        values.forEach((item) => {
          if (!countList[item.ip]) {
            countList[item[key]] = {
              [key]: item[key],
              count: 0
            };
          } else {
            (countList[item[key]].count) += 1;
          }
        });

        const sortList = _.sortBy(Object.values(countList), ['count']);
        sortList.reverse();
        const result = sortList.slice(0, 15);

        values.forEach((item) => {
          if (_.find(result, { [key]: item[key] })) {
            stream.push({
              x: item.timestamp,
              y: item[key],
              yText: item[key],
              value: item.if_notice ? 1 : 0
            });
          } else {
            // 如果不是限制的15个数据其中的数据，则合并为其他栏
            stream.push({
              x: item.timestamp,
              y: '···',
              yText: item[key],
              value: item.if_notice ? 1 : 0
            });
          }
        });

        if (stream.length > 2000) {
          stream = stream.slice(0, 2000);
          notification.warning({
            message: '点击事件过多无法显示全部，如需查看详细请缩短时间范围'
          });
        }

        this.setState({
          stream,
          visitStreamValues: values,
          visitStreamFrom: data.from,
          visitStreamTo: data.to
        });
      }
    });
  }

  // 获取点击详情柱形图数据
  fetchClicksPeriod() {
    const { match: { params } } = this.props;
    const { timestamp } = this.state;
    const from = moment(timestamp).startOf('hour').valueOf();
    let to = moment(timestamp).endOf('hour').valueOf();
    if (to >= moment().valueOf()) {
      to = timestamp;
    }

    const startOfHour = moment().startOf('hour').valueOf();
    let url = API_CLICKS_PERIOD;
    if (from === startOfHour) {
      url = API_CLICKS_PERIOD_NOW;
    }

    HttpService.get({
      httpRequestParam,
      url,
      loadingIn: '#timeBar',
      params: {
        key: decodeURIComponent(params.key),
        key_type: KEY_DID,
        from_time: from,
        end_time: timestamp
      },
      onSuccess: (dataset) => {
        const orgList = [];
        const stateObj = {};

        if (dataset.values) {
          Object.keys(dataset.values).forEach((item) => {
            const value = dataset.values[item];
            orgList.push({
              x: item,
              y: value.count,
              value: value.if_notice ? 1 : 0
            });
          });
        } else {
          stateObj.dataList = [{}, {}];
          stateObj.stream = [];
        }

        stateObj.clicksPeriod = _.sortBy(orgList, ['x']);

        this.setState(stateObj);

        // clickStream页面【用户请求】有数据，散点图下面的时间轴无数据 写入Tracker
        if (window.threathunterTracker && _.get(_.find(this.state.clicks, { x: from }), 'y')) {
          const dataNone = _.filter(stateObj.clicksPeriod, o => !o.y);
          if (dataNone.length === 0) {
            window.threathunterTracker.setData({
              version,
              username,
              module,
              appID,
              level: 3,
              message: 'details'
            });
          }
        }
      }
    });
  }

  // 获取表格数据
  fetchClicks(data, loadMore, callBack) {
    const { match: { params } } = this.props;

    let {
      detailEndTime,
      clicksDetail
    } = this.state;

    if (!loadMore) {
      detailEndTime = 0;
      clicksDetail = [];
    }

    const startOfHour = moment().startOf('hour').valueOf();
    let url = API_CLICKS;
    if (data.from >= startOfHour) {
      url = API_CLICKS_NOW;
    }

    HttpService.post({
      httpRequestParam,
      url,
      loadingIn: loadMore ? false : '.click-stream-detail .click-data',
      params: {
        key: decodeURIComponent(params.key),
        key_type: KEY_DID,
        from_time: data.from,
        end_time: detailEndTime || data.to,
        query: this.state.tableSearchValue
      },
      onSuccess: (resp) => {
        let dataset = resp.values;
        const USER = [];
        const IP = [];
        let moreData = false;

        if (!dataset) {
          dataset = [];
        }

        const clicksDetailData = clicksDetail.concat(dataset);

        clicksDetailData.forEach((item) => {
          USER.push(item.uid);
          IP.push(item.c_ip);
        });

        const business = {
          IP,
          USER
        };

        // 加载更多回调
        if (callBack) {
          callBack();
        }

        if (dataset.length > 0 && dataset.length === 20) {
          // 最小时间-1毫秒
          detailEndTime = Number(dataset[dataset.length - 1].timestamp) - 1;
        } else {
          moreData = true;
        }

        this.setState({
          dataList: [clicksDetailData, business],
          detailEndTime,
          moreData,
          clicksDetail: clicksDetailData
        });
      }
    });
  }

  fetchData(timeRange) {
    this.fetchClicks(timeRange);
    this.fetchVisitStream(timeRange);
  }

  render() {
    const {
      keyword,
      clicks,
      dataList,
      stream,
      timestamp,
      clicksPeriod,
      visitStreamFrom,
      visitStreamTo,
      moreData,
      scatterSelectIndex,
      selectedPoint,
      selectCol
    } = this.state;

    return (
      <div className="wd-did-analyze container">
        <h1>
          <span
            onClick={() => this.props.history.push(`/analysis/${KEY_DID}?timestamp=${timestamp}`)}
            role="button"
            tabIndex="0"
          >DeviceID风险分析</span>
          <i className="iconfont icon-right" />
          <span className="child">点击详情</span>

          <FormSearchInput
            className="analysis-search"
            placeholder="search for DeviceID"
            placeholderWidth={130}
            keyword={keyword}
            onSubmit={value => this.onSearchSubmit(value)}
            onChange={value => this.setState({ keyword: value })}
          />
        </h1>

        <UserClickChart
          selected={timestamp}
          items={clicks}
          title="设备请求"
          hoverTitle={'设备请求数'}
          onChange={time => this.setState({ timestamp: time })}
        />

        {
          /*
           <RedqInfo keyType="mobile" keyValue={decodeURIComponent(me.props.match.params.key)}/>
           */
        }

        <TimeCharts
          scatterData={stream}
          barData={clicksPeriod}
          visitStreamFrom={visitStreamFrom}
          selectedPoint={selectedPoint}
          visitStreamTo={visitStreamTo}
          onScatterClick={(param) => {
            this.setScatterSelectIndex(param);
          }}
          onDataZoomChange={(data) => {
            this.fetchData({
              from: data.data[0].x,
              to: (Number(data.data[data.data.length - 1].x) + (30 * 1000)) - 1
            });
          }}
          timestamp={timestamp}
          onReload={() => {
            this.fetchClicksPeriod();
          }}
        >
          <div
            className="to-analyze"
            onClick={() => {
              this.props.history.push(`/analysis/did/${encodeURIComponent(this.props.match.params.key)}?timestamp=${timestamp}`);
            }}
            role="presentation"
          >
            <i className="iconfont icon-arrowleft" />
            <span>分析统计</span>
          </div>
        </TimeCharts>

        <ClickStreamTable
          ref={(node) => {
            this.clickStreamTable = node;
          }}
          dataList={dataList}
          scatterSelectIndex={scatterSelectIndex}
          moreData={moreData}
          notice={selectedPoint.value}
          onSelectIndexChange={(index) => {
            this.onSelectIndexChange(index);
          }}
          selectCol={selectCol}
          setSelectCol={(col) => {
            this.setSelectCol(col);
          }}
          loadMore={(callBack) => {
            this.fetchClicks({ from: visitStreamFrom, to: visitStreamTo }, true, callBack);
          }}
          onSearch={(value) => {
            this.state.tableSearchValue = value;
            this.fetchClicks({ from: visitStreamFrom, to: visitStreamTo });
          }}
        />
      </div>
    );
  }
}

export default DIDClickAnalysis;

