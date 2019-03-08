import React, { Component } from 'react';
import _ from 'lodash';
import {
  version
} from 'app.config';
import Cookies from 'js-cookie';

import Notification from '../../components/Notification/index';

import ResultTable from './ResultTable2';
import HttpService from '../../components/HttpService/index';

import './setting.scss';

const notification = Notification.getNewInstance();


const API_ALERTS = 'nebula/events';
const API_ALERTS_DETAIL = 'nebula/NebulaStrategy';

const ACTION_DEFAULT = 'ACTION_DEFAULT';
const ACTION_INSERT = 'ACTION_INSERT';
const ACTION_DELETE = 'ACTION_DELETE';

const username = Cookies.get('username');

const appID = 'Strategie';
const httpRequestParam = {
  appID,
  module: 2
};

class Setting extends Component {
  constructor(props) {
    super(props);

    this.state = {
      items: [],
      itemDetail: {},
      exporting: false
    };
  }

  componentDidMount() {
    // 用户访问/刷新页面 写入Tracker
    if (window.threathunterTracker) {
      window.threathunterTracker.setData({
        version,
        username,
        module: 2,
        appID,
        level: 1,
        message: 'visit'
      });
    }
    this.fetchAlerts();
  }
  // 获取“策略”
  fetchAlerts() {
    HttpService.get({
      httpRequestParam,
      url: API_ALERTS,
      loadingIn: '.result-table',
      onSuccess: (data) => {
        this.setState({ items: data.values, count: 0 });
      },
      onError: () => {
        notification.error('服务异常，请重试。');
      }
    });
  }

  // 获取脚本详情
  fetchAlertsDetail(key, strategy) {

    this.setState({ itemDetail: {}});
    const params = {"strategy" : strategy};

    HttpService.get({
      httpRequestParam,
      url: API_ALERTS_DETAIL,
      params,
      onSuccess: (data) => {
        this.setState({ itemDetail: data});
      }
    });
  }

  handleSubmit(value, key) {
    if (_.isNull(value)) {
      this.setState({ action: ACTION_DEFAULT });
      return;
    }

    switch (key) {
      case ACTION_INSERT:

        break;
      case ACTION_DELETE:
          const params ={"py_name" : value.key, "py_content":''}

          HttpService.put({
          url: '/nebula/NebulaStrategy',
          params: params,
          onSuccess: (data) => {
            console.log(data)
            this.setState({ cloneVisible: false });
            this.fetchAlertsDetail(value.key, value.key)
            notification.success({ message: '删除成功' });
          },
          onError: () => {
              notification.error({ message: '删除失败' });
          }
        });
        break;
      default:
    }
  }

  render() {
    const {
      items,
      itemDetail
    } = this.state;
    return (
      <div className="wd-name-list container">
        <h1 className="title">脚本配置</h1>

        <div className="result-container">
          <div className="result-table2 loader">
            <ResultTable
              {...{ items}}
              items={items}
              itemDetail={itemDetail}
              onChange={(value, key) => this.handleChange(value, key)}
              onGetDetail={(key, strategy) => this.fetchAlertsDetail(key, strategy)}
              onReload={() => this.fetchAlerts()}
              onSubmit={(value, key) => this.handleSubmit(value, key)}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default Setting;
