import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Tooltip from 'rc-tooltip';

import './index.scss';

class PopConfirm extends Component {
  static propTypes = {
    overlay: PropTypes.node,
    children: PropTypes.node,
    okText: PropTypes.string,
    cancelText: PropTypes.string,
    overlayClassName: PropTypes.string,
    trigger: PropTypes.string,
    onConfirm: PropTypes.func,
    onVisibleChange: PropTypes.func
  };
  static defaultProps = {
    okText: '确定',
    cancelText: '取消',
    trigger: 'click',
    overlayClassName: '',
    overlay: null,
    children: null,
    onConfirm: undefined,
    onVisibleChange: undefined
  };

  constructor(props) {
    super(props);

    this.state = {
      visible: false
    };
  }

  onConfirm(e, flag) {
    this.setVisible(false);

    if (this.props.onConfirm) {
      this.props.onConfirm(e, flag);
    }
  }

  onVisibleChange(visible) {
    this.setVisible(visible);
  }

  setVisible(visible) {
    if (!('visible' in this.props)) {
      this.setState({ visible });
    }
    if (this.props.onVisibleChange) {
      this.props.onVisibleChange(visible);
    }
  }

  render() {
    const {
      overlay,
      okText,
      cancelText,
      onVisibleChange,
      overlayClassName,
      children,
      trigger,
      ...other
    } = this.props;

    const confirm = (
      <div className="pop-confirm-container">
        <div className="confirm-content">
          <i className="iconfont icon-exclamationcircle" />
          <span>{overlay}</span>
        </div>
        <div>
          <button className="ok-btn middle-btn" onClick={e => this.onConfirm(e, true)}>{okText}</button>
          <button
            className="cancel-btn middle-btn"
            onClick={e => this.onConfirm(e, false)}
          >{cancelText || '取消'}</button>
        </div>
      </div>
    );


    return (
      <Tooltip
        overlayClassName={`pop-confirm ${overlayClassName}`}
        visible={this.state.visible}
        overlay={confirm}
        onVisibleChange={visible => this.onVisibleChange(visible)}
        trigger={trigger}
        {...other}
      >
        {children}
      </Tooltip>
    );
  }

}

export default PopConfirm;
