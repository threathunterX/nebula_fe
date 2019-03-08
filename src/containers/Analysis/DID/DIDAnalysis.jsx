import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import moment from 'moment';
import _ from 'lodash';
import URI from 'urijs';

import TrendChart from '../Component/TrendChart';
import MapChart from '../Component/MapChart';
import UserClickChart from '../Component/UserClickChart';
import RiskList from '../Component/RiskList';
import AnalyzeTables, { TABLE_ORDER } from '../Component/AnalyzeTables';
import GeoMap from '../../../components/util/GeoMap';
import './index.scss';
import HttpService, {
  STATS_SLOT_QUERY,
  STATS_OFFLINE_SERIAL
} from '../../../components/HttpService';
import FetchSlotData, { slotMap, FillDefaultTimeLine } from '../../../components/HttpService/FetchSlotData';
import FormSearchInput from '../../../components/FormSearchInput';

const KEY_DID = 'did';
const DEFAULT_DATA_WIDTH = 96;

@withRouter
class DIDAnalysis extends Component {
  static propTypes = {
    location: PropTypes.oneOfType([PropTypes.object]).isRequired,
    history: PropTypes.oneOfType([PropTypes.object]).isRequired,
    match: PropTypes.oneOfType([PropTypes.object]).isRequired
  };

  // 聚焦输入框
  static focusInput(e) {
    if (e.target.querySelector('input')) {
      e.target.querySelector('input').focus();
    }
  }

  constructor(props) {
    super(props);

    const { match: { params } } = this.props;

    this.state = {
      timestamp: 0,
      pages: [],
      pageZoomData: [],
      users: [],
      userZoomData: [],
      ips: [],
      ipZoomData: [],
      incidents: [],
      incidentZoomData: [],
      clicks: [],
      clickZoomData: [],
      scenes: [
        {
          text: '访客风险',
          iconName: 'visitor',
          point: 0
        },
        {
          text: '帐号风险',
          iconClass: 'icon-tablet',
          point: 0
        },
        {
          text: '支付风险',
          iconClass: 'icon-creditcard',
          point: 0
        },
        {
          text: '订单风险',
          iconClass: 'icon-shoppingcart',
          point: 0
        },
        {
          text: '营销风险',
          iconClass: 'icon-tagso',
          point: 0
        },
        {
          text: '其他风险',
          iconClass: 'icon-pluscircleo',
          point: 0
        }
      ],
      keyword: decodeURIComponent(params.key) || '',
      tabIndex: 0,
      tops: []
    };
  }

  componentDidMount() {
    // 趋势统计
    this.fetchRelatedStatistics();
  }

  componentDidUpdate(props) {
    const { match: { params } } = this.props;

    if (!_.eq(params, props.match.params)) {
      // 趋势统计
      this.fetchRelatedStatistics();
    }
  }

  // 获取地图信息
  getMapInfo() {
    const { match: { params } } = this.props;
    const { timestamp } = this.state;
    const from = moment(timestamp).startOf('hour').valueOf();
    const keyQuery = decodeURIComponent(params.key);

    HttpService.post({
      url: STATS_SLOT_QUERY,
      loadingIn: '.trend-area-container',
      params: {
        timestamp: from,
        keys: [keyQuery],
        dimension: KEY_DID,
        variables: [slotMap.DID_GEO_DYNAMIC_20_COUNT]
      },
      onSuccess: (result) => {
        const data = _.get(result.values, keyQuery);
        const areas = _.map(_.get(data, `${slotMap.DID_GEO_DYNAMIC_20_COUNT}.value`, []), (item) => {
          const coordinate = _.get(GeoMap, item.key, [0, 0]);
          return [...coordinate, item.value, item.key];
        });

        this.setState({ areas });
      }
    });
  }

  // 场景统计
  fetchSceneStatistic() {
    const { match: { params } } = this.props;
    const { timestamp, scenes } = this.state;

    const from = moment(timestamp).startOf('hour').valueOf();
    const keyQuery = decodeURIComponent(params.key);

    HttpService.post({
      url: STATS_SLOT_QUERY,
      loadingIn: '.risk-item',
      params: {
        timestamp: from,
        keys: [keyQuery],
        dimension: KEY_DID,
        variables: [slotMap.DID_SCENE_INCIDENT_COUNT]
      },
      onSuccess: (res) => {
        if (res.status !== 200 || !res.values) {
          // 报错则置为0
          scenes.forEach((item, i) => {
            scenes[i].point = 0;
          });
          this.setState({ scenes });
          return;
        }

        const resData = _.get(res.values, keyQuery, {});
        const data = _.get(resData[slotMap.DID_SCENE_INCIDENT_COUNT], 'value');
        const result = _.map(scenes, (value, index) => {
          switch (index) {
            case 0:
              return Object.assign(value, { point: data && data.VISITOR ? data.VISITOR : 0 });
            case 1:
              return Object.assign(value, { point: data && data.ACCOUNT ? data.ACCOUNT : 0 });
            case 2:
              return Object.assign(value, {
                point: data && data.TRANSACTION ? data.TRANSACTION : 0
              });
            case 3:
              return Object.assign(value, { point: data && data.ORDER ? data.ORDER : 0 });
            case 4:
              return Object.assign(value, { point: data && data.MARKETING ? data.MARKETING : 0 });
            case 5:
              return Object.assign(value, { point: data && data.OTHER ? data.OTHER : 0 });
            default:
              return null;
          }
        });
        this.setState({ scenes: result });
      }
    });
  }

