import React from 'react';
import PropTypes from 'prop-types';

const MostVisitedDecorator = (Component) => (
  class  extends React.Component {
    static propTypes = {
      value: PropTypes.string.isRequired
    };

    render() {
      const { value, ...others } = this.props;

      return (
        <Component {...others} value={value} />
      );
    }
  }
);

export default MostVisitedDecorator;
