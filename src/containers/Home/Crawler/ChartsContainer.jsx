import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import moment from 'moment';
import BChart from 'BChart';

import GetColor from '../../../components/util/GetColor';
import EasyToast from '../../../components/EasyToast';
import ChartHoverText from './ChartHoverText';

class ChartsContainer extends Component {
  static propTypes = {
    barChartData: PropTypes.objectOf(PropTypes.array).isRequired,
    delayData: PropTypes.arrayOf(PropTypes.object).isRequired,
    uploadData: PropTypes.arrayOf(PropTypes.object).isRequired,
    treeMapData: PropTypes.arrayOf(PropTypes.object).isRequired,
    uri_stem: PropTypes.string.isRequired,
    current_day: PropTypes.number.isRequired
  };

  constructor(props) {
    super(props);

    const {
      current_day
    } = this.props;

    const curDay = moment(current_day).format('YYYY.MM.DD');

    this.state = {
      curDay,
      display: 'none',
      top: 0,
      left: 0,
      selectedIndex: 0
    };
  }

  componentDidMount() {
    this.updateCharts();
  }

  shouldComponentUpdate(props, state) {
    return (
      JSON.stringify(this.props) !== JSON.stringify(props) ||
      JSON.stringify(this.state) !== JSON.stringify(state)
    );
  }

  componentDidUpdate(props) {
    const {
      barChartData,
      delayData,
      uploadData,
      treeMapData
    } = this.props;

    if (barChartData !== props.barChartData ||
      delayData !== props.delayData ||
      uploadData !== props.uploadData ||
      treeMapData !== props.treeMapData) {
      this.updateCharts();
    }
  }

  // 监听鼠标事件
  onMouseMove(e) {
    const container = e.currentTarget.getBoundingClientRect();
    const itemWidth = container.width / 24;

    const selectedIndex = Math.floor((e.clientX - container.left) / itemWidth);

    let top = e.clientY;
    let left = e.clientX;
    if (top + 240 > window.innerHeight) {
      top = e.clientY - 240;
    }
    if (left + 200 > window.innerWidth) {
      left = e.clientX - 200;
    }
    this.setState({
      display: 'block',
      top: `${top}px`,
      left: `${left}px`,
      selectedIndex
    });
  }

  onMouseOut() {
    this.setState({
      display: 'none'
    });
  }

  // 更新图表数据
  updateCharts() {
    const statusChart = new BChart('#status');
    const uploadChart = new BChart('#upload');
    const delayChart = new BChart('#delay');
    const crawlerRequestChart = new BChart('#crawlerRequest');

    statusChart
      .setHoverCursor([uploadChart, delayChart, crawlerRequestChart]);
    uploadChart
      .setHoverCursor([statusChart, delayChart, crawlerRequestChart]);
    delayChart
      .setHoverCursor([statusChart, uploadChart, crawlerRequestChart]);
    crawlerRequestChart
      .setHoverCursor([statusChart, uploadChart, delayChart]);

    this.showCrawlerRequestChart(crawlerRequestChart);

    this.showDelayChart(delayChart);

    this.showUploadChart(uploadChart);

    this.showTreeMapChart(statusChart);
  }

  showCrawlerRequestChart(crawlerRequestChart) {
    const {
      barChartData
    } = this.props;

    const {
      requestData,
      crawlerData
    } = barChartData;

    const maxValue = _.get(_.maxBy(requestData, o => o.y), 'y', 0);
    // 格式化数据
    const formatCrawlerData = _.map(crawlerData, (item) => {
      // 计算渐变颜色
      const startColor = GetColor('#FF5E76', '#22C3F7', maxValue && item.y / maxValue);
      return Object.assign(item, { color: [startColor, '#22C3F7'] });
    });

    crawlerRequestChart
    // 基本配置
      .setConfig([{
        name: '总请求',
        type: 'bar',
        color: '#353D52',
        barSplit: 1,
        barWidth: 0.7,
        data: requestData
      }, {
        name: '爬虫',
        type: 'bar',
        barWidth: 0.7,
        data: formatCrawlerData
      }])
      // x轴配置
      .setXAxis({
        gridLine: false,
        show: false
      })
      // Y轴配置
      .setYAxis({
        gridLine: false,
        border: false,
        show: false
      })
      .setFixedPadding({ left: 0, right: 0, top: 0, bottom: 0 })
      // 构建图表
      .build();
  }

  showDelayChart(delayChart) {
    const {
      delayData
    } = this.props;

    delayChart
    // 基本配置
      .setConfig({
        name: '延迟',
        type: 'line',
        showPoint: false,
        lineWidth: 2,
        interpolate: 'monotone',
        cusorType: 'bar',
        gradient: {
          type: 'vertical',
          color: ['#FF5E76', '#22C3F7']
        },
        data: delayData
      })
      .setFixedPadding({ left: 0, right: 0, top: 0, bottom: 0 })
      // x轴配置
      .setXAxis({
        gridLine: false,
        show: false,
        textPos: 'left'
      })
      // Y轴配置
      .setYAxis({
        gridLine: false,
        border: false,
        show: false
      })
      // 构建图表
      .build();
  }

