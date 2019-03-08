import React from 'react';
import PropTypes from 'prop-types';

const StrategiesDecorator = (Component) => (
  class extends React.Component {
    render() {
      const { value, ...others } = this.props;

      return (
        <Component {...others} value={value} />
      );
    }
  }
);

export default StrategiesDecorator;
