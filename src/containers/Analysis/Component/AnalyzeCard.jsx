import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import _ from 'lodash';

import './index.scss';

@withRouter
class AnalyzeCard extends PureComponent {
  static propTypes = {
    history: PropTypes.oneOfType([PropTypes.object]).isRequired,
    riskPoint: PropTypes.number.isRequired,
    locationTitle: PropTypes.string.isRequired,
    loc: PropTypes.string.isRequired,
    keyType: PropTypes.string.isRequired,
    status: PropTypes.bool.isRequired,
    tags: PropTypes.oneOfType([PropTypes.array]),
    alert: PropTypes.string
  };
  static defaultProps = {
    alert: undefined,
    tags: undefined
  };

  render() {
    const {
      loc,
      locationTitle,
      riskPoint,
      tags,
      status,
      alert,
      keyType,
      history
    } = this.props;

    const locationLabel = (loc === '.') ? '未知' : loc;
    let pointElement;
    if (status === true && !alert) {
      pointElement = (
        <div className="point-card">
          <div className="point-value">
            <span>{riskPoint}</span>

            <p>风险分值</p>
          </div>
          {
            _.map(tags, (tag, key) => (
              <span key={key}>
                <i className="light-point" />
                <span>{tag}</span>
              </span>
            ))
          }
        </div>
      );
    } else if (status === true && alert) {
      pointElement = (
        <div className="point-card">
          <div className="point-alert">
            <span>{alert}</span>
          </div>
        </div>
      );
    } else if (status === false) {
      pointElement = (
        <div className="point-card">
          <div className="point-alert">
            <span>*</span>
          </div>
        </div>
      );
    }
    //  <SvgIcon iconName="flag" className="title-icon"></SvgIcon>
    return (

      <div className="analysis-card-bar">

        <div className="location-card">
          <span
            title={locationTitle}
            className="title-text"
            onClick={
              keyType === 'mobile' ? () => {
                history.push(`/analysis/profiles?uid=${locationTitle}`);
              } : () => {
                history.push(`/analysis/profiles?ip=${locationTitle}`);
              }
            }
            role="presentation"
          >{locationTitle}</span>
          <p className="location">
            <span>地理位置：{locationLabel}</span>
            <i className="iconfont icon-enviromento" />
          </p>
        </div>
        {pointElement}
      </div>
    );
  }
}

export default AnalyzeCard;
