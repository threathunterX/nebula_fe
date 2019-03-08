import React, { Component } from 'react';
import PropTypes from 'prop-types';
import LabelInput from '../../components/LabelInput';
import ConfigService from './ConfigService';

import './index.scss';

const PART_NAME = 'filter.log';

class ShowLogManage extends Component {
  static propTypes = {
    onSave: PropTypes.func,
    onCancel: PropTypes.func
  };

  static defaultProps = {
    onSave: undefined,
    onCancel: undefined
  };

  constructor(props) {
    super(props);
    this.state = {
      suffixes: {
        value: [],
        error: false
      },
      domains: {
        value: [],
        error: false
      },
      logs: {
        value: [],
        error: false
      },
      clientIps: {
        value: [],
        error: false
      },
      serverIps: {
        value: [],
        error: false
      },
      ignoredSuffixes: {
        value: [],
        error: false
      },
      addedSuffixes: {
        value: [],
        error: false
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

  // 存入输入值
  setValue(name, value) {
    this.state[name].value = value;
  }

  render() {
    return (
      <div className="log-message">
        <div>
          <span className="content-label">过滤地址后缀</span>
          <LabelInput
            className="label-list"
            labelClass="label-item"
            labelList={this.state.suffixes.value}
            onChange={(param) => {
              this.setValue('suffixes', param);
            }}
            placeholder="eg: .csv"
          />
        </div>
        <div>
          <span className="content-label">过滤域名</span>
          <LabelInput
            className="label-list"
            labelClass="label-item"
            labelList={this.state.domains.value}
            onChange={(param) => {
              this.setValue('domains', param);
            }}
            placeholder="eg:test.domain.com"
          />
        </div>
        <div>
          <span className="content-label">过滤日志</span>
          <LabelInput
            className="label-list"
            labelClass="label-item"
            labelList={this.state.logs.value}
            onChange={(param) => {
              this.setValue('logs', param);
            }}
            placeholder="eg:HTTP_CLICK"
          />
        </div>
        <div>
          <span className="content-label">过滤客户端IP</span>
          <LabelInput
            className="label-list"
            labelClass="label-item"
            labelList={this.state.clientIps.value}
            onChange={(param) => {
              this.setValue('clientIps', param);
            }}
            placeholder="eg:17.12.25.1"
          />
        </div>
        <div>
          <span className="content-label">过滤服务端IP</span>
          <LabelInput
            className="label-list"
            labelClass="label-item"
            labelList={this.state.serverIps.value}
            onChange={(param) => {
              this.setValue('serverIps', param);
            }}
            placeholder="eg:17.12.25.1"
          />
        </div>
        <div>
          <span className="content-label">地址后缀忽略</span>
          <LabelInput
            className="label-list"
            labelClass="label-item"
            labelList={this.state.ignoredSuffixes.value}
            onChange={(param) => {
              this.setValue('ignoredSuffixes', param);
            }}
            placeholder="eg:www.threathunter.cn/product/****"
          />
        </div>
        <div>
          <span className="content-label">地址后缀补充</span>
          <LabelInput
            className="label-list"
            labelClass="label-item"
            labelList={this.state.addedSuffixes.value}
            onChange={(param) => {
              this.setValue('addedSuffixes', param);
            }}
            placeholder="eg:www.threathunter.cn/api+pramter.appid"
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

export default ShowLogManage;
