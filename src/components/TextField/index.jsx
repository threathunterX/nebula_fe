import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './index.scss';

class TextField extends Component {
  static propTypes = {
    className: PropTypes.string,
    placeholder: PropTypes.string,
    errorText: PropTypes.string,
    inputClass: PropTypes.string,
    type: PropTypes.string,
    onFocus: PropTypes.func,
    onChange: PropTypes.func,
    onBlur: PropTypes.func,
    isError: PropTypes.bool
  };
  static defaultProps = {
    onFocus: undefined,
    onBlur: undefined,
    onChange: undefined,
    isError: false,
    className: '',
    errorText: '',
    inputClass: '',
    type: 'text',
    placeholder: ''
  };

  // 修改文字
  onChange(event) {
    if (this.props.onChange) {
      this.props.onChange(event);
    }
  }

  // 聚焦
  onFocus(event) {
    if (this.props.onFocus) {
      this.props.onFocus(event);
    }
  }

  // 失焦
  onBlur(event) {
    if (this.props.onBlur) {
      this.props.onBlur(event);
    }
  }

  render() {
    const {
      className,
      placeholder,
      errorText,
      type,
      inputClass = '',
      isError,
      ...others
    } = this.props;

    return (
      <div className={`text-field ${className}`}>
        <input
          type={type}
          placeholder={placeholder}
          className={`${isError ? 'error-border' : ''} ${inputClass}`}
          onChange={(e) => {
            this.onChange(e);
          }}
          onFocus={(e) => {
            this.onFocus(e);
          }}
          onBlur={(e) => {
            this.onBlur(e);
          }}
          {...others}
        />
        {isError ? (<div className="prompt">{`＊${errorText}`}</div>) : ''}
      </div>
    );
  }
}

export default TextField;
