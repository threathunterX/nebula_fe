import React, { Component } from 'react';
import PropTypes from 'prop-types';
import InputNumber from 'rc-input-number';
import _ from 'lodash';

import Selector from '../Selector';

import '../InputNumber/index.scss';

import './index.scss';

const DURATION = 'duration';
const UNIT = 'unit';

const units = [{
  value: 'm',
  text: '分钟'
}, {
  value: 's',
  text: '秒'
}];

class SleepEditor extends Component {
  static propTypes = {
    config: PropTypes.oneOfType([PropTypes.object]),
    onChange: PropTypes.func,
    readOnly: PropTypes.bool
  };
  static defaultProps = {
    config: undefined,
    onChange: undefined,
    readOnly: false
  };

  handleChange(value, key) {
    const { config, onChange } = this.props;
    onChange(_.set(config, key, value));
  }

  render() {
    const { config, readOnly } = this.props;

    return (
      <div className="editor-content">
        <div className="editor-item">
          <div className="sleep-duration">延迟</div>
          <InputNumber
            className="number-input"
            readOnly={readOnly}
            defaultValue={_.get(config, DURATION)}
            min={0}
            step={1}
            onChange={value => this.handleChange(value, DURATION)}
          />
          <Selector
            className="input-item"
            value={_.find(units, { value: _.get(config, UNIT) })}
            dataList={units}
            onChange={({ value }) => this.handleChange(value, UNIT)}
          />
        </div>
      </div>
    );
  }
}

export default SleepEditor;
