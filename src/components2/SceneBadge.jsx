import React from 'react';
import PropTypes from 'prop-types';

class SceneBadge extends React.Component {
  render() {
    const { id, count } = this.props;

    return (
      <div>
        <i>{id}</i>
        <sub>{count}</sub>
      </div>
    );
  }
}

export default SceneBadge;
