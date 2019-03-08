import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { Base64 } from 'js-base64';

import HttpService from '../HttpService';
import StrategyRequiredInput from '../Strategies/StrategyRequiredInput';

import '../InputNumber/index.scss';

import './index.scss';

const SPL = 'spl';

class SPLEditor extends Component {
  static propTypes = {
    config: PropTypes.oneOfType([PropTypes.object]),
    onChange: PropTypes.func,
    readOnly: PropTypes.bool
  };
  static defaultProps = {
    config: undefined,
    onChange: undefined,
    readOnly: false
  };

  constructor(props) {
    super(props);

    this.state = {
      splMsg: this.props.config.expression === '$' || !this.props.config.expression ? '' : 'success',
      splText: this.props.config.expression
    };
  }

  handleChange(value, key) {
    const { config, onChange } = this.props;
    onChange(_.set(config, key, value));
  }

  // spl检测接口
  splTest(value) {
    // HttpService.mock({
    //   url: '/platform/stats/slot/query',
    //   projectId: 2,
    //   params: {
    //     var_list: ['aa', 'bb', 'cc']
    //   },
    //   onSuccess: (res) => {
    //     console.log(res);
    //   }
    // });
    // return;

    const expression = Base64.encode(value);
    HttpService.get({
      url: 'spl/verify',
      params: {
        expression
      },
      onSuccess: (res) => {
        const {
          success,
          message
        } = res;
        if (success) {
          this.setState({
            splMsg: 'success'
          });
          this.handleChange(value, 'expression');
        } else {
          this.setState({
            splMsg: message
          });
        }
      },
      onError: () => {
        this.setState({
          splMsg: '服务异常，请重试。'
        });
      }
    });
  }

  render() {
    const { readOnly } = this.props;

    const {
      splMsg,
      splText
    } = this.state;

    return (
      <div className="editor-content">
        <h4>SPL语句</h4>
        <textarea
          className="spl-textarea"
          readOnly={readOnly}
          name="spl"
          value={splText}
          placeholder="输入SPL语句，点击编辑测试结果正确即可确认。"
          onChange={(e) => {
            let splTextTemp = e.target.value;
            if (splTextTemp.indexOf('$') !== 0) {
              splTextTemp = `$${splTextTemp}`;
            }
            this.setState({
              splText: splTextTemp,
              splMsg: ''
            });
            this.handleChange(splTextTemp, 'expression');
          }}
        />
        <button
          className="edit-test ghost-btn middle-btn"
          onClick={() => {
            this.splTest(splText);
          }}
        >
          编辑测试
        </button>
        <h4>SPL编译结果</h4>
        <textarea
          className="result-textarea"
          readOnly
          value={splMsg === 'success' ? '编辑正确' : splMsg}
        />

        <StrategyRequiredInput
          ref={SPL}
          className="check-used-input"
          style={{ display: 'none' }}
          type="text"
          value={splMsg === 'success' ? 'success' : ''}
        />
      </div>
    );
  }
}

export default SPLEditor;
