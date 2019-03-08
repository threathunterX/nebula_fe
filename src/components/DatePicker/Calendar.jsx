import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

import CalendarBody from './CalendarBody';
import TimePicker from './TimePicker';
import MonthPicker from './MonthPicker';
import YearPicker from './YearPicker';

import './index.scss';

class Calendar extends Component {
  static propTypes = {
    style: PropTypes.oneOfType([PropTypes.object]),
    value: PropTypes.number,
    showTime: PropTypes.bool,
    onChange: PropTypes.func,
    onClose: PropTypes.func
  };
  static defaultProps = {
    value: undefined,
    style: undefined,
    onChange: undefined,
    onClose: undefined,
    showTime: true,
    disabled: false
  };

  constructor(props) {
    super(props);

    const {
      value,
      showTime
    } = this.props;

    let date;
    if (value) {
      date = moment(value);
    } else {
      date = moment();
    }

    this.state = {
      month: date.month(),
      year: date.year(),
      date: date.date(),
      hour: showTime ? date.hour() : 0,
      minute: showTime ? date.minute() : 0,
      second: showTime ? date.second() : 0,
      millisecond: showTime ? date.millisecond() : 0,
      showTimePicker: false,
      showMonthPicker: false,
      showYearPicker: false,
      value
    };
  }

  // 选择日期
  onSelectDate(date, type) {
    const {
      month,
      year,
      hour,
      minute,
      second
    } = this.state;
    let yearMonth = [year, month];
    if (type === 'prev') {
      // 选择的日期为上个月
      yearMonth = this.prevMonth();
    } else if (type === 'next') {
      // 选择的日期为下个月
      yearMonth = this.nextMonth();
    }

    this.setState({ date });

    this.onChange(yearMonth[0], yearMonth[1], date, hour, minute, second);
  }

  // 修改时间
  onTimeChange(hour, minute, second) {
    const {
      year,
      month,
      date
    } = this.state;

    this.setState({
      hour,
      minute,
      second
    });

    this.onChange(year, month, date, hour, minute, second);
  }

  // 修改日历
  onChange(year, month, date, hour, minute, second) {
    const value = moment([year, month, date, hour, minute, second, 0]).valueOf();

    this.setState({ value });
    // 回调
    if (this.props.onChange) {
      this.props.onChange(value);
    }
  }

  // 选择月份
  selectMonth(month) {
    this.setState({
      month,
      showMonthPicker: false
    });
  }

  // 选择年份
  selectYear(year) {
    this.setState({
      year,
      showYearPicker: false
    });
  }

  // 点击此刻或者今天
  toNow() {
    const {
      onChange,
      onClose,
      showTime
    } = this.props;
    // 回调
    if (onClose) {
      onClose();
    }

    const date = moment();
    this.setState({
      month: date.month(),
      year: date.year(),
      date: date.date()
    });
    if (onChange) {
      // 是否显示时间
      const time =
        showTime ?
          date.valueOf() :
          date.startOf('day').valueOf();

      onChange(time);
    }
  }

  /**
   * 下个月
   */
  nextMonth() {
    const {
      month,
      year
    } = this.state;

    if (month === 11) {
      this.setState({
        month: 0,
        year: year + 1
      });
      return [year + 1, 0];
    }
    this.setState({
      month: month + 1
    });
    return [year, month + 1];
  }

  /**
   * 上个月
   */
  prevMonth() {
    const {
      month,
      year
    } = this.state;

    if (month === 0) {
      this.month = 11;
      this.year = this.year - 1;

      this.setState({
        month: 11,
        year: year - 1
      });
      return [year - 1, 11];
    }
    this.setState({
      month: month - 1
    });
    return [year, month - 1];
  }

  /**
   * 下一年
   */
  nextYear() {
    this.setState({
      year: this.state.year + 1
    });
    return this.state.year + 1;
  }

