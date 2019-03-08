import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import _ from 'lodash';
import BCharts from 'BChart';

import './index.scss';

class TrendChart extends Component {
  static propTypes = {
    barData: PropTypes.oneOfType([PropTypes.array]).isRequired,
    getChartItem: PropTypes.func.isRequired,
    onBarClick: PropTypes.func.isRequired,
    bandChart: PropTypes.oneOfType([PropTypes.object]),
    nameData: PropTypes.oneOfType([PropTypes.array]),
    pageData: PropTypes.oneOfType([PropTypes.array]),
    ipData: PropTypes.oneOfType([PropTypes.array]),
    userData: PropTypes.oneOfType([PropTypes.array]),
    didData: PropTypes.oneOfType([PropTypes.array]),
    eventData: PropTypes.oneOfType([PropTypes.array])
  };
  static defaultProps = {
    bandChart: undefined,
    nameData: undefined,
    pageData: undefined,
    ipData: undefined,
    userData: undefined,
    didData: undefined,
    eventData: undefined
  };

  // 批量处理图表
  static dealCharts(dataList) {
    const chartList = [];

    dataList.forEach((item) => {
      const chart = new BCharts(`#${item.id}`);
      chartList.push(chart);
    });
    return chartList;
  }

  constructor(props) {
    super(props);
    this.state = {
      getChart: false,
      dataList: [],
      isbind: false
    };
  }

  componentDidUpdate(props) {
    const {
      barData,
      bandChart,
      nameData,
      getChartItem
    } = this.props;

    const {
      dataList,
      isbind,
      getChart
    } = this.state;

    if (barData === props.barData && isbind) {
      return;
    }
    if (nameData && nameData.length === 0) {
      return;
    }

    if (bandChart) {
      this.state.isbind = true;
    }

    const chartList = TrendChart.dealCharts(dataList);

    const barChart = new BCharts('#barChart');
    chartList.push(barChart);

    if (!getChart && chartList.length >= 4) {
      this.state.getChart = true;
      if (getChartItem) {
        getChartItem(chartList);
      }
    }

    dataList.forEach((item, i) => {
      // 绘制图表
      this.showChart(
        item,
        chartList[i],
        ...chartList.slice(0, i),
        ...chartList.slice(i + 1),
        bandChart
      );
    });

    this.showBar(barData, barChart, ...chartList.slice(0, chartList.length - 1), bandChart);
  }

  showChart(dataItem, theChart, ...chats) {
    const bandChart = this.props.bandChart;

    theChart
    // 基本配置
      .setConfig({
        name: dataItem.id,
        type: 'line',
        data: dataItem.data,
        color: dataItem.color,
        showPoint: false
      })
      // x轴配置
      .setXAxis({
        show: false,
        gridLine: false
      })
      // Y轴配置
      .setYAxis({
        markCount: 3
      })
      .setFixedPadding({ left: 50 })
      // 鼠标悬浮显示游标
      .setHoverCursor(true)
      // 鼠标悬浮显示数据信息
      .setHoverText(params => [`${dataItem.name}:${parseInt(params.y, 10)}`, moment(Number(params.x)).format('YYYY.MM.DD HH:mm')])
      // 点击显示标尺
      .setClickCursor(chats, bandChart ? bandChart.defaultCursor : undefined)
      // 构建图表
      .build();
  }

  // 风险事件
  showBar(dataset, barChart, ...chats) {
    const { onBarClick, bandChart } = this.props;

    barChart
    // 基本配置
      .setConfig({
        name: 'bar',
        type: 'bar',
        data: dataset,
        onClick: (params) => {
          if (onBarClick) {
            onBarClick(
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
      .setFixedPadding({ left: 50 })
      // 鼠标悬浮显示游标
      .setHoverCursor(true)
      // 鼠标悬浮显示数据信息
      .setHoverText(params => [`用户点击数:${parseInt(params.y, 10)}`, moment(Number(params.x)).format('YYYY.MM.DD HH:mm')])
      // 点击显示标尺
      .setClickCursor(chats, bandChart ? bandChart.defaultCursor : undefined)
      // 构建图表
      .build();
  }


  render() {
    const {
      pageData,
      ipData,
      userData,
      didData,
      nameData,
      eventData
    } = this.props;

    const orgDataList = [pageData, ipData, userData, didData, nameData, eventData];
    const dataList = [];
    let count = 0;

    orgDataList.forEach((data, index) => {
      if (data) {
        count += 1;
        let id = '';
        let name = '';
        let className = '';
        let color = '';
        switch (index) {
          case 0:
            id = 'pageChart';
            name = '关联页面';
            className = 'page-point';
            color = '#FF5E76';
            break;
          case 1:
            id = 'ipChart';
            name = '关联IP';
            className = 'ip-point';
            color = '#22C3F7';
            break;
          case 2:
            id = 'userChart';
            name = '关联用户';
            className = 'user-point';
            color = '#F97869';
            break;
          case 3:
            id = 'didChart';
            name = '关联设备';
            className = 'did-point';
            color = '#7CDCCE';
            break;
          case 4:
            id = 'nameChart';
            name = '风险名单数';
            className = 'name-point';
            color = '#FFEF7D';
            break;
          case 5:
            id = 'eventChart';
            name = '风险事件数';
            className = 'event-point';
            color = '#906EC8';
            break;
          default:
        }
        dataList.push({
          id,
          name,
          color,
          className,
          data
        });
      }
    });

    this.state.dataList = dataList;

    return (
      <div className="analysis-trend-chart">
        <div className="analysis-chart-tip">
          {
            _.map(dataList.reverse(), (value, key) => (
              value.data ?
                <div key={key}>
                  <i className={value.className} />
                  <span>{value.name}</span>
                </div> :
                ''
            ))
          }
        </div>
        {
          _.map(dataList.reverse(), (value, key) => (
            value.data ?
              <div
                key={key}
                id={value.id}
                className="chart-container"
                style={count === 3 ? {} : { height: '72px' }}
              /> :
              ''
          ))
        }
        <div id="barChart" style={count === 3 ? {} : { height: '72px' }} className="chart-container" />
      </div>
    );
  }
}

export default TrendChart;

