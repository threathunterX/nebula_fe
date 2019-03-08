import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';

import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn
} from '../../../components/Table';
import './index.scss';

class DataTable extends Component {
  static propTypes = {
    dataList: PropTypes.oneOfType([PropTypes.array]).isRequired,
    mainCol: PropTypes.string.isRequired,
    redCol: PropTypes.string.isRequired,
    onReload: PropTypes.func.isRequired,
    timestamp: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired
  };

  componentDidUpdate(props) {
    const { timestamp } = this.props;

    if (props.timestamp !== timestamp) {
      this.props.onReload();
    }
  }

  // 被攻击URL表格内容
  getAttackedUrlBody() {
    const dataList = this.props.dataList;
    const { timestamp } = this.props;

    return (
      <TableBody
        deselectOnClickaway={false}
        displayRowCheckbox={false}
        showRowHover
      >
        {_.map(dataList[0], (item, index) => (
          <TableRow key={index}>
            <TableRowColumn tooltip={item.value}>
              {/* DeviceID */}
              <span
                className="did-text"
                onClick={() => {
                  window.open(`/#/analysis/did/${encodeURIComponent(item.value)}?timestamp=${timestamp}`);
                }}
                role="button"
                tabIndex="0"
              >{item.value}</span>
            </TableRowColumn>
            <TableRowColumn tooltip={item.count} className="data-item">
              {item.count}
            </TableRowColumn>
            <TableRowColumn tooltip={dataList[1][index].count} className="data-item">
              {dataList[1][index].count}
            </TableRowColumn>
          </TableRow>
          )
        )}
      </TableBody>
    );
  }

  render() {
    const {
      mainCol,
      redCol
    } = this.props;

    // 被攻击URL表格内容
    const attackedUrlBody = this.getAttackedUrlBody();

    return (
      <div className="data-table">
        <h2>Device 前100</h2>
        <Table
          className="user-data"
          fixedHeader
        >
          <TableHeader
            displaySelectAll={false}
            adjustForCheckbox={false}
          >
            <TableRow>
              <TableHeaderColumn>DeviceID</TableHeaderColumn>
              <TableHeaderColumn className="red-col data-item">{redCol}</TableHeaderColumn>
              <TableHeaderColumn className="main-col data-item">{mainCol}</TableHeaderColumn>
            </TableRow>
          </TableHeader>
          {attackedUrlBody}
        </Table>
      </div>
    );
  }
}

export default DataTable;

