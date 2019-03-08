import React, { Component } from 'react';
import PropTypes from 'prop-types';
import InputNumber from 'rc-input-number';

import _ from 'lodash';

import Selector from '../Selector';
import StrategyRequiredSelector from '../Strategies/StrategyRequiredSelector';
import StrategyRequiredInput from '../Strategies/StrategyRequiredInput';

import './index.scss';

const GREATER_THAN = '大于';
const LESS_THAN = '小于';
const GREATER_THAN_OR_EQUAL_TO = '大于等于';
const LESS_THAN_OR_EQUAL_TO = '小于等于';
const EQUAL_TO = '等于';
const NOT_EQUAL_TO = '不等于';
const BETWEEN = '介于';
const IN = '属于';
const NOT_IN = '不属于';
const CONTAIN = '包含';
const NOT_CONTAIN = '不包含';
const START_WITH = '以..开始';
const NOT_START_WITH = '不以..开始';
const END_WITH = '以..结束';
const NOT_END_WITH = '不以..结束';
const CONTAIN_REGEX = '包含正则';
const NOT_CONTAIN_REGEX = '不包含正则';
const EQUAL_TO_VARIABLE = '等于变量';

const ops = _.map({
  [GREATER_THAN]: '>',
  [LESS_THAN]: '<',
  [GREATER_THAN_OR_EQUAL_TO]: '>=',
  [LESS_THAN_OR_EQUAL_TO]: '<=',
  [EQUAL_TO]: '==',
  [NOT_EQUAL_TO]: '!=',
  [BETWEEN]: 'between',
  [IN]: 'in',
  [NOT_IN]: '!in',
  [CONTAIN]: 'contain',
  [NOT_CONTAIN]: '!contain',
  [START_WITH]: 'startwith',
  [NOT_START_WITH]: '!startwith',
  [END_WITH]: 'endwith',
  [NOT_END_WITH]: '!endwith',
  [CONTAIN_REGEX]: 'regex',
  [NOT_CONTAIN_REGEX]: '!regex',
  [EQUAL_TO_VARIABLE]: '='
},
  (value, key) => ({ text: key, value })
);

const UNIT_SECOND = 1;
const UNIT_MINUTE = 60;
const UNIT_HOUR = 3600;

const units = _.map(
  {
    小时: UNIT_HOUR,
    分钟: UNIT_MINUTE,
    秒: UNIT_SECOND
  },
  (value, key) => ({ text: key, value })
);

const distincts = _.map(
  {
    count: 'count',
    distinct: 'distinct',
    interval: 'interval'
  },
  (value, key) => ({ text: key, value })
);

const FORM_TIME_SPAN = 'interval';
const FORM_TIME_SPAN_NUMBER = `${FORM_TIME_SPAN}.number`;
const FORM_TIME_SPAN_UNIT = `${FORM_TIME_SPAN}.unit`;
const FORM_ALGOTITHM = 'algorithm';
const FORM_OPERAND = 'operand.0';

class CountEditor extends Component {
  static propTypes = {
    config: PropTypes.oneOfType([PropTypes.object]),
    fields: PropTypes.oneOfType([PropTypes.array]),
    onChange: PropTypes.func,
    readOnly: PropTypes.bool
  };
  static defaultProps = {
    fields: undefined,
    config: undefined,
    onChange: undefined,
    readOnly: false
  };

  static getTimeSpan(span) {
    const unit = (() => {
      if (span % UNIT_HOUR === 0) {
        return UNIT_HOUR;
      }

      if (span % UNIT_MINUTE === 0) {
        return UNIT_MINUTE;
      }

      return UNIT_SECOND;
    })();

    return { number: span / unit, unit };
  }

  insertCondition() {
    const { config, onChange } = this.props;
    const { condition } = config;

    condition.push({
      left: '',
      op: '',
      right: ''
    });

    onChange(_.set(config, 'condition', condition));
  }

  removeCondition(index) {
    const { config, onChange } = this.props;
    const { condition, groupby } = config;

    condition.splice(index, 1);
    groupby.splice(index, 1);

    _.set(config, 'groupby', groupby);
    _.set(config, 'condition', condition);

    onChange(config);
  }

  handleChange(value, key) {
    const { config, onChange } = this.props;
    onChange(_.set(config, key, value));
  }

  handleTimeSpanChange(value, key) {
    const { config, onChange } = this.props;
    let { number, unit } = CountEditor.getTimeSpan(config.interval);

    switch (key) {
      case FORM_TIME_SPAN_NUMBER:
        number = value;
        break;
      case FORM_TIME_SPAN_UNIT:
        unit = value;
        break;
      default:
    }

    onChange(_.set(config, FORM_TIME_SPAN, number * unit));
  }

