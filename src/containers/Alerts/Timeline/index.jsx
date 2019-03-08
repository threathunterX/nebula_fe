import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import BCharts from 'BChart';
import _ from 'lodash';

class Timeline extends Component {
  static propTypes = {
    items: PropTypes.oneOfType([PropTypes.array]).isRequired,
    onChange: PropTypes.func.isRequired,
    selected: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired
  };

  componentDidUpdate(props) {
    const { items, selected } = this.props;

    if (items !== props.items || selected !== props.selected) {
      this.plot(items);
    }
  }

  plot(data) {
    const { onChange, selected } = this.props;

    this.chart = new BCharts('#clickCountChart');
    this.chart
      .setConfig({
        // 基本配置
        name: 'bar',
        type: 'bar',
        data,
        onClick: (params) => {
          onChange(moment(Number(params.value.x)).endOf('hour').valueOf());
        }
      })
      .setXAxis({
        // x轴配置
        gridLine: false,
        textPos: 'left',
        markCount: 4,
        format: x => moment(Number(x)).format('YYYY.MM.DD dddd')
      })
      .setYAxis({
        markCount: 5// Y轴配置
      })
      .setHoverCursor(true)// 鼠标悬浮显示游标
      .setHoverText(params => [`风险名单数:${parseInt(params.y, 10)}`, moment(Number(params.x)).format('YYYY.MM.DD HH:mm')])// 鼠标悬浮显示数据信息
      .setClickCursor(true, _.find(data, { x: moment(Number(selected)).startOf('hour').valueOf() }))// 点击显示标尺
      .setDataZoom({
        // 数据区域
        type: 'fixed',
        freshTime: 'end',
        end: 100,
        width: 96
      })
      .build();// 构建图表
  }

  render() {
    return (
      <div className="chart loader">
        <h2>风险名单数</h2>
        <div id="clickCountChart" className="chart-container" />
      </div>
    );
  }
}

export default Timeline;
