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
    const { dataList, timestamp } = this.props;

    return (
      <TableBody
        deselectOnClickaway={false}
        displayRowCheckbox={false}
        showRowHover
      >
        {_.map(dataList[0], (item, index) => (
          <TableRow key={index}>
            <TableRowColumn className="ip-col" tooltip={item.value}>
              {/* ip*/}
              <span
                className="ip-text"
                onClick={() => {
                  window.open(`/#/analysis/ip/${encodeURIComponent(item.value)}?timestamp=${timestamp}`);
                }}
                role="presentation"
              >{item.value}</span>
            </TableRowColumn>
            <TableRowColumn tooltip={item.country}>
              {/* 国家*/}
              {item.country}
            </TableRowColumn>
            <TableRowColumn tooltip={item.province}>
              {/* 省*/}
              {item.province}
            </TableRowColumn>
            <TableRowColumn tooltip={item.city}>
              {/* 市*/}
              {item.city}
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
        <h2>IP 前100</h2>
        <Table
          className="user-data"
          fixedHeader
        >
          <TableHeader
            displaySelectAll={false}
            adjustForCheckbox={false}
          >
            <TableRow>
              <TableHeaderColumn className="ip-col">IP</TableHeaderColumn>
              <TableHeaderColumn className="country-col">国家</TableHeaderColumn>
              <TableHeaderColumn>省</TableHeaderColumn>
              <TableHeaderColumn>市</TableHeaderColumn>
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

