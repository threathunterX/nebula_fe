import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';

import './index.scss';

class Toast extends Component {
  static propTypes = {
    style: PropTypes.oneOfType([PropTypes.object]),
    className: PropTypes.string,
    title: PropTypes.string,
    type: PropTypes.string,
    iconType: PropTypes.string,
    okText: PropTypes.string,
    cancelText: PropTypes.string,
    children: PropTypes.node,
    onConfirm: PropTypes.func,
    onClose: PropTypes.func,
    visible: PropTypes.bool,
    destroy: PropTypes.bool,
    duration: PropTypes.number
  };
  static defaultProps = {
    style: {},
    children: null,
    onConfirm: undefined,
    onClose: undefined,
    duration: 4500,
    visible: false,
    destroy: false,
    className: '',
    type: 'alert',
    iconType: 'info',
    okText: '确定',
    cancelText: '取消',
    title: ''
  };

  constructor(props) {
    super(props);

    const toastId = parseInt(Math.random() * (new Date().getTime()), 10);
    this.state = {
      toastId: `toastContainer${toastId}`,
      timer: ''
    };
  }

  componentDidUpdate() {
    const {
      visible,
      duration,
      destroy
    } = this.props;
    const {
      toastId
    } = this.state;

    // 清除定时器
    if (this.state.timer) {
      clearTimeout(this.state.timer);
      this.state.timer = '';
    }

    const body = document.querySelector('body');

    if (body.querySelector(`#${toastId}`)) {
      const toast = body.querySelector(`#${toastId}`);

      if (visible) {
        body.querySelector(`#${toastId}`).style.display = '';
        body.querySelector(`#${toastId}`).style.opacity = 1;
      } else if (destroy) {
        body.querySelector(`#${toastId}`).remove();
      } else {
        body.querySelector(`#${toastId}`).style.display = 'none';
      }
      ReactDOM.render(this.getToast(), toast);
    } else if (visible) {
      const e = document.createElement('div');
      e.id = toastId;
      e.className = 'toast-mask';

      ReactDOM.render(this.getToast(), e);

      body.appendChild(e);
    }

    if (duration && visible) {
      // 延迟关闭
      this.state.timer = setTimeout(() => {
        this.hideMask();
      }, duration);
    }
  }

  // 对话框主体
  getToast() {
    const {
      title,
      className = '',
      children,
      style,
      type,
      okText = '确定',
      cancelText = '取消',
      onConfirm,
      iconType
    } = this.props;

    // 纯提示
    if (type === 'alert') {
      return (
        <div className={`toast-container ${className}`} style={Object.assign({}, style, { opacity: 1 })}>
          <i className={`iconfont icon-${iconType === 'info' ? 'exclamationcircle' : 'crosscircle'}`} />
          <span>{children}</span>
          <i
            className="iconfont icon-cross"
            onClick={() => {
              this.hideMask();
            }}
            role="presentation"
          />
        </div>
      );
    }

    return (
      <div className={`toast-container confirm-container ${className}`} style={style}>
        <header className="toast-title">
          <i className="iconfont icon-exclamationcircle" />
          <span>{title}</span>
          <i
            className="iconfont icon-cross"
            onClick={() => {
              this.hideMask();
            }}
            role="presentation"
          />
        </header>
        <div className="toast-content">
          {children}
          <div className="toast-btns">
            <button
              className="confirm-btn middle-btn"
              onClick={() => {
                onConfirm(true);
              }}
            >{okText}</button>
            <button
              className="cancel-btn middle-btn"
              onClick={() => {
                onConfirm(false);
              }}
            >{cancelText}</button>
          </div>
        </div>
      </div>
    );
  }

  hideMask() {
    const {
      toastId
    } = this.state;
    const container = document.querySelector(`#${toastId}`);
    container.style.opacity = 0;

    setTimeout(() => {
      if (this.props.onClose) {
        this.props.onClose();
      }
    }, 500);
  }

  render() {
    return null;
  }

}

export default Toast;
