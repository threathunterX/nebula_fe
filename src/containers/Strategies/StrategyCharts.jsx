import React, { Component } from 'react';
import PropTypes from 'prop-types';
import BCharts from 'BChart';
import moment from 'moment';
import _ from 'lodash';
import HttpService, {
  STATS_SLOT_QUERY,
  STATS_OFFLINE_SERIAL
} from '../../components/HttpService';
import FetchSlotData, { slotMap, FillDefaultTimeLine } from '../../components/HttpService/FetchSlotData';

import {
  CATEGORY_VISITOR,
  CATEGORY_ACCOUNT,
  CATEGORY_TRANSACTION,
  CATEGORY_ORDER,
  CATEGORY_MARKETING,
  CATEGORY_OTHER
} from './constants';

import './index.scss';

// const API_STATISTICS_TOPS = 'platform/behavior/strategy_statistic';

class StrategyCharts extends Component {
  static propTypes = {
    tabItem: PropTypes.oneOfType([PropTypes.object]).isRequired,
    onSelectTab: PropTypes.func
  };

  static defaultProps = {
    onSelectTab: undefined
  };

  constructor(props) {
    super(props);

    const timestamp = moment().valueOf();

    this.state = {
      timestamp
    };
  }

  componentDidMount() {
    this.doFresh();
  }

  componentDidUpdate(props) {
    if (props.tabItem.key !== this.props.tabItem.key) {
      this.doFresh();
    }
  }

  // 选择tab
  onSelectTab(index) {
    const {
      onSelectTab,
      tabItem
    } = this.props;

    if (onSelectTab) {
      onSelectTab(index);
    }

    switch (tabItem.key) {
      // 支付风险
      case CATEGORY_TRANSACTION:
        // 获取支付风险
        this.fetchTransaction(index);
        break;
      default:
    }
  }

  // 访客风险
  fetchVisitor() {
    // 获取数据变量
    const var_list = [
      // 点击数
      slotMap.TOTAL_DYNAMIC_COUNT,
      // 风险数
      slotMap.TOTAL_INCIDENT_COUNT
    ];

    this.fetchData(var_list);
  }

  // 帐号风险
  fetchAccount() {
    // 获取数据变量
    const var_list = [
      slotMap.TOTAL_DYNAMIC_USER, // 关联用户数
      slotMap.TOTAL_INCIDENT_USER // 风险用户数
    ];

    this.fetchData(var_list);
  }

  // 订单风险
  fetchOrder() {
    // 获取数据变量
    const var_list = [
      slotMap.TOTAL_DYNAMIC_ORDER, // 关联订单数
      slotMap.TOTAL_ORDER_COUNT // 风险订单数
    ];

    this.fetchData(var_list);
  }

  // 支付风险
  fetchTransaction(index) {
    // 获取数据变量
    let var_list = [
      slotMap.TOTAL_TRANSACTION_COUNT, // 笔数
      slotMap.TOTAL_TRANSACTION_INCIDENT_COUNT // 风险笔数
    ];

    if (index === 0) {
      var_list = [
        slotMap.TOTAL_TRANSACTION_SUM, // 金额
        slotMap.TOTAL_TRANSACTION_INCIDENT_SUM // 风险金额
      ];
    }

    this.fetchData(var_list);
  }

  // 营销风险
  fetchMarketing() {
    // 获取数据变量
    const var_list = [
      slotMap.TOTAL_MARKETING_SUM, // 营销事件数
      slotMap.TOTAL_MARKETING_INCIDENT_SUM // 风险营销事件数
    ];

    this.fetchData(var_list);
  }

  // 获取折线图数据
  fetchData(var_list) {
    const timestamp = moment().valueOf();

    const from = moment(timestamp).startOf('hour').subtract(3, 'months').valueOf();

    const params = {
      key_type: 'total',
      from_time: from,
      end_time: timestamp,
      var_list
    };

    // 发送请求
    FetchSlotData({
      url: STATS_OFFLINE_SERIAL,
      loadingIn: '.trend-area-container,.click-chart',
      params,
      onSuccess: (result) => {
        const value = FillDefaultTimeLine(result.values, from, timestamp, var_list);

        // 蓝色折线
        const mainList = [];
        // 红色折线
        const redtList = [];

        value.forEach((item) => {
          mainList.push({
            x: item.time_frame,
            y: _.get(item[var_list[0]], 'value')
          });
          redtList.push({
            x: item.time_frame,
            y: _.get(item[var_list[1]], 'value')
          });
        });

        this.state.timestamp = Number(mainList[mainList.length - 1].x);
        this.fetchTops();

        this.linecharts([mainList, redtList]);
      }
    });
  }

