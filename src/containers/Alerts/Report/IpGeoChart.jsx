import React, { Component } from 'react';
import PropTypes from 'prop-types';
import BCharts from 'BChart';
import _ from 'lodash';

import GetColor from '../../../components/util/GetColor';

import './index.scss';

class IpGeoChart extends Component {
  static propTypes = {
    barData: PropTypes.oneOfType([PropTypes.array]).isRequired
  };

  // 用户主要访问地区来源
  static getGeoBar(dataList) {
    new BCharts('#geoBarChart')
    // 基本配置
      .setConfig({
        name: 'bar',
        type: 'bar',
        data: dataList,
        color: '#525E7F',
        barWidth: 0.4
      })
      // x轴配置
      .setXAxis({
        gridLine: false
      })
      // Y轴配置
      .setYAxis({
        markType: 'all',
        markCount: 4
      })
      // 构建图表
      .build();
  }

  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    const {
      barData
    } = this.props;

    // 格式化数据
    const formatData = _.map(barData, (item, index) => {
      if (index === 0) {
        return Object.assign(item, { color: ['#FF5E76', '#22C3F7'] });
      } else if (index === 1) {
        // 计算渐变颜色
        const startColor = GetColor('#FF5E76', '#22C3F7', barData[1].y / barData[0].y);
        return Object.assign(item, { color: [startColor, '#22C3F7'] });
      }
      return item;
    });

    IpGeoChart.getGeoBar(formatData);
  }

  render() {
    return (

      <div className="ip-geo">
        <h2>风险IP地理位置</h2>

        <div id="geoBarChart" className="ip-geo-chart" />
      </div>
    );
  }
}

export default IpGeoChart;
