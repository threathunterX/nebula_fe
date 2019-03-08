import React, { Component } from 'react';
import PropTypes from 'prop-types';

import LabelInput from '../../components/LabelInput';
import ConfigService from './ConfigService';

import './index.scss';

const PART_NAME = 'filter.traffic';

class TrafficFilter extends Component {
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
      domains: {
        value: [],
        error: false
      },
      urls: {
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
      serverPorts: {
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
      <div className="traffic-filter">
        <div className="domainName">
          <span className="content-label">过滤域名</span>
          <LabelInput
            className="label-list"
            labelClass="label-item"
            labelList={this.state.domains.value}
            onChange={(param) => {
              this.setValue('domains', param);
            }}
            placeholder="eg:threathunter.cn(黑名单)"
          />
        </div>
        <div>
          <span className="content-label">过滤URL</span>
          <LabelInput
            className="label-list"
            labelClass="label-item"
            labelList={this.state.urls.value}
            onChange={(param) => {
              this.setValue('urls', param);
            }}
            placeholder="eg:/test/1.html(黑名单)"
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
            placeholder="eg:17.12.25.1(黑名单)"
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
            placeholder="eg:17.12.25.1(黑名单)"
          />
        </div>
        <div>
          <span className="content-label">放行服务端端口</span>
          <LabelInput
            className="label-list"
            labelClass="label-item"
            labelList={this.state.serverPorts.value}
            onChange={(param) => {
              this.setValue('serverPorts', param);
            }}
            placeholder="eg:9000(白名单)"
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

export default TrafficFilter;
