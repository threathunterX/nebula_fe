import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';

import Selector from '../../../components/Selector';
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
import {
  FORM_CHECKPOINTS,
  FORM_SCENE_NAME,
  FORM_CHECK_TYPE,
  FORM_KEY,
  FORM_DECISION,
  FORM_EXPIRE,
  FORM_REMARK,
  FORM_TEST
} from '../constants';

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

const tests = [
  { text: '生产', value: false },
  { text: '测试', value: true }
];

class Editor extends Component {
  static propTypes = {
    form: PropTypes.oneOfType([PropTypes.object]).isRequired,
    onChange: PropTypes.func.isRequired
  };

  handleChange(value, key) {
    this.props.onChange(value, key);
  }

  render() {
    const { form } = this.props;

    return (
      <div className="alerts-dialog-content">
        <div className="content-item">
          <span className="label">子场景</span>
          <input
            type="text"
            defaultValue={_.get(form, FORM_CHECKPOINTS)}
            className="input-item"
            onBlur={e => this.handleChange(e.target.value, FORM_CHECKPOINTS)}
          />
        </div>
        <div className="content-item">
          <span className="label">场景</span>
          <Selector
            className="input-item"
            value={_.find(scenes, { value: _.get(form, FORM_SCENE_NAME) })}
            dataList={scenes}
            onChange={({ value }) => this.handleChange(value, FORM_SCENE_NAME)}
          />
        </div>
        <div className="content-item">
          <span className="label">类型</span>
          <Selector
            className="input-item"
            value={_.find(catalogs, { value: _.get(form, FORM_CHECK_TYPE) })}
            dataList={catalogs}
            onChange={({ value }) => this.handleChange(value, FORM_CHECK_TYPE)}
          />
        </div>
        <div className="content-item">
          <span className="label">值</span>
          <input
            type="text"
            defaultValue={_.get(form, FORM_KEY)}
            className="input-item"
            onBlur={e => this.handleChange(e.target.value, FORM_KEY)}
          />
        </div>
        <div className="content-item">
          <span className="label">风险类型</span>
          <Selector
            className="input-item"
            value={_.find(decisions, { value: _.get(form, FORM_DECISION) })}
            dataList={decisions}
            onChange={({ value }) => this.handleChange(value, FORM_DECISION)}
          />
        </div>
        <div className="content-item">
          <span className="label">过期时间（秒）</span>
          <input
            type="text"
            placeholder="-1 为永不过期"
            defaultValue={_.get(form, FORM_EXPIRE)}
            className="input-item"
            onBlur={e => this.handleChange(e.target.value, FORM_EXPIRE)}
          />
        </div>
        <div className="content-item">
          <span className="label">环境</span>
          <Selector
            className="input-item"
            value={_.find(tests, { value: _.get(form, FORM_TEST) })}
            dataList={tests}
            onChange={({ value }) => this.handleChange(value, FORM_TEST)}
          />
        </div>
        <div className="content-item">
          <span className="label">备注</span>
          <input
            type="text"
            className="input-item"
            defaultValue={_.get(form, FORM_REMARK)}
            onBlur={e => this.handleChange(e.target.value, FORM_REMARK)}
          />
        </div>
      </div>
    );
  }
}

export default Editor;
