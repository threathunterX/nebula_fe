import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

import {
  FORM_STRATEGY_NAME,
  FORM_SCENE_NAME,
  FORM_CHECK_TYPE,
  FORM_KEY,
  FORM_DECISION,
  FORM_EXPIRE,
  FORM_REMARK,
  FORM_TEST
} from '../constants';

class Reader extends PureComponent {
  static propTypes = {
    form: PropTypes.oneOfType([PropTypes.object]).isRequired
  };

  render() {
    const { form } = this.props;

    return (
      <div className="alerts-dialog-content confirm">
        <div className="content-item">
          <span className="label">触发规则：</span>
          <div className="input-item reader">{form[FORM_STRATEGY_NAME]}</div>
        </div>
        <div className="content-item">
          <span className="label">场景：</span>
          <div className="input-item reader">{form[FORM_SCENE_NAME]}</div>
        </div>
        <div className="content-item">
          <span className="label">类型：</span>
          <div className="input-item reader">{form[FORM_CHECK_TYPE]}</div>
        </div>
        <div className="content-item">
          <span className="label">值：</span>
          <div className="input-item reader">{form[FORM_KEY]}</div>
        </div>
        <div className="content-item">
          <span className="label">风险类型：</span>
          <div className="input-item reader">{form[FORM_DECISION]}</div>
        </div>
        <div className="content-item">
          <span className="label">Create time：</span>
          <div className="input-item reader">{moment().format('YYYY.MM.DD HH:mm:ss')}</div>
        </div>
        <div className="content-item">
          <span className="label">过期时间：</span>
          {
            (() => {
              const seconds = form[FORM_EXPIRE];

              return (
                <div className="input-item reader">{
                  Number(seconds) === -1 ? '永不过期' : moment().add(seconds, 'seconds').format('YYYY.MM.DD HH:mm:ss')
                }</div>
              );
            })()
          }
        </div>
        <div className="content-item">
          <span className="label">环境：</span>
          <div className="input-item reader">{form[FORM_TEST] ? '测试' : '生产'}</div>
        </div>
        <div className="content-item">
          <span className="label">备注：</span>
          <div className="input-item reader">{form[FORM_REMARK]}</div>
        </div>
      </div>
    );
  }
}

export default Reader;
