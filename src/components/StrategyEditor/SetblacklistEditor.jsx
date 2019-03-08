import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import InputNumber from 'rc-input-number';

import Selector from '../Selector';
import LabelCreator from '../LabelCreator';
import LabelInput from '../LabelInput';
import HttpService from '../../components/HttpService';
import StrategyRequiredSelector from '../Strategies/StrategyRequiredSelector';

import {
  CHECK_TYPE_MAP,
  DECISION_MAP,
  TIME_UNIT_MAP,
  TIME_UNIT_SECOND,
  TIME_UNIT_MINUTE,
  TIME_UNIT_HOUR,
  URI_TAGS
} from '../../constants';
import './index.scss';

const checkTypes = _.map(CHECK_TYPE_MAP, (value, key) => ({ text: key, value }));
const decisions = _.map(DECISION_MAP, (value, key) => ({ text: key, value }));
const timeUnits = _.map(TIME_UNIT_MAP, (value, key) => ({ text: key, value }));

const FORM_REMARK = 'remark';
const FORM_CHECK_TYPE = 'checktype';
const FORM_DECISION = 'decision';
const FORM_CHECK_VALUE = 'checkvalue';
const FORM_CHECK_POINTS = 'checkpoints';
const FORM_TTL = 'ttl';

const FORM_TIME_SPAN_NUMBER = `${FORM_TTL}.number`;
const FORM_TIME_SPAN_UNIT = `${FORM_TTL}.unit`;
const FORM_TAGS = 'tags';

class SetblacklistEditor extends Component {
  static propTypes = {
    config: PropTypes.oneOfType([PropTypes.object]),
    item: PropTypes.oneOfType([PropTypes.object]),
    tags: PropTypes.oneOfType([PropTypes.array]),
    fields: PropTypes.oneOfType([PropTypes.array]),
    onChange: PropTypes.func,
    onChange2: PropTypes.func,
    readOnly: PropTypes.bool
  };
  static defaultProps = {
    tags: undefined,
    fields: undefined,
    item: undefined,
    config: undefined,
    onChange: undefined,
    onChange2: undefined,
    readOnly: false
  };

  static getTimeSpan(span) {
    const unit = (() => {
      if (span % TIME_UNIT_HOUR === 0) {
        return TIME_UNIT_HOUR;
      }

      if (span % TIME_UNIT_MINUTE === 0) {
        return TIME_UNIT_MINUTE;
      }

      return TIME_UNIT_SECOND;
    })();

    return { number: span / unit, unit };
  }

  static handleTagsSubmit(name) {
    HttpService.post({
      url: URI_TAGS,
      params: [{ name }],
      onSuccess: () => {
      }
    });
  }

  handleChange(value, key) {
    const { config, onChange } = this.props;
    onChange(_.set(config, key, value));
  }

  handleTagsChange(value) {
    const { onChange2 } = this.props;
    onChange2(value);
  }

  handleTimeSpanChange(value, key) {
    const { config, onChange } = this.props;
    let { number, unit } = SetblacklistEditor.getTimeSpan(config.ttl);

    switch (key) {
      case FORM_TIME_SPAN_NUMBER:
        number = value;
        break;
      case FORM_TIME_SPAN_UNIT:
        unit = value;
        break;
      default:
    }

    onChange(_.set(config, FORM_TTL, number * unit));
  }

  render() {
    const { item, config, fields, tags, readOnly } = this.props;

    return (
      <div className="editor-content">
        <div className="content-left">
          <div className="editor-item">
            <span className="label">值类型</span>
            <StrategyRequiredSelector
              ref="checktype"
              disabled={readOnly}
              className="black-list-item"
              dataList={checkTypes}
              value={_.find(checkTypes, { value: config[FORM_CHECK_TYPE] })}
              onChange={v => this.handleChange(_.get(v, 'value'), FORM_CHECK_TYPE)}
              error={_.get(config, 'error.source_event_key')}
              onError={(value, key) => {
                this.handleChange('', `error.source_event_key.${key}`);
              }}
              onFocus={() => {
                this.handleChange(null, 'error.source_event_key');
              }}
            />
          </div>
          <div className="editor-item">
            <span className="label">风险值</span>
            <StrategyRequiredSelector
              ref="checkvalue"
              disabled={readOnly}
              className="black-list-item"
              dataList={fields}
              value={_.find(fields, { value: config[FORM_CHECK_VALUE] })}
              onChange={v => this.handleChange(_.get(v, 'value'), FORM_CHECK_VALUE)}
              error={_.get(config, 'error.source_event_key')}
              onError={(value, key) => {
                this.handleChange('', `error.source_event_key.${key}`);
              }}
              onFocus={() => {
                this.handleChange(null, 'error.source_event_key');
              }}
            />
          </div>
          <div className="editor-item">
            <span className="label">备注</span>
            <input
              disabled={readOnly}
              type="text"
              placeholder="请输入备注"
              className="black-list-item"
              value={config[FORM_REMARK]}
              onChange={e => this.handleChange(e.target.value, FORM_REMARK)}
            />
          </div>
        </div>
        <div className="content-center">
          <div className="editor-item">
            <span className="label">子场景代码</span>
            <LabelInput
              disabled={readOnly}
              labelList={config[FORM_CHECK_POINTS] ? config[FORM_CHECK_POINTS].split(',') : []}
              labelClass="label-item"
              onChange={values => this.handleChange(values.join(','), FORM_CHECK_POINTS)}
            />
          </div>
          <div className="editor-item">
            <span className="label">风险决策</span>
            <StrategyRequiredSelector
              ref="decision"
              disabled={readOnly}
              className="black-list-item"
              dataList={decisions}
              value={_.find(decisions, { value: config[FORM_DECISION] })}
              onChange={v => this.handleChange(_.get(v, 'value'), FORM_DECISION)}
              error={_.get(config, 'error.source_event_key')}
              onError={(value, key) => {
                this.handleChange('', `error.source_event_key.${key}`);
              }}
              onFocus={() => {
                this.handleChange(null, 'error.source_event_key');
              }}
            />
          </div>
          {
            (() => {
              const { number, unit } = SetblacklistEditor.getTimeSpan(config[FORM_TTL]);

              return (
                <div className="editor-item">
                  <span className="label">有效期</span>
                  <InputNumber
                    className="number-input"
                    disabled={readOnly}
                    defaultValue={number || 0}
                    min={0}
                    step={1}
                    onChange={value => this.handleTimeSpanChange(value, FORM_TIME_SPAN_NUMBER)}
                  />
                  <Selector
                    disabled={readOnly}
                    placeholder="单位"
                    className="time-type"
                    dataList={timeUnits}
                    value={_.find(timeUnits, { value: unit })}
                    onChange={({ value }) => this.handleTimeSpanChange(value, FORM_TIME_SPAN_UNIT)}
                  />
                </div>
              );
            })()
          }
        </div>
        <div className="content-right">
          <div className="editor-item">
            <span className="label">风险标签</span>
            <LabelCreator
              disabled={readOnly}
              className="black-list-item"
              labelList={tags}
              selectedLabel={item.tags}
              onChange={(values) => {
                SetblacklistEditor.handleTagsSubmit(_.last(values));
              }}
              onSelect={(values) => {
                this.handleTagsChange(values, FORM_TAGS);
              }}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default SetblacklistEditor;
