import React, { Component } from 'react';
import PropTypes from 'prop-types';
import BCharts from 'BChart';
import _ from 'lodash';

import GeoMap from '../../../components/util/GeoMap';
import './index.scss';

class LocateInfo extends Component {
  static propTypes = {
    dataList: PropTypes.oneOfType([PropTypes.object]).isRequired
  };

  // 绘制地图
  static showMapChart(data) {
    new BCharts('#areasChart')
      .setConfig({
        name: 'map',
        type: 'map-scatter',
        pointSize: 10,
        data
      })
      .setHoverText(params => params.orgData[3])
      .setGeoJson('map-json/china.json')
      .setMapThreshold({
        type: 'range',
        value: 3,
        color: '#F97869',
        animation: true
      })
      .build();
  }

  constructor(props) {
    super(props);

    this.state = {};
  }

  componentDidMount() {
    const data = _.map(
      this.props.dataList,
      (value, key) => ([..._.get(GeoMap, key, [0, 0]), value, key])
    );

    LocateInfo.showMapChart(data);
  }

  render() {
    return (
      <div className="map-container">
        <div className="map-title">常用登录地区</div>
        <div id="areasChart" className="areas-chart" />
      </div>
    );
  }
}

export default LocateInfo;
