import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';

import './index.scss';

class YearPicker extends Component {
  static propTypes = {
    year: PropTypes.number.isRequired,
    selectYear: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);

    const year = this.props.year;

    const startYear = year - (year % 10);
    const endYear = year + (10 - (year % 10));

    const yearList = [];
    for (let i = startYear; i < endYear; i += 1) {
      yearList.push(i);
    }

    this.state = {
      year,
      yearList
    };
  }

  // 上一年代
  prev10Year() {
    const {
      yearList
    } = this.state;

    const yearListTemp = [];
    yearList.forEach((year) => {
      yearListTemp.push(year - 10);
    });

    this.setState({ yearList: yearListTemp });
  }

  // 下一年代
  next10Year() {
    const {
      yearList
    } = this.state;

    const yearListTemp = [];
    yearList.forEach((year) => {
      yearListTemp.push(year + 10);
    });

    this.setState({ yearList: yearListTemp });
  }

  render() {
    const {
      selectYear,
      year
    } = this.props;

    const {
      yearList
    } = this.state;

    return (

      <div className="year-picker">
        <div className="date-picker-header">
          <span className="year-year-title">
            <a>{`${yearList[0]}-${yearList[9]}`}</a>
          </span>
        </div>

        <div className="year-picker-body">
          <div className="year-item-container">
            <a
              className="year-item"
              onClick={() => {
                this.prev10Year();
              }}
              role="presentation"
            >&lt;</a>
          </div>
          {
            _.map(yearList, (item, key) => (
              <div key={key} className="year-item-container">
                <a
                  className={`year-item${item === year ? ' active' : ''}`}
                  onClick={() => {
                    selectYear(item);
                  }}
                  role="presentation"
                >{item}</a>
              </div>
            ))
          }
          <div className="year-item-container">
            <a
              className="year-item"
              onClick={() => {
                this.next10Year();
              }}
              role="presentation"
            >&gt;</a>
          </div>
        </div>
      </div>
    );
  }
}

export default YearPicker;
