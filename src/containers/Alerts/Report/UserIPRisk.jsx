import React, { Component } from 'react';
import PropTypes from 'prop-types';
import BCharts from 'BChart';
import _ from 'lodash';

import BTable from '../../../components/BTable';
import NumberFormat from '../../../components/util/NumberFormat';

import './index.scss';

class UserRisk extends Component {
  static propTypes = {
    tableData: PropTypes.oneOfType([PropTypes.array]).isRequired,
    tableColumns: PropTypes.oneOfType([PropTypes.array]).isRequired,
    blockData: PropTypes.oneOfType([PropTypes.array]).isRequired,
    type: PropTypes.string.isRequired
  };

  componentDidMount() {
    const {
      tableData
    } = this.props;

    // 绘制表格中图表
    tableData.forEach((item, index) => {
      this.getRiskLineChart(index, item);
    });

    this.getProgressChart();
  }

  // 环形占比图
  getProgressChart() {
    const {
      blockData
    } = this.props;

    // 初始化图表对象
    new BCharts(`#progressChart_${this.props.type}`)
    // 基本配置
      .setConfig({
        name: 'progress',
        type: 'progress',
        data: {
          progress: !(blockData[0] || blockData[1]) ? 0 : blockData[0] / blockData[1]
        },
        color: ['#FF5E76', '#22C3F7'],
        fixedText: () => `拦截${!(blockData[0] || blockData[1]) ? 0 : ((blockData[0] / blockData[1]) * 100).toFixed(1)}%`
      })
      // 构建图表
      .build();
  }

  // 绘制表格中图表
  getRiskLineChart(index, item) {
    const {
      type
    } = this.props;

    const data = _.map(item.trend, v => ({
      x: Object.keys(v)[0],
      y: Object.values(v)[0]
    }));

    // 初始化图表对象
    new BCharts(`#${type}Risk${index}`)
    // 基本配置
      .setConfig({
        name: `${type}Risk${index}`,
        type: 'line',
        lineType: 'area',
        interpolate: 'monotone',
        showPoint: false,
        gradient: {
          type: 'vertical',
          color: ['#FF5E76', '#22C3F7']
        },
        data
      })
      .setFixedPadding({ top: 0, left: 0, right: 0, bottom: 0 })
      // x轴配置
      .setXAxis({
        gridLine: false,
        show: false,
        border: false
      })
      // Y轴配置
      .setYAxis({
        gridLine: false,
        show: false,
        border: false
      })
      // 构建图表
      .build();
  }

  render() {
    const {
      tableData,
      tableColumns,
      type,
      blockData
    } = this.props;

    return (

      <div className="user-ip-risk">

        <div className="progress-chart-container">
          <div id={`progressChart_${type}`} className="progress-chart" />
          <div className="progress-info-container">
            {
              type === 'user' ?
                <i className="iconfont icon-team" /> :
                (
                  <div className="ip-icon">
                    <span>IP</span>
                  </div>
                )
            }

            <p className="count">{NumberFormat(blockData[1], 'split')}<span>个</span></p>

            <p className="explain">{type === 'user' ? '风险账号' : '风险IP'}</p>
          </div>
        </div>
        <div className="table-container">
          <BTable data={tableData} columns={tableColumns} fixedHeader bodyHeight={290} />
        </div>

      </div>

    );
  }
}

export default UserRisk;
