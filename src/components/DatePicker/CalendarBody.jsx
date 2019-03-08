import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';

import './index.scss';

class CalendarBody extends Component {
  static propTypes = {
    year: PropTypes.number.isRequired,
    month: PropTypes.number.isRequired,
    date: PropTypes.number.isRequired,
    selectedMonth: PropTypes.bool,
    onSelectDate: PropTypes.func
  };
  static defaultProps = {
    onSelectDate: undefined,
    selectedMonth: false
  };

  // 取某个月的总天数
  static getDaysInMonth(month, year) {
    const days = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    return (
      month === 1 &&
      year % 4 === 0 &&
      (year % 100 !== 0 || year % 400 === 0) ?
        29 :
        days[month]
    );
  }

  // 判断是否是本日
  static isToday(year, month, dayCode) {
    return (
      new Date().getFullYear() === year &&
      new Date().getMonth() === month &&
      new Date().getDate() === dayCode
    );
  }

  constructor(props) {
    super(props);

    this.state = {
      config: {
        year: '年',
        month: '月',
        // 月份列表
        monthNames: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'],
        // 星期列表
        dayNames: ['一', '二', '三', '四', '五', '六', '日']
      }
    };
  }

  // 选择日期
  onSelectDate(date, type) {
    const {
      onSelectDate
    } = this.props;

    if (onSelectDate) {
      onSelectDate(date, type);
    }
  }

  render() {
    const {
      month,
      year,
      date,
      selectedMonth
    } = this.props;

    const {
      config
    } = this.state;

    // 设置选中月
    const theMonth = new Date(year, month, 1);
    // 选中月第一天是星期几(0,1,2,3,4,5,6)
    let weekOfFirstDay = theMonth.getDay();
    // 周日放在最后
    const IndexOfWeek = weekOfFirstDay === 0 && theMonth ? 6 : (weekOfFirstDay -= 1);
    // 选中月的总天数
    const days = CalendarBody.getDaysInMonth(month, year);
    // 上个月
    const lastMonth = month === 0 ? 11 : month - 1;
    // 上个月对应的年
    const yearOfLastMonth = lastMonth === 11 ? year - 1 : year;
    // 上个月的天数
    const daysOfLastMonth = CalendarBody.getDaysInMonth(lastMonth, yearOfLastMonth);
    // 下个月的日期
    let dayOfNextMonth = 0;

    return (
      <div>
        <table className="calendar-body" cellSpacing="0">
          <thead>
            <tr>
              {
                _.map(config.dayNames, (dayName, index) => (
                  <th key={index} className={index === 5 || index === 6 ? 'weekend' : 'weekday'}>{dayName}</th>
                ))
              }
            </tr>
          </thead>
          <tbody>
            {
              _.map([0, 1, 2, 3, 4, 5], (row, key) => (
                <tr key={key}>
                  {
                    _.map(config.dayNames, (dayName, index) => {
                      const curIndex = (row * 7) + index;
                      // 小于第一天，则为上个月
                      if (curIndex < IndexOfWeek) {
                        const dayCode = (daysOfLastMonth - IndexOfWeek) + curIndex + 1;
                        return (
                          <td key={index} className="calendar-day-cell prev-month">
                            <div
                              className="calendar-day"
                              onClick={() => {
                                this.onSelectDate(dayCode, 'prev');
                              }}
                              role="presentation"
                            >{dayCode}</div>
                          </td>
                        );
                      } else if (curIndex >= IndexOfWeek + days) {
                        // 下个月
                        dayOfNextMonth += 1;
                        const dayCode = dayOfNextMonth;
                        return (
                          <td key={index} className="calendar-day-cell next-month">
                            <div
                              className="calendar-day"
                              onClick={() => {
                                this.onSelectDate(dayCode, 'next');
                              }}
                              role="presentation"
                            >{dayCode}</div>
                          </td>
                        );
                      }
                      // 本月
                      const dayCode = (curIndex - IndexOfWeek) + 1;
                      return (
                        <td key={index} className="calendar-day-cell">
                          <div
                            className={`calendar-day${CalendarBody.isToday(year, month, dayCode) ? ' calendar-today' : ''}${selectedMonth && date === dayCode ? ' selected' : ''}`}
                            onClick={() => {
                              this.onSelectDate(dayCode);
                            }}
                            role="presentation"
                          >{dayCode}</div>
                        </td>
                      );
                    })
                  }
                </tr>
              ))
            }
          </tbody>
        </table>
      </div>
    );
  }
}

export default CalendarBody;
