import React from 'react';
import PropTypes from 'prop-types';

const HOCTodo = (Todo) => (
  class extends React.Component {
    render() {
      return (
        <Todo {...this.props}/>
      );
    }
  }
);

export default HOCTodo;
