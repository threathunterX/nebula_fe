import React from 'react';
import PropTypes from 'prop-types';

class TagBadge extends React.Component {
  render() {
    const { text, count } = this.props;

    return (
      <div>
        <span>{text}</span>
        <span>{count}</span>
      </div>
    );
  }
}

export default TagBadge;
