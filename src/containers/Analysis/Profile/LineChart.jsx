import React, { Component } from 'react';
import PropTypes from 'prop-types';
import BCharts from 'BChart';
import moment from 'moment';

import './index.scss';

class LineChart extends Component {
  static propTypes = {
    dataList: PropTypes.oneOfType([PropTypes.array]).isRequired
  };

  // 用户主要访问地区来源
  static getTimeBar(dataList) {
    new BCharts('#visitLine')
    // 基本配置
      .setConfig({
        name: 'line',
        type: 'line',
        lineType: 'area',
        interpolate: 'monotone',
        showPoint: false,
        gradient: {
          type: 'vertical',
          // type: "horizontal",
          color: ['#22C3F7', '#7CDCCE']
        },
        lineWidth: '2px',
        data: dataList
      })
      // x轴配置
      .setXAxis({
        markCount: 7,
        textPos: 'left',
        format(x) {
          return moment(Number(x)).format('YYYY.MM.DD');
        }
      })
      // Y轴配置
      .setYAxis({
        markCount: 4
      })
      .setHoverText(params => [`访问次数:${parseInt(params.y, 10)}`, moment(Number(params.x)).format('YYYY.MM.DD HH:mm')])
      .build();// 构建图表
  }

  constructor(props) {
    super(props);

    this.state = {};
  }

  componentDidMount() {
    const {
      dataList
    } = this.props;

    LineChart.getTimeBar(dataList);
  }

  render() {
    return (
      <div id="visitLine" className="visit-line" />
    );
  }
}

export default LineChart;

