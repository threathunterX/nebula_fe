import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import _ from 'lodash';
import moment from 'moment';
import URI from 'urijs';

import TrendChart from '../Component/TrendChart';
import MapChart from '../Component/MapChart';
import UserClickChart from '../Component/UserClickChart';
import ContrastButtons from '../Component/ContrastButtons';
import ContrastChart from '../Component/ContrastChart';
import DataTable from './DataTable';
import './index.scss';

import GeoMap from '../../../components/util/GeoMap';
import FormSearchInput from '../../../components/FormSearchInput';
import HttpService, {
  STATS_SLOT_QUERY,
  STATS_OFFLINE_SERIAL
} from '../../../components/HttpService';
import FetchSlotData, { slotMap, FillDefaultTimeLine } from '../../../components/HttpService/FetchSlotData';

// const API_STATISTICS_TOPS = 'platform/behavior/related_statistics';
const API_STATISTICS_ALERTS = 'platform/alarm/statistics';
const KEY_DID = 'did';
const DEFAULT_DATA_WIDTH = 96;

@withRouter
class DIDOverview extends Component {
  static propTypes = {
    location: PropTypes.oneOfType([PropTypes.object]).isRequired,
    history: PropTypes.oneOfType([PropTypes.object]).isRequired
  };

  constructor(props) {
    super(props);

    const btns = [{
      name: 'ip',
      text: '关联IP',
      variable: {
        red: slotMap.DID_IP_DYNAMIC_100_COUNT,
        main: slotMap.DID_DYNAMIC_IP
      }
    }, {
      name: 'uid',
      text: '关联用户',
      variable: {
        red: slotMap.DID_UID_DYNAMIC_100_COUNT,
        main: slotMap.DID_DYNAMIC_USER
      }
    }, {
      name: 'page',
      text: '关联页面',
      variable: {
        red: slotMap.DID_PAGE_DYNAMIC_100_COUNT,
        main: slotMap.DID_DYNAMIC_PAGE
      }
    }, {
      name: 'click',
      text: '点击次数',
      variable: {
        red: slotMap.DID_DYNAMIC_100_COUNT,
        main: slotMap.DID_DYNAMIC_COUNT
      }
    }, {
      name: 'incident',
      text: '风险事件数',
      variable: {
        red: slotMap.DID_INCIDENT_100_COUNT,
        main: slotMap.DID_INCIDENT_COUNT
      }
    }];

    this.state = {
      timestamp: 0,
      keyword: '',
      tabIndex: 0,
      mainIndex: 0,
      redIndex: 1,
      clicks: [],
      clickZoomData: [],
      dids: [],
      didZoomData: [],
      names: [],
      nameZoomData: [],
      incidents: [],
      incidentZoomData: [],
      btns,
      areas: [],
      relations: [
        {
          type: btns[1].name,
          variable: btns[1].variable,
          items: []
        },
        {
          type: btns[0].name,
          variable: btns[0].variable,
          items: []
        }
      ]
    };
  }

  componentDidMount() {
    // 趋势统计
    this.fetchRelatedStatistic();
  }

  onMainChoose(index) {
    const {
      relations,
      mainIndex,
      btns
    } = this.state;

    relations.forEach((v, i) => {
      const item = relations[i];
      if (item.type === btns[mainIndex].name) {
        this.state.relations[i].type = btns[index].name;
        this.state.relations[i].variable = btns[index].variable;
      }
    });
    this.setState({ mainIndex: index });
    this.fetchContrastStatistics();
  }

  onRedChoose(index) {
    const {
      relations,
      redIndex,
      btns
    } = this.state;

    relations.forEach((v, i) => {
      const item = relations[i];
      if (item.type === btns[redIndex].name) {
        this.state.relations[i].type = btns[index].name;
        this.state.relations[i].variable = btns[index].variable;
      }
    });
    this.setState({ redIndex: index });
    this.fetchContrastStatistics();
  }