  /**
   * 上一年
   */
  prevYear() {
    this.setState({
      year: this.state.year - 1
    });
    return this.state.year - 1;
  }

  render() {
    const {
      style,
      showTime,
      onClose
    } = this.props;

    const {
      month,
      year,
      date,
      hour,
      minute,
      second,
      showTimePicker,
      showMonthPicker,
      showYearPicker,
      value
    } = this.state;

    return (

      <div className="date-picker" style={style}>
        {
          showTimePicker ? (
            <div>

              <div className="date-picker-header">
                <span className="month-year-title">
                  <a className="">{year}年</a>
                  <a className="">{month + 1}月</a>
                  <a className="">{date}日</a>
                </span>
              </div>

              <TimePicker
                hour={hour}
                minute={minute}
                second={second}
                onChange={(hourTemp, minuteTemp, secondTemp) => {
                  this.onTimeChange(hourTemp, minuteTemp, secondTemp);
                }}
              />
            </div>
          ) : (
            <div>

              <div className="date-picker-header">
                <a
                  className="pre-year"
                  title="上一年"
                  onClick={() => {
                    this.prevYear();
                  }}
                  role="presentation"
                >«</a>
                <a
                  className="pre-month"
                  title="上个月"
                  onClick={() => {
                    this.prevMonth();
                  }}
                  role="presentation"
                >‹</a>
                <span className="month-year-title">
                  <a
                    title="选择年份"
                    onClick={() => {
                      this.setState({ showYearPicker: true });
                    }}
                    role="presentation"
                  >{year}年</a>
                  <a
                    title="选择月份"
                    onClick={() => {
                      this.setState({ showMonthPicker: true });
                    }}
                    role="presentation"
                  >{month + 1}月</a>
                </span>
                <a
                  className="next-month"
                  title="下个月"
                  onClick={() => {
                    this.nextMonth();
                  }}
                  role="presentation"
                >›</a>
                <a
                  className="next-year"
                  title="下一年"
                  onClick={() => {
                    this.nextYear();
                  }}
                  role="presentation"
                >»</a>
              </div>

              <CalendarBody
                year={year}
                month={month}
                date={date}
                selectedMonth={year === moment(value).year() && month === moment(value).month()}
                onSelectDate={(selectDate, type) => {
                  this.onSelectDate(selectDate, type);
                }}
              />
            </div>
          )
        }

        <div className="date-picker-footer">
          {
            showTime ? (
              <div className="footer-container">
                <a
                  className="to-now"
                  onClick={() => {
                    this.toNow();
                  }}
                  role="presentation"
                >此刻</a>
                {
                  showTimePicker ? (
                    <a
                      className="to-time-picker"
                      onClick={() => {
                        this.setState({ showTimePicker: false });
                      }}
                      role="presentation"
                    >选择日期</a>
                  ) : (
                    <a
                      className="to-time-picker"
                      onClick={() => {
                        this.setState({ showTimePicker: true });
                      }}
                      role="presentation"
                    >选择时间</a>
                  )
                }
                <a
                  className="submit"
                  onClick={() => {
                    onClose();
                  }}
                  role="presentation"
                >确定</a>
              </div>
            ) : (
              <a
                className="to-today"
                onClick={() => {
                  this.toNow();
                }}
                role="presentation"
              >今天</a>
            )
          }
        </div>

        {
          showMonthPicker ? (
            <MonthPicker
              month={month}
              year={year}
              selectMonth={(selectMonth) => {
                this.selectMonth(selectMonth);
              }}
              prevYear={() => {
                this.prevYear();
              }}
              nextYear={() => {
                this.nextYear();
              }}
              showYear={() => {
                this.setState({ showYearPicker: true });
              }}
            />
          ) : null
        }
        {
          showYearPicker ? (
            <YearPicker
              year={year}
              selectYear={(selectYear) => {
                this.selectYear(selectYear);
              }}
            />
          ) : null
        }

      </div>
    );
  }
}

export default Calendar;
