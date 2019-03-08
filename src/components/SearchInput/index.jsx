import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Input from '../Input';
import './index.scss';

class SearchInput extends Component {
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

  // 聚焦输入框
  static focusInput(e) {
    if (e.target.querySelector('input')) {
      e.target.querySelector('input').focus();
    }
  }

  constructor(props) {
    super(props);
    this.state = {
      focusSearch: false
    };
  }

  // 聚焦搜索框
  focusSearch() {
    this.setState({
      focusSearch: true
    });
  }

  // 搜索框失焦
  blurSearch(e) {
    if (e.target.value !== '' && e.target.value !== undefined) {
      return;
    }
    this.setState({
      focusSearch: false
    });
  }

  render() {
    const { focusSearch } = this.state;
    const {
      placeholder,
      keyword,
      onChange,
      className,
      placeholderWidth,
      onSubmit
    } = this.props;

    return (
      <div
        className={`search-input ${className}`}
        onClick={e => SearchInput.focusInput(e)}
        style={{ width: 220 }}
        role="presentation"
      >
        <i
          className="iconfont icon-search"
          style={{ width: keyword || focusSearch ? '0px' : '12px', opacity: keyword || focusSearch ? '0' : '1' }}
        />
        <Input
          type="text"
          placeholder={placeholder}
          style={{ width: keyword || focusSearch ? '100%' : `${placeholderWidth || 100}px` }}
          value={keyword}
          onSubmit={onSubmit}
          onChange={onChange}
          onFocus={() => this.focusSearch()}
          onBlur={e => this.blurSearch(e)}
        />
      </div>
    );
  }
}

export default SearchInput;
