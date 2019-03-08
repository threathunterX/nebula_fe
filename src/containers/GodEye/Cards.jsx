import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import _ from 'lodash';

import SvgIcon from '../../components/SvgIcon';
import NumberFormat from '../../components/util/NumberFormat';

import './index.scss';

class Cards extends Component {
  static propTypes = {
    incidents: PropTypes.oneOfType([PropTypes.array]).isRequired
  };

  render() {
    const {
      incidents
      } = this.props;

    return (
      <div className="card-container">
        <h2>风险事件－最近1小时</h2>
        {_.map(incidents, (item, i) => (
          <div key={i} className="card-item">
            <div className="score">
              <div className="ip-label">IP:{item.ip}</div>
              <div className="score-label">
                {
                  (() => {
                    switch (Object.keys(item.strategies)[0]) {
                      case '访客':// 访客
                        return (
                          <SvgIcon iconName="visitor" />
                        );
                      case '帐号':// 帐号
                        return (
                          <i className="iconfont icon-tablet" />
                        );
                      case '支付':// 支付
                        return (
                          <i className="iconfont icon-creditcard" />
                        );
                      case '订单':// 订单
                        return (
                          <i className="iconfont icon-shoppingcart" />
                        );
                      case '营销':// 营销
                        return (
                          <i className="iconfont icon-tagso" />
                        );
                      case '其他':// 其他
                        return (
                          <i className="iconfont icon-pluscircleo" />
                        );
                      default:
                        return null;
                    }
                  })()
                }
                <span className="warning">{item.risk_score / 10}</span>
              </div>
              <div className="time">{moment(item.start_time).format('MM.DD HH:mm')}</div>
            </div>
            <div className="labels">
              <div className="label-container">
                {_.map(item.hit_tags, (count, label) => {
                  if (!label) {
                    return '';
                  }
                  return (
                    <div key={label} className="label-item">
                      <span>{label}</span>
                      <span className="label-count">{NumberFormat(count)}</span>
                    </div>
                  );
                })}
              </div>
              <div className="detail">
                <span>关联用户:{item.users_count}</span>
                <span>{item.peak}次请求/分钟(峰值)</span>

                <p className="page">{`${item.most_visited}(${item.percent}%)`}</p>
              </div>
            </div>
          </div>
        ))}

      </div>
    );
  }
}

export default Cards;
