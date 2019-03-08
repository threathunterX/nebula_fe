import React, { Component } from 'react';
import PropTypes from 'prop-types';
import LabelInput from '../../components/LabelInput';
import TextField from '../../components/TextField';
import ConfigService from './ConfigService';

import './index.scss';

const PART_NAME = 'filter.encryption';

class SuffixEncrypt extends Component {
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
      names: {
        value: [],
        error: false
      },
      salt: {
        value: '',
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

    this.setState(this.state);
  }

  render() {
    return (
      <div className="suffix-encrypt">
        <div className="recipient">
          <span className="content-label">字段名称</span>
          <LabelInput
            className="label-list"
            labelClass="label-item"
            labelList={this.state.names.value}
            onChange={(param) => {
              this.setValue('names', param);
            }}
            placeholder="eg:zhangsan"
          />
        </div>
        <div className="nebula-address">
          <span className="content-label">SHA1加密盐值</span>
          <TextField
            className="normal-input"
            type="text"
            placeholder="请输入盐值"
            value={this.state.salt.value}
            onChange={(e) => {
              this.setValue('salt', e.target.value);
            }}
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

export default SuffixEncrypt;
