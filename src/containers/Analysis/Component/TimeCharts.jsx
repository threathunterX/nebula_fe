import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import _ from 'lodash';
import BCharts from 'BChart';

import './index.scss';

class TimeCharts extends Component {
  static propTypes = {
    scatterData: PropTypes.oneOfType([PropTypes.array]).isRequired,
    selectedPoint: PropTypes.oneOfType([PropTypes.object]).isRequired,
    children: PropTypes.oneOfType([PropTypes.any]).isRequired,
    onReload: PropTypes.func.isRequired,
    onDataZoomChange: PropTypes.func.isRequired,
    onScatterClick: PropTypes.func.isRequired,
    visitStreamFrom: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    visitStreamTo: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    timestamp: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    barData: PropTypes.oneOfType([PropTypes.array])
  };
  static defaultProps = {
    barData: undefined
  };

  constructor(props) {
    super(props);

    this.state = {
      pointChart: {}
    };
  }

  componentDidUpdate(props) {
    const {
      barData,
      timestamp,
      scatterData,
      selectedPoint
    } = this.props;

    const {
      pointChart
    } = this.state;

    if (props.timestamp !== timestamp) {
      this.props.onReload();
    }

    const testdata = [];
    for (let i = 0; i < 120; i += 1) {
      testdata.push({
        x: i,
        y: Math.random() * 200,
        value: Math.random() * 10
      });
    }

    if (props.barData !== barData) {
      this.showBar(barData);
    }

    if (props.scatterData !== scatterData) {
      this.showPoint(scatterData);
    }

    // 选中散点
    if (pointChart.setPointSelected) {
      pointChart.setPointSelected(selectedPoint);
    }
  }

  // 柱形图
  showBar(barData) {
    const me = this;
    const {
      timestamp
    } = this.props;

    let start = 0;
    let end = 100;
    if (barData.length > 0) {
      let startTime = barData[0].x;
      let endTime = barData[barData.length - 1].x;

      startTime = barData[0].x;
      endTime = barData[barData.length - 1].x;

      const pos = (timestamp - startTime) / (endTime - startTime);
      // 根据选择的时间，确定选中的时间范围（start ~ end）
      start = pos - (1 / 12) < 0 ? 0 : pos - (1 / 12);
      start = start > 1 ? 1 : start;
      end = pos + (1 / 12) > 1 ? 1 : pos + (1 / 12);
      end = end < 0 ? 0 : end;
      // 判断选择时间范围是否有数据
      const dataSelect = _.find(barData, o => (
        o.x > timestamp - (5 * 60 * 1000) && o.x < timestamp + (5 * 60 * 1000)
        && o.y > 0
      ));

      // 如果时间范围内无数据，则选择最后一个有数据的时间范围
      if (dataSelect === undefined && (_.findIndex(barData, o => (o.y > 0)) >= 0)) {
        const lastIndex = _.findLastIndex(barData, o => (o.y > 0));
        end = lastIndex / (barData.length - 1);
        start = lastIndex >= 20 ? ((lastIndex - 20) / (barData.length - 1)) : 0;
      }
      // 更新图表后，刷新散点图数据
      if (this.props.onDataZoomChange) {
        const startIndex = start * (barData.length - 1);
        const endIndex = end * (barData.length - 1);
        this.props.onDataZoomChange({
          data: [barData[parseInt(startIndex, 10)], barData[parseInt(endIndex, 10)]]
        });
      }
      // 转化为百分比
      start *= 100;
      end *= 100;
    }

    // 初始化对象
    const barChart = new BCharts('#timeBar');
    barChart
    // 基本配置
      .setConfig({
        name: 'bar',
        type: 'bar',
        data: barData
      })
      // x轴配置
      .setXAxis({
        gridLine: false,
        show: false
      })
      // Y轴配置
      .setYAxis({
        markCount: 5
      })
      .setHoverText(params => [`点击数:${parseInt(params.y, 10)}`, moment(Number(params.x)).format('YYYY.MM.DD HH:mm')])// 鼠标悬浮显示数据信息
      .setChartProperty({
        type: 'dataZoom',
        start,
        end,
        warningLine: 1,
        onChange(data) {
          if (me.props.onDataZoomChange) {
            me.props.onDataZoomChange(data);
          }
        }
      })
      // 构建图表
      .build();
  }

  // 散点图
  showPoint(scatterData) {
    const me = this;
    const {
      visitStreamFrom,
      visitStreamTo
    } = this.props;

    // 初始化对象
    const pointChart = new BCharts('#timeChart');

    // 图
    pointChart
      .setConfig([{
        name: 'scatter',
        type: 'scatter',
        data: scatterData,
        onClick(param) {
          if (me.props.onScatterClick) {
            me.props.onScatterClick(param);
          }
        }
      }])
      // .setHoverText((params)=> JSON.stringify(params))
      .setXAxis({
        type: 'time',
        markCount: 11,
        markType: 'all',
        minValue: parseInt(visitStreamFrom, 10),
        maxValue: parseInt(visitStreamTo, 10),
        format: timestamp => moment(timestamp).format('HH:mm:ss')
      })
      .setYAxis({
        type: 'category',
        format: (param) => {
          if (param === null || param === undefined) {
            return 'null';
          }
          return param;
        }
      })
      .setScatterThreshold([{
        range: [1, ''],
        color: '#FB435F'
      }])
      .build();

    this.state.pointChart = pointChart;
  }

  render() {
    const {
      children
    } = this.props;

    return (
      <div className="analysis-time-chart">

        <div id="timeChart" className="chart-container" />
        <div id="timeBar" className="bar-container" />
        {children}
      </div>
    );
  }
}

export default TimeCharts;

