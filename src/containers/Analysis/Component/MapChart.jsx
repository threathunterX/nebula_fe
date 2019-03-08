import React, { Component } from 'react';
import PropTypes from 'prop-types';
import BCharts from 'BChart';

import './index.scss';

class MapChart extends Component {
  static propTypes = {
    pointData: PropTypes.oneOfType([PropTypes.array])
  };
  static defaultProps = {
    pointData: []
  };

  componentDidUpdate() {
    this.showWarningArea();
  }

  showWarningArea() {
    const {
      pointData
    } = this.props;

    const warningArea = new BCharts('#warningArea');
    warningArea
      .setConfig({
        name: 'map',
        type: 'map-scatter',
        pointSize: 10,
        data: pointData
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

  render() {
    return (
      <div className="analysis-map-chart">
        <div id="warningArea" />
      </div>
    );
  }
}

export default MapChart;

