import React, { Component } from 'react';
import PropTypes from 'prop-types';

class TableExpendData extends Component {
  static propTypes = {
    dataList: PropTypes.object.isRequired
  };

  // 获取value值
  static getValueText(value) {
    if (typeof value === 'number') {
      return (<span className="obj-value-number">{JSON.stringify(value)}</span>);
    }
    return JSON.stringify(value);
  }

  constructor(props) {
    super(props);
    this.state = {

    };
  }

  render() {
    const { dataList } = this.props;
    return (
      <div className="wd-table-expend-data">
        {
            <div className="expend-item-container" >
              {
                  <div className="item-container">
                        <div className="obj-item">
                          <p className="obj-key">name:  <span className="obj-value">{dataList.py_name}</span></p>
                          <p className="obj-key">version:  <span className="obj-value">{dataList.py_version}</span></p>
                          <p className="obj-key">content:</p>
                          <pre className="obj-value"> {dataList.py_content}</pre>
                          <p className="obj-key">create_time: <span className="obj-value"> {dataList.create_time}</span></p>
                          <p className="obj-key">update_time:  <span className="obj-value">{dataList.update_time}</span></p>
                        </div>
                  </div>
              }
            </div>
        }
      </div>
    );
  }
}

export default TableExpendData;
