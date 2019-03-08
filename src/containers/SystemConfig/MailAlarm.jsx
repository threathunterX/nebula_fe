import React, { Component } from 'react';
import PropTypes from 'prop-types';
import InputNumber from 'rc-input-number';
import Radio from 'rc-radio';

import LabelInput from '../../components/LabelInput';
import TextField from '../../components/TextField';
import Switch from '../../components/Switch';
import * as RegExpressions from '../../regexp';
import ConfigService from './ConfigService';
import './index.scss';

const PART_NAME = 'alerting';

class MailAlarm extends Component {
  static propTypes = {
    onSave: PropTypes.func,
    onCancel: PropTypes.func
  };

  static defaultProps = {
    onSave: undefined,
    onCancel: undefined
  };

  static validate(regexp, value) {
    const reg = new RegExp(regexp);
    return reg.test(value);
  }

  constructor(props) {
    super(props);
    this.state = {
      status: {
        value: false
      },
      sendEmail: {
        value: '',
        error: false,
        validator: RegExpressions.ALARM_SEND_EMAIL
      },
      emailTopic: {
        value: '',
        error: false
      },
      smtpServer: {
        value: '',
        error: false
      },
      smtpPort: {
        value: '',
        error: false,
        validator: RegExpressions.ALARM_PORT
      },
      smtpSsl: {
        value: false,
        error: false
      },
      smtpAccount: {
        value: '',
        error: false
      },
      smtpPassword: {
        value: '',
        error: false
      },
      deliveryInterval: {
        value: 30,
        error: false,
        validator: RegExpressions.NUMBER
      },
      nebulaAddress: {
        value: '',
        error: false
      },
      toEmails: {
        value: ["smtp.domain.com"],
        array: true,
        error: false,
        validator: RegExpressions.ALARM_TO_EMAILS
      }
    };
  }

  componentDidMount() {
    ConfigService.getConfigs(PART_NAME, this.state)
      .then((data) => {
        this.setState(data);
      });
  }

  // 点击保存
  onSave(e) {
    if (this.props.onSave) {
      this.props.onSave(e, this.state);
    }
  }

  // 点击取消
  onCancel(e) {
    if (this.props.onCancel) {
      this.props.onCancel(e, this.state);
    }
  }

  getError(name) {
    return this.state[name].error;
  }

  // 存入输入值
  setValue(name, value) {
    const model = this.state[name];
    model.value = value;
    if (model.validator) {
      if (model.value instanceof Array) {
        let arrayError = false;
        model.value.forEach((item) => {
          arrayError = arrayError || !MailAlarm.validate(model.validator, item);
        });
        model.error = arrayError;
      } else {
        model.error = !MailAlarm.validate(model.validator, model.value);
      }
    }
    this.setState(this.state);
  }

  render() {
    return (
      <div className="mail-alarm">
        <div className="mail-status">
          <span className="content-label">报警开关</span>
          <Switch
            className="switch"
            checked={this.state.status.value}
            checkedChildren={'开启'}
            unCheckedChildren={'关闭'}
            onChange={(value) => {
              this.setValue('status', value);
            }}
          />
        </div>
        <div className="send-mail">
          <span className="content-label">发件人邮箱</span>
          <TextField
            className="normal-input"
            type="text"
            placeholder="eg:name@company.com"
            isError={this.getError('sendEmail')}
            errorText="请填写正确邮箱"
            onChange={(e) => {
              this.setValue('sendEmail', e.target.value);
            }}
            value={this.state.sendEmail.value}
          />
        </div>
        <div className="SMTP-server">
          <span className="content-label">SMTP服务器</span>
          <TextField
            className="normal-input divide"
            type="text"
            placeholder="eg:smtp.domain.com"
            isError={this.getError('smtpServer')}
            errorText=""
            onChange={(e) => {
              this.setValue('smtpServer', e.target.value);
            }}
            value={this.state.smtpServer.value}
          />
          <span className="divide">:</span>
          <TextField
            className="port divide"
            type="text"
            placeholder="端口"
            isError={this.getError('smtpPort')}
            errorText="请填数字"
            onChange={(e) => {
              this.setValue('smtpPort', e.target.value);
            }}
            value={this.state.smtpPort.value}
          />

          <div style={{ display: 'inline-block' }}>
            <Radio
              checked={this.state.smtpSsl.value}
              onChange={() => {
                this.setValue('smtpSsl', !this.state.smtpSsl.value);
              }}
            />
            &nbsp;
            <span className="SSL"> SSL</span>
          </div>
        </div>
        <div className="SMTP-account">
          <span className="content-label">SMTP帐号</span>
          <TextField
            className="normal-input"
            type="text"
            placeholder="eg:name@company.com"
            isError={this.getError('smtpAccount')}
            errorText="错误内容提示"
            onChange={(e) => {
              this.setValue('smtpAccount', e.target.value);
            }}
            value={this.state.smtpAccount.value}
          />
        </div>
        <div className="SMTP-password">
          <span className="content-label">SMTP密码</span>
          <TextField
            className="normal-input"
            type="password"
            placeholder="请输入密码"
            isError={this.getError('smtpPassword')}
            errorText="错误内容提示"
            onChange={(e) => {
              this.setValue('smtpPassword', e.target.value);
            }}
            value={this.state.smtpPassword.value}
          />
        </div>
        <div className="mail-theme">
          <span className="content-label">邮件主题</span>
          <TextField
            className="normal-input"
            type="text"
            placeholder="eg:nebula ALERTS"
            isError={this.getError('emailTopic')}
            errorText="错误内容提示"
            onChange={(e) => {
              this.setValue('emailTopic', e.target.value);
            }}
            value={this.state.emailTopic.value}
          />
        </div>
        <div className="nebula-address">
          <span className="content-label">nebula地址</span>
          <TextField
            className="normal-input"
            type="text"
            placeholder="eg:http//172.16.0.13:9001"
            isError={this.getError('nebulaAddress')}
            errorText="错误内容提示"
            onChange={(e) => {
              this.setValue('nebulaAddress', e.target.value);
            }}
            value={this.state.nebulaAddress.value}
          />
        </div>
        <div className="mail-frequency">
          <span className="content-label">邮件发送频率</span>
          <InputNumber
            className="frequency-input divide"
            step={1}
            defaultValue="60"
            onChange={(v) => {
              this.setValue('deliveryInterval', v);
            }}
            value={this.state.deliveryInterval.value}
          />
          <span className="minute">分钟</span>
        </div>
        <div className="recipient">
          <span className="content-label">收件人</span>
          <LabelInput
            className="label-list"
            labelList={this.state.toEmails.value}
            labelClass="label-item"
            onChange={(param) => {
              this.setValue('toEmails', param);
            }}
            isError={this.getError('toEmails')}
            errorText="请填写正确的邮件格式"
            placeholder="eg:hi@threathunter.cn"
          />
        </div>

        <div className="config-footer">
          <button
            className="save"
            onClick={(e) => {
              this.onSave(e);
            }}
          >保存
          </button>
          <button
            className="cancel"
            onClick={(e) => {
              this.onCancel(e);
            }}
          >取消
          </button>
        </div>
      </div>
    );
  }
}

export default MailAlarm;
