import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { withRouter } from 'react-router';

import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn
} from '../../../components/Table';
import './index.scss';

export const TABLE_ORDER = {
  IP: 0,
  USER: 1,
  DID: 2,
  PAGE: 3,
  TAG: 4,
  UA: 5
};

@withRouter
class AnalyzeTables extends Component {
  static propTypes = {
    onReload: PropTypes.func.isRequired,
    timestamp: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    tableList: PropTypes.oneOfType([PropTypes.array]).isRequired,
    history: PropTypes.oneOfType([PropTypes.object]).isRequired
  };

  // Variety值
  static getVarietyText(variety) {
    if (variety >= 0 && variety < 20) {
      return `${variety}% 参数值基本相同`;
    } else if (variety >= 20 && variety < 80) {
      return `${variety}% 参数值无明显特征`;
    } else if (variety >= 80 && variety <= 100) {
      return `${variety}% 参数值基本不同`;
    }
    return '';
  }

  // Variety值
  static getWeightText(weight) {
    if (weight >= 0 && weight < 20) {
      return `${weight}% 偶尔出现的参数`;
    } else if (weight >= 20 && weight < 80) {
      return `${weight}% 中等概率出现的参数`;
    } else if (weight >= 80 && weight <= 100) {
      return `${weight}% 基本每次都出现的参数`;
    }
    return '';
  }

  constructor(props) {
    super(props);

    this.state = {
      showChild: [-1, -1, -1, -1, -1]
    };
  }

  componentDidUpdate(props) {
    const { timestamp, onReload } = this.props;
    if (timestamp !== props.timestamp) {
      onReload();
    }
  }

  getChildren(child, index) {
    if (this.state.showChild[index] === -1 || this.state.showChild[index] === undefined) {
      return null;
    }

    const children = child.data[this.state.showChild[index]].children;

    return (
      <TableRow selectable={false} className="children-table-row">
        <TableRowColumn colSpan="2">
          {_.map(children.slice(0, 10), (item, i) => {
            const variety = AnalyzeTables.getVarietyText((item.variety * 100).toFixed(2));
            const weight = AnalyzeTables.getWeightText((item.weight * 100).toFixed(2));

            return (
              <div key={i} className="children-row">
                <div className="child-text" title={item.param}>{item.param}</div>
                <div className="child-percent" title={variety}>{variety}</div>
                <div className="child-percent" title={weight}>{weight}</div>
              </div>
            );
          })}
          {
            children.length > 10 ? (
              <div className="children-row">
                <div className="hidden-info">
                  剩余
                  <span>{children.length - 10}</span>
                  个无法详细展示…
                </div>
              </div>
            ) : null
          }
        </TableRowColumn>
      </TableRow>
    );
  }

  getBodyContent(item, i, index) {
    const {
      tableList,
      timestamp,
      history
    } = this.props;

    return (

      <TableRow key={i}>
        <TableRowColumn title={item.text}>
          <span
            className={tableList[index].url ? 'analyze-text' : ''}
            onClick={() => {
              if (tableList[index].url) {
                let url = tableList[index].url + encodeURIComponent(item.text);
                if (tableList[index].order !== TABLE_ORDER.PAGE) {
                  url += `?timestamp=${timestamp}`;
                }
                history.push(url);
              }
            }}
            role="button"
            tabIndex="0"
          >
            {item.text === undefined || item.text === '' || item.text === null ? 'null' : item.text}
          </span>
        </TableRowColumn>
        <TableRowColumn className="click-count">
          <span>{item.clNum}</span>
          {item.children && item.children.length > 0 ? (
            <i
              className={`iconfont ${this.state.showChild[index] === i ? 'icon-caretdown active' : 'icon-caretright'}`}
              onClick={() => {
                this.showDetail(index, i);
              }}
              role="button"
              tabIndex="0"
            />
          ) : ''}
        </TableRowColumn>
      </TableRow>
    );
  }

  // 表格内容
  getAnalyzeBody(content, index) {
    const data = _.sortBy(content.data, 'clNum').reverse();
    return (
      <TableBody
        deselectOnClickaway={false}
        displayRowCheckbox={false}
        showRowHover
      >
        {_.map(data, (item, i) => {
          if (i > this.state.showChild[index]) {
            return null;
          }
          return this.getBodyContent(item, i, index);
        })}
        {this.getChildren(content, index)}
        {_.map(data, (item, i) => {
          if (i <= this.state.showChild[index]) {
            return null;
          }
          return this.getBodyContent(item, i, index);
        })}
      </TableBody>
    );
  }

  showDetail(groupIndex, index) {
    if (this.state.showChild[groupIndex] === index) {
      this.state.showChild[groupIndex] = -1;
    } else {
      this.state.showChild[groupIndex] = index;
    }

    this.setState({
      showChild: this.state.showChild
    });
  }

  render() {
    const {
      tableList
    } = this.props;


    return (

      <div className="analysis-tables">
        {
          _.map(tableList, (item, index) => {
            // 被攻击URL表格内容
            const analyzeBody = this.getAnalyzeBody(item, index);

            return (
              <div key={index} className="analyze-table loader">
                <h2>{item.title}</h2>
                <Table fixedHeader>
                  <TableHeader
                    displaySelectAll={false}
                    adjustForCheckbox={false}
                  >
                    <TableRow>
                      <TableHeaderColumn />
                      <TableHeaderColumn className="click-count">点击次数</TableHeaderColumn>
                    </TableRow>
                  </TableHeader>
                  {analyzeBody}
                </Table>
              </div>
            );
          })}
      </div>
    );
  }
}

export default AnalyzeTables;
