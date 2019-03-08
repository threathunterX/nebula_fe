import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './index.scss';

class CheckBox extends Component {
  static propTypes = {
    disabled: PropTypes.bool,
    checked: PropTypes.bool,
    onClick: PropTypes.func
  };
  static defaultProps = {
    onClick: undefined,
    checked: false,
    disabled: false
  };

  // 点击checkbox
  onCheck(e) {
    const {
      onClick,
      disabled
    } = this.props;

    if (disabled) {
      return;
    }

    if (onClick) {
      onClick(e);
    }
  }

  render() {
    const {
      disabled,
      checked
    } = this.props;

    return (
      <div
        className={`check-box-icon ${checked ? 'checked' : ''} ${disabled ? 'disabled' : ''}`}
        onClick={(e) => {
          this.onCheck(e);
        }}
        role="presentation"
      >
        <i className="iconfont icon-check" />
      </div>
    );
  }
}

export default CheckBox;
