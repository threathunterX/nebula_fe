import React from 'react';
import PropTypes from 'prop-types';

const UsersCountDecorator = (Component) => (
  class extends React.Component {
    static propTypes = {
      value: PropTypes.number.isRequired
    };

    render() {
      const { value, ...others } = this.props;

      return (
        <Component {...others} value={value} />
      );
    }
  }
);

export default UsersCountDecorator;
