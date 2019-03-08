import React, { Component } from 'react';
import BCharts from 'BChart';
import moment from 'moment';
import _ from 'lodash';

import HttpService from '../../components/HttpService';
import GeoMap from '../../components/util/GeoMap';
import Cards from './Cards';
import StrategiesArea from './StrategiesArea';
import Charts from './Charts';

import './index.scss';

const API_STATISTICS_HOUR = 'platform/alarm/statistics_detail';
const API_REALTIME = 'platform/risks/realtime';
const API_TAG_STATISTICS = 'platform/behavior/tag_statistics';
const API_THREAT_MAP = 'platform/stats/threat_map';
const THREAT_MAP_LIMIT = 1000;

class GodEye extends Component {
  constructor(props) {
    super(props);

    this.state = {
      area: [],
      incidents: [],
      labels: [],
      map: {}
    };
  }

  componentDidMount() {
    this.state.map = new BCharts('#mapBg')
      .setConfig({
        name: 'map',
        type: 'thread-map',
        legend: {
          ORDER: {
            text: '订单攻击',
            color: '#9975D5'
          },
          VISITOR: {
            text: '机器人攻击',
            color: '#22C3F7'
          },
          ACCOUNT: {
            text: '账号攻击',
            color: '#7CDCCE'
          },
          TRANSACTION: {
            text: '支付攻击',
            color: '#FFEF7D'
          },
          MARKETING: {
            text: '营销攻击',
            color: '#FF5E76'
          }
        }
        // pointSize: 10,
      })
      .setGeoJson('map-json/china.json')
      .build();

    this.fetchLocations();
    this.fetchIncidents();
    this.fetchLabels();

    const end = moment().startOf('minute').valueOf();
    // 获取导弹图数据
    this.fetchThreatMap(end - 60000, end);


    const timer = setInterval(() => {
      // 离开页面不再循环
      if (location.hash !== '#/monitor') {
        clearInterval(timer);
        return;
      }
      this.fetchLocations();
      this.fetchIncidents();
      this.fetchLabels();
    }, 1000 * 60);
  }

  // 获取导弹图数据
  fetchThreatMap(from_time, end_time) {
    // 离开页面不再循环
    if (location.hash !== '#/monitor') {
      return;
    }
    HttpService.get({
      url: API_THREAT_MAP,
      loadingIn: false,
      params: {
        from_time,
        end_time,
        limit: THREAT_MAP_LIMIT
      },
      onSuccess: (data) => {
        if (data.status === 200) {
          const values = data.values;
          // values = [values[0]];

          // 超过1000条
          if (values.length >= THREAT_MAP_LIMIT) {
            const from = values[values.length - 1].timestamp;
            const end = moment().valueOf();
            // 延迟超过10分钟，则以当前时间重新取数据
            if (end - from >= 10 * 60 * 1000) {
              this.fetchThreatMap(end - 60000, end);
            } else {
              // 超过1000条，立刻请求1000条之外的数据
              this.fetchThreatMap(from, end);
            }

            this.mapFire(values, 0, from_time);
          } else {
            this.mapFire(values, 0, from_time);
            // 获取当前时间
            const now = moment().valueOf();
            // 发送请求的一分钟后，再次拉取数据
            const timeSet = 60000 - (end_time - now);
            setTimeout(() => {
              const to = moment().valueOf();
              this.fetchThreatMap(end_time, to);
            }, timeSet);
          }
        } else {
          // 失败后立即获取
          const end = moment().valueOf();
          this.fetchThreatMap(end - 60000, end);
        }
      },
      onError: () => {
        // 服务器报错，一分钟后继续获取
        // 获取当前时间
        const now = moment().valueOf();
        // 发送请求的一分钟后，再次拉取数据
        const timeSet = 60000 - (end_time - now);
        setTimeout(() => {
          const to = moment().valueOf();
          this.fetchThreatMap(end_time, to);
        }, timeSet);
      }
    });
  }

  // 激活导弹图
  mapFire(values, index, lastTime) {
    const {
      map
    } = this.state;
    // 离开页面不再循环
    if (location.hash !== '#/monitor') {
      return;
    }

    // 当前数据
    const item = values[index];
    // 数组循环完毕
    if (!item) {
      return;
    }

    const time = item.timestamp - lastTime;
    setTimeout(() => {
      const { from_city, to_city, category, test } = item;
      const fromCoord = _.get(GeoMap, from_city, [0, 0]);
      const toCoord = _.get(GeoMap, to_city, [0, 0]);
      map.fire([{
        from: fromCoord,
        fromText: from_city,
        to: toCoord,
        toText: to_city,
        threatType: category,
        intercept: !test
      }]);

      this.mapFire(values, index + 1, item.timestamp);
    }, time);
  }

  // 获取报警区域分布
  fetchLocations() {
    const params = {
      fromtime: moment().startOf('hour').valueOf(),
      endtime: moment().valueOf()
    };

    HttpService.get({
      url: API_STATISTICS_HOUR,
      loadingIn: false,
      params,
      onSuccess: (data) => {
        const areas = _.map(data.location, (item) => {
          const { count, value } = item;

          const coordinate = _.get(GeoMap, value, [0, 0]);
          return [...coordinate, count, value];
        });


        // 地区
        let area = [];
        const areasMax = _.maxBy(areas, item => item[2]);
        areas.forEach((value) => {
          area.push({
            city: value[3],
            percent: (value[2] / areasMax[2]) * 100
          });
        });
        // 地区排序
        area = _.sortBy(area, ['percent']).reverse().slice(0, 10);
        this.setState({ area });
      }
    });
  }

  // 获取标签
  fetchLabels() {
    HttpService.get({
      url: API_TAG_STATISTICS,
      loadingIn: false,
      onSuccess: (result) => {
        let data = result;
        // 过滤名字为空的数据
        _.remove(data, o => o.name === '');
        // 排序,取前10
        data = _.sortBy(data, ['count']).reverse().slice(0, 10);

        data.forEach((v, i) => {
          const item = data[i];
          item.percent = (item.count / data[0].count) * 100;
        });

        this.setState({ labels: data });
      }
    });
  }

  // 获取风险事件详情
  fetchIncidents() {
    const timestamp = moment().valueOf();

    HttpService.get({
      url: API_REALTIME,
      loadingIn: false,
      params: {
        start_time: moment(timestamp).startOf('hour').valueOf(),
        end_time: timestamp
      },
      onSuccess: (data) => {
        let { items } = data;

        // 排序
        items = _.sortBy(items, ['risk_score']).reverse().slice(0, 5);

        items.forEach((v, i) => {
          const item = items[i];
          const sum = _.sum(Object.values(item.uri_stems));
          item.percent = parseInt((item.uri_stems[item.most_visited] / sum) * 100, 10);
        });

        this.setState({ incidents: items });
      }
    });
  }

  render() {
    const {
      area,
      incidents,
      labels
    } = this.state;

    return (
      <div className="wb-god-eye">

        <div className="top-container">
          <div id="mapBg" className="map-bg" />
          <Cards incidents={incidents} />
        </div>
        <div className="bottom-container">
          <Charts />
          <StrategiesArea area={area} labels={labels} />
        </div>
      </div>
    );
  }
}

export default GodEye;
