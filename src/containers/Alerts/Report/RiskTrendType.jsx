import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import BCharts from 'BChart';
import _ from 'lodash';

import './index.scss';

class RiskTrendType extends Component {
  static propTypes = {
    lineData: PropTypes.oneOfType([PropTypes.array]).isRequired,
    pieData: PropTypes.oneOfType([PropTypes.array]).isRequired
  };

  componentDidMount() {
    this.getLineChart();
    this.getPieChart();
  }

  getLineChart() {
    const { lineData } = this.props;
    const trendChart = new BCharts('#trendChart');
    trendChart
    // 基本配置
      .setConfig({
        name: 'line',
        type: 'line',
        lineType: 'area',
        showPoint: false,
        interpolate: 'monotone',
        lineWidth: 2,
        showTopInfo: true,
        topInfo: param => [`风险数：${param.y}`, moment(Number(param.x)).format('YYYY.MM.DD HH:mm')],
        gradient: {
          type: 'vertical',
          color: ['#FF5E76', '#22C3F7']
        },
        data: lineData,
        bottomMask: 25
      })
      .setFixedPadding({ top: 50, left: 0, right: 0, bottom: 0 })
      // x轴配置
      .setXAxis({
        markCount: 5,
        gridLine: false,
        textPos: 'left',
        position: 'top',
        format: x => moment(Number(x)).format('YYYY.MM.DD')
      })
      // Y轴配置
      .setYAxis({
        markCount: 5,
        textPos: 'inside',
        border: false,
        markType: 'all',
        format: x => x || ''
      })
      .build();
  }

  // 绘制饼图
  getPieChart() {
    const {
      pieData
    } = this.props;

    new BCharts('#pieChart')
      .setConfig({
        type: 'pie',
        data: pieData,
        autoSort: false,
        pinch: false,
        pieText: () => (
          pieData.length === 0 ?
            ['', ''] :
            [pieData[0].value, `${pieData[0].text}次数`]
        )
      })
      .setHoverText(param => param.text)
      .build();
  }

  render() {
    const { pieData } = this.props;

    const sum = _.sumBy(pieData, 'value');
    // console.log(sum, pieData);

    return (

      <div className="risk-trend-type">

        <div className="risk-trend">
          <h2>
            <span>风险名单趋势</span>

            <div className="legend">
              <i className="legend-icon" />
              <span>风险数</span>
            </div>
          </h2>
          <div id="trendChart" className="trend-chart" />
        </div>
        <div className="risk-type">
          <h2>风险类型分布</h2>

          <div className="pie-container">
            <div id="pieChart" className="pie-chart" />
            <div className="legend">
              {
                _.map(pieData, (item, key) => (
                  <div key={key} className="legend-item">
                    <i className="point" style={{ background: item.color }} />
                    <span>{item.text}</span>
                    <span className="percent">{`${((item.value * 100) / sum).toFixed(1)}%`}</span>
                  </div>
                ))
              }
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default RiskTrendType;
