import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import moment from 'moment';
import _ from 'lodash';

import SvgIcon from '../../components/SvgIcon';
import Paper from '../../components/Paper';
import EasyToast from '../../components/EasyToast';
import FormSearchInput from '../../components/FormSearchInput';
import NumberFormat from '../../components/util/NumberFormat';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn
} from '../../components/Table';

const FORM_KEYWORD = 'keyword';

@withRouter
class Incidents extends Component {
  static propTypes = {
    items: PropTypes.oneOfType([PropTypes.array]).isRequired,
    history: PropTypes.oneOfType([PropTypes.object]).isRequired,
    timestamp: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
    keyword: PropTypes.string.isRequired,
    onReload: PropTypes.func.isRequired,
    onChange: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {
      focusSearch: false,
      keyword: ''
    };
  }

  componentDidUpdate(props) {
    const { timestamp, keyword, onReload } = this.props;

    if (timestamp !== props.timestamp ||
      keyword !== props.keyword) {
      onReload();
    }
  }

  handleKeywordSubmit(keyword) {
    this.props.onChange(keyword, FORM_KEYWORD);
  }

  render() {
    const { items, onReload, timestamp } = this.props;
    const { keyword } = this.state;

    return (
      <Paper>
        <header>
          <h2>风险事件详情</h2>
          <div>
            <button onClick={onReload} className="iconfont icon-reload btn-reload" />
            <FormSearchInput
              className="home-search"
              placeholder="search"
              placeholderWidth={60}
              keyword={keyword}
              onSubmit={value => this.handleKeywordSubmit(value)}
              onChange={value => this.setState({ keyword: value })}
            />
          </div>
        </header>
        <div className="items-warpper">
          <Table fixedHeader>
            <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
              <TableRow>
                <TableHeaderColumn className="cell-score">风险分值</TableHeaderColumn>
                <TableHeaderColumn className="cell-start-time">起始时间</TableHeaderColumn>
                <TableHeaderColumn className="cell-ip">IP</TableHeaderColumn>
                <TableHeaderColumn className="cell-users-count">关联用户</TableHeaderColumn>
                <TableHeaderColumn className="cell-most-visited">请求最多的地址</TableHeaderColumn>
                <TableHeaderColumn className="cell-tags">风险标签</TableHeaderColumn>
                <TableHeaderColumn className="cell-strategies">命中策略</TableHeaderColumn>
              </TableRow>
            </TableHeader>
            <TableBody deselectOnClickaway={false} displayRowCheckbox={false} showRowHover>
              {
                _.map(items, (item, index) => (
                  <TableRow key={index}>
                    <TableRowColumn tooltip={item.risk_score} className="cell-score">
                      {/* 风险值 */}
                      {item.risk_score / 10}
                    </TableRowColumn>
                    <TableRowColumn
                      className="cell-start-time"
                      tooltip={moment(_.toInteger(item.start_time)).format('YYYY/MM/DD HH:mm:ss')}
                    >
                      {/* 起始时间 */}
                      {moment(_.toInteger(item.start_time)).format('YYYY/MM/DD HH:mm:ss')}
                    </TableRowColumn>
                    <TableRowColumn tooltip={item.ip} className="cell-ip">
                      {/* IP */}
                      <span
                        className="ip-text"
                        onClick={() => this.props.history.push(`/analysis/ip/${encodeURIComponent(item.ip)}?timestamp=${timestamp}`)}
                        role="button"
                        tabIndex="0"
                      >{item.ip}</span>
                    </TableRowColumn>
                    <TableRowColumn tooltip={item.users_count} className="cell-users-count">
                      {/* 关联用户 */}
                      {item.users_count}
                    </TableRowColumn>
                    <TableRowColumn tooltip={item.most_visited} className="cell-most-visited">
                      {/* 请求最多的地址 */}
                      <span
                        className="most-visited-text"
                        onClick={() => this.props.history.push(`/analysis/page/${encodeURIComponent(item.most_visited)}`)}
                        role="button"
                        tabIndex="0"
                      >{item.most_visited}</span>
                    </TableRowColumn>
                    <TableRowColumn className="cell-tags">
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
                    <TableRowColumn className="cell-strategies">
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
                              case '访客': // 访客
                                return (
                                  <SvgIcon className="strategies-icon" iconName="visitor" />
                                );
                              case '帐号': // 帐号
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
                  </TableRow>
                ))
              }
            </TableBody>
          </Table>
        </div>
      </Paper>
    );
  }
}

export default Incidents;
