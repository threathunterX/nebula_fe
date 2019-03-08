import React, { Component } from 'react';
import _ from 'lodash';

import HttpService from '../../components/HttpService';
import Switch from '../../components/Switch';
import Dialog from '../../components/Dialog';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn
} from '../../components/Table';
import Notification from '../../components/Notification';
import AnalysisDetail from './AnalysisDetail';
import './index.scss';

const API_EVENTS = 'nebula/events';
const API_LOGPARSER = 'platform/logparser';
const notification = Notification.getNewInstance();

class LogsAnalysis extends Component {

  constructor(props) {
    super(props);
    this.state = {
      name: '',
      host: '',
      url: '',
      visible: false,
      events: [],
      orgEvent: [],
      dataList: [],
      detailIndex: -1
    };
  }

  componentDidMount() {
    // 获取日志解析数据
    this.fetchLogParser();

    this.fetchEvents();
  }

  onClose() {
    this.setState({ visible: false });
  }

  getDataRow(rowData, index) {
    const item = rowData;
    const {
      detailIndex
    } = this.state;

    return (
      <TableRow key={index} selectable={false} className="table-row">
        <TableRowColumn>
          <span className="title">{item.dest.indexOf('HTTP_') === 0 ? 'HTTP' : '业务'}</span>
          <span title={item.dest}>{item.dest}</span>
        </TableRowColumn>
        <TableRowColumn>{item.host}</TableRowColumn>
        <TableRowColumn>{item.url}</TableRowColumn>
        <TableRowColumn className="describe">
          <span style={{ float: 'left' }}>{item.remark}</span>

          <Switch
            className="switch"
            type="tableItem"
            defaultChecked={item.status === 1}
            checkedChildren={'启用'}
            disabled={item.dest.indexOf('HTTP_') === 0}
            unCheckedChildren={'禁用'}
            onChange={(value) => {
              item.status = value ? 1 : 0;
              this.updateLogParser(item);
            }}
          />

          <div
            className={`show-detail ${detailIndex === index ? 'active' : ''}`}
            onClick={() => {
              this.showDetail(index);
            }}
            role="presentation"
          >
            <span>{detailIndex === index ? '收起' : '查看'}</span>
            <i className={`iconfont ${detailIndex === index ? 'icon-caretup' : 'icon-caretdown'}`} />
          </div>

        </TableRowColumn>
      </TableRow>
    );
  }

  showDetail(index) {
    let {
      detailIndex
    } = this.state;

    if (detailIndex === index) {
      detailIndex = -1;
    } else {
      detailIndex = index;
    }

    this.setState({ detailIndex });
  }

  // 保存或新建
  updateLogParser(log) {
    const data = log;
    data.terms.when.forEach((item) => {
      if (item.src_col === 'uri_stem') {
        data.url = item.op_string;
      }
      if (item.src_col === 'host') {
        data.host = item.op_string;
      }
    });

    HttpService.post({
      url: API_LOGPARSER,
      params: data,
      onSuccess: (res) => {
        if (res.status !== 0) {
          notification.warning({
            message: res.msg
          });
        }
        this.fetchLogParser();
      }
    });
  }

  // 获取日志解析数据
  fetchLogParser() {
    const {
      name,
      host,
      url
    } = this.state;

    HttpService.get({
      url: API_LOGPARSER,
      params: {
        name,
        host,
        url
      },
      onSuccess: (data) => {
        const { status, values } = data;

        if (status === 0) {
          this.setState({ dataList: values });
        } else {
          notification.warning({
            message: data.msg
          });
        }
      }
    });
  }

  fetchEvents() {
    HttpService.get({
      url: API_EVENTS,
      onSuccess: (data) => {
        const { status, values } = data;

        if (status === 0) {
          const orgEventTemp = _.remove(values, (o) => {
            const item = o;
            item.text = item.name;
            return item.name.indexOf('HTTP_') === 0;
          });

          const orgEvent = _.remove(orgEventTemp, o => o.name === 'HTTP_DYNAMIC');

          this.setState({ orgEvent, events: values });
        } else {
          notification.warning({
            message: data.msg
          });
        }
      }
    });
  }

