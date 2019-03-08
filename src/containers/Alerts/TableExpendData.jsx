import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';

class TableExpendData extends Component {
  static propTypes = {
    dataList: PropTypes.oneOfType([PropTypes.array]).isRequired
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
      selectIndex: -1
    };
  }

  render() {
    const { dataList } = this.props;

    const {
      selectIndex
    } = this.state;

    return (
      <div className="wd-table-expend-data">
        {
          dataList.length > 0 ? _.map(dataList, (item, index) => (
            <div className="expend-item-container" key={index}>
              <header
                onClick={() => {
                  if (selectIndex === index) {
                    this.setState({ selectIndex: -1 });
                    return;
                  }
                  this.setState({ selectIndex: index });
                }}
                role="presentation"
              >
                <i className={`iconfont icon-${selectIndex === index ? 'caretup' : 'caretdown'}`} />
                <span className="item-index">{index}: </span>
                <span className="item-json">{JSON.stringify(item)}</span>
              </header>

              {
                selectIndex === index ? (
                  <div className="item-container">
                    {
                      _.map(item, (value, key) => (
                        <div className="obj-item" key={key}>
                          <span className="obj-key">{key}</span>
                          <span className="obj-value" title={JSON.stringify(value)}>: {TableExpendData.getValueText(value)}</span>
                        </div>
                      ))
                    }
                  </div>
                ) : null
              }
            </div>
          )) : <p className="loading-text">正在加载...</p>
        }
      </div>
    );
  }
}

export default TableExpendData;
