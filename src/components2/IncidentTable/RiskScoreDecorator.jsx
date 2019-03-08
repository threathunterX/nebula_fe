import React from 'react';
import PropTypes from 'prop-types';

const Decorator = (Component) => (
  class extends React.Component {
    render() {
      return (
        <Component {...this.props} />
      );
    }
  }
);

export default Decorator;
