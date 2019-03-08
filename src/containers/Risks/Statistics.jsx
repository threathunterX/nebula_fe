import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Paper from '../../components/Paper';
import ResultChart from './ResultChart';

class Statistics extends Component {
  static propTypes = {
    test: PropTypes.string.isRequired,
    items: PropTypes.oneOfType([PropTypes.array]),
    onReload: PropTypes.func.isRequired
  };
  static defaultProps = {
    items: undefined
  };

  constructor(props) {
    super(props);
    this.state = {
      hideStatisticsData: []
    };
  }

  componentDidUpdate(props) {
    const {
      test,
      onReload
    } = this.props;

    if (test !== props.test) {
      onReload();
    }
  }

  // 点击统计数据
  showOrHideData(index) {
    this.state.hideStatisticsData[index] = !this.state.hideStatisticsData[index];
    this.setState({
      hideStatisticsData: this.state.hideStatisticsData
    });
  }

  render() {
    const {
      items
    } = this.props;

    return (
      <Paper>
        <h2 className="statistics-title">统计</h2>
        <ResultChart dataList={items} />
      </Paper>
    );
  }
}

export default Statistics;
