import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';

import SvgIcon from '../../../components/SvgIcon';
import NumberFormat from '../../../components/util/NumberFormat';

import './index.scss';

class RiskList extends Component {
  static propTypes = {
    buttonList: PropTypes.oneOfType([PropTypes.array]).isRequired,
    keyword: PropTypes.string.isRequired,
    onReload: PropTypes.func.isRequired,
    timestamp: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired
  };

  componentDidUpdate(props) {
    const { timestamp, onReload } = this.props;
    if (timestamp !== props.timestamp) {
      onReload();
    }
  }

  render() {
    const {
      timestamp,
      keyword,
      buttonList
    } = this.props;

    return (

      <div className="analysis-risk-list">
        {
          _.map(buttonList, (item, index) => {
            const sceneType = (() => {
              switch (item.text) {
                case '访客风险':
                  return 'VISITOR';
                case '帐号风险':
                  return 'ACCOUNT';
                case '营销风险':
                  return 'MARKETING';
                case '订单风险':
                  return 'ORDER';
                case '支付风险':
                  return 'TRANSACTION';
                case '其他风险':
                  return 'OTHER';
                default:
                  return '';
              }
            })();

            return (
              <div
                key={index}
                className="risk-item loader"
                onClick={
                  item.point > 0 ?
                    () => window.open(`/#/alerts?timestamp=${timestamp}&sceneType=${sceneType}&keyword=${keyword}`)
                    :
                    () => {
                    }
                }
                role="presentation"
              >
                <span className="risk-icon">
                  {
                    item.iconName ?
                      (<SvgIcon iconName={item.iconName} className={item.iconClass} />) :
                      (<i className={`iconfont ${item.iconClass}`} />)
                  }
                </span>
                <div className="risk-describe">
                  <span className="risk-text">{item.text}</span>
                  <span className="risk-point">{NumberFormat(parseInt(item.point, 10))}</span>
                </div>
              </div>
            );
          })
        }
      </div>
    );
  }
}

export default RiskList;

