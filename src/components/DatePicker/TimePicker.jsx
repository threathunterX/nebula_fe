import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';

import {
  HourList,
  MinuteList,
  SecondList
} from './constants';

import './index.scss';

class TimePicker extends Component {
  static propTypes = {
    hour: PropTypes.number.isRequired,
    minute: PropTypes.number.isRequired,
    second: PropTypes.number.isRequired,
    onChange: PropTypes.func.isRequired
  };

  componentDidMount() {
    const {
      hour,
      minute,
      second
    } = this.props;

    const hourList = document.querySelector('.hour-list');
    hourList.scrollTop = hour * 24;
    const minuteList = document.querySelector('.minute-list');
    minuteList.scrollTop = minute * 24;
    const secondList = document.querySelector('.second-list');
    secondList.scrollTop = second * 24;
  }

  render() {
    const {
      hour,
      minute,
      second,
      onChange
    } = this.props;

    return (
      <div className="time-picker">
        <ul className="hour-list">
          {
            _.map(HourList, (item, key) => (
              <li
                key={key}
                className={`${hour === Number(item) ? 'active' : ''}`}
                onClick={() => {
                  onChange(Number(item), minute, second);
                }}
                role="presentation"
              >{item}</li>
            ))
          }
        </ul>
        <ul className="minute-list">
          {
            _.map(MinuteList, (item, key) => (
              <li
                key={key}
                className={`${minute === Number(item) ? 'active' : ''}`}
                onClick={() => {
                  onChange(hour, Number(item), second);
                }}
                role="presentation"
              >{item}</li>
            ))
          }
        </ul>
        <ul className="second-list">
          {
            _.map(SecondList, (item, key) => (
              <li
                key={key}
                className={`${second === Number(item) ? 'active' : ''}`}
                onClick={() => {
                  onChange(hour, minute, Number(item));
                }}
                role="presentation"
              >{item}</li>
            ))
          }
        </ul>
      </div>
    );
  }
}

export default TimePicker;
