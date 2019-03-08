import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';

import './index.scss';

class StrategiesArea extends PureComponent {
  static propTypes = {
    area: PropTypes.oneOfType([PropTypes.array]).isRequired,
    labels: PropTypes.oneOfType([PropTypes.array]).isRequired
  };

  render() {
    const {
      area,
      labels
      } = this.props;

    return (
      <div className="strategies-area-container">
        <h2>风险区域／风险场景 －最近1小时</h2>

        <div className="bar-container">
          <div className="area">
            {_.map(area, (item, index) => (
              <div key={index} className="label-item">
                <span className="city-name" title={item.city}>{item.city}</span>
                <div className="percent-bar">
                  <div style={{ width: `${item.percent}%` }} />
                </div>
              </div>
            ))}
          </div>
          <div className="label">
            {_.map(labels, (item, index) => (
              <div key={index} className="label-item">
                <span className="tag-name" title={item.name}>{item.name}</span>
                <div className="percent-bar">
                  <div style={{ width: `${item.percent}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
}

export default StrategiesArea;
