import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';

import './index.scss';

class LabelPicker extends Component {
  static propTypes = {
    onChange: PropTypes.func,
    className: PropTypes.string,
    items: PropTypes.oneOfType([PropTypes.array]),
    selectedLabels: PropTypes.oneOfType([PropTypes.array]),
    style: PropTypes.oneOfType([PropTypes.object]),
    readOnly: PropTypes.bool
  };
  static defaultProps = {
    items: [],
    selectedLabels: [],
    className: '',
    onChange() {
    },
    style: undefined,
    readOnly: false
  };

  handleSelect(value) {
    const {
      readOnly,
      selectedLabels,
      onChange
    } = this.props;

    if (readOnly) {
      return;
    }

    const values = _.clone(selectedLabels);
    const index = _.indexOf(values, value);
    if (index > -1) {
      values.splice(index, 1);
    } else {
      values.push(value);
    }

    onChange(values);
  }

  render() {
    const {
      className,
      readOnly,
      selectedLabels,
      items,
      style
    } = this.props;

    return (
      <div className={`label-picker ${className}`} style={style}>
        {
          _.map(
            readOnly ? selectedLabels : items,
            (value, index) => (
              <div
                key={index}
                onClick={() => {
                  this.handleSelect(value);
                }}
                className={`label-${readOnly ? 'disable' : 'selectable'} ${_.includes(selectedLabels, value) ? 'active' : ''}`}
                role="presentation"
              >
                {value}
              </div>
            )
          )
        }
      </div>
    );
  }
}

export default LabelPicker;