  // 获取统计
  fetchTopsStatistics() {
    const { match: { params } } = this.props;
    const { timestamp } = this.state;

    // 获取数据变量
    const variables = [
      slotMap.DID_PAGE_DYNAMIC_20_COUNT, // 访问页面
      slotMap.DID_UA_20_COUNT, // UserAgent
      slotMap.DID_IP_DYNAMIC_20_COUNT, // IP
      slotMap.DID_USER_DYNAMIC_20_COUNT, // USER
      slotMap.DID_TAG_20_COUNT // 标签
    ];

    const from_time = moment(timestamp).startOf('hour').valueOf();

    const keyQuery = decodeURIComponent(params.key);

    HttpService.post({
      url: STATS_SLOT_QUERY,
      loadingIn: '.analyze-table',
      params: {
        keys: [keyQuery],
        dimension: KEY_DID,
        timestamp: from_time,
        variables
      },
      onSuccess: (data) => {
        const keyMap = {
          [slotMap.DID_PAGE_DYNAMIC_20_COUNT]: 'url_top', // 访问页面
          [slotMap.DID_UA_20_COUNT]: 'ua_top', // UserAgent
          [slotMap.DID_IP_DYNAMIC_20_COUNT]: 'ip_top', // IP
          [slotMap.DID_USER_DYNAMIC_20_COUNT]: 'user_top', // USER
          [slotMap.DID_TAG_20_COUNT]: 'tag_top'
        };

        let tops = _.map(
          _.get(data.values, keyQuery),
          (variable, key) => {
            let title = '';
            let url = '';
            let order = 0;
            const value = _.get(variable, 'value');
            switch (key) {
              case slotMap.DID_PAGE_DYNAMIC_20_COUNT:
                title = '访问页面';
                url = '/analysis/page/';
                order = TABLE_ORDER.PAGE;
                break;
              case slotMap.DID_IP_DYNAMIC_20_COUNT:
                title = '关联IP';
                url = '/analysis/ip/';
                order = TABLE_ORDER.IP;
                break;
              case slotMap.DID_UA_20_COUNT:
                title = 'UserAgent';
                order = TABLE_ORDER.UA;
                break;
              case slotMap.DID_USER_DYNAMIC_20_COUNT:
                title = '关联用户';
                url = '/analysis/user/';
                order = TABLE_ORDER.USER;
                break;
              case slotMap.DID_TAG_20_COUNT:
                title = '关联标签';
                order = TABLE_ORDER.TAG;
                break;
              default:
            }

            return {
              title,
              key: keyMap[key],
              url,
              order,
              data: _.map(value, valueItem => ({
                text: valueItem.key,
                clNum: valueItem.value
              }))
            };
          });

        tops = _.sortBy(tops, ['order']);
        this.setState({ tops });
      }
    });
  }

  // 选择页签
  selectTab(tabIndex) {
    if (this.state.tabIndex === tabIndex) {
      return;
    }

    if (tabIndex === 1) {
      this.getMapInfo();
    }
    this.setState({ tabIndex });
  }

