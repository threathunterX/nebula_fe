import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import _ from 'lodash';
import { withRouter } from 'react-router';
import Pagination from 'rc-pagination';

import Paper from '../../components/Paper';
import Subheader from '../../components/Subheader';
import EasyToast from '../../components/EasyToast';
import FormSearchInput from '../../components/FormSearchInput';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn
} from '../../components/Table';
import SvgIcon from '../../components/SvgIcon';
import NumberFormat from '../../components/util/NumberFormat';

@withRouter
class DataTable extends Component {
  static propTypes = {
    timestamp: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    items: PropTypes.oneOfType([PropTypes.array]).isRequired,
    status: PropTypes.oneOfType([PropTypes.object]).isRequired,
    history: PropTypes.oneOfType([PropTypes.object]).isRequired,
    keyword: PropTypes.string.isRequired,
    onReload: PropTypes.func.isRequired,
    onChange: PropTypes.func.isRequired,
    onStatusChange: PropTypes.func.isRequired,
    offset: PropTypes.number.isRequired,
    count: PropTypes.number.isRequired,
    index: PropTypes.number.isRequired,
    limit: PropTypes.number.isRequired,
    onTabStatusChange: PropTypes.func
  };

  static defaultProps = {
    onTabStatusChange: undefined
  };

  constructor(props) {
    super(props);
    this.state = {
      keyword: '',
      status: -1
    };
  }

  componentDidUpdate(props) {
    const { timestamp, keyword, offset, onReload } = this.props;

    if (
      timestamp !== props.timestamp ||
      offset !== props.offset ||
      keyword !== props.keyword
    ) {
      onReload();
    }
  }

  // 点击页签选项
  onTabClick(tabStatus) {
    let status = -1;
    if (this.state.status !== tabStatus) {
      status = tabStatus;
    }
    this.setState({ status });

    if (this.props.onTabStatusChange) {
      this.props.onTabStatusChange(status);
    }
  }

  getTableBody() {
    const { items, timestamp, history } = this.props;

    return (
      <TableBody deselectOnClickaway={false} displayRowCheckbox={false} showRowHover>
        {
          _.map(items, (item, index) => (
            <TableRow selected={index === this.props.index} key={index}>
              <TableRowColumn tooltip={item.risk_score / 10} className="score">
                {/* 风险值 */}
                {item.risk_score / 10}
              </TableRowColumn>
              <TableRowColumn
                tooltip={moment(_.toInteger(item.start_time)).format('YYYY/MM/DD HH:mm:ss')}
                className="start-time"
              >
                {/* 起始时间 */}
                {moment(_.toInteger(item.start_time)).format('YYYY/MM/DD HH:mm:ss')}
              </TableRowColumn>
              <TableRowColumn tooltip={item.ip} className="ip">
                {/* IP */}
                <span
                  className="ip-text"
                  onClick={() => {
                    history.push(`/analysis/ip/${encodeURIComponent(item.ip)}?timestamp=${timestamp}`);
                  }}
                  role="presentation"
                >{item.ip}</span>
              </TableRowColumn>
              <TableRowColumn tooltip={item.users_count} className="users-count">
                {/* 关联用户 */}
                {item.users_count}
              </TableRowColumn>
              <TableRowColumn tooltip={item.most_visited} className="most-visited">
                {/* 请求最多的地址 */}
                <span
                  className="most-visited-text"
                  onClick={() => history.push(`/analysis/page/${encodeURIComponent(item.most_visited)}`)}
                  role="presentation"
                >{item.most_visited}</span>
              </TableRowColumn>
              <TableRowColumn className="tags">
                {/* 风险标签 */}
                {
                  _.map(item.hit_tags, (value, key) => (
                    <div key={key} className="hit-tags">
                      <span className="tag-text">{value.key}</span>
                      <span className="tag-num">{NumberFormat(value.value)}</span>
                    </div>
                  ))
                }
              </TableRowColumn>
              <TableRowColumn className="strategies">
                {/* 命中策略 */}
                {
                  _.map(item.strategies, (value, key) => {
                    const overlay = (
                      <div>
                        {_.map(value, (v, k) => (
                          <div key={k}>{v.key}</div>
                        ))}
                      </div>
                    );
                    const icon = (() => {
                      switch (key) {
                        case '访客':// 访客
                          return (
                            <SvgIcon className="strategies-icon" iconName="visitor" />
                          );
                        case '帐号':// 帐号
                          return (
                            <i className="iconfont icon-tablet" />
                          );
                        case '支付':// 支付
                          return (
                            <i className="iconfont icon-creditcard" />
                          );
                        case '订单':// 订单
                          return (
                            <i className="iconfont icon-shoppingcart" />
                          );
                        case '营销':// 营销
                          return (
                            <i className="iconfont icon-tagso" />
                          );
                        case '其他':// 其他
                          return (
                            <i className="iconfont icon-pluscircleo" />
                          );
                        default:
                          return null;
                      }
                    })();
                    return (
                      <EasyToast key={key} trigger="hover" placement="top" overlay={overlay}>
                        <div className="icon-container">
                          {icon}
                          <span className="strategies-num">{NumberFormat(value.length)}</span>
                        </div>
                      </EasyToast>
                    );
                  })
                }
              </TableRowColumn>
              <TableRowColumn className="status">
                {/* 操作 */}
                {
                  (() => {
                    switch (item.status) {
                      case 0:// 待处理
                        return (
                          <div>
                            <button
                              onClick={() => this.props.onStatusChange(item.id, 1)}
                              className="risk-btn"
                            >
                              风险
                            </button>
                            <button
                              onClick={() => this.props.onStatusChange(item.id, 2)}
                              className="mistake-btn"
                            >
                              误报
                            </button>
                          </div>
                        );
                      case 1:// 风险
                        return (
                          <span className="risk-text">风险</span>
                        );
                      case 2:// 误报
                        return (
                          <span className="mistake-text">误报</span>
                        );
                      case 3:// 超时
                        return (
                          <span className="overtime-text">超时</span>
                        );
                      default:
                        return null;
                    }
                  })()
                }
              </TableRowColumn>
            </TableRow>
          ))
        }
      </TableBody>
    );
  }

