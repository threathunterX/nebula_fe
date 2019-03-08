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
import RedqInfo from '../Component/RedqInfo';

import GeoMap from '../../../components/util/GeoMap';
import FormSearchInput from '../../../components/FormSearchInput';
import './index.scss';
import HttpService, {
  STATS_SLOT_QUERY,
  STATS_OFFLINE_SERIAL
} from '../../../components/HttpService';
import FetchSlotData, { slotMap, FillDefaultTimeLine } from '../../../components/HttpService/FetchSlotData';

const KEY_IP = 'ip';
const DEFAULT_DATA_WIDTH = 96;

@withRouter
class IPAnalysis extends Component {
  static propTypes = {
    location: PropTypes.oneOfType([PropTypes.object]).isRequired,
    history: PropTypes.oneOfType([PropTypes.object]).isRequired,
    match: PropTypes.oneOfType([PropTypes.object]).isRequired
  };

  constructor(props) {
    super(props);

    const { match: { params } } = this.props;

    this.state = {
      timestamp: 0,
      pages: [],
      pageZoomData: [],
      users: [],
      userZoomData: [],
      dids: [],
      didZoomData: [],
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
    this.render = this.render.bind(this);
  }

  componentDidMount() {
    // 趋势统计
    this.fetchRelatedStatistics();
    this.fetchIpLocation();
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
        dimension: KEY_IP,
        variables: [slotMap.IP_GEO_DYNAMIC_20_COUNT]
      },
      onSuccess: (result) => {
        const data = _.get(result.values, keyQuery);
        const areasMap = _.get(data, `${slotMap.IP_GEO_DYNAMIC_20_COUNT}.value`);
        const areas = _.map(areasMap, (item) => {
          const coordinate = _.get(GeoMap, item.key, [0, 0]);
          return [...coordinate, item.value, item.key];
        });
        this.setState({ areas });
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

  // 处理状态变化
  handleChange(value, key) {
    this.setState({ [key]: value });
    if (this.state.tabIndex !== 0) {
      this.state.timestamp = value;
      this.getMapInfo();
    }
  }

  // 处理关键字搜索
  handleKeywordSubmit(keyword) {
    this.fetchIpLocation(keyword);

    this.props.history.push(`/analysis/ip/${encodeURIComponent(keyword)}`);
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
      slotMap.IP_INCIDENT_COUNT, // 风险事件数
      slotMap.IP_DYNAMIC_COUNT, // 点击数
      slotMap.IP_DYNAMIC_USER, // 关联用户数
      slotMap.IP_DYNAMIC_DID, // 关联设备数
      slotMap.IP_DYNAMIC_PAGE // 关联页面数
    ];

    // 发送请求
    FetchSlotData({
      url: STATS_OFFLINE_SERIAL,
      loadingIn: '.trend-area-container,.click-chart',
      params: {
        key: decodeURIComponent(params.key),
        key_type: KEY_IP,
        from_time: from,
        end_time: to,
        var_list
      },
      onSuccess: (result) => {
        const value = FillDefaultTimeLine(result.values, from, to, var_list);

        const clicks = [];
        const pages = [];
        const dids = [];
        const users = [];
        const incidents = [];

        value.forEach((item) => {
          // 格式化点击数
          clicks.push({
            x: item.time_frame,
            y: _.get(item[slotMap.IP_DYNAMIC_COUNT], 'value')
          });
          // 格式化风险事件数
          incidents.push({
            x: item.time_frame,
            y: _.get(item[slotMap.IP_INCIDENT_COUNT], 'value')
          });
          // 格式化关联设备
          dids.push({
            x: item.time_frame,
            y: _.get(item[slotMap.IP_DYNAMIC_DID], 'value')
          });
          // 格式化关联页面
          users.push({
            x: item.time_frame,
            y: _.get(item[slotMap.IP_DYNAMIC_USER], 'value')
          });
          // 格式化页面
          pages.push({
            x: item.time_frame,
            y: _.get(item[slotMap.IP_DYNAMIC_PAGE], 'value')
          });
        });

        const clickZoomData = clicks.slice(clicks.length - DEFAULT_DATA_WIDTH, clicks.length);
        const didZoomData = dids.slice(dids.length - DEFAULT_DATA_WIDTH, dids.length);
        const userZoomData = users.slice(users.length - DEFAULT_DATA_WIDTH, users.length);
        const pageZoomData = pages.slice(pages.length - DEFAULT_DATA_WIDTH, pages.length);
        const incidentZoomData =
          incidents.slice(incidents.length - DEFAULT_DATA_WIDTH, incidents.length);

        this.setState({
          timestamp: Number(timestamp),
          clicks,
          clickZoomData,
          dids,
          didZoomData,
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

  // 地点查询
  fetchIpLocation(param) {
    let ip = decodeURIComponent(this.props.match.params.key);
    if (param) {
      ip = param;
    }

    HttpService.get({
      url: 'platform/geoinfo',
      loadingIn: false,
      params: {
        ip
      },
      onSuccess: (data) => {
        this.setState({
          location: data.address
        });
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
        dimension: KEY_IP,
        variables: [slotMap.IP_SCENE_INCIDENT_COUNT]
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
        const data = _.get(resData[slotMap.IP_SCENE_INCIDENT_COUNT], 'value');
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
      slotMap.IP_PAGE_DYNAMIC_20_COUNT, // 访问页面
      slotMap.IP_UA_20_COUNT, // UserAgent
      slotMap.IP_DID_DYNAMIC_20_COUNT, // 设备ID
      slotMap.IP_USER_DYNAMIC_20_COUNT, // USER
      slotMap.IP_TAG_20_COUNT // 标签
    ];

    const from_time = moment(timestamp).startOf('hour').valueOf();
    const keyQuery = decodeURIComponent(params.key);

    HttpService.post({
      url: STATS_SLOT_QUERY,
      loadingIn: '.analyze-table',
      params: {
        keys: [keyQuery],
        dimension: KEY_IP,
        timestamp: from_time,
        variables
      },
      onSuccess: (data) => {
        const keyMap = {
          [slotMap.IP_PAGE_DYNAMIC_20_COUNT]: 'url_top', // 访问页面
          [slotMap.IP_UA_20_COUNT]: 'ua_top', // UserAgent
          [slotMap.IP_DID_DYNAMIC_20_COUNT]: 'device_top', // 设备
          [slotMap.IP_USER_DYNAMIC_20_COUNT]: 'user_top', // USER
          [slotMap.IP_TAG_20_COUNT]: 'tag_top'
        };

        let tops = _.map(
          _.get(data.values, keyQuery),
          (variable, key) => {
            let title = '';
            let url = '';
            let order = 0;
            const value = _.get(variable, 'value');
            switch (key) {
              case slotMap.IP_PAGE_DYNAMIC_20_COUNT:
                title = '访问页面';
                url = '/analysis/page/';
                order = TABLE_ORDER.PAGE;
                break;
              case slotMap.IP_UA_20_COUNT:
                title = 'UserAgent';
                order = TABLE_ORDER.UA;
                break;
              case slotMap.IP_USER_DYNAMIC_20_COUNT:
                title = '关联用户';
                url = '/analysis/user/';
                order = TABLE_ORDER.USER;
                break;
              case slotMap.IP_DID_DYNAMIC_20_COUNT:
                title = '关联设备';
                url = '/analysis/did/';
                order = TABLE_ORDER.DID;
                break;
              case slotMap.IP_TAG_20_COUNT:
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

  dataZoomChange(param) {
    const {
      pages,
      dids,
      users,
      incidents,
      clicks
    } = this.state;

    const clickZoomData = clicks.slice(param.minIndex, param.maxIndex + 1);
    const pageZoomData = pages.slice(param.minIndex, param.maxIndex + 1);
    const didZoomData = dids.slice(param.minIndex, param.maxIndex + 1);
    const userZoomData = users.slice(param.minIndex, param.maxIndex + 1);
    const incidentZoomData = incidents.slice(param.minIndex, param.maxIndex + 1);

    this.setState({
      clickZoomData,
      pageZoomData,
      didZoomData,
      userZoomData,
      incidentZoomData
    });
  }

  render() {
    const {
      timestamp,
      tabIndex,
      keyword,
      clicks,
      scenes,
      tops,
      clickZoomData,
      pageZoomData,
      userZoomData,
      didZoomData,
      incidentZoomData,
      clickChart,
      trendChart,
      areas,
      location
    } = this.state;

    const {
      match: { params },
      history
    } = this.props;

    return (
      <div className="wd-ip-analyze container">
        <h1>
          <span
            onClick={() => history.push(`/analysis/${KEY_IP}?timestamp=${timestamp}`)}
            role="button"
            tabIndex="0"
          >IP风险分析</span>
          <i className="iconfont icon-right" />
          <span className="child">分析统计</span>

          <FormSearchInput
            className="analysis-search"
            placeholder="search for IP"
            placeholderWidth={90}
            keyword={keyword}
            onSubmit={value => this.handleKeywordSubmit(value)}
            onChange={value => this.setState({ keyword: value })}
          />
        </h1>

        <UserClickChart
          selected={timestamp}
          title="IP请求"
          hoverTitle={'IP请求数'}
          items={clicks}
          onChange={value => this.handleChange(value, 'timestamp')}
          onDataZoomChange={(param) => {
            this.dataZoomChange(param);
          }}
          bandChart={trendChart}
          getChartItem={(clickChartItem) => {
            this.setState({ clickChart: clickChartItem });
          }}
        />
        <RedqInfo keyType="ip" keyValue={decodeURIComponent(params.key)} location={location} />

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
                  userData={userZoomData}
                  didData={didZoomData}
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
              history.push(`/analysis/ip/clickStream/${encodeURIComponent(this.props.match.params.key)}?timestamp=${timestamp}`);
            }}
            role="presentation"
          >
            <i className="iconfont icon-arrowright" />
            <span>点击详情</span>
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

export default IPAnalysis;
