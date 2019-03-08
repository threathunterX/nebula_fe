import React, { Component } from 'react';
import DatePicker from '../../../../components/DatePicker';

class DatePickerContainer extends Component {

  constructor(props) {
    super(props);
    this.state = {
      value2: new Date().getTime(),
      value3: new Date().getTime()
    };
  }

  onChange(value) {
    this.setState({ value });
  }

  render() {
    const {
      value1,
      value2,
      value3
    } = this.state;

    return (
      <div className="component-container">
        <h2>DatePicker 日历组件</h2>
        <div className="component-part">
          <div className="component-card">

            <div className="demo-container">
              <DatePicker
                placeholder="选择日期"
                value={value1}
                onChange={(value) => {
                  this.setState({ value1: value });
                }}
              />
            </div>
            <div className="demo-describe">
              <div className="demo-title">基本</div>
              最简单的用法。
            </div>
            <div className="demo-code">
              {'import DatePicker from "../../components/DatePicker";'} <br />

              {'let {value} = this.state;'} <br />
              {'<DatePicker placeholder="选择日期" onChange={(value)=>{this.setState({value});}}/>'}
            </div>
          </div>

          <div className="component-card">

            <div className="demo-container">
              <DatePicker placeholder="选择日期" value={1484041750903} disabled />
            </div>
            <div className="demo-describe">
              <div className="demo-title">禁用</div>
              日历禁用。
            </div>
            <div className="demo-code">
              {'import DatePicker from "../../components/DatePicker";'} <br />
              {'<DatePicker placeholder="选择日期" value={1484041750903} disabled={true}/>'}
            </div>

          </div>

        </div>


        <div className="component-part">

          <div className="component-card">

            <div className="demo-container">
              <DatePicker
                placeholder="选择日期"
                showTime={false}
                value={value2}
                onChange={(value) => {
                  this.setState({ value2: value });
                }}
              />
            </div>
            <div className="demo-describe">
              <div className="demo-title">纯日期选择</div>
              <span className="key-word">showTime</span>属性为false时，不显示时间。
            </div>
            <div className="demo-code">
              {'import DatePicker from "../../components/DatePicker";'} <br />
              {'let {value} = this.state;'} <br />
              {'<DatePicker placeholder="选择日期" showTime=false value={value} onChange={(value)=>{this.setState({value});}}/>'}
            </div>
          </div>

          <div className="component-card">

            <div className="demo-container">
              <DatePicker
                placeholder="选择日期"
                value={value3}
                format="YYYY.MM.DD HH:mm:ss"
                onChange={(value) => {
                  this.setState({ value3: value });
                }}
              />
            </div>
            <div className="demo-describe">
              <div className="demo-title">格式化</div>
              使用<span className="key-word">format</span>属性，可以自定义你需要的日期显示格式，如 YYYY.MM.DD HH:mm:ss。
            </div>
            <div className="demo-code">
              {'import DatePicker from "../../components/DatePicker";'} <br />
              {'let {value} = this.state;'} <br />
              {'<DatePicker placeholder="选择日期" value={value} format="YYYY.MM.DD HH:mm:ss" onChange={(value)=>{this.setState({value});}}/>'}
            </div>
          </div>
        </div>

      </div>
    );
  }
}

export default DatePickerContainer;
