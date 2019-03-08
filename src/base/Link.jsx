import React from 'react';
import PropTypes from 'prop-types';

class Link extends React.Component {
  render() {
    const { children } = this.props;

    return (
      <a href="" >{children}</a>
    );
  }
}

export default Link;
