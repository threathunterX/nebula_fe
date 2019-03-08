import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import RcSwitch from 'rc-switch';

import './index.scss';

class Switch extends PureComponent {
  static propTypes = {
    checkedChildren: PropTypes.oneOfType([PropTypes.any]),
    unCheckedChildren: PropTypes.oneOfType([PropTypes.any]),
    className: PropTypes.string,
    type: PropTypes.string
  };
  static defaultProps = {
    checkedChildren: null,
    unCheckedChildren: null,
    type: '',
    className: ''
  };

  render() {
    const {
      checkedChildren,
      unCheckedChildren,
      className,
      type,
      ...other
    } = this.props;

    let longBtn = false;

    if (checkedChildren && unCheckedChildren &&
      (checkedChildren.length > 1 || unCheckedChildren.length > 1)) {
      longBtn = true;
    }

    return (

      <RcSwitch
        className={`${className} ${longBtn ? 'long-btn' : ''} ${type === 'tableItem' ? 'table-item' : ''}`}
        checkedChildren={checkedChildren}
        unCheckedChildren={unCheckedChildren}
        {...other}
      />
    );
  }
}

export default Switch;
