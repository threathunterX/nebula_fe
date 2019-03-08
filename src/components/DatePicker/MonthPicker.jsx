import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';

import './index.scss';

class MonthPicker extends Component {
  static propTypes = {
    year: PropTypes.number.isRequired,
    month: PropTypes.number.isRequired,
    prevYear: PropTypes.func.isRequired,
    nextYear: PropTypes.func.isRequired,
    selectMonth: PropTypes.func.isRequired,
    showYear: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    const {
      prevYear,
      nextYear,
      year,
      month,
      selectMonth,
      showYear
    } = this.props;

    return (

      <div className="month-picker">
        <div className="date-picker-header">
          <a
            className="pre-year"
            title="上一年"
            onClick={() => {
              prevYear();
            }}
            role="presentation"
          >«</a>
          <span className="month-year-title">
            <a
              className=""
              onClick={() => {
                showYear();
              }}
              role="presentation"
            >{year}年</a>
          </span>
          <a
            className="next-year"
            title="下一年"
            onClick={() => {
              nextYear();
            }}
            role="presentation"
          >»</a>
        </div>

        <div className="month-picker-body">
          {
            _.map(['一', '二', '三', '四', '五', '六', '七', '八', '九', '十', '十一', '十二'], (item, key) => (
              <div key={key} className="month-item-container">
                <a
                  className={`month-item${key === month ? ' active' : ''}`}
                  onClick={() => {
                    selectMonth(key);
                  }}
                  role="presentation"
                >{item}月</a>
              </div>
            ))
          }
        </div>
      </div>
    );
  }
}

export default MonthPicker;
