import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import _ from 'lodash';

import EasyToast from '../../components/EasyToast';
import CheckBox from '../../components/CheckBox';
import StrategyRequiredInput from '../../components/Strategies/StrategyRequiredInput';
import StrategyRequiredSelector from '../../components/Strategies/StrategyRequiredSelector';
import StrategyRequiredDatePicker from '../../components/Strategies/StrategyRequiredDatePicker';
import { ERROR_REQUIRED } from '../../components/RequiredDecorator';

import './index.scss';

const ACTION_CREATE = 'ACTION_CREATE';
const ERROR_DICT = {
  name: {
    [ERROR_REQUIRED]: '请填写策略名称。',
    ERROR_TODO: '该名称已被占用。'
  }
};

class Strategy extends Component {
  static propTypes = {
    item: PropTypes.oneOfType([PropTypes.object]).isRequired,
    scene: PropTypes.oneOfType([PropTypes.object]).isRequired,
    events: PropTypes.oneOfType([PropTypes.array]).isRequired,
    sceneList: PropTypes.oneOfType([PropTypes.array]).isRequired,
    onChange: PropTypes.func,
    sceneChange: PropTypes.func,
    disabled: PropTypes.bool,
    action: PropTypes.string
  };

  static defaultProps = {
    onChange: undefined,
    sceneChange: undefined,
    disabled: false,
    action: ''
  };

  static getCurrentEvent(left) {
    const { type, config } = left;

    switch (type) {
      case 'event':
        return ['EVENT', config.event[1]];
      default:
        return [];
    }
  }

  handleChange(value, key) {
    const { onChange } = this.props;

    onChange(value, key);
  }

  render() {
    const {
      item,
      events,
      action,
      disabled,
      sceneList,
      sceneChange,
      scene
    } = this.props;

    const timeLimit = (item.endeffect / item.starteffect === 5);

    const event = Strategy.getCurrentEvent(item.terms[0].left);
    const fields = _.get(_.filter(events, { name: event[1] }), '[0].fields', []);
    let modifytime;
    let createtime;

    if (item.modifytime) {
      modifytime = moment(item.modifytime).format('YYYY/MM/DD HH:mm:ss');
    }

    if (item.createtime) {
      modifytime = moment(item.createtime).format('YYYY/MM/DD HH:mm:ss');
    }

    const nameError = _.get(item, 'error.name');
    const message = _.get(nameError, 'ERROR_REQUIRED');

    return (
      <div className="selection-container">
        <div className="detail-content">
          {
            action === ACTION_CREATE ? (
              <div className="detail-row">
                <span className="label"><span className="star-icon title-star">*</span>策略名称</span>
                <StrategyRequiredInput
                  className="detail-input"
                  type="text"
                  placeholder="策略名称"
                  value={item.name}
                  error={nameError}
                  onChange={(value) => {
                    this.handleChange('name', value);
                  }}
                  onError={(value, key) => {
                    this.handleChange(`error.name.${key}`, _.get(ERROR_DICT, `name.${key}`));
                  }}
                  onFocus={() => {
                    this.handleChange('error.name', null);
                  }}
                />
                <span className="split-line">/</span>
                <StrategyRequiredSelector
                  ref={'category'}
                  className="scene-selector"
                  selectorType="list"
                  dataList={sceneList}
                  value={scene}
                  onChange={selected => sceneChange(selected)}
                />
                {
                  message ? (
                    <div className="required-message">
                      {message}
                    </div>
                  ) : null
                }
              </div>
            ) : null
          }
          {
            modifytime ? (
              <div className="detail-row">
                <span className="label">最新更新时间</span>
                <span>{modifytime}</span>
              </div>
            ) : null
          }
          {
            createtime ? (
              <div className="detail-row">
                <span className="label">创建时间</span>
                <span>{createtime}</span>
              </div>
            ) : null
          }
          <div className="detail-row">
            <span className="label"><span className="star-icon title-star">*</span>生效时间段</span>
            <StrategyRequiredDatePicker
              disabled={disabled || timeLimit}
              placeholder="开始日期"
              value={timeLimit ? 0 : item.starteffect}
              style={{ marginRight: '10px' }}
              onChange={(value) => {
                this.handleChange('starteffect', value);
              }}
              error={_.get(item, 'error.starteffect')}
              onError={(value, key) => {
                this.handleChange(`error.starteffect.${key}`, _.get(ERROR_DICT, `starteffect.${key}`));
              }}
              onFocus={() => {
                this.handleChange('error.starteffect', null);
              }}
            />
            <StrategyRequiredDatePicker
              disabled={disabled || timeLimit}
              placeholder="结束日期"
              value={timeLimit ? 0 : item.endeffect}
              onChange={(value) => {
                this.handleChange('endeffect', value);
              }}
              error={_.get(item, 'error.endeffect')}
              onError={(value, key) => {
                this.handleChange(`error.endeffect.${key}`, _.get(ERROR_DICT, `endeffect.${key}`));
              }}
              onFocus={() => {
                this.handleChange('error.endeffect', null);
              }}
            />
          </div>
          <div className="detail-row check-row">
            <span className="label" />
            <CheckBox
              disabled={disabled}
              checked={timeLimit}
              onClick={() => {
                if (!timeLimit) {
                  const start = moment().valueOf();
                  this.handleChange('starteffect', start);
                  this.handleChange('endeffect', start * 5);
                } else {
                  this.handleChange('starteffect', 0);
                  this.handleChange('endeffect', 0);
                }
              }}
            />
            <span>永不过期</span>
          </div>
          <div className="detail-row">
            <span className="label">策略说明</span>
            <input
              className="detail-input"
              type="text"
              placeholder="策略简述"
              value={item.remark}
              onChange={e => this.handleChange('remark', e.target.value)}
            />
          </div>
        </div>
        <div className="detail-content">
          <div className="detail-row">
            <span className="label">触发事件</span>
            <div className="detail-event">
              <p>{event.length === 2 ? _.find(events, { name: event[1] }).remark : ''}</p>

              <div>
                {
                  _.map(fields, (field, index) => (
                    <EasyToast key={index} trigger="hover" placement="top" overlay={field.remark}>
                      <span className="event-label">{field.name}</span>
                    </EasyToast>
                  ))
                }
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Strategy;
