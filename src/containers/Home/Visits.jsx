import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import BCharts from 'BChart';

import Paper from '../../components/Paper';

class Visits extends Component {
  static propTypes = {
    items: PropTypes.oneOfType([PropTypes.array])
  };
  static defaultProps = {
    items: []
  };

  static plot(data) {
    new BCharts('#visits_chart')
      .setConfig({
        // 基本配置
        name: 'line',
        type: 'line',
        lineType: 'area',
        interpolate: 'monotone',
        showPoint: false,
        data
      })
      .setXAxis({
        // x轴配置
        gridLine: false,
        show: false,
        border: false
      })
      .setYAxis({
        // Y轴配置
        gridLine: false,
        show: false,
        border: false
      })
      .setHoverText(params => [`访问量:${parseInt(params.y, 10)}`, moment(Number(params.x)).format('YYYY.MM.DD HH:mm')], { posFree: true })
      .build();// 构建图表
  }

  shouldComponentUpdate(props) {
    const { items } = this.props;
    return (
      JSON.stringify(items) !== JSON.stringify(props.items)
    );
  }

  componentDidUpdate() {
    const { items } = this.props;

    Visits.plot(items);
  }

  render() {
    return (
      <Paper>
        <h2>网络访问量<span className="tag">每五分钟</span></h2>
        <div id="visits_chart" style={{ height: '67px' }} />
      </Paper>
    );
  }
}

export default Visits;
