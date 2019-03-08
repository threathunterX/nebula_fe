import React, { Component } from 'react';
import BCharts from 'BChart';
import _ from 'lodash';
import moment from 'moment';

import Paper from '../../components/Paper';
import HttpService, {
  STATS_SLOT_QUERY
} from '../../components/HttpService';
import { slotMap } from '../../components/HttpService/FetchSlotData';
import DataTable from './DataTable';
import Statistics from './Statistics';

import '../../components/Pagination/index.scss';
import './index.scss';

moment.locale('zh-cn');

class Risks extends Component {
  static formatter(vTemp, name) {
    const value = _.cloneDeep(vTemp);
    if (name === '峰值请求速度') {
      return {
        name: '峰值请求速度',
        data: [{ name: `${value || 0}次/分钟`, value: value || 0 }]
      };
    }
    if (name === '触发策略') {
      const data = [];
      _.map(value, (v, k) => {
        let stratagyName = '';
        switch (k) {
          case 'VISITOR':
            stratagyName = '访客风险';
            break;
          case 'ACCOUNT':
            stratagyName = '帐号风险';
            break;
          case 'MARKETING':
            stratagyName = '营销风险';
            break;
          case 'ORDER':
            stratagyName = '订单风险';
            break;
          case 'TRANSACTION':
            stratagyName = '支付风险';
            break;
          case 'OTHER':
            stratagyName = '其他风险';
            break;
          default:
            stratagyName = '';
        }
        data.push({
          name: stratagyName,
          data: _.map(v, (o) => {
            const stratagy = o;
            stratagy.name = o.key;
            return stratagy;
          })
        });
      });
      return {
        name: '触发策略',
        data
      };
    }
    const values = _.isObject(value)
      ? { data: _.map(value, v => Risks.formatter(v.value, v.key)) }
      : { value };

    return {
      name,
      ...values
    };
  }

  constructor(props) {
    super(props);
    this.state = {
      timestamp: moment().valueOf(),
      keyword: '',
      offset: 1,
      limit: 10,
      index: -1,
      count: 0,
      status: {
        0: 0,
        1: 0,
        2: 0,
        3: 0
      },
      tabStatus: undefined,
      items: [],
      hideStatisticsData: [],
      statistics: []
    };
  }

  componentDidMount() {
    // 获取风险事件统计
    this.fetchIncidentsStatistics();

    // 获取风险事件详情
    this.fetchIncidents();
  }

  onStatusChange(id, status) {
    HttpService.put({
      url: `platform/risks/${id}`,
      loadingIn: '.risk-list-body',
      params: { status },
      onSuccess: () => this.fetchIncidents()
    });
  }

  // 筛选页签
  onTabStatusChange(status) {
    let tabStatus;
    if (status !== -1) {
      tabStatus = status;
    }
    this.state.tabStatus = tabStatus;
    this.fetchIncidents();
  }

  getCurrentItem() {
    const { items, index } = this.state;
    const item = items[index];
    if (!item) {
      this.setState({ statistics: [] });
      return;
    }

    HttpService.post({
      url: STATS_SLOT_QUERY,
      loadingIn: '.chart-list',
      params: {
        keys: [item.ip],
        dimension: 'ip',
        timestamp: moment(item.start_time).startOf('hour').valueOf(),
        variables: [
          slotMap.IP_PAGE_DYNAMIC_20_COUNT,
          slotMap.IP_USER_DYNAMIC_20_COUNT,
          slotMap.IP_DID_DYNAMIC_20_COUNT,
          slotMap.IP_INCIDENT_MAX_RATE,
          slotMap.IP_SCENE_STRATEGY_GROUP_COUNT
        ]
      },
      onSuccess: (result) => {
        if (result.status === 200) {
          const {
            values
          } = result;
          const resData = _.get(values, item.ip);
          const uri_stems = _.get(resData, `${slotMap.IP_PAGE_DYNAMIC_20_COUNT}.value`, []);

          const hosts = [];
          _.map(uri_stems, (uriObj) => {
            const hostName = uriObj.key.split('/')[0];
            const hostIndex = _.findIndex(hosts, { key: hostName });
            if (hostIndex === -1) {
              hosts.push({
                key: hostName,
                value: 1
              });
            } else {
              hosts[hostIndex].value += 1;
            }
          });
          const slotData = {
            uri_stems,
            hosts,
            associated_users: _.get(resData, `${slotMap.IP_USER_DYNAMIC_20_COUNT}.value`, []),
            dids: _.get(resData, `${slotMap.IP_DID_DYNAMIC_20_COUNT}.value`, []),
            peak: _.get(resData, `${slotMap.IP_INCIDENT_MAX_RATE}.value`, 0),
            strategies: _.get(resData, `${slotMap.IP_SCENE_STRATEGY_GROUP_COUNT}.value`, {})
          };

          const statistics = _.map(
            {
              uri_stems: 'PAGE',
              hosts: 'HOST',
              associated_users: 'USER',
              dids: 'DeviceID',
              // associated_orders: '关联交易',
              peak: '峰值请求速度',
              strategies: '触发策略'
            },
            (name, key) => Risks.formatter(slotData[key], name)
          );

          this.setState({ statistics });
        }
      }
    });
  }

