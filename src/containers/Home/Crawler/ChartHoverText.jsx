import React, { Component } from 'react';
import PropTypes from 'prop-types';

import NumberFormat from '../../../components/util/NumberFormat';
import BChart from 'BChart';

class ChartHoverText extends Component {
  static propTypes = {
    style: PropTypes.oneOfType([PropTypes.object]).isRequired,
    hoverDate: PropTypes.string.isRequired,
    totalRequest: PropTypes.number.isRequired,
    riskRequest: PropTypes.number.isRequired,
    delayText: PropTypes.string.isRequired,
    uploadText: PropTypes.string.isRequired,
    xx2Percent: PropTypes.string.isRequired,
    xx3Percent: PropTypes.string.isRequired,
    xx4Percent: PropTypes.string.isRequired,
    xx5Percent: PropTypes.string.isRequired
  };

  componentWillUpdate() {
  }

  render() {
    const {
      style,
      hoverDate,
      totalRequest,
      riskRequest,
      delayText,
      uploadText,
      xx2Percent,
      xx3Percent,
      xx4Percent,
      xx5Percent
    } = this.props;

    // 导入数量转换
    const uploadBytes = NumberFormat(Number(uploadText), 'byte');

    return (
      <div className="chart-hover-text" style={style}>
        <p className="hover-date">{hoverDate}</p>
        <div className="page-request-text">
          <p>
            <i className="total-legend" />
            页面总请求:
            <span className="data-text">{totalRequest}</span>
          </p>
          <p>
            <i className="risk-legend" />
            页面风险请求:
            <span className="data-text">{riskRequest}</span>
          </p>
        </div>
        <p className="delay-text">
          <i className="delay-legend" />
          平均延迟:
          <span className="data-text">{delayText}</span>
        </p>
        <p className="upload-text">
          <i className="upload-legend" />
          上行数据量:
          <span className="data-text">{`${parseFloat(uploadBytes.value.toFixed(2))}${uploadBytes.unit}`}</span>
        </p>
        <div className="status-text">
          <p>
            <i className="xx2-legend" />
            2XX<span className="describe">(成功)</span>
            <span className="data-text">{xx2Percent}</span>
          </p>
          <p>
            <i className="xx3-legend" />
            3XX<span className="describe">(重定向)</span>
            <span className="data-text">{xx3Percent}</span>
          </p>
          <p>
            <i className="xx4-legend" />
            4XX<span className="describe">(客户端/请求错误)</span>
            <span className="data-text">{xx4Percent}</span>
          </p>
          <p>
            <i className="xx5-legend" />
            5XX<span className="describe">(服务器错误)</span>
            <span className="data-text">{xx5Percent}</span>
          </p>
        </div>
      </div>
    );
  }
}
export default ChartHoverText;
