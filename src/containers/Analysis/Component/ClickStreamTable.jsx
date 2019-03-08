import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import _ from 'lodash';
import { PromiseState } from 'react-refetch';

import { HTTP_PARAM } from '../../../constants/httpStandardParam';
import Connect from '../../../components/util/Connect';
import Select from '../../../components/Select';

import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn
} from '../../../components/Table';
import SvgIcon from '../../../components/SvgIcon';
import EasyToast from '../../../components/EasyToast';
import Selector from '../../../components/Selector';
import SearchLabels from './SearchLabels';
import { labelMap } from './constant';
import './index.scss';

const API_STRATEGIES = 'nebula/strategies';

@Connect('ClickStreamTable')(() => ({
  // 本周趋势和当日趋势
  fetchStrategyData: {
    url: API_STRATEGIES,
    body: { app: 'nebula' },
    then: (data) => {
      const { status, values } = data;

      const value = [];

      if (status === 200 && values.length > 0) {
        values.forEach((item, index) => {
          value.push({
            text: item.name,
            value: `${index}`
          });
        });
      }

      return { value };
    }
  }
}))
class ClickStreamTable extends Component {
  static propTypes = {
    onSelectIndexChange: PropTypes.func.isRequired,
    onSearch: PropTypes.func.isRequired,
    setSelectCol: PropTypes.func.isRequired,
    loadMore: PropTypes.func.isRequired,
    selectCol: PropTypes.string.isRequired,
    scatterSelectIndex: PropTypes.number.isRequired,
    dataList: PropTypes.oneOfType([PropTypes.array]).isRequired,
    notice: PropTypes.number,
    fetchStrategyData: PropTypes.instanceOf(PromiseState),
    moreData: PropTypes.bool
  };
  static defaultProps = {
    moreData: false,
    fetchStrategyData: undefined,
    notice: undefined
  };

  // 获取详情
  static getDetailData(data) {
    if (!data) {
      return {};
    }
    const dataset = data;

    const title = [
      moment(Number(dataset.timestamp)).format('YYYY.MM.DD'),
      moment(Number(dataset.timestamp)).format('HH:mm:ss:SSS'),
      `Client:${dataset.c_ip}:${dataset.c_port}`,
      `Sever:${dataset.s_ip}:${dataset.s_port}`
    ];

    if (!dataset.uri_query) {
      dataset.uri_query = '';
    }
    let paramsStr = dataset.uri_query.split('&');
    if (dataset.uri_query === '') {
      paramsStr = [];
    }
    const paramList = {};
    paramsStr.forEach((param) => {
      const paramPair = param.split('=');
      paramList[paramPair[0]] = paramPair[1];
    });

    const notices = dataset.notices ? dataset.notices.split(',') : [];

    const content = {
      header: {
        'REQUEST HEADER': {
          host: dataset.host,
          method: dataset.method,
          page: dataset.page,
          query: paramList,
          referer: dataset.referer,
          useragent: dataset.useragent,
          cookie: dataset.cookie
        },
        'RESPOND HEADER': {
          status: dataset.status,
          redirecturl: ''
        }
      },
      body: {
        'REQUEST BODY': {
          data: dataset.c_body
        },
        'RESPOND BODY': {
          data: dataset.s_body
        }
      },
      nebula: {
        'nebula HEADER': {
          id: dataset.id,
          app: dataset.app,
          name: dataset.name,
          timestamp: dataset.timestamp
        },
        解析后事件: {
          parameter: {}
        },
        触发风险名单: {
          notices
        }
      }
    };

    Object.keys(dataset).forEach((item) => {
      if (HTTP_PARAM.indexOf(item) < 0) {
        content.nebula['解析后事件'].parameter[item] = dataset[item];
      }
    });

    return [title, content];
  }

  // 处理数字
  static dealNum(num) {
    if (num >= 0 && num < 10) {
      return `0${num}`;
    }
    return num;
  }

