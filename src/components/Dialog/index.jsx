import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import _ from 'lodash';

import './index.scss';

class Dialog extends Component {
  static propTypes = {
    visible: PropTypes.bool,
    destroy: PropTypes.bool,
    duration: PropTypes.number,
    className: PropTypes.string,
    children: PropTypes.oneOfType([PropTypes.any]),
    buttons: PropTypes.oneOfType([PropTypes.array]),
    style: PropTypes.oneOfType([PropTypes.object]),
    title: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
    onClose: PropTypes.func
  };
  static defaultProps = {
    visible: false,
    destroy: false,
    className: '',
    duration: 0,
    children: null,
    style: undefined,
    onClose: undefined,
    title: '',
    buttons: []
  };

  constructor(props) {
    super(props);

    const dialogId = parseInt(Math.random() * (new Date().getTime()), 10);
    this.state = {
      dialogId: `dialogMask${dialogId}`,
      timer: ''
    };
  }

  componentDidMount() {
    this.showDialog();
  }

  componentDidUpdate() {
    this.showDialog();
  }

  // 对话框主体
  getDialog() {
    const {
      title,
      className,
      children,
      buttons,
      style
    } = this.props;

    // 底部按钮
    let btns = '';
    if (buttons.length > 0) {
      btns = (

        <div className="dialog-btns">
          {
            _.map(buttons, (item, index) => (
              <button
                key={index}
                className={`${item.cls ? item.cls : 'default-btn'}`}
                onClick={(e) => {
                  item.onClick(e);
                }}
                disabled={item.disabled}
              >{item.text}</button>
            ))
          }
        </div>
      );
    }

    return (
      <div className={`dialog-container ${className}`} style={style}>
        <header className="dialog-title clearfix">
          <span>
            {
              (() => {
                switch (typeof title) {
                  case 'string':
                    return title;
                  case 'function':
                    return title();
                  default:
                    return '';
                }
              })()
            }
          </span>
          <i
            className="iconfont icon-cross"
            onClick={() => {
              this.hideMask();
            }}
            role="presentation"
          />
        </header>
        <div className="dialog-content">
          {children}
          {btns}
        </div>
      </div>
    );
  }

  // 显示隐藏对话框
  showDialog() {
    const {
      visible,
      destroy,
      duration
    } = this.props;

    let {
      timer
    } = this.state;
    const {
      dialogId
    } = this.state;

    // 清除定时器
    if (timer) {
      clearTimeout(timer);
      timer = '';
    }

    const body = document.querySelector('body');

    if (body.querySelector(`#${dialogId}`)) {
      const dialog = body.querySelector(`#${dialogId}`);

      if (visible) {
        body.querySelector(`#${dialogId}`).style.display = '';
      } else if (destroy) {
        body.querySelector(`#${dialogId}`).remove();
      } else {
        body.querySelector(`#${dialogId}`).style.display = 'none';
      }
      ReactDOM.render(this.getDialog(), dialog);
    } else if (visible) {
      const e = document.createElement('div');
      e.id = dialogId;
      e.className = 'dialog-mask';

      ReactDOM.render(this.getDialog(), e);

      body.appendChild(e);
    }

    if (duration && visible) {
      // 延迟关闭
      this.state.timer = setTimeout(() => {
        this.hideMask();
      }, duration);
    }
  }

  hideMask() {
    if (this.props.onClose) {
      this.props.onClose();
    }
  }

  render() {
    return null;
  }

}

export default Dialog;
