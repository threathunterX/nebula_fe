import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';

import List from '../../components/List';

class ResultChart extends Component {
  static propTypes = {
    dataList: PropTypes.oneOfType([PropTypes.array])
  };
  static defaultProps = {
    dataList: undefined
  };

  constructor(props) {
    super(props);
    this.state = {};
  }

  // 生成列表
  dealList(itemTemp, index) {
    const item = itemTemp;

    if (item.data instanceof Array) {
      if (item.data[0] && !(item.data[0].data instanceof Array)) {
        // const sortList = _.cloneDeep(item.data);
        // sortList.reverse();
        // 每一项限制数据最高的10条
        item.data = item.data.slice(0, 10);
      }

      return (
        <List key={index} text={item.name} defaultFolded={false}>
          {_.map(item.data, (v, i) => {
            if (!(v.data instanceof Array)) {
              let maxValue = 0;
              item.data.forEach((v1) => {
                maxValue += +v1.value;
              });
              item.data.forEach((value, i1) => {
                const v1 = item.data[i1];
                if (maxValue === 0) {
                  v1.percent = 1;
                } else {
                  v1.percent = v1.value / maxValue;
                }
              });
            }
            return this.dealList(v, i);
          })}
        </List>
      );
    }


    return (
      <div key={index} className="chart-bar">
        <div className="active-bar" style={{ width: `${item.percent * 100}%` }} />
        <span title={item.name} className="chart-name">{item.name}</span>
        <span className="chart-percent">{`${(item.percent * 100).toFixed(2)}%`}</span>
      </div>
    );
  }

  render() {
    const { dataList } = this.props;

    return (

      <div className="chart-list">
        {
          _.map(dataList, (item, index) => this.dealList(item, index))
        }
      </div>
    );
  }
}

export default ResultChart;
