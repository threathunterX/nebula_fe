import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';

import StrategyRequiredSelector from '../Strategies/StrategyRequiredSelector';
import StrategyRequiredSelect from '../Strategies/StrategyRequiredSelect';

import './index.scss';

const cities = _.map(require('../../constants/cities').default, value => ({ text: value, value }));
const provinces = _.map(require('../../constants/provinces').default, value => ({ text: value, value }));

const types = [
  {
    text: '省',
    value: 'province'
  },
  {
    text: '市',
    value: 'city'
  }
];

const operators = [
  {
    text: '属于',
    value: 'belong'
  },
  {
    text: '不属于',
    value: '!belong'
  },
  {
    text: '等于',
    value: '='
  },
  {
    text: '不等于',
    value: '!='
  }
];

const FORM_SOURCE_EVENT_KEY = 'source_event_key';
const FORM_LOCATION_TYPE = 'location_type';
const FORM_OP = 'op';
const FORM_LOCATION_STRING = 'location_string';

class GetLocationEditor extends Component {
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

  handleChange(value, key) {
    const { config, onChange } = this.props;
    onChange(_.set(config, key, value));
  }

  render() {
    const { config, fields, readOnly } = this.props;
    const type = _.get(config, FORM_LOCATION_TYPE);

    const locationString =
      _.map(_.get(config, FORM_LOCATION_STRING), value => ({ text: value, value }));

    return (
      <div className="editor-content">
        <div className="editor-item">
          <StrategyRequiredSelector
            ref="source_event_key"
            disabled={readOnly}
            className="item1"
            value={_.find(fields, { value: _.last(_.split(_.get(config, FORM_SOURCE_EVENT_KEY), '.')) })}
            dataList={fields}
            onChange={item => this.handleChange(_.join(_.set(_.split(_.get(config, FORM_SOURCE_EVENT_KEY), '.'), '2', _.get(item, 'value')), '.'), FORM_SOURCE_EVENT_KEY)}
            error={_.get(config, 'error.source_event_key')}
            onError={(value, key) => {
              this.handleChange('', `error.source_event_key.${key}`);
            }}
            onFocus={() => {
              this.handleChange(null, 'error.source_event_key');
            }}
          />
          <span>的</span>
          <StrategyRequiredSelector
            ref="location_type"
            disabled={readOnly}
            className="item2"
            value={_.find(types, { value: _.get(config, FORM_LOCATION_TYPE) })}
            dataList={types}
            onChange={item => this.handleChange(_.get(item, 'value'), FORM_LOCATION_TYPE)}
            error={_.get(config, 'error.location_type')}
            onError={(value, key) => {
              this.handleChange('', `error.location_type.${key}`);
            }}
            onFocus={() => {
              this.handleChange(null, 'error.location_type');
            }}
          />
        </div>
        <div className="editor-item">
          <StrategyRequiredSelector
            ref="op"
            disabled={readOnly}
            className="item1"
            value={_.find(operators, { value: _.get(config, FORM_OP) })}
            dataList={operators}
            onChange={item => this.handleChange(_.get(item, 'value'), FORM_OP)}
            error={_.get(config, 'error.op')}
            onError={(value, key) => {
              this.handleChange('', `error.op.${key}`);
            }}
            onFocus={() => {
              this.handleChange(null, 'error.op');
            }}
          />
        </div>
        <StrategyRequiredSelect
          ref="location_string"
          type="multiple"
          placeholder="添加省或市名称"
          disabled={readOnly}
          defaultValue={locationString}
          value={locationString}
          dataList={_.concat(fields, (() => {
            switch (type) {
              case 'city':
                return cities;
              case 'province':
                return provinces;
              default:
                return [];
            }
          })())}
          className="input-item"
          style={{ width: 300 }}
          onChange={(values) => {
            this.handleChange(values, FORM_LOCATION_STRING);
          }}
          error={_.get(config, 'error.location_string')}
          onError={(value, key) => {
            this.handleChange('', `error.location_string.${key}`);
          }}
          onFocus={() => {
            this.handleChange(null, 'error.location_string');
          }}
        />
      </div>
    );
  }
}

export default GetLocationEditor;
