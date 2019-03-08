import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Dialog from '../../components/Dialog';
import {
  ACTION_CREATE_GROUP,
  ACTION_UPDATE_GROUP,
  ACTION_CREATE_USER,
  ACTION_UPDATE_USER
} from './constants';

class Confirm extends Component {
  static propTypes = {
    visible: PropTypes.bool,
    disabled: PropTypes.bool,
    onSubmit: PropTypes.func,
    onCancel: PropTypes.func,
    children: PropTypes.oneOfType([PropTypes.any]),
    action: PropTypes.string
  };
  static defaultProps = {
    visible: false,
    disabled: false,
    onSubmit: undefined,
    onCancel: undefined,
    children: null,
    action: ''
  };

  render() {
    const { visible, children, action, disabled } = this.props;
    const title = (() => {
      switch (action) {
        case ACTION_CREATE_GROUP:
          return '创建用户组';
        case ACTION_UPDATE_GROUP:
          return '修改用户组';
        case ACTION_CREATE_USER:
          return '创建用户';
        case ACTION_UPDATE_USER:
          return '修改用户';
        default:
          return '';
      }
    })();

    const buttons = [{
      text: (() => {
        switch (action) {
          case ACTION_CREATE_GROUP:
          case ACTION_CREATE_USER:
            return '创建';
          case ACTION_UPDATE_GROUP:
          case ACTION_UPDATE_USER:
            return '修改';
          default:
            return '';
        }
      })(),
      disabled,
      onClick: () => {
        if (this.props.onSubmit) {
          this.props.onSubmit();
        }
      }
    }, {
      text: '取消',
      cls: 'cancel-btn',
      onClick: () => {
        if (this.props.onCancel) {
          this.props.onCancel();
        }
      }
    }];

    return (
      <Dialog
        visible={visible}
        buttons={buttons}
        title={title}
        onClose={() => {
          if (this.props.onCancel) {
            this.props.onCancel();
          }
        }}
      >
        {children}
      </Dialog>
    );
  }
}

export default Confirm;
