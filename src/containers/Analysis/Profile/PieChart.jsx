import React, { Component } from 'react';
import PropTypes from 'prop-types';
import BCharts from 'BChart';
import _ from 'lodash';

import './index.scss';

const colors = [
  '#22C3F7',
  '#7CDCCE',
  '#FEE953',
  '#F58E4F',
  '#FF5E76',
  '#9975D5',

  '#61D8FF',
  '#91F3E5',
  '#FFEF7D',
  '#FB9F63',
  '#FE93A3',
  '#7E60AE',

  '#1EAFDD',
  '#5BD3C1',
  '#F9E138',
  '#E47F3B',
  '#BF4658',
  '#906EC8',

  '#1991B7',
  '#589C92',
  '#F6D90A',
  '#DE7220',
  '#7F2F3B',
  '#624B88',

  '#105E77',
  '#345C57',
  '#E8CB66',
  '#C86707',
  '#6D2A33',
  '#503C73'
];

class PieChart extends Component {
  static propTypes = {
    dataList: PropTypes.oneOfType([PropTypes.array]).isRequired
  };

  constructor(props) {
    super(props);

    this.state = {
      hoverIndex: {
        source: -1,
        userAgent: -1,
        device: -1
      }
    };
  }

  componentDidMount() {
    const {
      dataList
    } = this.props;

    // 用户主要访问地区来源，饼图绘制
    this.getSourcePie(
      _.map(dataList[0], (item, index) => Object.assign(item, { color: colors[index] }))
    );
    // 用户访问 User Agent 分布，饼图绘制
    this.getUserAgentPie(
      _.map(dataList[1], (item, index) => Object.assign(item, { color: colors[index] }))
    );
    // 用户访问设备分布，饼图绘制
    this.getDevicePie(
      _.map(dataList[2], (item, index) => Object.assign(item, { color: colors[index] }))
    );
  }

  // 用户主要访问地区来源
  getSourcePie(dataList) {
    new BCharts('#sourcePie')
      .setConfig({
        type: 'pie',
        data: dataList,
        onMouseover: (param) => {
          const {
            hoverIndex
          } = this.state;
          hoverIndex.source = param.index;
          this.setState({
            hoverIndex
          });
        },
        onMouseout: () => {
          const {
            hoverIndex
          } = this.state;
          hoverIndex.source = -1;
          this.setState({
            hoverIndex
          });
        }
      })
      .setHoverText(param => param.text)
      .build();
  }

  // 用户访问 User Agent 分布
  getUserAgentPie(dataList) {
    new BCharts('#userAgentPie')
      .setConfig({
        type: 'pie',
        data: dataList,
        onMouseover: (param) => {
          const {
            hoverIndex
          } = this.state;
          hoverIndex.userAgent = param.index;
          this.setState({
            hoverIndex
          });
        },
        onMouseout: () => {
          const {
            hoverIndex
          } = this.state;
          hoverIndex.userAgent = -1;
          this.setState({
            hoverIndex
          });
        }
      })
      .setHoverText(param => param.text)
      .build();
  }

  // 用户访问设备分布
  getDevicePie(dataList) {
    new BCharts('#devicePie')
      .setConfig({
        type: 'pie',
        data: dataList,
        onMouseover: (param) => {
          const {
            hoverIndex
          } = this.state;
          hoverIndex.device = param.index;
          this.setState({
            hoverIndex
          });
        },
        onMouseout: () => {
          const {
            hoverIndex
          } = this.state;
          hoverIndex.device = -1;
          this.setState({
            hoverIndex
          });
        }
      })
      .setHoverText(param => param.text)
      .build();
  }

  render() {
    const {
      dataList
    } = this.props;

    const {
      hoverIndex
    } = this.state;

    return (
      <div className="pie-chart-container">
        <div className="pie-chart-item">
          <p>用户主要访问地区来源</p>
          <div id="sourcePie" className="source-pie" />
          <div className="point-container">
            {
              _.map(dataList[0], (item, index) => (
                <div
                  key={index}
                  className={`point-item ${(index !== hoverIndex.source && hoverIndex.source !== -1) ? 'opacity' : ''}`}
                >
                  <i className="point" style={{ backgroundColor: _.get(colors, index) }} />
                  <span title={item.text}>{item.text}</span>
                </div>
              ))
            }
          </div>
        </div>
        <div className="pie-chart-item">
          <p>用户访问 User Agent 分布</p>
          <div id="userAgentPie" className="source-pie" />
          <div className="point-container">
            {_.map(dataList[1], (item, index) => (
              <div
                key={index}
                className={`point-item ${(index !== hoverIndex.userAgent && hoverIndex.userAgent !== -1) ? 'opacity' : ''}`}
              >
                <i className="point" style={{ backgroundColor: _.get(colors, index, '#000') }} />
                <span title={item.text}>{item.text}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="pie-chart-item">
          <p>用户访问设备分布</p>
          <div id="devicePie" className="source-pie" />
          <div className="point-container">
            {_.map(dataList[2], (item, index) => (
              <div
                key={index}
                className={`point-item ${(index !== hoverIndex.device && hoverIndex.device !== -1) ? 'opacity' : ''}`}
              >
                <i className="point" style={{ backgroundColor: _.get(colors, index, '#000') }} />
                <span title={item.text}>{item.text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
}

export default PieChart;

