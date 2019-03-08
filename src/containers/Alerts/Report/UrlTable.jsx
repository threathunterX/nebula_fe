import React, { Component } from 'react';
import PropTypes from 'prop-types';
import BCharts from 'BChart';
import _ from 'lodash';

import BTable from '../../../components/BTable';

import './index.scss';

class UrlTable extends Component {
  static propTypes = {
    tableData: PropTypes.oneOfType([PropTypes.array]).isRequired,
    tableColumns: PropTypes.oneOfType([PropTypes.array]).isRequired
  };

  // 绘制表格中图表
  static getUrlLineChart(index, item) {
    const data = _.map(item.trend, v => ({
      x: Object.keys(v)[0],
      y: Object.values(v)[0]
    }));

    // 初始化图表对象
    new BCharts(`#pageRisk${index}`)
    // 基本配置
      .setConfig({
        name: `pageRisk${index}`,
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

  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    const {
      tableData
    } = this.props;

    // 绘制表格中图表
    tableData.forEach((item, index) => {
      UrlTable.getUrlLineChart(index, item);
    });
  }

  render() {
    const {
      tableData,
      tableColumns
    } = this.props;

    return (

      <div className="url-table">
        <div className="table-container">
          <BTable data={tableData} columns={tableColumns} fixedHeader bodyHeight={290} />
        </div>
      </div>
    );
  }
}

export default UrlTable;