  render() {
    const {
      dataList,
      detailIndex,
      visible,
      events,
      orgEvent
    } = this.state;

    return (
      <div className="wd-logs-analysis container">
        <h1>日志解析</h1>

        <div className="search-container">
          <div className="search-item">
            <label htmlFor="log_name" className="content-label">名称</label>
            <input
              id="log_name"
              className="normal-input"
              type="text"
              placeholder="请输入名称"
              value={this.state.name}
              onChange={(e) => {
                this.setState({ name: e.target.value });
              }}
            />
          </div>
          <div className="search-item">
            <label htmlFor="log_host" className="content-label">HOST</label>
            <input
              id="log_host"
              className="normal-input"
              type="text"
              placeholder="请输入HOST"
              value={this.state.host}
              onChange={(e) => {
                this.setState({ host: e.target.value });
              }}
            />
          </div>
          <div className="search-item">
            <label htmlFor="log_url" className="content-label">URL</label>
            <input
              id="log_url"
              className="normal-input"
              type="text"
              placeholder="请输入URL"
              value={this.state.url}
              onChange={(e) => {
                this.setState({ url: e.target.value });
              }}
            />
          </div>

          <div className="btn-container">
            <button
              className="main-btn large-btn"
              onClick={() => {
                this.fetchLogParser();
              }}
            >
              搜索
            </button>
            <button
              className="ghost-btn large-btn"
              onClick={() => {
                this.setState({ name: '', host: '', url: '' });
              }}
            >
              重置
            </button>
          </div>
        </div>

        <div className="data-table">
          <Table bodyClass="table-body" fixedHeader>
            <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
              <TableRow>
                <TableHeaderColumn>名称</TableHeaderColumn>
                <TableHeaderColumn>HOST</TableHeaderColumn>
                <TableHeaderColumn>URL</TableHeaderColumn>
                <TableHeaderColumn className="describe">说明</TableHeaderColumn>
              </TableRow>
            </TableHeader>
            <TableBody
              deselectOnClickaway={false}
              displayRowCheckbox={false}
              showRowHover
            >
              {
                _.map(dataList.slice(0, detailIndex + 1),
                  (item, index) => this.getDataRow(item, index))
              }
              {
                detailIndex === -1 ? null :
                  (
                    <TableRow className="analysis-detail" selectable={false} hoverable={false}>
                      <TableRowColumn colSpan="4">
                        <AnalysisDetail
                          dataList={dataList[detailIndex]}
                          events={events}
                          orgEvent={orgEvent}
                          onCancel={() => {
                            this.showDetail(detailIndex);
                          }}
                          onSubmit={(dataListTemp) => {
                            this.updateLogParser(dataListTemp);
                            this.showDetail(detailIndex);
                          }}
                        />
                      </TableRowColumn>
                    </TableRow>
                  )
              }
              {
                _.map(dataList.slice(detailIndex + 1, dataList.length),
                  (item, index) => this.getDataRow(item, detailIndex + 1 + index))
              }
            </TableBody>
          </Table>

          <div
            className="add-search"
            onClick={() => {
              this.setState({ visible: true });
            }}
            role="presentation"
          >
            <i className="iconfont icon-plus" />
            <span>新建解析</span>
          </div>
        </div>
        <Dialog
          visible={visible}
          style={{ width: '950px' }}
          destroy
          onClose={() => {
            this.onClose();
          }}
          title="新建解析"
        >
          <AnalysisDetail
            events={events}
            orgEvent={orgEvent}
            onCancel={() => {
              this.onClose();
            }}
            type="create"
            onSubmit={(dataListTemp) => {
              this.updateLogParser(dataListTemp);
              this.onClose();
            }}
          />
        </Dialog>
      </div>
    );
  }
}

export default LogsAnalysis;