  // 趋势统计
  fetchRelatedStatistics() {
    const { match: { params } } = this.props;
    const { location } = this.props;

    const to = moment().valueOf();
    const from = moment(to).startOf('hour').subtract(3, 'months').valueOf();

    const timestamp = _.get(URI(location.search).query(true), 'timestamp', to);

    this.setState({ timestamp: Number(timestamp) });

    // 获取数据变量
    const var_list = [
      slotMap.DID_INCIDENT_COUNT, // 风险事件数
      slotMap.DID_DYNAMIC_COUNT, // 点击数
      slotMap.DID_DYNAMIC_USER, // 关联用户数
      slotMap.DID_DYNAMIC_IP, // 关联IP数
      slotMap.DID_DYNAMIC_PAGE // 关联页面数
    ];

    // 发送请求
    FetchSlotData({
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

        const clicks = [];
        const pages = [];
        const ips = [];
        const users = [];
        const incidents = [];
        value.forEach((item) => {
          // 格式化点击数
          clicks.push({
            x: item.time_frame,
            y: _.get(item[slotMap.DID_DYNAMIC_COUNT], 'value')
          });
          // 格式化风险事件数
          incidents.push({
            x: item.time_frame,
            y: _.get(item[slotMap.DID_INCIDENT_COUNT], 'value')
          });
          // 格式化关联IP
          ips.push({
            x: item.time_frame,
            y: _.get(item[slotMap.DID_DYNAMIC_IP], 'value')
          });
          // 格式化关联页面
          users.push({
            x: item.time_frame,
            y: _.get(item[slotMap.DID_DYNAMIC_USER], 'value')
          });
          // 格式化页面
          pages.push({
            x: item.time_frame,
            y: _.get(item[slotMap.DID_DYNAMIC_PAGE], 'value')
          });
        });

        const clickZoomData = clicks.slice(clicks.length - DEFAULT_DATA_WIDTH, clicks.length);
        const ipZoomData = ips.slice(ips.length - DEFAULT_DATA_WIDTH, ips.length);
        const userZoomData = users.slice(users.length - DEFAULT_DATA_WIDTH, users.length);
        const pageZoomData = pages.slice(pages.length - DEFAULT_DATA_WIDTH, pages.length);
        const incidentZoomData =
          incidents.slice(incidents.length - DEFAULT_DATA_WIDTH, incidents.length);

        this.setState({
          timestamp: Number(timestamp),
          clicks,
          clickZoomData,
          ips,
          ipZoomData,
          pages,
          pageZoomData,
          users,
          userZoomData,
          incidents,
          incidentZoomData
        });
      }
    });
  }

  // 处理关键字搜索
  handleKeywordSubmit(keyword) {
    this.props.history.push(`/analysis/did/${encodeURIComponent(keyword)}`);
  }

  dataZoomChange(param) {
    const {
      pages,
      users,
      ips,
      incidents,
      clicks
    } = this.state;

    const clickZoomData = clicks.slice(param.minIndex, param.maxIndex + 1);
    const pageZoomData = pages.slice(param.minIndex, param.maxIndex + 1);
    const userZoomData = users.slice(param.minIndex, param.maxIndex + 1);
    const ipZoomData = ips.slice(param.minIndex, param.maxIndex + 1);
    const incidentZoomData = incidents.slice(param.minIndex, param.maxIndex + 1);

    this.setState({
      clickZoomData,
      pageZoomData,
      userZoomData,
      ipZoomData,
      incidentZoomData
    });
  }

  render() {
    const { match: { params } } = this.props;

    const {
      timestamp,
      tabIndex,
      keyword,
      clicks,
      scenes,
      tops,
      clickZoomData,
      pageZoomData,
      ipZoomData,
      userZoomData,
      incidentZoomData,
      clickChart,
      trendChart,
      areas
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
          <span className="child">分析统计</span>

          <FormSearchInput
            className="analysis-search"
            placeholder="search for DeviceID"
            placeholderWidth={130}
            keyword={keyword}
            onSubmit={value => this.handleKeywordSubmit(value)}
            onChange={value => this.setState({ keyword: value })}
          />
        </h1>

        <UserClickChart
          selected={timestamp}
          title="设备请求"
          hoverTitle={'设备请求数'}
          items={clicks}
          onChange={(time) => {
            this.setState({ timestamp: time });
            if (this.state.tabIndex !== 0) {
              this.state.timestamp = time;
              this.getMapInfo();
            }
          }}
          onDataZoomChange={(param) => {
            this.dataZoomChange(param);
          }}
          bandChart={trendChart}
          getChartItem={(clickChartItem) => {
            this.setState({ clickChart: clickChartItem });
          }}
        />

        <div className="trend-area">
          <div className="tab">
            <div
              className={`tab-item ${tabIndex === 0 ? 'active' : ''}`}
              onClick={() => {
                this.selectTab(0);
              }}
              role="presentation"
            >趋势统计
            </div>
            <div
              className={`tab-item ${tabIndex === 1 ? 'active' : ''}`}
              onClick={() => {
                this.selectTab(1);
              }}
              role="presentation"
            >地图
            </div>
          </div>
          <div className="trend-area-container">
            {
              tabIndex === 0 ?
                (<TrendChart
                  pageData={pageZoomData}
                  ipData={ipZoomData}
                  userData={userZoomData}
                  eventData={incidentZoomData}
                  barData={clickZoomData}
                  onBarClick={(time) => {
                    this.setState({ timestamp: time });
                  }}
                  bandChart={clickChart}
                  getChartItem={(trendChartItem) => {
                    this.setState({ trendChart: trendChartItem });
                  }}
                />) :
                (<MapChart pointData={areas} />)
            }
          </div>

          <div
            className="to-stream"
            onClick={() => {
              this.props.history.push(`/analysis/did/clickStream/${encodeURIComponent(this.props.match.params.key)}?timestamp=${timestamp}`);
            }}
            role="presentation"
          >
            <i className="iconfont icon-arrowright" />
            <span>查看详情</span>
          </div>
        </div>
        <RiskList
          keyword={decodeURIComponent(params.key)}
          timestamp={timestamp}
          onReload={() => this.fetchSceneStatistic()}
          buttonList={scenes}
        />
        <AnalyzeTables
          timestamp={timestamp}
          onReload={() => this.fetchTopsStatistics()}
          tableList={tops}
        />
      </div>
    );
  }
}

export default DIDAnalysis;

