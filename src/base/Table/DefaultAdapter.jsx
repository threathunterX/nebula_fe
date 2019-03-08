import React from 'react';
import PropTypes from 'prop-types';

class DefaultAdapter extends React.Component {
  render() {
    const { value } = this.props;

    return (
      <span>{ value }</span>
    );
  }
}

export default DefaultAdapter;
