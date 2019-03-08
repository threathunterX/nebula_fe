import React, { Component } from 'react';
import PropTypes from 'prop-types';

class SearchInput extends Component {
  static propTypes = {
    onSubmit: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);
    this.state = { value: '' };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    this.setState({ value: e.target.value });
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.onSubmit(this.state.value);
  }

  render() {
    const { value } = this.state;

    return (
      <form onSubmit={this.handleSubmit} >
        <input type="text" value={value} onChange={this.handleChange} />
      </form>
    )
  }
}

export default SearchInput;
