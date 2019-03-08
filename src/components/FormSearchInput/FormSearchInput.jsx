import React, { Component } from 'react';
import PropTypes from 'prop-types';

import SearchInput from '../SearchInput';
import './index.scss';


class FormSearchInput extends Component {
  static propTypes = {
    onChange: PropTypes.func.isRequired,
    keyword: PropTypes.string.isRequired,
    onSubmit: PropTypes.func,
    placeholder: PropTypes.string,
    placeholderWidth: PropTypes.number,
    className: PropTypes.string
  };
  static defaultProps = {
    placeholder: '',
    className: '',
    placeholderWidth: undefined,
    onSubmit: undefined
  };

  render() {
    const {
      placeholder,
      keyword,
      onChange,
      className,
      placeholderWidth,
      onSubmit
    } = this.props;

    return (
      <SearchInput
        className={`wd-form-search ${className}`}
        placeholder={placeholder}
        keyword={keyword}
        onChange={onChange}
        placeholderWidth={placeholderWidth}
        onSubmit={onSubmit}
      />
    );
  }
}

export default FormSearchInput;
