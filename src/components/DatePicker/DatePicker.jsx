import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import moment from 'moment';

import Calendar from './Calendar';

import './index.scss';

class DatePicker extends Component {
  static propTypes = {
    style: PropTypes.oneOfType([PropTypes.object]),
    value: PropTypes.number,
    className: PropTypes.string,
    placeholder: PropTypes.string,
    format: PropTypes.string,
    showTime: PropTypes.bool,
    disabled: PropTypes.bool,
    onChange: PropTypes.func
  };
  static defaultProps = {
    className: '',
    placeholder: '',
    value: undefined,
    style: undefined,
    onChange: undefined,
    format: undefined,
    showTime: true,
    disabled: false
  };

  constructor(props) {
    super(props);

    this.state = {
      showDatePicker: false,
      timestamp: new Date().getTime()
    };
  }

  onFocus(e) {
    const {
      disabled
    } = this.props;
    // 禁用
    if (disabled) {
      return;
    }

    // 获取日历面板
    let ele = document.querySelector(`#datePicker${this.state.timestamp}`);

    if (!ele) {
      this.state.timestamp = moment().valueOf();
      const container = document.createElement('div');
      container.id = `datePicker${this.state.timestamp}`;
      container.className = 'date-picker-mask';
      container.onclick = this.hidemask.bind(this);
      ele = document.querySelector('body').appendChild(container);
      setTimeout(() => {
        ele.style.opacity = 1;
      }, 0);
    } else {
      ele.style.display = 'block';
      setTimeout(() => {
        ele.style.opacity = 1;
      }, 0);
    }

    ReactDOM.render(this.getDatePicker(e.currentTarget), ele);

    this.setState({
      showDatePicker: true
    });
  }

  // 日历修改
  onChange(timestamp) {
    const {
      onChange
    } = this.props;

    if (onChange) {
      onChange(timestamp);
    }
  }

  // 日历面板
  getDatePicker(dateInput) {
    const {
      showTime,
      value
    } = this.props;

    const ele = dateInput.getBoundingClientRect();

    const top = ele.top + ele.height + 4;
    const left = ele.left;

    const style = {
      top,
      left
    };

    const height = 253;
    const width = 240;

    // 下边超出屏幕
    if (ele.top + ele.height + height > window.innerHeight) {
      style.bottom = window.innerHeight - ele.top;
      style.top = '';
    }
    // 右边超出屏幕
    if (ele.left + ele.width + width > window.innerWidth) {
      style.right = window.innerWidth - ele.left - ele.width;
      style.left = '';
    }

    return (
      <Calendar
        value={value}
        showTime={showTime}
        style={style}
        onClose={e => this.hidemask(e)}
        onChange={(timestamp) => {
          this.onChange(timestamp);
        }}
      />
    );
  }

  // 隐藏选择框
  hidemask(e) {
    if (e === undefined || e.target.id === `datePicker${this.state.timestamp}`) {
      const mask = document.querySelector(`#datePicker${this.state.timestamp}`);

      this.setState({
        showDatePicker: false
      });
      mask.style.opacity = 0;
      setTimeout(() => {
        mask.remove();
      }, 500);
    }
  }

  render() {
    const {
      className,
      placeholder,
      style,
      disabled,
      showTime,
      format = showTime ? 'YYYY-MM-DD HH:mm:ss' : 'YYYY-MM-DD',
      value
    } = this.props;

    return (
      <span
        className={`date-picker-container ${disabled ? 'disabled' : ''} ${className}`}
        style={style}
        onClick={(e) => {
          this.onFocus(e);
        }}
        role="presentation"
      >
        <input
          placeholder={placeholder}
          readOnly
          title={(value && moment(value).format(format)) || ''}
          className="date-picker-input"
          disabled={disabled}
          value={(value && moment(value).format(format)) || ''}
        />
        <i className="iconfont icon-calendar date-picker-icon" />
      </span>
    );
  }
}

export default DatePicker;
