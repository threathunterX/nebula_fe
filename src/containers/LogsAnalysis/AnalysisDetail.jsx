import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';

import EasyToast from '../../components/EasyToast';
import Selector from '../../components/Selector';
import LogAnalysisSelector from './LogAnalysisSelector';
import SelectorInput from './SelectorInput';
import { opsString, opsString2, defaultAnalysisDefault } from './constants';

import './index.scss';

class AnalysisDetail extends Component {
  static propTypes = {
    onSubmit: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired,
    dataList: PropTypes.oneOfType([PropTypes.object]),
    orgEvent: PropTypes.oneOfType([PropTypes.array]),
    events: PropTypes.oneOfType([PropTypes.array]),
    type: PropTypes.string
  };
  static defaultProps = {
    orgEvent: [],
    dataList: undefined,
    events: [],
    type: ''
  };

  constructor(props) {
    super(props);

    let dataList = _.cloneDeep(this.props.dataList);

    if (!dataList) {
      dataList = _.cloneDeep(defaultAnalysisDefault);
    }

    this.state = {
      dataList,
      terms: dataList.terms
    };
  }

  insertCondition(type) {
    const { terms } = this.state;

    if (type === 'when') {
      terms.when.push({
        src_col: '',
        op: '',
        op_string: ''
      });
    } else {
      terms.then.push({
        src_col: '',
        tar_col: '',
        op: ''
      });
    }

    this.setState({ terms });
  }

  removeCondition(index, type) {
    const { terms } = this.state;

    if (!terms[type] || terms[type].length === 1) {
      return;
    }

    terms[type].splice(index, 1);

    this.setState({ terms });
  }

  // 等于变量选项修改
  extractSetChange(e, value) {
    const item = value;
    if (item.op_string instanceof Object) {
      item.op_string.extract_context = e.target.value;
    } else {
      item.op_string = {
        extract_type: 'json',
        extract_context: e.target.value,
        extract_op: 'self'
      };
    }
    this.forceUpdate();
  }

  // 转换日志选项选择
  op2Select(itemTemp, value) {
    const item = itemTemp;
    item.op = value.value;

    // 等于变量
    if (item.op === 'extract_set') {
      if (!(item.op_string instanceof Object)) {
        item.op_string = {
          extract_type: 'json',
          extract_context: '',
          extract_op: 'self'
        };
      }
    } else if (item.op === 'set') {
      if (typeof (item.op_string) !== 'string') {
        item.op_string = '';
      }
    }

    this.forceUpdate();
  }