  onRedMainSwap(red, main) {
    const {
      relations,
      redIndex,
      mainIndex,
      btns
    } = this.state;

    relations.forEach((v, i) => {
      const item = relations[i];
      if (item.type === btns[redIndex].name) {
        this.state.relations[i].type = btns[main].name;
        this.state.relations[i].variable = btns[main].variable;
      } else if (item.type === btns[mainIndex].name) {
        this.state.relations[i].type = btns[red].name;
        this.state.relations[i].variable = btns[red].variable;
      }
    });
    this.setState({
      redIndex: main,
      mainIndex: red
    });
    this.fetchContrastStatistics();
  }

  // 获取地图信息
  getMapInfo() {
    const { timestamp } = this.state;
    const from = moment(timestamp).startOf('hour').valueOf();

    HttpService.post({
      url: STATS_SLOT_QUERY,
      loadingIn: '.trend-area-container',
      params: {
        timestamp: from,
        dimension: KEY_DID,
        variables: [slotMap.DID_DYNAMIC_100_COUNT]
      },
      onSuccess: (result) => {
        if (result.status === 200) {
          const didList = _.map(_.get(result, `values.${slotMap.DID_DYNAMIC_100_COUNT}.value`), o => o.key);
          HttpService.post({
            url: STATS_SLOT_QUERY,
            loadingIn: '.trend-area-container',
            params: {
              timestamp: from,
              keys: didList,
              dimension: KEY_DID,
              variables: [slotMap.DID_GEO_DYNAMIC_20_COUNT]
            },
            onSuccess: (res) => {
              if (res.status === 200) {
                const didGeoList = res.values;
                const areaMap = {};
                // 封装地址和数量
                _.map(didGeoList, (didGeo) => {
                  _.map(_.get(didGeo, `${slotMap.DID_GEO_DYNAMIC_20_COUNT}.value`, []), (item) => {
                    areaMap[item.key] = areaMap[item.key] || 0;
                    areaMap[item.key] += Number(item.value);
                  });
                });

                // 地址格式化
                const areas = _.map(areaMap, (value, key) => {
                  const coordinate = _.get(GeoMap, key, [0, 0]);
                  return [...coordinate, value, key];
                });
                this.setState({ areas });
              }
            }
          });
        }
      }
    });
  }

  // 处理关键字搜索
  handleKeywordSubmit(keyword) {
    this.props.history.push(`/analysis/did/${encodeURIComponent(keyword)}`);
  }

  // 获取趋势统计
  fetchRelatedStatistic() {
    const to = moment().valueOf();
    const from = moment(to).startOf('hour').subtract(3, 'months').valueOf();

    const { location } = this.props;
    const timestamp = _.get(URI(location.search).query(true), 'timestamp', to);

    this.setState({ timestamp: Number(timestamp) });

    // 获取数据变量
    const var_list = [
      slotMap.TOTAL_INCIDENT_COUNT, // 风险事件数
      slotMap.TOTAL_DYNAMIC_DID, // 关联设备数
      slotMap.TOTAL_DYNAMIC_COUNT // 点击数
    ];
    const params = {
      key_type: 'total',
      from_time: from,
      end_time: to,
      var_list
    };

    // 发送请求
    FetchSlotData({
      url: STATS_OFFLINE_SERIAL,
      loadingIn: '.trend-area-container,.click-chart',
      params,
      onSuccess: (result) => {
        const value = FillDefaultTimeLine(result.values, from, to, var_list);

        const clicks = [];
        const incidents = [];
        const dids = [];
        value.forEach((item) => {
          // 格式化点击数
          clicks.push({
            x: item.time_frame,
            y: _.get(item[slotMap.TOTAL_DYNAMIC_COUNT], 'value')
          });
          // 格式化风险事件数
          incidents.push({
            x: item.time_frame,
            y: _.get(item[slotMap.TOTAL_INCIDENT_COUNT], 'value')
          });
          // 格式化关联用户
          dids.push({
            x: item.time_frame,
            y: _.get(item[slotMap.TOTAL_DYNAMIC_DID], 'value')
          });
        });

        // 起始位置，如果数据量小于四天，则起点为0
        let startPos = clicks.length - DEFAULT_DATA_WIDTH;
        if (startPos <= 0) {
          startPos = 0;
        }

        const clickZoomData = clicks.slice(startPos, clicks.length);
        const incidentZoomData = incidents.slice(startPos, incidents.length);
        const didZoomData = dids.slice(startPos, dids.length);

        this.setState({
          clicks,
          clickZoomData,
          incidents,
          incidentZoomData,
          dids,
          didZoomData
        });

        HttpService.get({
          url: API_STATISTICS_ALERTS,
          loadingIn: '.trend-area-container,.click-chart',
          params: { fromtime: from, endtime: to },
          onSuccess: (data) => {
            const names = _.map(data.result, (item) => {
              const {
                time_frame,
                production_count,
                test_count
              } = item;

              return {
                x: time_frame,
                y: production_count + test_count
              };
            });

            // 起始位置以用户点击为准
            const nameZoomData =
              names.slice(names.length - (clicks.length - startPos), names.length);

            this.setState({
              names,
              nameZoomData
            });
          }
        });
      }
    });
  }

