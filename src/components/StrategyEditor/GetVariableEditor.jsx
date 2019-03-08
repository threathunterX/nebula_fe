import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import StrategyRequiredSelector from '../Strategies/StrategyRequiredSelector';

import './index.scss';

const FORM_KEYS = 'trigger.keys.0';

class GetVariableEditor extends Component {
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

    return (
      <div className="editor-content">
        <div className="editor-item">
          <StrategyRequiredSelector
            ref="keys"
            disabled={readOnly}
            className="item1"
            dataList={fields}
            value={_.find(fields, { value: _.get(config, FORM_KEYS) })}
            onChange={item => this.handleChange(_.get(item, 'value'), FORM_KEYS)}
            error={_.get(config, 'error.trigger.keys')}
            onError={(value, key) => {
              this.handleChange('', `error.trigger.keys.${key}`);
            }}
            onFocus={() => {
              this.handleChange(null, 'error.trigger.keys');
            }}
          />
        </div>
      </div>
    );
  }
}

export default GetVariableEditor;
