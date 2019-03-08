import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import SearchInput from '../SearchInput';

class SearchSelect extends PureComponent {
  static propTypes = {
    list: PropTypes.node.isRequired,
    onKeywordChange: PropTypes.func.isRequired,
    placeholder: PropTypes.string.isRequired,
    keyword: PropTypes.string.isRequired,
    className: PropTypes.string.isRequired
  };
  static defaultProps = {
    children: null
  };

  render() {
    const { className, onKeywordChange, keyword, placeholder } = this.props;

    return (
      <div
        className={`search-select ${className}`}
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
        }}
        role="presentation"
      >
        <SearchInput
          placeholder={placeholder}
          keyword={keyword}
          onChange={onKeywordChange}
        />
        {this.props.list}
      </div>
    );
  }
}

export default SearchSelect;