  // 获取对比数据
  fetchContrastStatistics() {
    const { timestamp, relations } = this.state;

    // const params = {
    //   key_type: KEY_DID,
    //   fromtime: moment(timestamp).startOf('hour').valueOf(),
    //   endtime: timestamp,
    //   related_key_types: _.map(relations, item => item.type).join(',')
    // };
    //
    // HttpService.get({
    //   url: API_STATISTICS_TOPS,
    //   loadingIn: '.data-table,.analysis-contrast-chart',
    //   params,
    //   onSuccess: (data) => {
    //     const result = _.map(
    //       this.state.relations,
    //       (relation) => {
    //         const { type } = relation;
    //
    //         return {
    //           type,
    //           items: _.map(data, (item) => {
    //             const { value, related_count } = item;
    //             return {
    //               value,
    //               count: related_count[type]
    //             };
    //           })
    //         };
    //       });
    //
    //     this.setState({ relations: result });
    //   }
    // });
    const redVariable = _.get(relations[0], 'variable.red');
    const mainVariable = _.get(relations[1], 'variable.main');

    HttpService.post({
      url: STATS_SLOT_QUERY,
      loadingIn: '.data-table,.analysis-contrast-chart',
      params: {
        dimension: KEY_DID,
        timestamp: moment(timestamp).startOf('hour').valueOf(),
        variables: [redVariable]
      },
      onSuccess: (data) => {
        const {
          status,
          values
        } = data;
        if (status === 200) {
          const didObjs = _.sortBy(_.get(values, `${redVariable}.value`, []), o => (-o.value));
          const dids = _.map(didObjs, o => o.key);

          HttpService.post({
            url: STATS_SLOT_QUERY,
            loadingIn: '.data-table,.analysis-contrast-chart',
            params: {
              dimension: KEY_DID,
              keys: dids,
              timestamp: moment(timestamp).startOf('hour').valueOf(),
              variables: [mainVariable]
            },
            onSuccess: (res) => {
              const {
                status: status1,
                values: values1
              } = res;
              if (status1 === 200) {
                const result = _.map(
                  this.state.relations,
                  (relation) => {
                    const { type, variable } = relation;

                    return {
                      type,
                      variable,
                      items: _.map(didObjs, (item) => {
                        let count = 0;
                        if (type === relations[0].type) {
                          count = item.value;
                        } else {
                          count = _.get(values1[item.key][mainVariable], 'value', 0);
                        }
                        return {
                          value: item.key,
                          count
                        };
                      })
                    };
                  });

                this.setState({ relations: result });
              }
            }
          });
        }
      }
    });
  }

  // 选择页签
  selectTab(tabIndex) {
    if (this.state.tabIndex === tabIndex) {
      return;
    }

    if (tabIndex === 1) {
      this.getMapInfo();
    }

    this.setState({ tabIndex });
    this.fetchContrastStatistics();
  }

