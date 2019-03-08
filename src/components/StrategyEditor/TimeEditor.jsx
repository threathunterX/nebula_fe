import React, { Component } from 'react';
import PropTypes from 'prop-types';
import InputNumber from 'rc-input-number';
import _ from 'lodash';

import './index.scss';

class TimeEditor extends Component {
  static propTypes = {
    config: PropTypes.oneOfType([PropTypes.object]),
    onChange: PropTypes.func
  };
  static defaultProps = {
    config: undefined,
    onChange: undefined
  };

  handleChange(value, key) {
    const { config, onChange } = this.props;
    onChange(_.set(config, key, value));
  }

  render() {
    const { config } = this.props;
    const { start, end } = config;

    return (
      <div className="editor-content">
        <div className="editor-item">
          <span className="label">当前时间</span>
          <InputNumber
            onChange={value => this.handleChange(_.replace(start, /^\d+/, _.replace(value, /^(\d)$/, '0$1')), 'start')}
            min={0}
            max={23}
            defaultValue={_.toInteger(_.get(_.split(start, ':'), '0'))}
            className="number-input"
            step={1}
          />
          <span>:</span>
          <InputNumber
            onChange={value => this.handleChange(_.replace(start, /\d+$/, _.replace(value, /^(\d)$/, '0$1')), 'start')}
            min={0}
            max={59}
            defaultValue={_.toInteger(_.get(_.split(start, ':'), '1'))}
            className="number-input"
            step={1}
          />
          <span>~</span>
          <InputNumber
            onChange={value => this.handleChange(_.replace(end, /^\d+/, _.replace(value, /^(\d)$/, '0$1')), 'end')}
            min={0}
            max={23}
            defaultValue={_.toInteger(_.get(_.split(end, ':'), '0'))}
            className="number-input"
            step={1}
          />
          <span>:</span>
          <InputNumber
            onChange={value => this.handleChange(_.replace(end, /\d+$/, _.replace(value, /^(\d)$/, '0$1')), 'end')}
            min={0}
            max={59}
            defaultValue={_.toInteger(_.get(_.split(end, ':'), '1'))}
            className="number-input"
            step={1}
          />
        </div>
      </div>
    );
  }
}

export default TimeEditor;