  // 获取时间间隔
  static getInterval(dataList, index) {
    let time = 0;
    if (index > 0) {
      time = dataList[index - 1].timestamp - dataList[index].timestamp;
    }

    let mSecondText = '000';
    let secondText = '00';
    let minuteText = '00';

    // 获取毫秒
    const mSecond = time % 1000;
    if (mSecond >= 0 && mSecond < 10) {
      mSecondText = `00${mSecond}`;
    } else if (mSecond >= 10 && mSecond < 100) {
      mSecondText = `0${mSecond}`;
    } else {
      mSecondText = mSecond;
    }

    // 秒数
    const seconds = Math.floor(time / 1000);
    if (seconds > 0) {
      const second = seconds % 60;
      secondText = ClickStreamTable.dealNum(second);
      const minutes = Math.floor(seconds / 60);
      if (minutes > 0) {
        const minute = minutes % 60;
        minuteText = ClickStreamTable.dealNum(minute);
      }
    }

    return `${minuteText}:${secondText}:${mSecondText}`;
  }

  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      searchLabels: [],
      left: labelMap[0]
    };
  }

  componentDidMount() {
    const scrollContainer = document.querySelector('.click-data .nebula-body-table');
    // 元素滚动完后，禁用父级滚动
    scrollContainer.onmousewheel = (e) => {
      const target = e.currentTarget;
      // 提前一步阻止默认时间，否则父级有时还是会滚动
      if (((target.scrollTop - e.wheelDeltaY) <= 0 && e.wheelDeltaY > 0) ||
        (
          (target.scrollTop - e.wheelDeltaY) >= (target.scrollHeight - target.clientHeight) &&
          e.wheelDeltaY < 0
        )) {
        // 如果向下滚动，则直接滚到顶部
        if (e.wheelDeltaY > 0) {
          target.scrollTop = 0;
        } else {
          // 如果向上滚动，则直接滚到底部
          target.scrollTop = target.scrollHeight - target.clientHeight;
        }
        e.preventDefault();
      }
    };
  }

  componentWillUpdate(props) {
    if (props.dataList !== this.props.dataList) {
      this.props.onSelectIndexChange(0);
    }
  }

  // 标签内容改变
  onLabelChange(searchLabels) {
    this.onSearch(searchLabels);
    this.setState({ searchLabels });
  }

  // 触发搜索动作
  onSearch(searchLabels) {
    const searchLabelsTemp = [];
    searchLabels.forEach((labels) => {
      // 第一层
      const labelsTemp = [];
      labels.forEach((label) => {
        if (!label.disabled) {
          labelsTemp.push(label);
        }
      });
      // 如果有内容，则添加
      if (labelsTemp.length > 0) {
        searchLabelsTemp.push(labelsTemp);
      }
    });

    if (this.props.onSearch) {
      this.props.onSearch(searchLabelsTemp);
    }
  }

  onSearchSubmit(e, keyword) {
    if (e) {
      e.preventDefault();
    }

    const {
      searchLabels,
      left
    } = this.state;

    const value = keyword.trim();

    searchLabels.push([{
      left: left.value,
      op: '==',
      right: value
    }]);

    this.onSearch(searchLabels);

    this.setState({
      searchLabels
    });
  }

  // 获取可选择列获取类名
  getClassName(colName, index) {
    const {
      selectCol,
      scatterSelectIndex,
      notice
    } = this.props;

    if (selectCol === colName && scatterSelectIndex === index) {
      if (notice === 1) {
        return 'warning';
      } else if (notice === 0) {
        return 'normal';
      }
      return '';
    }
    return '';
  }

  // 被攻击URL表格内容
  getClickStreamBody() {
    const {
      dataList,
      moreData,
      scatterSelectIndex
    } = this.props;

    const {
      loading
    } = this.state;

    const data1 = dataList[1][Object.keys(dataList[1])[0]];
    const data2 = dataList[1][Object.keys(dataList[1])[1]];
    return (
      <TableBody
        deselectOnClickaway={false}
        displayRowCheckbox={false}
        showRowHover
      >
        {
          dataList[0].length > 0 ? (
            _.map(dataList[0], (item, index) => (
              <TableRow selected={index === scatterSelectIndex} key={index}>
                <TableRowColumn className="date">{moment(Number(item.timestamp)).format('YYYY.MM.DD')}</TableRowColumn>
                <TableRowColumn
                  className="time"
                >{moment(Number(item.timestamp)).format('HH:mm:ss:SSS')}</TableRowColumn>
                <TableRowColumn className="interval">{ClickStreamTable.getInterval(dataList[0], index)}</TableRowColumn>
                <TableRowColumn tooltip={item.page} className="page">
                  <span className={this.getClassName('PAGE', index)}>{item.page}</span>
                </TableRowColumn>
                <TableRowColumn tooltip={item.sid} className="session">
                  <span className={this.getClassName('SessionID', index)}>{item.sid}</span>
                </TableRowColumn>
                <TableRowColumn tooltip={data1[index]}>
                  <span
                    className={this.getClassName(Object.keys(dataList[1])[0], index)}
                  >{data1[index]}</span>
                </TableRowColumn>
                <TableRowColumn tooltip={data2[index]}>
                  <span
                    className={this.getClassName(Object.keys(dataList[1])[1], index)}
                  >{data2[index]}</span>
                </TableRowColumn>
                <TableRowColumn className="risk-list">
                  {
                    _.map(item.category, (value, key) => {
                      let overlay;
                      if (item.notices) {
                        overlay = (
                          <div>
                            {_.map(item.notices.split(','), (v, k) => (
                              <div key={k}>{v}</div>
                            ))}
                          </div>
                        );
                      }

                      const icon = (() => {
                        switch (value) {
                          case 'VISITOR':// 访客
                            return (
                              <SvgIcon key={key} iconName="visitor" />
                            );
                          case 'ACCOUNT':// 帐号
                            return (
                              <i key={key} className="iconfont icon-tablet" />
                            );
                          case 'TRANSACTION':// 支付
                            return (
                              <i key={key} className="iconfont icon-creditcard" />
                            );
                          case 'ORDER':// 订单
                            return (
                              <i key={key} className="iconfont icon-shoppingcart" />
                            );
                          case 'MARKETING':// 营销
                            return (
                              <i key={key} className="iconfont icon-tagso" />
                            );
                          case 'OTHER':// 其他
                            return (
                              <i key={key} className="iconfont icon-pluscircleo" />
                            );
                          default:
                            return null;
                        }
                      })();
                      return overlay ?
                        (<EasyToast key={key} trigger="hover" placement="top" overlay={overlay}>
                          <div className="icon-container">
                            {icon}
                          </div>
                        </EasyToast>) :
                        (<div key={key} className="icon-container">
                          {icon}
                        </div>);
                    })
                  }
                </TableRowColumn>
                <TableRowColumn className="risk-point">
                  {item.risk_score ? (item.risk_score / 10) : item.risk_score}
                </TableRowColumn>

              </TableRow>
            ))
          ) : (
            <TableRow
              selectable={false}
              hoverable={false}
              className="empty-text-tr"
            >
              <TableRowColumn colSpan="9">
                <div className="empty-text">
                  <i className="iconfont icon-crosscircle" />
                  抱歉！没有找到相关的内容。
                </div>
              </TableRowColumn>
            </TableRow>
          )
        }
        <TableRow
          selectable={false}
          hoverable={false}
          className={(moreData || dataList[0].length % 20 !== 0 || dataList[0].length === 0) ? 'none' : ''}
        >
          <TableRowColumn colSpan="9">
            <div className="load-more">
              {loading ?
                (<i className="iconfont icon-loading" />) :
                ''
              }
              <span
                className={loading ? 'more-loading' : ''}
                onClick={() => {
                  this.loadMore();
                }}
                role="presentation"
              >{loading ? '正在加载...' : '查看更多'}</span>
            </div>
          </TableRowColumn>
        </TableRow>
      </TableBody>
    );
  }

  // 设置选中列
  setSelectCol(colName) {
    const {
      setSelectCol
    } = this.props;

    setSelectCol(colName);
  }

  loadMore() {
    // 加载更多
    if (this.props.loadMore) {
      this.props.loadMore(() => {
        // 加载完回调
        this.setState({ loading: false });
      });
      this.setState({ loading: true });
    }
  }

  prevRow() {
    const {
      scatterSelectIndex,
      onSelectIndexChange
    } = this.props;

    if (scatterSelectIndex <= 0) {
      return;
    }

    const detailContent =
      ClickStreamTable.getDetailData(this.props.dataList[0][scatterSelectIndex - 1]);

    onSelectIndexChange(scatterSelectIndex - 1);
    this.setState({
      detailContent
    });
  }

  nextRow() {
    const {
      scatterSelectIndex,
      onSelectIndexChange
    } = this.props;

    if (scatterSelectIndex >= this.props.dataList[0].length - 1) {
      return;
    }
    onSelectIndexChange(scatterSelectIndex + 1);
  }

  handleRowSelection(rows) {
    const selectedRows = rows;
    const {
      scatterSelectIndex,
      onSelectIndexChange
    } = this.props;

    if (selectedRows[0] === undefined) {
      selectedRows[0] = scatterSelectIndex;
    }

    onSelectIndexChange(selectedRows[0]);
  }

  render() {
    const {
      dataList,
      scatterSelectIndex,
      fetchStrategyData,
      selectCol
    } = this.props;

    const {
      searchLabels
    } = this.state;

    let strategyList = [];
    if (fetchStrategyData && fetchStrategyData.fulfilled) {
      strategyList = fetchStrategyData.value;
    }

    // 被攻击URL表格内容
    const clickStreamBody = this.getClickStreamBody();

    const detailContent = ClickStreamTable.getDetailData(dataList[0][scatterSelectIndex]);

    return (
      <div className="click-stream-detail">
        <div className="click-stream-table">
          <h2>
            <span>点击详情</span>

            <div className="search-form-container">
              <Selector
                className="type-selection"
                selectorType="list"
                dataList={labelMap}
                value={labelMap[0]}
                onChange={left => this.setState({ left })}
              />
              <form
                className="analysis-search"
                onSubmit={e => this.onSearchSubmit(e, e.target.keyword.value)}
              >
                <i className="iconfont icon-search" />
                {
                  this.state.left.value === 'notices' ? (
                    <Select
                      className="search-select-input"
                      dataList={strategyList}
                      placeholder="search"
                      onChange={(index) => {
                        this.onSearchSubmit(false, strategyList[index].text);
                      }}
                      filterOption={
                        (input, option) =>
                        option.props.text.toLowerCase().indexOf(input.toLowerCase()) >= 0
                      }
                    />
                  ) : (
                    <input
                      className="search-input"
                      name="keyword"
                      type="text"
                      placeholder="search"
                    />
                  )
                }
              </form>
            </div>
          </h2>

          <SearchLabels
            searchLabels={searchLabels}
            onChange={(Labels) => {
              this.onLabelChange(Labels);
            }}
          />

          <Table
            className="click-data"
            fixedHeader
            onRowSelection={rows => this.handleRowSelection(rows)}
          >

            <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
              <TableRow>
                <TableHeaderColumn className="date">日期</TableHeaderColumn>
                <TableHeaderColumn className="time">时间</TableHeaderColumn>
                <TableHeaderColumn className="interval">间隔</TableHeaderColumn>
                <TableHeaderColumn className="page">
                  <div
                    className="selectable-col"
                    onClick={() => {
                      this.setSelectCol('PAGE');
                    }}
                    role="presentation"
                  >
                    <span className="table-title-text">页面</span>
                    <i className={`iconfont icon-barchart${selectCol === 'PAGE' ? ' selected' : ''}`} />
                  </div>
                </TableHeaderColumn>
                <TableHeaderColumn className="session">
                  <div
                    className="selectable-col"
                    onClick={() => {
                      this.setSelectCol('SessionID');
                    }}
                    role="presentation"
                  >
                    <span className="table-title-text">SessionID</span>
                    <i className={`iconfont icon-barchart${selectCol === 'SessionID' ? ' selected' : ''}`} />
                  </div>
                </TableHeaderColumn>
                <TableHeaderColumn>
                  <div
                    className="selectable-col"
                    onClick={() => {
                      this.setSelectCol(Object.keys(dataList[1])[0]);
                    }}
                    role="presentation"
                  >
                    <span className="table-title-text">{Object.keys(dataList[1])[0]}</span>
                    <i
                      className={`iconfont icon-barchart${selectCol === Object.keys(dataList[1])[0] ? ' selected' : ''}`}
                    />
                  </div>
                </TableHeaderColumn>
                <TableHeaderColumn>
                  <div
                    className="selectable-col"
                    onClick={() => {
                      this.setSelectCol(Object.keys(dataList[1])[1]);
                    }}
                    role="presentation"
                  >
                    <span className="table-title-text">{Object.keys(dataList[1])[1]}</span>
                    <i
                      className={`iconfont icon-barchart${selectCol === Object.keys(dataList[1])[1] ? ' selected' : ''}`}
                    />
                  </div>
                </TableHeaderColumn>
                <TableHeaderColumn className="risk-list">风险名单</TableHeaderColumn>
                <TableHeaderColumn className="risk-point">风险分值</TableHeaderColumn>
              </TableRow>
            </TableHeader>
            {clickStreamBody}
          </Table>
        </div>
        <div className="detail-form">

          <div
            className="icon-container"
            onClick={() => {
              this.prevRow();
            }}
            role="presentation"
          >
            <i className="prev iconfont icon-left" />
          </div>

          <div className="detail-content">
            <h2 className="detail-title">
              {_.map(detailContent[0], (item, i) => (
                <span key={i}>{item}</span>
              ))}
            </h2>

            <div className="detail-data">
              {_.map(detailContent[1], (outer, i) => (
                <div key={i}>
                  {_.map(outer, (inner, title) => (
                    <div key={title}>
                      <h3>{title}</h3>

                      <div className="data-content">
                        {_.map(inner, (item, subTitle) => (
                          <div key={subTitle} className="data-item">
                            <span className="label" title={subTitle}>{subTitle}</span>
                            {
                              (() => {
                                if (typeof (item) !== 'object') {
                                  return (<p>{item}</p>);
                                } else if (item instanceof Array) {
                                  return (
                                    <div>
                                      {_.map(item, (v, key) => (
                                        <p key={key}>
                                          {v}
                                        </p>
                                      ))}
                                    </div>
                                  );
                                }
                                return (
                                  <div>
                                    {_.map(item, (v, key) => (
                                      <div key={key}>
                                        <span style={{ color: '#fff' }}>{key}&lt;</span>
                                        <span>{v}</span>
                                        <span style={{ color: '#fff' }}>&gt;</span>
                                      </div>
                                    ))}
                                  </div>
                                );
                              })()
                            }
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
          <div
            className="icon-container"
            onClick={() => {
              this.nextRow();
            }}
            role="presentation"
          >
            <i className="next iconfont icon-right" />
          </div>

        </div>
      </div>
    );
  }
}

export default ClickStreamTable;

