import React, { Component } from 'react';
import BCharts from 'BChart';
import moment from 'moment';
import _ from 'lodash';

import HttpService, {
  STATS_OFFLINE_SERIAL
} from '../../components/HttpService';
import FetchSlotData, { slotMap, FillDefaultTimeLine } from '../../components/HttpService/FetchSlotData';
import './index.scss';

const API_STATISTICS_ALERTS = 'platform/alarm/statistics';

class Charts extends Component {

  static showBar(clicks) {
    const clicksChart = new BCharts('#bar');
    clicksChart
    // 基本配置
      .setConfig({
        name: 'bar',
        type: 'bar',
        data: clicks
      })
      .setFixedPadding({ left: 50, top: 0 })
      // x轴配置
      .setXAxis({
        show: false,
        gridLine: false,
        markCount: 4
      })
      // Y轴配置
      .setYAxis({
        markCount: 4
      })
      .build();// 构建图表
  }

  static showLine(alerts) {
    const alertsChart = new BCharts('#line');
    alertsChart
    // 基本配置
      .setConfig({
        name: 'line',
        type: 'line',
        lineType: 'area',
        showPoint: false,
        interpolate: 'monotone',
        gradient: {
          type: 'horizontal',
          color: ['#22C3F7', '#7CDCCE']
        },
        data: alerts
      })
      .setFixedPadding({ left: 50 })
      // x轴配置
      .setXAxis({
        markCount: 4,
        gridLine: false,
        textPos: 'left',
        format: x => moment(Number(x)).format('YYYY.MM.DD dddd')
      })
      // Y轴配置
      .setYAxis({
        markCount: 5
      })
      .build();// 构建图表
  }

  // 获取“风险名单数”、“点击数”
  static fetchTimelines(flag) {
    const to = moment().valueOf();
    const from = moment(to)
      .startOf('hour')
      .subtract(5, 'days')
      .valueOf();

    HttpService.get({
      url: API_STATISTICS_ALERTS,
      loadingIn: flag ? '#line' : false,
      params: {
        fromtime: from,
        endtime: to
      },
      onSuccess: (result) => {
        const data = result.slice(result.length - 96, result.length);

        const alerts = _.map(data, (item) => {
          const { time_frame, production_count, test_count } = item;
          return { x: time_frame, y: production_count + test_count };
        });

        Charts.showLine(alerts);
      }
    });

    // 获取数据变量
    const var_list = [
      // 点击数
      slotMap.TOTAL_DYNAMIC_COUNT
    ];

    // 发送请求
    FetchSlotData({
      url: STATS_OFFLINE_SERIAL,
      loadingIn: flag ? '#bar' : false,
      params: {
        key_type: 'total',
        from_time: from,
        end_time: to,
        var_list
      },
      onSuccess: (result) => {
        let value = FillDefaultTimeLine(result.values, from, to, var_list);

        value = value.slice(value.length - 96, value.length);
        // 格式化点击数
        const clicks = _.map(value, item => ({
          x: item.time_frame,
          y: _.get(item[slotMap.TOTAL_DYNAMIC_COUNT], 'value')
        }));

        Charts.showBar(clicks);
      }
    });
  }

  componentDidMount() {
    Charts.fetchTimelines(true);

    setInterval(() => {
      Charts.fetchTimelines(false);
    }, 1000 * 60);
  }

  render() {
    return (
      <div className="strategies-trend-container">
        <h2>风险趋势－最近4天 </h2>

        <div className="charts-container">
          <div id="line" className="line" />
          <div id="bar" className="bar" />
        </div>
      </div>
    );
  }
}

export default Charts;
