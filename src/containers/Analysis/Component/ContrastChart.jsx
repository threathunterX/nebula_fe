import React, { Component } from 'react';
import PropTypes from 'prop-types';
import BCharts from 'BChart';

import './index.scss';

class ContrastChart extends Component {
  static propTypes = {
    dataList: PropTypes.oneOfType([PropTypes.array]).isRequired,
    onClick: PropTypes.func.isRequired,
    mainCol: PropTypes.string.isRequired,
    redCol: PropTypes.string.isRequired
  };

  componentDidUpdate() {
    this.showChart(this.props.dataList[1], this.props.dataList[0]);
  }

  showChart(mainData, redData) {
    const contrastChart = new BCharts('#contrastChart');

    let mainMax = 0;
    let redMax = 0;
    if (mainData) {
      mainData.forEach((v) => {
        if (v.y > mainMax) {
          mainMax = v.y;
        }
      });
    }
    if (redData) {
      redData.forEach((v) => {
        if (v.y > redMax) {
          redMax = v.y;
        }
      });
    }

    contrastChart
      .setConfig([{
        name: 'bar',
        type: 'bar',
        data: mainData,
        barSplit: 1,
        yAxis: 1,
        onClick: (param) => {
          if (this.props.onClick) {
            this.props.onClick(param);
          }
        }
      }, {
        name: 'bar2',
        type: 'bar',
        barSplit: 1,
        color: '#FF5E76',
        data: redData,
        onClick: (param) => {
          if (this.props.onClick) {
            this.props.onClick(param);
          }
        }
      }])
      .setHoverCursor(true)
      .setHoverText(params => `${params.x}: ${params.y}`)
      .setXAxis([{
        show: false,
        gridLine: false
      }])
      .setYAxis([{
        markCount: 10,
        markType: 'all',
        maxValue: (redMax * 2) + (redMax * 0.02)
      }, {
        flip: true,
        position: 'right',
        markType: 'all',
        markCount: 10,
        maxValue: (mainMax * 2) + (mainMax * 0.02)
      }])
      .build();
  }

  render() {
    const {
      mainCol,
      redCol
    } = this.props;

    return (

      <div className="analysis-contrast-chart">
        <h2>
          <div className="analysis-chart-tip">
            <div>
              <i className="data-main-point" />
              <span>{mainCol}</span>
            </div>
            <div>
              <i className="data-red-point" />
              <span>{redCol}</span>
            </div>
          </div>
        </h2>
        <div id="contrastChart" className="contrast-chart" />
      </div>
    );
  }
}

export default ContrastChart;