  render() {
    const {
      orgEvent,
      events,
      type
    } = this.props;

    const {
      terms,
      dataList
    } = this.state;

    // 源日志标签列表
    let orgLogList;
    const selectedOrgEvent = orgEvent.find(value => value.text === dataList.source);

    if (selectedOrgEvent) {
      orgLogList = selectedOrgEvent.fields;
    } else {
      orgLogList = [];
    }
    // 转化日志标签列表
    let logList;
    const selectedEvents = events.find(value => value.text === dataList.dest);
    if (selectedEvents) {
      logList = selectedEvents.fields;
    } else {
      logList = [];
    }
    // 添加text字段
    orgLogList.forEach((v, i) => {
      orgLogList[i].text = v.name;
    });
    logList.forEach((v, i) => {
      logList[i].text = v.name;
    });

    return (
      <div className={`wd-log-detail-container ${type === 'create' ? 'create-container' : ''}`}>
        <div className="detail-item">
          <div className="label">源日志</div>
          <div className="detail-content">
            <Selector
              selectorType="list"
              dataList={_.filter(orgEvent, { text: 'HTTP_DYNAMIC' })}
              value={selectedOrgEvent}
              onChange={(value) => {
                dataList.source = value.text;
                this.forceUpdate();
              }}
            />

            <div className="label-list">
              {
                _.map(orgLogList, (item, index) => (
                  <EasyToast key={index} trigger="hover" placement="top" overlay={item.remark}>
                    <span className="event-label">{item.name}</span>
                  </EasyToast>
                ))
              }
            </div>
          </div>
        </div>

        {_.map(terms.when, (whenItem, index) => {
          const item = whenItem;
          return (

            <div key={index} className="detail-item">
              <div className="label">
                <i
                  className="iconfont icon-pluscircleo"
                  onClick={() => {
                    this.insertCondition('when');
                  }}
                  role="presentation"
                />
                <i
                  className={`iconfont icon-crosscircleo ${terms.when.length === 1 ? 'disabled' : ''}`}
                  onClick={() => {
                    this.removeCondition(index, 'when');
                  }}
                  role="presentation"
                />
              </div>
              <div className="detail-content">
                <Selector
                  selectorType="list"
                  dataList={orgLogList}
                  value={orgLogList.find(value => value.text === item.src_col)}
                  onChange={(value) => {
                    item.src_col = value.text;
                    this.forceUpdate();
                  }}
                />

                <Selector
                  selectorType="list"
                  className="rule-selection"
                  dataList={opsString}
                  value={opsString.find(value => value.value === item.op)}
                  onChange={(value) => {
                    item.op = value.value;
                    this.forceUpdate();
                  }}
                />

                <input
                  className="normal-input"
                  value={item.op_string}
                  onChange={(e) => {
                    item.op_string = e.target.value;
                    this.forceUpdate();
                  }}
                  type="text"
                  placeholder="请输入"
                />
              </div>
            </div>
          );
        })}

        {/* 转化日志 */}
        <div className="detail-item transform-log">
          <div className="label">转化日志</div>
          <div className="detail-content">
            <Selector
              selectorType="list"
              dataList={events}
              value={selectedEvents}
              onChange={(value) => {
                dataList.dest = value.text;
                this.forceUpdate();
              }}
            />

            <div className="label-list">
              {
                _.map(logList, (item, index) => (
                  <EasyToast key={index} trigger="hover" placement="top" overlay={item.remark}>
                    <span className="event-label">{item.name}</span>
                  </EasyToast>
                ))
              }
            </div>
          </div>
        </div>

        {_.map(terms.then, (thenItem, index) => {
          const item = thenItem;
          return (

            <div key={index} className="detail-item">
              <div className="label">
                <i
                  className="iconfont icon-pluscircleo"
                  onClick={() => {
                    this.insertCondition('then');
                  }}
                  role="presentation"
                />
                <i
                  className={`iconfont icon-crosscircleo ${terms.then.length === 1 ? 'disabled' : ''}`}
                  onClick={() => {
                    this.removeCondition(index, 'then');
                  }}
                  role="presentation"
                />
              </div>
              <div className="detail-content">
                <Selector
                  selectorType="list"
                  dataList={logList}
                  value={logList.find(value => value.text === item.tar_col)}
                  onChange={(value) => {
                    item.tar_col = value.text;
                    this.forceUpdate();
                  }}
                />

                <Selector
                  selectorType="list"
                  className="rule-selection"
                  dataList={opsString2}
                  value={opsString2.find(value => value.value === item.op)}
                  onChange={(value) => {
                    this.op2Select(item, value);
                  }}
                />

                {
                  (() => {
                    if (item.op === 'extract_set') {
                      return (
                        <SelectorInput
                          orgLogList={orgLogList}
                          item={item}
                          selected={orgLogList.find(value => value.text === item.src_col)}
                          onSelect={(value) => {
                            item.src_col = value.text;
                            this.forceUpdate();
                          }}
                          onChange={(e) => {
                            this.extractSetChange(e, item);
                          }}
                        />
                      );
                    } else if (item.op === 'switch') {
                      return (
                        <Selector
                          selectorType="custom"
                          selectorClass="log-analysis-selector"
                          defaultText="编辑条件"
                          overlay={selectorApi => (
                            <LogAnalysisSelector
                              dataList={item.op_string}
                              orgLogList={orgLogList}
                              selectorApi={selectorApi}
                              onSubmit={(data) => {
                                item.op_string = data;
                              }}
                            />
                          )}
                        />
                      );
                    }
                    return (
                      <input
                        className="normal-input"
                        value={item.op_string}
                        onChange={(e) => {
                          item.op_string = e.target.value;
                          this.forceUpdate();
                        }}
                        type="text"
                        placeholder="请输入"
                      />
                    );
                  })()
                }
              </div>
            </div>
          );
        })}
        <div className={`button-container ${type === 'create' ? 'create-btn-container' : ''}`}>
          <button
            className="main-btn large-btn"
            onClick={() => {
              this.props.onSubmit(dataList);
            }}
          >
            保存
          </button>
          <button
            className="ghost-btn large-btn"
            onClick={() => {
              this.props.onCancel();
            }}
          >
            取消
          </button>
        </div>

      </div>
    );
  }
}

export default AnalysisDetail;
