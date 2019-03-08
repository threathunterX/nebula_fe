import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import _ from 'lodash';
import BChart from 'BChart';

import GetColor from '../../../components/util/GetColor';
import BTable from '../../../components/BTable';

import './index.scss';

class PageAnalysisDetail extends Component {
  static propTypes = {
    // pageUrlBody: PropTypes.objectOf(PropTypes.object).isRequired,
    requestData: PropTypes.arrayOf(PropTypes.object).isRequired,
    riskRequestData: PropTypes.arrayOf(PropTypes.object).isRequired,
    tableData: PropTypes.arrayOf(PropTypes.object).isRequired,
    currentTime: PropTypes.number.isRequired,
    key_type: PropTypes.string.isRequired,
    handleChange: PropTypes.func.isRequired,
    onChartClick: PropTypes.func.isRequired
  };

  componentDidMount() {
    setTimeout(() => {
      this.showCharts();
    }, 100);
  }

  componentDidUpdate(props) {
    if (JSON.stringify(this.props.requestData) !== JSON.stringify(props.requestData) ||
      JSON.stringify(this.props.riskRequestData) !== JSON.stringify(props.riskRequestData)) {
      this.showCharts();
    }
  }

  showCharts() {
    const {
      requestData,
      riskRequestData,
      onChartClick
    } = this.props;

    const maxValue = _.get(_.maxBy(requestData, o => o.y), 'y', 0);
    // 格式化数据
    const formatRiskRequestData = _.map(riskRequestData, (item) => {
      // 计算渐变颜色
      const startColor = GetColor('#FF5E76', '#22C3F7', maxValue && item.y / maxValue);
      return Object.assign(item, { color: [startColor, '#22C3F7'] });
    });
    // 趋势统计
    const barChart = new BChart('#requestRiskChart');
    barChart
    // 基本配置
      .setConfig([{
        name: '总请求',
        type: 'bar',
        color: '#353D52',
        barSplit: 1,
        data: requestData
      }, {
        name: '风险请求',
        type: 'bar',
        data: formatRiskRequestData
      }])
      // x轴配置
      .setXAxis({
        markCount: 3,
        gridLine: false,
        textPos: 'left',
        format: x => moment(Number(x)).format('YYYY.MM.DD dddd')
      })
      // Y轴配置
      .setYAxis({
        showBorder: false,
        gridLine: false,
        markCount: 3
      })
      // 鼠标悬浮显示游标
      .setHoverCursor(true)
      .setHoverTitle(params => moment(Number(params.x)).format('YYYY.MM.DD HH:mm'))
      // 鼠标悬浮显示数据信息
      .setHoverText(params => `${params.name}:${parseInt(params.y, 10)}`);

    // if (show_type !== 'path') {
    // }
    barChart
    // 显示标尺
      .setClickCursor(true, requestData[requestData.length - 1], (param) => {
        onChartClick(param.value.x);
      })
      .build();
  }

  render() {
    const {
      tableData,
      key_type,
      handleChange,
      currentTime
    } = this.props;

    const columns = [{
      title: key_type,
      key: 'name',
      render: (text, record) => (
        <span
          className="url-text"
          title={record.name}
          onClick={() => {
            window.open(`/#/analysis/${key_type.toLowerCase()}/${encodeURIComponent(record.name)}?timestamp=${currentTime}`);
          }}
          role="presentation"
        >{record.name}</span>
      )
    }, {
      title: '点击次数',
      dataIndex: 'count',
      key: 'count',
      width: 80
    }];

    if (key_type === 'IP') {
      columns[2] = columns[1];
      columns[1] = {
        title: '地理位置',
        dataIndex: 'city',
        key: 'city',
        width: 80
      };
    }

    return (
      <div className="page-analysis-detail">
        {/*
         <h3>样例</h3>
         <div className="page-url-body">
         <div>
         {
         _.map(pageUrlBody, (item, key) => (
         <div key={key} className="body-item">
         <h4>{key}</h4>
         <div className="body-content">
         {
         _.map(item, (v, k) => (
         <div key={k} className="content-body">
         <span className="content-key">{k}:</span>
         <span className="content-text">{v}</span>
         </div>
         ))
         }
         </div>
         </div>
         ))
         }
         </div>
         </div>
         */}
        <h3>
          请求&风险趋势
          <div className="legend-container">
            <i className="request-legend" />
            <span>总请求</span>
            <i className="risk-request-legend" />
            <span>风险请求</span>
          </div>
        </h3>
        <div id="requestRiskChart" className="request-risk-chart" />
        <div className="dimension-btns">
          <button
            className={`middle-btn ${key_type === 'IP' ? 'main-btn' : ''}`}
            onClick={() => {
              handleChange(['key_type'], ['IP']);
            }}
          >关联IP
          </button>
          <button
            className={`middle-btn ${key_type === 'DID' ? 'main-btn' : ''}`}
            onClick={() => {
              handleChange(['key_type'], ['DID']);
            }}
          >关联Device
          </button>
          <button
            className={`middle-btn ${key_type === 'USER' ? 'main-btn' : ''}`}
            onClick={() => {
              handleChange(['key_type'], ['USER']);
            }}
          >关联USER
          </button>
        </div>
        <div className="table-container">
          <BTable
            data={tableData}
            columns={columns}
            fixedHeader
            bodyHeight="calc(100% - 41px)"
          />
        </div>
      </div>
    );
  }
}

export default PageAnalysisDetail;
