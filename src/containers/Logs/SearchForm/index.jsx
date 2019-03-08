import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import _ from 'lodash';

import Selector from '../../../components/Selector';
import DatePicker from '../../../components/DatePicker';
import LabelPicker from '../../../components/LabelPicker';
import Input from '../../../components/Input';

import './index.scss';

const KEY_REMARK = 'form.remark';
const KEY_NAME = 'form.event_name';
const KEY_FIELDS = 'form.show_cols';
const KEY_TERMS = 'form.terms';
const KEY_FROM_TIME = 'form.fromtime';
const KEY_END_TIME = 'form.endtime';

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
// const START_WITH = '以..开始';
// const NOT_START_WITH = '不以..开始';
// const END_WITH = '以..结束';
// const NOT_END_WITH = '不以..结束';
const CONTAIN_REGEX = '包含正则';
const NOT_CONTAIN_REGEX = '不包含正则';
// const EQUAL_TO_VARIABLE = '等于变量';

const ops = {
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
  // [START_WITH]: 'startwith',
  // [NOT_START_WITH]: '!startwith',
  // [END_WITH]: 'endwith',
  // [NOT_END_WITH]: '!endwith',
  [CONTAIN_REGEX]: 'regex',
  [NOT_CONTAIN_REGEX]: '!regex'
  // [EQUAL_TO_VARIABLE]: '='
};

const ERROR_EMPTY_DATE = '日期不能为空';
const ERROR_EVENT_TYPE = '类型不能为空';
const ERROR_CONDITION = '搜索条件不能为空';
const ERROR_TAGS = '标签不能为空';

const getOperators = (type) => {
  switch (type) {
    case 'long':
    case 'double':
      return _.pick(ops, [
        GREATER_THAN,
        LESS_THAN,
        GREATER_THAN_OR_EQUAL_TO,
        LESS_THAN_OR_EQUAL_TO,
        EQUAL_TO,
        NOT_EQUAL_TO,
        BETWEEN,
        IN,
        NOT_IN
      ]);
    default:
      return _.pick(ops, [
        EQUAL_TO,
        NOT_EQUAL_TO,
        IN,
        NOT_IN,
        CONTAIN,
        NOT_CONTAIN,
        // START_WITH,
        // NOT_START_WITH,
        // END_WITH,
        // NOT_END_WITH,
        CONTAIN_REGEX,
        NOT_CONTAIN_REGEX
      ]);
  }
};

class SearchForm extends Component {
  static propTypes = {
    onChange: PropTypes.func.isRequired,
    form: PropTypes.oneOfType([PropTypes.object]),
    events: PropTypes.oneOfType([PropTypes.array]),
    error: PropTypes.oneOfType([PropTypes.object]),
    readOnly: PropTypes.bool
  };
  static defaultProps = {
    readOnly: false,
    form: undefined,
    events: undefined,
    error: undefined
  };

  constructor(props) {
    super(props);

    this.state = {
      remarks: ''
    };
  }

  // 输入框数据变化
  onInputBlur(e, KEY_VALUE, isArray) {
    const {
      onChange
    } = this.props;

    let value = e.target.value;

    // 以逗号分隔的数组
    if (isArray) {
      value = value.split(',');
    }
    // 如果字符串中有反斜杠
    if (value.indexOf('\\') >= 0) {
      value = value.split('\\').join('\\\\');
    }

    onChange(value, KEY_VALUE);
  }

