import React, { Component } from 'react';
import _ from 'lodash';
import Cookies from 'js-cookie';

import HttpService from '../../components/HttpService';
import TextField from '../../components/TextField';
import Notification from '../../components/Notification';

import './index.scss';

const API_CHANGE_PASSWORD = 'auth/changepwd';
const KEY_USERNAME = 'username';
const KEY_PASSWORD = 'password';
const KEY_NEW_PASSWORD = 'newpassword';
const KEY_CONFIRMED_PASSWORD = 'confirmedpassword';

const notification = Notification.getNewInstance();

class ChangePwd extends Component {

  static isEmpty(item) {
    return item === '' || item === undefined;
  }

  constructor(props) {
    super(props);
    this.state = {
      [KEY_USERNAME]: Cookies.get(KEY_USERNAME),
      [KEY_PASSWORD]: '',
      [KEY_NEW_PASSWORD]: '',
      [KEY_CONFIRMED_PASSWORD]: ''
    };
  }

  checkPwd() {
    const {
      password,
      newpassword,
      confirmedpassword
    } = this.state;

    if (ChangePwd.isEmpty(password)) {
      return false;
    }
    if (ChangePwd.isEmpty(newpassword)) {
      return false;
    }
    if (ChangePwd.isEmpty(confirmedpassword)) {
      return false;
    }
    if (newpassword !== confirmedpassword) {
      return false;
    }
    return true;
  }

  // 请求后台重置密码
  changePwd() {
    // TODO:username

    HttpService.post({
      url: API_CHANGE_PASSWORD,
      params: _.pick(
        this.state,
        [KEY_USERNAME, KEY_PASSWORD, KEY_NEW_PASSWORD]
      ),
      onSuccess: (data) => {
        const { result } = data;
        notification[result === 0 ? 'info' : 'error']({ message: data.msg });
      },
      onError: () => {
        notification.error({ message: '修改失败' });
      }
    });
  }

  render() {
    const {
      newpassword,
      confirmedpassword
    } = this.state;

    return (
      <div className="wb-change-pwd container">
        <h1 className="title">修改密码</h1>

        <div className="pwd-form">
          <div className="old-pwd">
            <span className="label">旧密码</span>
            <input
              className="normal-input"
              type="password"
              placeholder="输入旧密码"
              onChange={(e) => {
                this.setState({ [KEY_PASSWORD]: e.target.value });
              }}
            />
          </div>
          <div className="new-pwd">
            <span className="label">新密码</span>
            <input
              className="normal-input"
              type="password"
              placeholder="输入新密码"
              onChange={(e) => {
                this.setState({ [KEY_NEW_PASSWORD]: e.target.value });
              }}
            />
          </div>
          <div className="confirm-pwd">
            <span className="label">确认新密码</span>
            <TextField
              className="normal-input"
              type="password"
              placeholder="再次输入新密码"
              isError={newpassword !== confirmedpassword}
              onChange={(e) => {
                this.setState({ [KEY_CONFIRMED_PASSWORD]: e.target.value });
              }}
              errorText="与新密码不一致"
            />
          </div>
          <button
            className="submit-pwd"
            disabled={!this.checkPwd()}
            onClick={() => {
              this.changePwd();
            }}
          >确认修改
          </button>
        </div>
      </div>
    );
  }
}

export default ChangePwd;