  showUploadChart(uploadChart) {
    const {
      uploadData
    } = this.props;

    uploadChart
      .setConfig([{
        name: '上行数据',
        type: 'scatterPoint',
        color: '#525E7F',
        maxPointSize: 15,
        minPointSize: 5,
        data: uploadData
      }])
      .setXAxis({
        gridLine: false,
        border: false,
        show: false
      })
      .setYAxis({
        maxValue: 2,
        gridLine: false,
        border: false,
        show: false
      })
      .setFixedPadding({ left: 0, right: 0, top: 0, bottom: 0 })
      .build();
  }

  showTreeMapChart(statusChart) {
    const {
      treeMapData
    } = this.props;

    statusChart
      .setConfig([{
        name: '状态码',
        type: 'treemaps',
        color: [
          '#525E7F',
          '#353D52',
          '#22C3F7',
          '#0084AF'
        ],
        data: _.cloneDeep(treeMapData)
      }])
      .setXAxis({
        gridLine: false,
        markCount: 12
        // border: false,
        // show: false
      })
      .setFixedPadding({ left: 0, right: 0, top: 0, bottom: 20 })
      .build();
  }

  render() {
    const {
      uri_stem,
      barChartData,
      delayData,
      uploadData,
      treeMapData
    } = this.props;

    const {
      requestData,
      crawlerData
    } = barChartData;

    const {
      display,
      top,
      left,
      curDay,
      selectedIndex
    } = this.state;

    const treeMapItem = treeMapData[selectedIndex] && treeMapData[selectedIndex].y;
    let treeMapDataSum = 0;

    let xx2Percent = 0;
    let xx3Percent = 0;
    let xx4Percent = 0;
    let xx5Percent = 0;

    if (treeMapItem) {
      treeMapDataSum = _.sumBy(treeMapItem, 'value');
      if (treeMapDataSum) {
        xx2Percent = (_.find(treeMapItem, { name: '2XX' }, { value: 0 }).value / treeMapDataSum) * 100;
        xx3Percent = (_.find(treeMapItem, { name: '3XX' }, { value: 0 }).value / treeMapDataSum) * 100;
        xx4Percent = (_.find(treeMapItem, { name: '4XX' }, { value: 0 }).value / treeMapDataSum) * 100;
        xx5Percent = (_.find(treeMapItem, { name: '5XX' }, { value: 0 }).value / treeMapDataSum) * 100;
      }
    }

    return (
      <div className="charts-container">
        <h3 title={uri_stem}>
          <span className="title">分时统计</span>
          <span className="uri-stem">URL: {uri_stem}</span>
        </h3>

        <div className="charts-content">
          <div className="chart-title-col1">
            <div className="chart-title">
              <p>爬虫</p>
              <p>vs</p>
              <p>总请求</p>
            </div>
            <div className="chart-title">
              <p>延迟</p>
              <p>(ms)</p>
            </div>
            <div className="chart-title">
              <p>上行数据</p>
            </div>
            <div className="chart-title">
              <p>状态码</p>
              <p>
                <EasyToast
                  overlayClassName="card-overlay"
                  trigger="hover"
                  placement="bottom"
                  overlay={(
                    <div className="status-text">
                      <p>
                        <i className="xx2-legend" />
                        2XX: 成功
                      </p>
                      <p>
                        <i className="xx3-legend" />
                        3XX: 重定向
                      </p>
                      <p>
                        <i className="xx4-legend" />
                        4XX: 客户端/请求错误
                      </p>
                      <p>
                        <i className="xx5-legend" />
                        5XX: 服务器错误
                      </p>
                    </div>
                  )}
                >
                  <i className="iconfont icon-questioncircleo" />
                </EasyToast>
              </p>
            </div>
          </div>
          <div
            className="chart-title-col2"
            onMouseMove={e => this.onMouseMove(e)}
            onMouseOut={() => this.onMouseOut()}
          >
            {
              treeMapItem ? (
                <ChartHoverText
                  style={{ display, top, left }}
                  hoverDate={`${curDay} ${requestData[selectedIndex].x}`}
                  totalRequest={requestData[selectedIndex].y}
                  riskRequest={crawlerData[selectedIndex].y}
                  delayText={`${Math.round(delayData[selectedIndex].y)}ms`}
                  uploadText={`${uploadData[selectedIndex].value}`}
                  xx2Percent={`${xx2Percent.toFixed(1)}%`}
                  xx3Percent={`${xx3Percent.toFixed(1)}%`}
                  xx4Percent={`${xx4Percent.toFixed(1)}%`}
                  xx5Percent={`${xx5Percent.toFixed(1)}%`}
                />
              ) : null
            }
            <div id="crawlerRequest" className="chart-body" />
            <div id="delay" className="chart-body" />
            <div id="upload" className="chart-body" />
            <div id="status" className="chart-body" />
          </div>
        </div>
      </div>
    );
  }
}
export default ChartsContainer;
