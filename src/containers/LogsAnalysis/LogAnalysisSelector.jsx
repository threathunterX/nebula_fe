import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';

import Selector from '../../components/Selector';
import {
  opsString,
  defaultSwitchSelector
} from './constants';

import './index.scss';

class LogAnalysisSelector extends Component {
  static propTypes = {
    orgLogList: PropTypes.oneOfType([PropTypes.array]).isRequired,
    dataList: PropTypes.oneOfType([PropTypes.array]).isRequired,
    selectorApi: PropTypes.oneOfType([PropTypes.object]).isRequired,
    onSubmit: PropTypes.func.isRequired
  };

  static checkInput(text) {
    return text.indexOf('body') >= 0 ||
      text.indexOf('cookie') >= 0 ||
      text.indexOf('uri_query') >= 0;
  }

  constructor(props) {
    super(props);

    const {
      dataList
    } = this.props;

    let dataList1;
    if (dataList instanceof Array) {
      dataList1 = _.cloneDeep(dataList);
    } else {
      dataList1 = _.cloneDeep(defaultSwitchSelector);
    }

    this.state = {
      dataList: dataList1
    };
  }

  onSubmit(selectorApi) {
    if (this.props.onSubmit) {
      this.props.onSubmit(this.state.dataList);
    }
    selectorApi.onClose();
  }

  getSubCondition(dataList, data, index) {
    const item = data;

    const {
      orgLogList
    } = this.props;

    return (
      <div key={index} className="sub-condition-item">
        <div className="add-del">
          <i
            className="iconfont icon-pluscircleo"
            onClick={() => {
              this.addSubCondition(dataList);
            }}
            role="presentation"
          />
          <i
            className={`iconfont icon-crosscircleo ${dataList.length === 1 ? 'disabled' : ''}`}
            onClick={() => {
              this.delSubCondition(dataList, index);
            }}
            role="presentation"
          />
        </div>

        <div className="detail-content">
          {
            LogAnalysisSelector.checkInput(item.src_col) ?
              (
                <div className="log-input-container">
                  <Selector
                    selectorType="list"
                    className="has-input"
                    dataList={orgLogList}
                    value={orgLogList.find(value => value.text === item.src_col)}
                    onChange={(value) => {
                      item.src_col = value.text;
                      this.forceUpdate();
                    }}
                  />
                  <span>.</span>
                  <input
                    className="condition-input"
                    value={item.sub_col}
                    onChange={(e) => {
                      item.sub_col = e.target.value;
                      this.forceUpdate();
                    }}
                    type="text"
                    placeholder="请输入"
                  />
                </div>
              ) :
              (
                <Selector
                  selectorType="list"
                  dataList={orgLogList}
                  value={orgLogList.find(value => value.text === item.src_col)}
                  onChange={(value) => {
                    item.src_col = value.text;
                    this.forceUpdate();
                  }}
                />
              )
          }

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
            className="condition-input"
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
  }

  getDefault(index, value) {
    const item = value;
    return (
      <div key={index} className="default">
        <span className="label">其他</span>

        <div className="content-return">
          <span className="label">返回</span>
          <input
            className="normal-input"
            value={item.op_value}
            onChange={(e) => {
              item.op_value = e.target.value;
              this.forceUpdate();
            }}
            type="text"
            placeholder="请输入"
          />
        </div>
      </div>
    );
  }

  getCondition(dataList, value, index) {
    const item = value;
    return (
      <div key={index} className="log-condition">
        <div className="prefix">
          <div className="add-del">
            <i
              className="iconfont icon-pluscircleo"
              onClick={() => {
                this.addCondition(index);
              }}
              role="presentation"
            />
            <i
              className={`iconfont icon-crosscircleo ${dataList.length === 2 ? 'disabled' : ''}`}
              onClick={() => {
                this.delCondition(index);
              }}
              role="presentation"
            />
          </div>
          <span className="label">条件{index + 1}</span>
        </div>

        <div className="content-container">
          <div className="sub-condition-container">
            <span className="label">如果</span>

            <div className="sub-conditions">
              {_.map(item.op_string, (v, i) => (
                this.getSubCondition(item.op_string, v, i)
              ))}
            </div>
          </div>
          <div className="content-return">
            <span className="label">返回</span>

            <input
              className="normal-input"
              value={item.op_value}
              onChange={(e) => {
                item.op_value = e.target.value;
                this.forceUpdate();
              }}
              type="text"
              placeholder="请输入"
            />
          </div>

        </div>
      </div>
    );
  }

  // 删除条件
  delCondition(index) {
    const {
      dataList
    } = this.state;

    // 留一条条件和返回结果
    if (dataList.length === 2) {
      return;
    }

    dataList.splice(index, 1);

    this.setState({ dataList });
  }

  // 添加条件详情
  addSubCondition(dataList) {
    dataList.push(_.cloneDeep(defaultSwitchSelector[0].op_string[0]));

    this.forceUpdate();
  }

  // 添加条件
  addCondition(index) {
    let {
      dataList
    } = this.state;

    const defaultItem = dataList.splice(index + 1);

    dataList.push(_.cloneDeep(defaultSwitchSelector[0]));

    dataList = dataList.concat(defaultItem);

    this.setState({ dataList });
  }

  // 删除条件详情
  delSubCondition(dataList, index) {
    // 留一条条件和返回结果
    if (dataList.length === 1) {
      return;
    }

    dataList.splice(index, 1);

    this.forceUpdate();
  }

  render() {
    const {
      dataList
    } = this.state;
    const {
      selectorApi
    } = this.props;

    return (
      <div className="log-analysis-selector-content">
        {_.map(dataList, (item, index) => {
          if (item.op === 'default') {
            return this.getDefault(index, item);
          }
          return this.getCondition(dataList, item, index);
        })}

        <div className="button-container">
          <button
            className="main-btn middle-btn"
            onClick={() => {
              this.onSubmit(selectorApi);
            }}
          >
            保存
          </button>
          <button
            className="ghost-btn middle-btn"
            onClick={() => {
              selectorApi.onClose();
            }}
          >
            取消
          </button>
        </div>
      </div>
    );
  }
}

export default LogAnalysisSelector;