  render() {
    const { config, fields, readOnly } = this.props;
    const { condition } = config;

    return (
      <div className="editor-content">
        <div className="content-add">
          {
            _.map(condition, (item, index) => {
              const FORM_LEFT = `condition.${index}.left`;
              const FORM_OP = `condition.${index}.op`;
              const FORM_RIGHT = `condition.${index}.right`;
              const FORM_GROUPBY = `groupby.${index}`;

              return (
                <div key={index} className="editor-item" style={{ display: 'block' }}>
                  <i
                    className="iconfont icon-pluscircleo"
                    onClick={() => this.insertCondition()}
                    role="presentation"
                  />
                  <i
                    className="iconfont icon-crosscircleo"
                    onClick={() => {
                      this.removeCondition(index);
                    }}
                    role="presentation"
                  />
                  <StrategyRequiredSelector
                    ref={FORM_LEFT}
                    className="item1"
                    disabled={readOnly}
                    dataList={fields}
                    value={_.find(fields, { value: _.get(config, FORM_LEFT) })}
                    onChange={(v) => {
                      const value = _.get(v, 'value');
                      this.handleChange(value, FORM_LEFT);
                      this.handleChange(value, FORM_GROUPBY);
                    }}
                    error={_.get(config, `error.${FORM_LEFT}`)}
                    onError={(value, key) => {
                      this.handleChange('', `error.${FORM_LEFT}.${key}`);
                    }}
                    onFocus={() => {
                      this.handleChange(null, `error.${FORM_LEFT}`);
                    }}
                  />
                  <StrategyRequiredSelector
                    ref={FORM_OP}
                    className="item2"
                    disabled={readOnly}
                    value={_.find(ops, { value: _.get(config, FORM_OP) })}
                    dataList={ops}
                    onChange={v => this.handleChange(_.get(v, 'value'), FORM_OP)}
                    error={_.get(config, `error.${FORM_OP}`)}
                    onError={(value, key) => {
                      this.handleChange('', `error.${FORM_OP}.${key}`);
                    }}
                    onFocus={() => {
                      this.handleChange(null, `error.${FORM_OP}`);
                    }}
                  />
                  {
                    (() => {
                      switch (item.op) {
                        case '=':
                          return (
                            <StrategyRequiredSelector
                              ref={FORM_RIGHT}
                              className="item3"
                              disabled={readOnly}
                              value={_.find(fields, { value: _.get(config, FORM_RIGHT) })}
                              dataList={fields}
                              onChange={v => this.handleChange(_.get(v, 'value'), FORM_RIGHT)}
                              error={_.get(config, `error.${FORM_RIGHT}`)}
                              onError={(value, key) => {
                                this.handleChange('', `error.${FORM_RIGHT}.${key}`);
                              }}
                              onFocus={() => {
                                this.handleChange(null, `error.${FORM_RIGHT}`);
                              }}
                            />
                          );
                        default:
                          return (
                            <StrategyRequiredInput
                              ref={FORM_RIGHT}
                              type="text"
                              placeholder="输入"
                              disabled={readOnly}
                              className="input-item"
                              value={_.get(config, FORM_RIGHT)}
                              onChange={value => this.handleChange(value, FORM_RIGHT)}
                              error={_.get(config, `error.${FORM_RIGHT}`)}
                              onError={(value, key) => {
                                this.handleChange('', `error.${FORM_RIGHT}.${key}`);
                              }}
                              onFocus={() => {
                                this.handleChange(null, `error.${FORM_RIGHT}`);
                              }}
                            />
                          );
                      }
                    })()
                  }
                </div>
              );
            })
          }
        </div>
        <div className="content-static">
          {
            (() => {
              const { number, unit } = CountEditor.getTimeSpan(config[FORM_TIME_SPAN]);

              return (
                <div className="editor-item">
                  <div className="ex-content-label">时间窗口</div>
                  <InputNumber
                    className="number-input"
                    readOnly={readOnly}
                    defaultValue={number}
                    min={0}
                    step={1}
                    onChange={value => this.handleTimeSpanChange(value, FORM_TIME_SPAN_NUMBER)}
                  />
                  <Selector
                    placeholder="单位"
                    disabled={readOnly}
                    className="time-type"
                    dataList={units}
                    value={_.find(units, { value: unit })}
                    onChange={({ value }) => this.handleTimeSpanChange(value, FORM_TIME_SPAN_UNIT)}
                  />
                </div>
              );
            })()
          }
          <div className="editor-item">
            <div className="ex-content-label">算法</div>
            <Selector
              className="calculation-selector"
              disabled={readOnly}
              value={_.find(distincts, { value: config[FORM_ALGOTITHM] })}
              dataList={distincts}
              onChange={({ value }) => this.handleChange(value, FORM_ALGOTITHM)}
            />
            <Selector
              className="calculation"
              disabled={readOnly}
              value={_.find(fields, { value: _.get(config, FORM_OPERAND) })}
              dataList={fields}
              onChange={({ value }) => this.handleChange(value, FORM_OPERAND)}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default CountEditor;
