import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './index.scss';

class Paper extends Component {
  static propTypes = {
    /**
     * Children passed into the paper element.
     */
    children: PropTypes.node,
    /**
     * The css class name of the root element.
     */
    className: PropTypes.string
  };
  static defaultProps = {
    children: null,
    className: ''
  };

  render() {
    const {
      children,
      className,
      ...other
    } = this.props;

    return (
      <div {...other} className={`wc-paper ${className}`} >
        {children}
      </div>
    );
  }
}

export default Paper;
