import React, { Component } from 'react';
import PropTypes from 'prop-types';
import BCharts from 'BChart';
import _ from 'lodash';

import './index.scss';

class LineChart extends Component {
  static propTypes = {
    dataList: PropTypes.oneOfType([PropTypes.array]).isRequired
  };

  // 用户主要访问地区来源
  static getTimeBar(dataList) {
    new BCharts('#timeBar')
      // 基本配置
      .setConfig({
        name: 'bar',
        type: 'bar',
        data: dataList,
        barWidth: 0.4
      })
      // x轴配置
      .setXAxis({
        gridLine: false,
        format(x) {
          return `${x}:00`;
        }
      })
      // Y轴配置
      .setYAxis({
        markCount: 4
      })
      // 鼠标悬浮显示游标
      .setHoverCursor(true)
      // 鼠标悬浮显示数据信息
      .setHoverText(params => [`访问次数: ${params.y}次`, `${params.x}:00`])
      // 构建图表
      .build();
  }

  constructor(props) {
    super(props);

    this.state = {};
  }

  componentDidMount() {
    const {
      dataList
    } = this.props;

    // 初始化数据
    let formatData = [
      { x: '00', y: 0 },
      { x: '01', y: 0 },
      { x: '02', y: 0 },
      { x: '03', y: 0 },
      { x: '04', y: 0 },
      { x: '05', y: 0 },
      { x: '06', y: 0 },
      { x: '07', y: 0 },
      { x: '08', y: 0 },
      { x: '09', y: 0 },
      { x: '10', y: 0 },
      { x: '11', y: 0 },
      { x: '12', y: 0 },
      { x: '13', y: 0 },
      { x: '14', y: 0 },
      { x: '15', y: 0 },
      { x: '16', y: 0 },
      { x: '17', y: 0 },
      { x: '18', y: 0 },
      { x: '19', y: 0 },
      { x: '20', y: 0 },
      { x: '21', y: 0 },
      { x: '22', y: 0 },
      { x: '23', y: 0 }
    ];

    // 数据补全
    formatData = _.map(formatData, (item) => {
      const data = _.filter(dataList, o => o.x === item.x);
      return data.length ? data[0] : item;
    });

    LineChart.getTimeBar(formatData);
  }

  render() {
    return (
      <div className="line-chart-container">
        <div className="title">
          <span className="label">最近30天</span>
        </div>
        <div id="timeBar" className="time-bar" />
        <div className="mark-container">
          <i className="mark-item" />
          <span>用户访问时间偏好</span>
        </div>
      </div>
    );
  }
}

export default LineChart;