  render() {
    const { events, form, onChange, readOnly, error } = this.props;
    const timestamp = moment().valueOf();
    const name = _.get(this.props, KEY_NAME);
    const remark = _.get(this.props, KEY_REMARK);
    const names = _.map(events, ({ name: event }) => ({ text: event, value: event }));// 事件类型
    const fields = _.map(_.get(_.find(events, { name }), 'fields'), ({ name: event }) => ({
      text: event,
      value: event
    }));// 字段
    const { terms } = form;

    return (
      <form className="log-search-form cf">
        <section>
          <div className="form-item">
            <span className="label">备注名</span>
            <Input
              placeholder="12个汉字/字符"
              disabled={readOnly}
              value={remark}
              onChange={value => onChange(value.substring(0, 12), KEY_REMARK)}
            />
          </div>
          <div className={`form-item ${_.get(error, ERROR_EVENT_TYPE) ? 'error' : ''}`}>
            <span className="label">*事件类型</span>
            <Selector
              className="form-item-value"
              disabled={readOnly}
              selectorType="list"
              dataList={names}
              value={_.find(names, { value: name })}
              onChange={({ value }) => onChange(value, KEY_NAME)}
            />
          </div>
          <div className={`form-item ${_.get(error, ERROR_TAGS) ? 'error' : ''}`}>
            <span className="label">*字段显示</span>

            <div>
              <LabelPicker
                className="cls form-item-value"
                readOnly={readOnly}
                items={_.map(fields, item => item.value)}
                selectedLabels={_.filter(_.get(this.props, KEY_FIELDS), item => item !== 'timestamp')}
                onChange={values => onChange(values, KEY_FIELDS)}
              />
            </div>
          </div>
        </section>
        <section>
          <div className={`form-item ${_.get(error, ERROR_CONDITION) ? 'error' : ''}`}>
            <span className="label">*搜索条件</span>
            <ul key={timestamp}>
              {
                _.map(terms, (item, index) => {
                  const KEY_TERM = `form.terms.${index}`;
                  const KEY_FIELD = `${KEY_TERM}.left`;
                  const KEY_OP = `${KEY_TERM}.op`;
                  const KEY_VALUE = `${KEY_TERM}.right`;
                  const field = _.find(fields, { value: _.get(this.props, KEY_FIELD) });
                  const opList = _.map(getOperators(_.get(field, 'type')), (value, text) => ({ text, value }));

                  const curop = _.get(this.props, KEY_OP);

                  const isArray = (curop === ops[IN] || curop === ops[NOT_IN]);
                  let inputValue = _.get(this.props, KEY_VALUE);
                  // 数组则转换为字符串
                  if (inputValue instanceof Array) {
                    inputValue = inputValue.join(',');
                  }

                  const opItem = _.find(opList, { value: _.get(this.props, KEY_OP) });

                  return (
                    <li key={index}>
                      <Selector
                        className={field && field.value !== '' ? '' : 'form-item-value'}
                        disabled={readOnly}
                        selectorType="list"
                        dataList={fields}
                        value={field}
                        onChange={({ value }) => onChange(value, KEY_FIELD)}
                      />
                      <Selector
                        className={opItem && opItem.value !== '' ? '' : 'form-item-value'}
                        disabled={readOnly}
                        selectorType="list"
                        dataList={opList}
                        value={opItem}
                        onChange={({ value }) => onChange(value, KEY_OP)}
                      />
                      <input
                        disabled={readOnly}
                        type="text"
                        placeholder={isArray ? '变量之间使用,分隔' : ''}
                        className={`normal-input${inputValue === '' || inputValue === undefined ? ' form-item-value' : ''}`}
                        defaultValue={inputValue}
                        onBlur={e => this.onInputBlur(e, KEY_VALUE, isArray)}
                      />
                      {
                        index || terms.length > 2 ? (
                          <i
                            className="iconfont icon-minuscircleo"
                            onClick={() =>
                              onChange(_.remove(terms, (term, i) => (i !== index)), KEY_TERMS)}
                            role="presentation"
                          />
                        ) : <i className="iconfont icon-minuscircleo disabled" />
                      }
                      {
                        readOnly ? (
                          <i className="iconfont icon-pluscircleo disabled" />
                        ) : (
                          <i
                            className="iconfont icon-pluscircleo"
                            onClick={() => onChange(_.set(terms, terms.length, {}), KEY_TERMS)}
                            role="presentation"
                          />
                        )
                      }
                    </li>
                  );
                })
              }
            </ul>
          </div>
          <div className={`form-item ${_.get(error, ERROR_EMPTY_DATE) ? 'error' : ''}`}>
            <span className="label">*时间范围</span>

            <div>
              <DatePicker
                className="form-item-value"
                disabled={readOnly}
                placeholder="开始日期"
                value={_.get(this.props, KEY_FROM_TIME)}
                onChange={value => onChange(value, KEY_FROM_TIME)}
              />

              &nbsp;~&nbsp;

              <DatePicker
                className="form-item-value"
                disabled={readOnly}
                placeholder="结束日期"
                value={_.get(this.props, KEY_END_TIME)}
                onChange={value => onChange(value, KEY_END_TIME)}
              />

            </div>
          </div>
          {
            Object.values(error).indexOf(true) >= 0 ? <div className="form-item-error">请填写信息</div> : null
          }
        </section>
      </form>
    );
  }
}

export default SearchForm;
