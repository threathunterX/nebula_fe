import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import _ from 'lodash';

import Select from '../../../components/Select';
import DatePicker from '../../../components/DatePicker';
import Alert from '../Alert';
import {
  SCENE_VISITOR,
  SCENE_ACCOUNT,
  SCENE_TRANSACTION,
  SCENE_ORDER,
  SCENE_MARKETING,
  SCENE_OTHER
} from '../../../constants/scenes';
import {
  CATALOG_IP,
  CATALOG_USER,
  CATALOG_DEVICEID,
  CATALOG_ORDERID
} from '../../../constants/catalogs';
import {
  DECISION_REJECT,
  DECISION_REVIEW,
  DECISION_ACCEPT
} from '../../../constants/decisions';

const scenes = [
  { text: '访客', value: SCENE_VISITOR },
  { text: '帐号', value: SCENE_ACCOUNT },
  { text: '支付', value: SCENE_TRANSACTION },
  { text: '订单', value: SCENE_ORDER },
  { text: '营销', value: SCENE_MARKETING },
  { text: '其它', value: SCENE_OTHER }
];

const catalogs = [
  { text: CATALOG_IP, value: CATALOG_IP },
  { text: CATALOG_USER, value: CATALOG_USER },
  { text: CATALOG_DEVICEID, value: CATALOG_DEVICEID },
  { text: CATALOG_ORDERID, value: CATALOG_ORDERID }
];

const decisions = [
  { text: '拒绝', value: DECISION_REJECT },
  { text: '审核', value: DECISION_REVIEW },
  { text: '通过', value: DECISION_ACCEPT }
];

const TIMESTAMP = 'timestamp';
const FORM_KEY = 'key';
const FORM_CHECK_TYPE = 'checkType';
const FORM_STRATEGY = 'strategy';
const FORM_TAGS = 'tag';
const FORM_SCENE_NAME = 'sceneType';
const FORM_DECISION = 'decision';
const FORM_FROM_TIME = 'fromtime';
const FORM_END_TIME = 'endtime';
const FORM_FILTER_EXPIRE = 'filter_expire';

const ACTION = 'action';
const ACTION_INSERT = 'ACTION_INSERT';

class Search extends Component {
  static propTypes = {
    strategies: PropTypes.oneOfType([PropTypes.array]).isRequired,
    tags: PropTypes.oneOfType([PropTypes.array]).isRequired,
    query: PropTypes.oneOfType([PropTypes.object]).isRequired,
    searchTime: PropTypes.oneOfType([PropTypes.object]).isRequired,
    onChange: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
    action: PropTypes.string.isRequired,
    timestamp: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    timestamp2: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
  };
  static defaultProps = {
    timestamp2: undefined
  };

  handleChange(value, key) {
    this.props.onChange(value, key);
  }

  handleSubmit(value, key) {
    this.props.onSubmit(value, key);
  }

  render() {
    const { action, strategies, query, timestamp, timestamp2, searchTime, tags } = this.props;

    const formSceneName = _.get(query, FORM_SCENE_NAME);
    const formStrategy = _.get(query, FORM_STRATEGY);
    const formTags = _.get(query, FORM_TAGS);

    return (
      <div className="search-container">
        <h2>
          <span>条件搜索</span>
          <i
            className="iconfont icon-reload"
            onClick={() => {
              this.handleChange(moment().valueOf(), 'form.timestamp');
              this.handleChange('', FORM_KEY);
              this.handleChange([], FORM_CHECK_TYPE);
              this.handleChange([], FORM_STRATEGY);
              this.handleChange([], FORM_TAGS);
              this.handleChange([], FORM_SCENE_NAME);
              this.handleChange([], FORM_DECISION);
              this.handleChange(undefined, FORM_FROM_TIME);
              this.handleChange(undefined, FORM_END_TIME);
            }}
            role="button"
            tabIndex={0}
          />
        </h2>

        <div key={timestamp} className="search-content">
          <div className="search-col-30">
            <div className="search-item">
              <span className="label">风险值</span>
              <input
                type="text"
                defaultValue={_.get(query, 'keyword')}
                placeholder={`请输入${CATALOG_IP}/${CATALOG_USER}/${CATALOG_DEVICEID}/${CATALOG_ORDERID}`}
                className="input-item"
                onBlur={e => this.handleChange(e.target.value, FORM_KEY)}
              />
            </div>
            <div className="search-item">
              <span className="label">值类型</span>
              <Select
                type="multiple"
                placeholder="请选择"
                allowClear
                className="input-item"
                dataList={catalogs}
                onChange={value => this.handleChange(value, FORM_CHECK_TYPE)}
              />
            </div>
            <div className="search-item">
              <span className="label">风险类型</span>
              <Select
                type="multiple"
                placeholder="请选择"
                allowClear
                className="input-item"
                dataList={decisions}
                onChange={value => this.handleChange(value, FORM_DECISION)}
              />
            </div>
          </div>
          <div className="search-col-30">
            <div className="search-item">
              <span className="label">触发规则</span>
              <Select
                className="input-item"
                type="multiple"
                allowClear
                placeholder="请输入触发规则"
                defaultValue={formStrategy ? [{ text: formStrategy, value: formStrategy }] : []}
                dataList={strategies}
                onChange={value => this.handleChange(value, FORM_STRATEGY)}
              />
            </div>
            <div className="search-item">
              <span className="label">风险场景</span>
              <Select
                type="multiple"
                placeholder="请选择"
                allowClear
                className="input-item"
                defaultValue={formSceneName ? [_.find(scenes, { value: formSceneName })] : []}
                dataList={scenes}
                onChange={value => this.handleChange(value, FORM_SCENE_NAME)}
              />
            </div>
          </div>
          <div className="search-col-40">
            <div className="search-item">
              <span className="label">时间</span>

              <DatePicker
                style={{ marginRight: '10px' }}
                placeholder="开始日期"
                key={`${timestamp2}1`}
                value={_.get(searchTime, FORM_FROM_TIME)}
                onChange={(value) => {
                  this.handleChange(value, FORM_FROM_TIME);
                  this.handleChange(0, TIMESTAMP);
                }}
              />

              <DatePicker
                style={{ marginRight: '10px' }}
                placeholder="结束日期"
                key={`${timestamp2}2`}
                value={_.get(searchTime, FORM_END_TIME)}
                onChange={(value) => {
                  this.handleChange(value, FORM_END_TIME);
                  this.handleChange(0, TIMESTAMP);
                }}
              />

            </div>

            <div className="search-item">
              <span className="label">风险标签</span>
              <Select
                className="input-item"
                type="multiple"
                allowClear
                placeholder="请选择标签"
                defaultValue={formTags ? [{ text: formTags, value: formTags }] : []}
                dataList={tags}
                onChange={value => this.handleChange(value, FORM_TAGS)}
              />
            </div>
          </div>
        </div>
        <div className="search-footer">
          <button
            className="search"
            onClick={() => {
              this.handleChange(false, FORM_FILTER_EXPIRE);
            }}
          >查询
          </button>
          <button className="search-valid" onClick={() => this.handleChange(true, FORM_FILTER_EXPIRE)}>
            查询未过期风险
          </button>
          <button
            className="add"
            onClick={() => {
              this.handleChange(ACTION_INSERT, ACTION);
            }}
          >添加
          </button>
        </div>
        <Alert
          visible={action === ACTION_INSERT}
          strategies={strategies}
          onSubmit={value => this.handleSubmit(value, ACTION_INSERT)}
        />
      </div>
    );
  }
}

export default Search;
