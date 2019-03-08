import React from 'react';
import PropTypes from 'prop-types';

const Tooltip = (tooltip) => (Component) => (
  class extends React.Component {
    render() {
      return (
        <div>
          <Component {...this.props}/>
          <div>{tooltip}</div>
        </div>
      )
    }
  }
);

export default Tooltip;
