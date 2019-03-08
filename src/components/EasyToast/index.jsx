import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import Tooltip from 'rc-tooltip';

import './index.scss';

class EasyToast extends PureComponent {
  static propTypes = {
    overlayClassName: PropTypes.string,
    animation: PropTypes.string,
    trigger: PropTypes.string,
    placement: PropTypes.string,
    children: PropTypes.oneOfType([PropTypes.any])
  };
  static defaultProps = {
    overlayClassName: '',
    animation: undefined,
    trigger: 'hover',
    placement: 'top',
    children: null
  };

  render() {
    const {
      children,
      overlayClassName,
      animation,
      trigger,
      placement,
      ...other
    } = this.props;

    return (
      <Tooltip
        animation={animation}
        trigger={trigger}
        placement={placement}
        overlayClassName={`easy-toast ${overlayClassName}`}
        {...other}
      >
        {children}
      </Tooltip>
    );
  }

}

export default EasyToast;
