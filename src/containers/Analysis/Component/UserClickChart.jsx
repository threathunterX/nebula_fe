import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import BCharts from 'BChart';
import _ from 'lodash';
import './index.scss';

class UserClickChart extends Component {
  static propTypes = {
    items: PropTypes.oneOfType([PropTypes.array]).isRequired,
    selected: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
    hoverTitle: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    getChartItem: PropTypes.func,
    onDataZoomChange: PropTypes.func,
    bandChart: PropTypes.oneOfType([PropTypes.array])
  };
  static defaultProps = {
    bandChart: undefined,
    onDataZoomChange: undefined,
    getChartItem: undefined
  };

  constructor(props) {
    super(props);

    this.state = {
      getChart: false,
      clickDefault: this.props.items,
      bandChart: this.props.bandChart
    };
  }

  componentDidUpdate() {
    const { items, bandChart } = this.props;

    if (
      items.length > 0 &&
      (items !== this.state.clickDefault || bandChart !== this.state.bandChart)
    ) {
      this.state.clickDefault = items;
      this.state.bandChart = bandChart;
      this.renderChart();
    }
  }

  renderChart() {
    const { selected, items, onChange, getChartItem, hoverTitle } = this.props;
    let {
      bandChart
    } = this.props;

    if (bandChart === undefined) {
      bandChart = true;
    }

    // 初始化柱形图对象
    const clickChart = new BCharts('#clickCountChart');

    if (!this.state.getChart) {
      this.state.getChart = true;
      if (getChartItem) {
        getChartItem(clickChart);
      }
    }

    const curObj = _.find(items, { x: moment(Number(selected)).startOf('hour').valueOf() });
    const curIndex = _.findIndex(items, { x: moment(Number(selected)).startOf('hour').valueOf() });
    const pos = Math.ceil((curIndex / items.length) * 100);

    clickChart
    // 基本配置
      .setConfig({
        name: 'bar',
        type: 'bar',
        data: items,
        onClick: (params) => {
          if (onChange) {
            onChange(
              moment(Number(params.value.x)).endOf('hour').valueOf()
            );
          }
        }
      })
      // x轴配置
      .setXAxis({
        gridLine: false,
        markCount: 4,
        textPos: 'left',
        format: x => moment(Number(x)).format('YYYY.MM.DD dddd')
      })
      // Y轴配置
      .setYAxis({
        markCount: 5
      })
      // 鼠标悬浮显示游标
      .setHoverCursor(true)
      // 鼠标悬浮显示数据信息
      .setHoverText(params => [`${hoverTitle || '请求数'}:${parseInt(params.y, 10)}`, moment(Number(params.x)).format('YYYY.MM.DD HH:mm')])
      // 点击显示标尺
      .setClickCursor(bandChart, curObj)
      // 数据区域
      .setDataZoom({
        type: 'fixed',
        freshTime: 'end',
        end: pos,
        width: 96,
        onChange: (param) => {
          if (this.props.onDataZoomChange) {
            this.props.onDataZoomChange(param);
          }
        }
      })
      // 构建图表
      .build();
  }

  render() {
    const title = this.props.title;

    return (
      <div className="click-chart loader">
        <h2>{title || '点击'}</h2>

        <div id="clickCountChart" className="chart-container" />
      </div>
    );
  }
}

export default UserClickChart;

