import React, { Component } from 'react';
import PropTypes from 'prop-types';
import BCharts from 'BChart';

import Paper from '../../components/Paper';
import './index.scss';

class Areas extends Component {
  static propTypes = {
    items: PropTypes.oneOfType([PropTypes.array]).isRequired,
    timestamp: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
    onReload: PropTypes.func.isRequired
  };

  static plot(data) {
    new BCharts('#areasChart')
      .setConfig({
        name: 'map',
        type: 'map-scatter',
        pointSize: 10,
        // zoom: true,
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

  componentDidMount() {
    const { items = [] } = this.props;
    console.log(items)
    Areas.plot(items);
  }

  shouldComponentUpdate(props) {
    return (
      this.props.timestamp !== props.timestamp ||
      JSON.stringify(this.props.items) !== JSON.stringify(props.items)
    );
  }

  componentDidUpdate(props) {
    const { timestamp, items, onReload } = this.props;

    if (timestamp !== props.timestamp) {
      onReload();
    }

    if (JSON.stringify(this.props.items) !== JSON.stringify(props.items)) {
      Areas.plot(items);
    }
  }

  render() {
    return (
      <Paper>
        <h2>风险区域分布</h2>
        <div id="areasChart" className="warning-area warning-load" />
      </Paper>
    );
  }
}

export default Areas;
