import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import BChart from 'BChart';
import Radio from 'rc-radio';

import { slotMap } from '../../../components/HttpService/FetchSlotData';

class AccountSource extends Component {
  static propTypes = {
    pageSourceData: PropTypes.oneOfType([PropTypes.object]).isRequired,
    activeSourceType: PropTypes.string.isRequired,
    uri_stem: PropTypes.string.isRequired,
    current_day: PropTypes.string.isRequired,
    onTypeChange: PropTypes.func.isRequired,
    onUrlChange: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);

    this.state = {
    };
  }

  shouldComponentUpdate(props, state) {
    const {
      pageSourceData,
      activeSourceType,
      uri_stem
    } = this.props;

    return (
      uri_stem !== props.uri_stem ||
      activeSourceType !== props.activeSourceType ||
      JSON.stringify(pageSourceData) !== JSON.stringify(props.pageSourceData) ||
      JSON.stringify(this.state) !== JSON.stringify(state)
    );
  }

  componentDidUpdate() {
    const {
      pageSourceData,
      activeSourceType
    } = this.props;

    _.map(pageSourceData, (pageItem, pageKey) => {
      this.showLineChart(
        pageItem[slotMap[`PAGE_ACCOUNT_${activeSourceType}_COUNT`]],
        pageItem[slotMap[`PAGE_ACCOUNT_${activeSourceType}_INCIDENT_COUNT`]],
        pageKey,
        _.last(Object.keys(pageSourceData)) === pageKey
      );
    });
  }

  showLineChart(allCount, riskCount, pageKey, lastOne) {
    const padding = {
      left: 0,
      right: 0,
      top: 0,
      bottom: 0
    };

    if (lastOne) {
      padding.bottom = 20;
    }

    new BChart(`#account_${_.indexOf(Object.keys(this.props.pageSourceData), pageKey)}`)
    // 基本配置
      .setConfig([{
        name: '总事件数',
        type: 'line',
        lineType: 'area',
        showPoint: false,
        color: '#525E7F',
        data: allCount
      }, {
        name: '风险事件数',
        type: 'line',
        lineType: 'area',
        showPoint: false,
        gradient: {
          type: 'vertical',
          color: ['#FF5E76', '#22C3F7']
        },
        data: riskCount
      }])
      // x轴配置
      .setXAxis({
        boundaryGap: false,
        gridLine: false,
        markCount: 12,
        show: lastOne
      })
      // Y轴配置
      .setYAxis({
        gridLine: false,
        border: false,
        show: false
      })
      .setFixedPadding(padding)
      .setHoverCursor(true)
      .setHoverTitle(params => `${this.props.current_day} ${params.x}`)
      .setHoverText(
        params => `${params.name}: ${parseInt(params.y, 10)}`,
        { posFree: true }
      )
      // 构建图表
      .build();
  }

  render() {
    const {
      pageSourceData,
      activeSourceType,
      onTypeChange,
      uri_stem,
      current_day,
      onUrlChange
    } = this.props;

    const riskMax = _.maxBy(Object.values(pageSourceData), slotMap[`PAGE_ACCOUNT_${activeSourceType}_RISK_COUNT`]);
    let riskMaxCount = 1;
    if (riskMax) {
      riskMaxCount = riskMax[slotMap[`PAGE_ACCOUNT_${activeSourceType}_RISK_COUNT`]];
    }


    return (
      <div className="account-source">
        <h2>账号来源分析</h2>
        <div className="account-chart">
          <div className="tab-btn-container">
            <button
              className={`main-btn small-btn${activeSourceType === 'LOGIN' ? ' active' : ''}`}
              onClick={() => onTypeChange('activeSourceType', 'LOGIN')}
            >登录
            </button>
            <button
              className={`main-btn small-btn${activeSourceType === 'REGISTRATION' ? ' active' : ''}`}
              onClick={() => onTypeChange('activeSourceType', 'REGISTRATION')}
            >注册
            </button>
          </div>

          <div className="account-source-charts-container">
            {
              _.map(pageSourceData, (pageItem, pageKey) => {
                const successCount = pageItem[slotMap[`PAGE_ACCOUNT_${activeSourceType}_SUCCESS_COUNT`]];
                const failCount = pageItem[slotMap[`PAGE_ACCOUNT_${activeSourceType}_FAIL_COUNT`]];
                const successFailCount = failCount + successCount;
                const successPercent =
                  successFailCount === 0 ? 0 : (successCount / successFailCount) * 100;
                const failPercent =
                  successFailCount === 0 ? 0 : (failCount / successFailCount) * 100;

                const xx23Count = pageItem[slotMap[`PAGE_ACCOUNT_${activeSourceType}_CODE23_COUNT`]];
                const xx45Count = pageItem[slotMap[`PAGE_ACCOUNT_${activeSourceType}_CODE45_COUNT`]];
                const xx2345Count = xx23Count + xx45Count;
                const xx23CountPercent =
                  xx2345Count === 0 ? 0 : (xx23Count / xx2345Count) * 100;
                const xx45CountPercent =
                  xx2345Count === 0 ? 0 : (xx45Count / xx2345Count) * 100;

                const riskCount = pageItem[slotMap[`PAGE_ACCOUNT_${activeSourceType}_RISK_COUNT`]];

                const lastOne = _.last(Object.keys(pageSourceData)) === pageKey;
                return (
                  <div key={pageKey} className="item-chart-container">
                    <Radio
                      checked={uri_stem === pageKey}
                      onChange={() => onUrlChange(pageKey)}
                    />
                    <span
                      className="uri-stem"
                      title={pageKey}
                    >
                      {`${pageKey.substr(0, 38)}${pageKey.length > 38 ? '...' : ''}`}
                    </span>

                    <div
                      id={`account_${_.indexOf(Object.keys(pageSourceData), pageKey)}`}
                      className="account-source-chart"
                    />

                    <div className="bar-data-container">
                      <div className="bar-container">
                        <div className="bar-process" style={{ height: `${successPercent}%` }} />
                        {
                          lastOne ? (
                            <span className="bar-text">成功</span>
                          ) : null
                        }
                      </div>
                      <div className="bar-container">
                        <div className="bar-process" style={{ height: `${failPercent}%` }} />
                        {
                          lastOne ? (
                            <span className="bar-text">失败</span>
                          ) : null
                        }
                      </div>

                      <div className="account-hover-text">
                        <p>{current_day}</p>
                        <p>成功: <span>{`${successPercent.toFixed(1)}%`}</span></p>
                        <p>失败: <span>{`${failPercent.toFixed(1)}%`}</span></p>
                      </div>
                    </div>

                    <div className="bar-data-container">
                      <div className="bar-container">
                        <div className="bar-process" style={{ height: `${xx23CountPercent}%` }} />
                        {
                          lastOne ? (
                            <span className="bar-text">2**/3**</span>
                          ) : null
                        }
                      </div>
                      <div className="bar-container">
                        <div className="bar-process" style={{ height: `${xx45CountPercent}%` }} />
                        {
                          lastOne ? (
                            <span className="bar-text">4**/5**</span>
                          ) : null
                        }
                      </div>

                      <div className="xx2345-hover-text">
                        <p className="percent-text">{`${xx23CountPercent.toFixed(1)}%`}</p>
                        <p>2**/3**<span>(成功或重定向)</span></p>
                        <p className="percent-text">{`${xx45CountPercent.toFixed(1)}%`}</p>
                        <p>4**/5**<span>(客户端或服务端错误)</span></p>
                      </div>
                    </div>

                    <div className="page-risk-bar">
                      <div
                        className="page-process"
                        style={{
                          width: `${(riskCount / riskMaxCount) * 100}%`,
                          minWidth: `${riskCount === 0 ? '0px' : '1px'}`
                        }}
                      />
                      <div className="hover-mask" />
                      <div className="account-hover-text">
                        <p>{current_day}</p>
                        <p>风险用户数: <span>{riskCount}</span></p>
                      </div>
                    </div>
                  </div>
                );
              })
            }
          </div>
        </div>
      </div>
    );
  }
}
export default AccountSource;
