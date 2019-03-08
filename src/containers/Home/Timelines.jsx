import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import BCharts from 'BChart';
import _ from 'lodash';
import Paper from '../../components/Paper';
import './index.scss';

class Timelines extends Component {
  static propTypes = {
    alerts: PropTypes.oneOfType([PropTypes.array]),
    clicks: PropTypes.oneOfType([PropTypes.array]),
    onChange: PropTypes.func
  };
  static defaultProps = {
    alerts: [],
    clicks: [],
    onChange: undefined
  };

  shouldComponentUpdate(props) {
    const { alerts, clicks } = this.props;
    return (
      JSON.stringify(alerts) !== JSON.stringify(props.alerts) ||
      JSON.stringify(clicks) !== JSON.stringify(props.clicks)
    );
  }

  componentDidUpdate() {
    this.plot();
  }

  plot() {
    const { onChange, alerts, clicks } = this.props;

    const alertsChart = new BCharts('#alertsChart');
    const clicksChart = new BCharts('#clicksChart');

    alertsChart
      .setConfig({
        // 基本配置
        name: 'line',
        type: 'line',
        showPoint: false,
        color: '#F97869',
        data: alerts
      })
      .setFixedPadding({ left: 50 })
      .setXAxis({
        // x轴配置
        show: false,
        markCount: 4,
        gridLine: false
      })
      .setYAxis({
        // Y轴配置
        markCount: 5
      })
      .setHoverCursor(true)// 鼠标悬浮显示游标
      .setHoverText(params => [`风险名单数:${params.y}`, moment(Number(params.x)).format('YYYY.MM.DD HH:mm')])// 鼠标悬浮显示数据信息
      .setClickCursor([clicksChart], _.last(alerts))// 点击显示标尺
      .build();// 构建图表

    clicksChart
      .setConfig({
        // 基本配置
        name: 'bar',
        type: 'bar',
        data: clicks,
        onClick: (params) => {
          if (onChange) {
            onChange(
              moment(Number(params.value.x)).endOf('hour').valueOf()
            );
          }
        }
      })
      .setFixedPadding({ left: 50 })
      .setXAxis({
        // x轴配置
        gridLine: false,
        markCount: 4,
        textPos: 'left',
        format: x => moment(Number(x)).format('YYYY.MM.DD dddd')
      })
      .setYAxis({
        // Y轴配置
        markCount: 5
      })
      .setHoverCursor(true)// 鼠标悬浮显示游标
      .setHoverText(params => [`点击数:${parseInt(params.y, 10)}`, moment(Number(params.x)).format('YYYY.MM.DD HH:mm')])// 鼠标悬浮显示数据信息
      .setClickCursor([alertsChart], _.last(clicks))// 点击显示标尺
      .setDataZoom({
        // 数据区域
        type: 'fixed',
        freshTime: 'end',
        end: 100,
        width: 96,
        bind: alertsChart
      })
      .build();// 构建图表
  }

  render() {
    return (
      <Paper>
        <h2>
          风险名单数 VS 点击数
          <span className="legend"><i />风险名单数</span>
          <span className="legend"><i />点击数</span>
        </h2>
        <div className="warning-and-click">
          <div id="alertsChart" className="warning-chart" />
          <div id="clicksChart" className="click-chart" />
        </div>
      </Paper>
    );
  }
}

export default Timelines;