  handleSubmit(keyword) {
    this.props.onChange(keyword, 'keyword');
  }

  handleRowSelection(rows) {
    const selectedRows = rows;
    if (selectedRows[0] === undefined) {
      selectedRows[0] = this.props.index;
    }

    this.props.onChange(selectedRows[0], 'index');
  }

  render() {
    const {
      count,
      status,
      limit,
      offset
    } = this.props;

    const {
      keyword
    } = this.state;

    return (
      <Paper>
        <Subheader style={{ color: '#F2F2F2', fontSize: 14, padding: '16px 25px', lineHeight: '20px' }}>
          风险事件<i className="total">（{count}）</i>
          <small>
            <a
              onClick={() => {
                this.onTabClick(0);
              }}
              className={this.state.status === 0 ? 'active' : ''}
              role="presentation"
            >
              待处理({status['0']})
            </a>
            &nbsp;|&nbsp;
            <a
              onClick={() => {
                this.onTabClick(1);
              }}
              className={this.state.status === 1 ? 'active' : ''}
              role="presentation"
            >
              风险({status['1']})
            </a>
            &nbsp;|&nbsp;
            <a
              onClick={() => {
                this.onTabClick(2);
              }}
              className={this.state.status === 2 ? 'active' : ''}
              role="presentation"
            >
              误报({status['2']})
            </a>
            &nbsp;|&nbsp;
            <a
              onClick={() => {
                this.onTabClick(3);
              }}
              className={this.state.status === 3 ? 'active' : ''}
              role="presentation"
            >
              超时({status['3']})
            </a>
          </small>
          <FormSearchInput
            className="risk-search"
            placeholder="search ip / 地址"
            placeholderWidth={110}
            keyword={keyword}
            onSubmit={value => this.handleSubmit(value)}
            onChange={value => this.setState({ keyword: value })}
          />
        </Subheader>

        <div className="items-warpper">
          <Table bodyClass="risk-list-body" fixedHeader onRowSelection={rows => this.handleRowSelection(rows)}>
            <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
              <TableRow>
                <TableHeaderColumn className="score">
                  <div>风险分值</div>
                </TableHeaderColumn>
                <TableHeaderColumn className="start-time">起始时间</TableHeaderColumn>
                <TableHeaderColumn className="ip">IP</TableHeaderColumn>
                <TableHeaderColumn className="users-count">关联用户</TableHeaderColumn>
                <TableHeaderColumn className="most-visited">请求最多的地址</TableHeaderColumn>
                <TableHeaderColumn className="tags">风险标签</TableHeaderColumn>
                <TableHeaderColumn className="strategies">命中策略</TableHeaderColumn>
                <TableHeaderColumn className="status">操作</TableHeaderColumn>
              </TableRow>
            </TableHeader>
            {this.getTableBody()}
          </Table>
        </div>
        <div className="pagination-container">
          <Pagination
            className="ant-pagination"
            current={offset}
            pageSize={limit}
            total={count}
            onChange={value => this.props.onChange(value, 'offset')}
          />
        </div>
      </Paper>
    );
  }
}

export default DataTable;