  // 触发策略
  fetchTops() {
    const {
      timestamp
    } = this.state;

    HttpService.post({
      url: STATS_SLOT_QUERY,
      loadingIn: '#rect',
      params: {
        keys: [this.props.tabItem.key],
        dimension: 'other',
        timestamp: moment(timestamp).startOf('hour').valueOf(),
        variables: [slotMap.SCENE_VISIT_STRATEGY_20_COUNT]
      },
      onSuccess: (data) => {
        const {
          values
        } = data;
        const dataset = [];
        const strategeCount = _.get(values, `${this.props.tabItem.key}.${slotMap.SCENE_VISIT_STRATEGY_20_COUNT}.value`, []);
        strategeCount.forEach((item) => {
          dataset.push({
            x: item.value,
            y: item.key
          });
        });
        // 柱形图
        this.barcharts(dataset);
      }
    });
  }

  barcharts(dataset) {
    // 初始化柱形图对象
    const barChart = new BCharts('#rect');
    // 绘制柱形图
    barChart
    // 基本配置
      .setConfig({
        name: 'bar',
        type: 'bar',
        data: dataset,
        onClick: (params) => {
          window.open(`/#/alerts?timestamp=${this.state.timestamp}&strategy=${_.get(params, 'value.y')}`);
        }
      })
      // 鼠标悬浮显示游标
      .setHoverCursor(true)
      // 鼠标悬浮显示数据信息
      .setHoverText(params => [`策略触发数:${parseInt(params.x, 10)}`, params.y])
      // x轴配置
      .setXAxis({
        type: 'value',
        // textPos: "left",
        markCount: 7,
        markType: 'end'
      })
      // Y轴配置
      .setYAxis({
        type: 'category',
        gridLine: false
      })
      // 构建图表
      .build();
  }

  linecharts(dataList) {
    // 初始化柱形图对象
    const lineChart = new BCharts('#line');
    // 绘制柱形图
    lineChart
    // 基本配置
      .setConfig([{
        name: this.props.tabItem.mainTitle,
        type: 'line',
        lineType: 'area',
        showPoint: false,
        data: dataList[0]
      }, {
        name: this.props.tabItem.redTitle,
        type: 'line',
        lineType: 'area',
        showPoint: false,
        color: '#FB435F',
        data: dataList[1]
      }])
      // 鼠标悬浮显示游标
      .setHoverCursor(true)
      .setHoverTitle(params => moment(Number(params.x)).format('YYYY.MM.DD HH:mm'))
      // 鼠标悬浮显示数据信息
      .setHoverText(params => `${params.name}:${parseInt(params.y, 10)}`)
      // 点击显示标尺
      .setClickCursor(true, dataList[0][dataList[0].length - 1], (param) => {
        this.state.timestamp = Number(param.value.x);
        this.fetchTops();
      })
      // x轴配置
      .setXAxis({
        boundaryGap: false,
        markCount: 4,
        textPos: 'left',
        format: x => moment(Number(x)).format('YYYY.MM.DD dddd')
      })
      // Y轴配置
      .setYAxis({
        markCount: 7
      })
      // 数据区域
      .setDataZoom({
        type: 'fixed',
        end: 100,
        width: 96,
        dataIndex: 1
      })
      // 构建图表
      .build();
  }

  doFresh() {
    // 清空图表
    this.barcharts([]);
    this.linecharts([[], []]);

    switch (this.props.tabItem.key) {
      // 访客
      case CATEGORY_VISITOR:
        this.fetchVisitor();
        break;
      // 帐号
      case CATEGORY_ACCOUNT:
        this.fetchAccount();
        break;
      // 订单
      case CATEGORY_ORDER:
        this.fetchOrder();
        break;
      // 支付
      case CATEGORY_TRANSACTION:
        this.fetchTransaction();
        break;
      // 营销
      case CATEGORY_MARKETING:
        this.fetchMarketing();
        break;
      // 其他
      case CATEGORY_OTHER:
      default:
        break;
    }
  }

  render() {
    const {
      headTab,
      selectIndex,
      mainTitle,
      redTitle
    } = this.props.tabItem;

    return (
      <div className="charts-container">
        <div className="strategies-bar-charts">
          <h3>
            <div className="chart-title">
              <i className="main-point" />
              <span>策略触发数</span>
            </div>
          </h3>
          <div id="rect" />
        </div>
        <div className="strategies-line-charts">
          <h3>
            {
              headTab ? (
                <div className="chart-tab">
                  <button
                    className={`tab-item${selectIndex === 0 ? ' active' : ''}`}
                    onClick={() => {
                      this.onSelectTab(0);
                    }}
                  >
                    {headTab[0]}
                  </button>
                  <button
                    className={`tab-item${selectIndex === 1 ? ' active' : ''}`}
                    onClick={() => {
                      this.onSelectTab(1);
                    }}
                  >
                    {headTab[1]}
                  </button>
                </div>
              ) : null
            }
            <div className="chart-title">
              <i className="main-point" />
              <span>{headTab ? mainTitle[selectIndex] : mainTitle}</span>
              <i className="red-point" />
              <span>{headTab ? redTitle[selectIndex] : redTitle}</span>
            </div>
          </h3>
          <div id="line" />
        </div>
      </div>
    );
  }
}

export default StrategyCharts;