  fetchIncidentsStatistics() {
    const { timestamp } = this.state;

    HttpService.all([
      HttpService.get({
        url: 'platform/risks/statistics',
        loadingIn: '.risks-bar-chart',
        params: {
          start_time: moment(timestamp)
            .startOf('hour').subtract(3, 'months').valueOf(),
          end_time: timestamp
        }
      }),
      HttpService.post({
        url: STATS_SLOT_QUERY,
        params: {
          dimension: 'global',
          timestamp: moment(timestamp).startOf('hour').valueOf(),
          variables: [slotMap.TOTAL_INCIDENT_COUNT]
        }
      })
    ], {
      onSuccess: (results) => {
        const data = _.reduce(
          results[0],
          (res, item) => {
            res.push(
              ..._.map(item, (value, key) => ({ x: key, y: value }))
            );
            return res;
          },
          []
        );

        const onlineObj = _.get(results[1], `values.${slotMap.TOTAL_INCIDENT_COUNT}`, {
          key: moment(timestamp).startOf('hour').valueOf(),
          value: 0
        });

        data[data.length - 1] = {
          x: onlineObj.key,
          y: onlineObj.value
        };

        this.renderIncidentsStatistics(data);
      }
    });
  }

  fetchIncidents() {
    const { timestamp, keyword, offset, limit, tabStatus } = this.state;
    let url = 'platform/risks/realtime';
    const params = { keyword, offset, limit, status: tabStatus };

    if (!moment(timestamp).startOf('hour').isSame(moment().startOf('hour'))) {
      url = 'platform/risks/history';
      Object.assign(params, {
        start_time: moment(timestamp).startOf('hour').valueOf(),
        end_time: timestamp
      });
    }

    this.setState({ index: -1 });

    HttpService.get({
      url,
      loadingIn: '.risk-list-body',
      params,
      onSuccess: (data) => {
        this.setState({ ...data, index: 0 });
      }
    });
  }

  handleChange(value, key) {
    this.setState({ [key]: value });
  }

  renderIncidentsStatistics(data) {
    // 初始化柱形图对象
    const barChart = new BCharts('#rect');
    // 绘制柱形图
    barChart
    // 基本配置
      .setConfig({
        name: 'bar',
        type: 'bar',
        data,
        onClick: (params) => {
          this.setState({
            offset: 1,
            timestamp: moment(Number(params.value.x)).endOf('hour').valueOf()
          });
        }
      })
      // 鼠标悬浮显示游标
      .setHoverCursor(true)
      // 鼠标悬浮显示数据信息
      .setHoverText(params => (
        [`风险事件数:${parseInt(params.y, 10)}`, moment(Number(params.x)).format('YYYY.MM.DD HH:mm')]
      ))
      // 点击显示标尺
      .setClickCursor(true, _.last(data))
      // x轴配置
      .setXAxis({
        textPos: 'left',
        markCount: 4,
        gridLine: false,
        format: x => moment(Number(x)).format('YYYY.MM.DD dddd')
      })
      // Y轴配置
      .setYAxis({
        markCount: 5
      })
      // 数据区域
      .setDataZoom({
        type: 'fixed',
        // type: "scalable",
        freshTime: 'end',
        end: 100,
        width: 96
      })
      // 构建图表
      .build();
  }

  render() {
    const {
      count,
      status,
      items,
      limit,
      offset,
      timestamp,
      keyword,
      index,
      statistics
    } = this.state;

    return (
      <div className="wb-risks container">
        <h1>风险事件管理</h1>
        <section className="wb-timeline">
          <Paper>
            <h2>风险事件数</h2>

            <div id="rect" className="risks-bar-chart loader" />
          </Paper>
        </section>
        <div>
          <section className="wb-statistics">
            <Statistics test={`${index}_${offset}`} items={statistics} onReload={() => this.getCurrentItem()} />
          </section>
          <section className="wb-items">
            <DataTable
              {...{ count, status, items, limit, offset, timestamp, keyword, index }}
              onReload={() => this.fetchIncidents()}
              onChange={(value, key) => this.handleChange(value, key)}
              onTabStatusChange={stat => this.onTabStatusChange(stat)}
              onStatusChange={(id, stat) => this.onStatusChange(id, stat)}
            />
          </section>
        </div>
      </div>
    );
  }
}

export default Risks;

