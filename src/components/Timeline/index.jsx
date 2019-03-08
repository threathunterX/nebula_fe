import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import BCharts from 'BChart';
import _ from 'lodash';

class Timeline extends Component {

  static contextTypes = {
    payload: PropTypes.any
  };

  componentDidMount() {
    const { payload } = this.context;
    const data = payload.data;

    const dataset = _.reduce(
      data,
      (result, value, key) => {
        result.push({
          x: key,
          y: value
        });
        return result;
      },
      []
    );

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
          self.setState({
            selected: moment(Number(params.value.x))
          });
          self.fetchRisks();
        }
      })
      // 鼠标悬浮显示游标
      .setHoverCursor(true)
      // 鼠标悬浮显示数据信息
      .setHoverText(params => JSON.stringify(params))
      // 点击显示标尺
      .setClickCursor(true, _.last(dataset))
      // x轴配置
      .setXAxis({
        textPos: 'left',
        markCount: 4 * 24,
        gridLine: false,
        format: x => moment(Number(x)).format('YYYY.MM.DD dddd')
      })
      // Y轴配置
      .setYAxis({
        markCount: 5,
        format: y => y
      })
      // 数据区域
      .setDataZoom({
        type: 'fixed',
        // type: "scalable",
        freshTime: 'end',
        start: dataset.length - (4 * 24),
        width: 20
        // end: 80
      })
      // 构建图表
      .build();
  }

  render() {
    return (
      <div id="rect" className="risks-bar-chart" />
    );
  }
}

export default Timeline;