  dataZoomChange(param) {
    const {
      names,
      incidents,
      clicks,
      dids
    } = this.state;

    const clickZoomData = clicks.slice(param.minIndex, param.maxIndex + 1);
    const nameZoomData = names.slice(param.minIndex, param.maxIndex + 1);
    const incidentZoomData = incidents.slice(param.minIndex, param.maxIndex + 1);
    const didZoomData = dids.slice(param.minIndex, param.maxIndex + 1);

    this.setState({
      clickZoomData,
      nameZoomData,
      incidentZoomData,
      didZoomData
    });
  }

  render() {
    const {
      timestamp,
      tabIndex,
      keyword,
      mainIndex,
      redIndex,
      relations,
      clicks,
      clickZoomData,
      incidentZoomData,
      nameZoomData,
      didZoomData,
      clickChart,
      trendChart,
      btns,
      areas
    } = this.state;

    const dataList = _.map(
      relations,
      relation => _.map(
        relation.items,
        value => ({ x: value.value, y: value.count })
      )
    );

    return (
      <div className="wd-did-analysis container">
        <h1>
          <span
            onClick={() => this.props.history.push(`/analysis/${KEY_DID}?timestamp=${timestamp}`)}
            role="button"
            tabIndex="0"
          >DeviceID风险分析</span>

          <FormSearchInput
            className="analysis-search"
            placeholder="search for DeviceID"
            placeholderWidth={130}
            keyword={keyword}
            onSubmit={value => this.handleKeywordSubmit(value)}
            onChange={value => this.setState({ keyword: value })}
          />
        </h1>

        <UserClickChart
          selected={timestamp}
          title="设备请求"
          hoverTitle={'设备请求数'}
          items={clicks}
          onDataZoomChange={(param) => {
            this.dataZoomChange(param);
          }}
          bandChart={trendChart}
          getChartItem={(clickChartItem) => {
            this.setState({ clickChart: clickChartItem });
          }}
          onChange={(time) => {
            this.setState({ timestamp: time });
            if (this.state.tabIndex !== 0) {
              this.state.timestamp = time;
              this.getMapInfo();
            }
          }}
        />

        <div className="trend-area">
          <div className="tab">
            <div
              className={`tab-item ${tabIndex === 0 ? 'active' : ''}`}
              onClick={() => {
                this.selectTab(0);
              }}
              role="presentation"
            >趋势统计
            </div>
            <div
              className={`tab-item ${tabIndex === 1 ? 'active' : ''}`}
              onClick={() => {
                this.selectTab(1);
              }}
              role="presentation"
            >地图
            </div>
          </div>
          <div className="trend-area-container">
            {
              tabIndex === 0 ?
                (<TrendChart
                  didData={didZoomData}
                  nameData={nameZoomData}
                  eventData={incidentZoomData}
                  barData={clickZoomData}
                  onBarClick={(time) => {
                    this.setState({ timestamp: time });
                  }}
                  bandChart={clickChart}
                  getChartItem={(trendChartItem) => {
                    this.setState({ trendChart: trendChartItem });
                  }}
                />) :
                (<MapChart pointData={areas} />)
            }
          </div>

        </div>

        <ContrastButtons
          btnList={btns}
          onMainChoose={(e, index) => {
            this.onMainChoose(index);
          }}
          onRedChoose={(e, index) => {
            this.onRedChoose(index);
          }}
          onRedMainSwap={(red, main) => {
            this.onRedMainSwap(red, main);
          }}
        />

        <div className="data-contrast">

          <DataTable
            mainCol={btns[mainIndex].text}
            redCol={btns[redIndex].text}
            dataList={[_.values(relations[0].items), _.values(relations[1].items)]}
            timestamp={timestamp}
            onReload={() => this.fetchContrastStatistics()}
          />

          <ContrastChart
            dataList={dataList}
            mainCol={btns[mainIndex].text}
            redCol={btns[redIndex].text}
            onClick={(param) => {
              this.props.history.push(`/analysis/did/${encodeURIComponent(param.value.x)}?timestamp=${timestamp}`);
            }}
          />

        </div>

      </div>
    );
  }
}

export default DIDOverview;

