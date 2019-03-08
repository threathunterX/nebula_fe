import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';

import SearchSelect from '../SearchSelect';
import VariableList from '../VariableList';

class VariableSearchSelect extends Component {
  static propTypes = {
    items: PropTypes.oneOfType([PropTypes.object]).isRequired,
    onChange: PropTypes.func.isRequired
  };
  static defaultProps = {
    children: null
  };

  constructor(props) {
    super(props);
    this.state = {
      keyword: ''
    };
  }

  render() {
    const { items, onChange } = this.props;
    const regex = new RegExp(this.state.keyword, 'i');
    const list = (
      <VariableList
        items={_.pickBy(items, (item, key) => (regex.test(key) || regex.test(_.get(item, 'display_name'))))}
        onChange={onChange}
      />
    );

    return (
      <SearchSelect
        placeholder="搜索关键字"
        className="list variable-search-select"
        list={list}
        keyword={this.state.keyword}
        onKeywordChange={keyword => this.setState({ keyword })}
      />
    );
  }
}

export default VariableSearchSelect;
