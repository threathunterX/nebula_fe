import React, { Component } from 'react';
import { PromiseState } from 'react-refetch';
import BCharts from 'BChart';
import PropTypes from 'prop-types';
import moment from 'moment';
import _ from 'lodash';
import URI from 'urijs';
import {
  metricsSwitchOn
} from 'app.config';

import Connect from '../../../components/util/Connect';
import Perf from '../../../components/util/Perf';
import DownLoadFile from '../../../components/util/DownLoadFile';
import WeekTrend from '../Account/WeekTrend';
import CrawlerVisit from './CrawlerVisit';
import PageDataTable from './PageDataTable';

import './index.scss';

const CRAWLER_URL = 'platform/stats/crawler_risk';
const VISIT_PAGES_URL = 'platform/stats/crawler_page_risk';
const DASHBOARD_PAGE_SEARCH = 'platform/stats/dashboard_page_search';
const FOLLOW_KEYWORD = 'platform/follow_keyword';

const page_limit = 25;

@Connect('Crawler')(() => ({
  // 本周趋势和当日趋势
  fetchCrawlerChartData: (params, loadingIn) => ({
    crawlerChartData: {
      url: CRAWLER_URL,
      loadingIn,
      body: params,
      then: (data) => {
        const {
          status,
          values
        } = data;

        const value = {
          trend_day: [],
          trend_week: {
            all_count: [],
            risk_count: []
          }
        };
        if (status === 200) {
          value.trend_day = _.map(values.trend_day, (v, key) => ({
            x: `${key}:00`,
            y: v
          }));
          Object.keys(values.trend_week).forEach((key) => {
            value.trend_week.all_count.push({
              x: key,
              y: values.trend_week[key].page__request_amount__profile
            });
            value.trend_week.risk_count.push({
              x: key,
              y: values.trend_week[key].page__request_crawler_risk_amount__profile
            });
          });

          value.trend_day = _.sortBy(value.trend_day, o => o.x);
        }

        return { value };
      }
    }
  }),
  // 爬虫访问页面列表
  fetchVisitPagesData: (params, callback) => ({
    visitPagesData: {
      url: VISIT_PAGES_URL,
      loadingIn: '.card-list',
      body: params,
      then: (data) => {
        const {
          status,
          values
        } = data;

        let value = [];
        if (status === 200) {
          value = values;

          value.forEach(({ continuous_data }, index) => {
            // 柱形图数据
            const barChartData = {
              requestData: [],
              crawlerData: []
            };
            // 延迟图表数据
            const delayData = [];
            // 导入量图表数据
            const uploadData = [];
            // 状态码图表数据
            const treeMapData = [];
            // 格式化图表数据
            _.sortBy(Object.keys(continuous_data)).forEach((key) => {
              // 总请求量
              barChartData.requestData.push({
                x: `${key}:00`,
                y: continuous_data[key].count
              });
              // 爬虫量
              barChartData.crawlerData.push({
                x: `${key}:00`,
                y: continuous_data[key].crawler_count
              });
              // 延迟
              delayData.push({
                x: `${key}:00`,
                y: continuous_data[key].latency
              });
              // 导入量
              uploadData.push({
                x: `${key}:00`,
                y: 1,
                value: continuous_data[key].upload_bytes
              });
              // 状态码
              treeMapData.push({
                x: `${key}:00`,
                y: [{
                  name: '2XX',
                  value: continuous_data[key]['2XX']
                }, {
                  name: '3XX',
                  value: continuous_data[key]['3XX']
                }, {
                  name: '4XX',
                  value: continuous_data[key]['4XX']
                }, {
                  name: '5XX',
                  value: continuous_data[key]['5XX']
                }]
              });
            });

            // 重新赋值图表数据
            value[index].barChartData = barChartData;
            value[index].delayData = delayData;
            value[index].uploadData = uploadData;
            value[index].treeMapData = treeMapData;
          });
          callback(value);
        }

        return { value };
      },
      catch: () => {
        callback([]);
        return [];
      }
    }
  }),
  // 所选页面爬虫风险列表
  fetchCrawlerPageData: params => ({
    crawlerPageData: {
      url: DASHBOARD_PAGE_SEARCH,
      loadingIn: '.account-page-table .page-table',
      body: params,
      then: (data) => {
        const {
          status,
          values,
          total_count
        } = data;

        let pageData = [];
        if (status === 0) {
          pageData = values;
        }

        return {
          value: {
            pageData,
            total_count
          }
        };
      }
    }
  }),
  // 导出
  downloadCrawlerPageData: params => ({
    downloadPageData: {
      url: new URI(DASHBOARD_PAGE_SEARCH).search(params),
      method: 'POST',
      then: (data) => {
        const {
          status,
          file
        } = data;
        if (status === 0) {
          DownLoadFile(file);
        }

        return { value: file };
      }
    }
  }),
  // 关注管理
  fetchFollowKeyword: params => ({
    followedData: {
      url: FOLLOW_KEYWORD,
      loadingIn: '.crawler-manage-list',
      body: params,
      then: (data) => {
        const {
          status,
          values
        } = data;

        let value = [];
        if (status === 200) {
          value = _.filter(values, { is_followed: true, is_ignored: false });
        }

        return {
          value
        };
      }
    }
  }),
  // 垃圾箱管理
  fetchDeleteData: params => ({
    deleteData: {
      url: FOLLOW_KEYWORD,
      loadingIn: '.crawler-manage-list',
      body: params,
      then: (data) => {
        const {
          status,
          values
        } = data;

        let value = [];
        if (status === 200) {
          value = _.filter(values, { is_ignored: true });
        }

        return {
          value
        };
      }
    }
  }),
  // 删除关注
  deleteKeywords: (params, keyType, callback) => ({
    deleteKeyword: {
      url: `${FOLLOW_KEYWORD}/${keyType}`,
      method: 'DELETE',
      loadingIn: '.crawler-manage-list',
      body: JSON.stringify(params),
      then: (data) => {
        const {
          status
        } = data;

        if (status === 200) {
          callback(true);
        } else {
          callback(false);
        }
      }
    }
  }),
  // 添加关注
  updateKeywords: (params, callback) => ({
    updateKeyword: {
      url: FOLLOW_KEYWORD,
      method: 'POST',
      loadingIn: '.crawler-manage-list',
      body: JSON.stringify(params),
      then: (data) => {
        const {
          status,
          msg
        } = data;

        if (status === 200) {
          callback(true);
        } else {
          callback(false, msg);
        }
      }
    }
  })
}))
class Crawler extends Component {
  static propTypes = {
    fetchCrawlerChartData: PropTypes.func.isRequired,
    fetchCrawlerPageData: PropTypes.func.isRequired,
    downloadCrawlerPageData: PropTypes.func.isRequired,
    fetchVisitPagesData: PropTypes.func.isRequired,
    fetchFollowKeyword: PropTypes.func.isRequired,
    fetchDeleteData: PropTypes.func.isRequired,
    deleteKeywords: PropTypes.func.isRequired,
    updateKeywords: PropTypes.func.isRequired,
    crawlerChartData: PropTypes.instanceOf(PromiseState),
    crawlerPageData: PropTypes.instanceOf(PromiseState),
    followedData: PropTypes.instanceOf(PromiseState),
    deleteData: PropTypes.instanceOf(PromiseState)
  };
  static defaultProps = {
    crawlerChartData: undefined,
    crawlerPageData: undefined,
    visitPagesData: undefined,
    followedData: undefined,
    deleteData: undefined
  };

  constructor(props) {
    super(props);

    this.state = {
      uri_stem: '',
      query: '',
      visitPages: [],
      activePageType: 'ALL',
      selectedIndex: 0,
      page: 1,
      total: 0,
      random: moment().valueOf(),
      current_day: moment().startOf('day').valueOf()
    };
  }

  componentDidMount() {
    const accountParams = {
      current_day: this.state.current_day,
      start_day: moment().subtract(6, 'days').startOf('day').valueOf(),
      end_day: moment().endOf('day').valueOf()
    };
    // 爬虫统计接口
    this.props.fetchCrawlerChartData(accountParams, '.week-trend-container>div');

    // 爬虫访问页面列表
    this.fetchVisitPagesData();
  }

  componentWillUpdate() {
    if (metricsSwitchOn) {
      Perf.start('Crawler_Update');
    }
  }

  componentDidUpdate() {
    if (metricsSwitchOn) {
      const cost = Perf.stop('Crawler_Update');
      console.log(`Crawler_Update: cost__${cost}ms`);
      Perf.writeInflux('', 'Crawler', cost);
    }
  }

  handleChange(key, value) {
    this.setState({ [key]: value });
  }

  // 页面列表
  fetchVisitPagesData(is_focus) {
    // 爬虫访问页面列表
    this.props.fetchVisitPagesData({
      current_day: this.state.current_day,
      start: 0,
      limit: 100,
      is_focus: !!is_focus,
      random: this.state.random
    }, (value) => {
      const {
        selectedIndex,
        query
      } = this.state;

      // 获取url
      const uri_stem = _.get(value[selectedIndex], 'url', '');

      const endtime = moment(this.state.current_day).endOf('day').valueOf();

      const params = {
        dashboard: 'spider',
        page_limit,
        fromtime: this.state.current_day,
        endtime,
        page: 1,
        uri_stem: encodeURIComponent(uri_stem),
        query: encodeURIComponent(query)
      };

      // 所选页面爬虫风险列表
      this.props.fetchCrawlerPageData(params);

      this.setState({
        visitPages: value
      });
    });
  }

  render() {
    const {
      crawlerChartData,
      downloadCrawlerPageData,
      fetchCrawlerPageData,
      crawlerPageData,
      followedData,
      deleteData
    } = this.props;

    const {
      activePageType,
      page,
      visitPages,
      selectedIndex
    } = this.state;

    let chartData = {
      trend_day: [],
      trend_week: {
        user_account: [],
        risk_user_account: []
      }
    };
    // 图表数据
    if (crawlerChartData && crawlerChartData.fulfilled) {
      chartData = crawlerChartData.value;
    }

    // 所选页面风险列表数据
    let pageData = [];
    if (crawlerPageData && crawlerPageData.fulfilled) {
      pageData = crawlerPageData.value.pageData;
      this.state.total = crawlerPageData.value.total_count;
    }

    // 所选页面风险列表数据
    let followedList = [];
    if (followedData && followedData.fulfilled) {
      followedList = followedData.value;
    }

    // 所选页面风险列表数据
    let deleteList = [];
    if (deleteData && deleteData.fulfilled) {
      deleteList = deleteData.value;
    }

    // 过滤列表
    const cardDataList = visitPages;

    const uri_stem = _.get(cardDataList[selectedIndex], 'url', '');

    return (
      <div className="wd-crawler container">
        <h1>爬虫统计</h1>

        <WeekTrend
          type="crawler"
          trend_week={chartData.trend_week}
          trend_day={chartData.trend_day}
          onSelectDay={(selectDate) => {
            const current_day_temp = moment(Number(selectDate)).valueOf();
            const accountParams = {
              current_day: current_day_temp,
              start_day: moment().subtract(6, 'days').startOf('day').valueOf(),
              end_day: moment().endOf('day').valueOf()
            };
            this.state.current_day = current_day_temp;
            this.props.fetchCrawlerChartData(accountParams, '.week-trend-container .day-statistics');
            // 切换日期，则切回全部列表
            this.setState({
              activePageType: 'ALL',
              selectedIndex: 0
            });
            // 爬虫访问页面列表
            this.fetchVisitPagesData();
          }}
        />

        <CrawlerVisit
          cardDataList={cardDataList}
          followedList={followedList}
          deleteList={deleteList}
          selectedIndex={selectedIndex}
          handleChange={(key, value) => this.handleChange(key, value)}
          onSelectChange={(index) => {
            this.handleChange('selectedIndex', index);
            const endtime = moment(this.state.current_day).endOf('day').valueOf();

            const params = {
              dashboard: 'spider',
              page_limit,
              fromtime: this.state.current_day,
              endtime,
              page: 1,
              uri_stem: encodeURIComponent(cardDataList[index].url),
              query: encodeURIComponent(this.state.query)
            };
            // 所选页面爬虫风险列表
            this.props.fetchCrawlerPageData(params);
          }}
          fetchVisitPagesData={flag => this.fetchVisitPagesData(flag)}
          fetchFollowKeyword={params => this.props.fetchFollowKeyword(params)}
          fetchDeleteData={params => this.props.fetchDeleteData(params)}
          deleteKeywords={(params, keyType, callback) => {
            this.props.deleteKeywords(params, keyType, callback);
            this.state.random = moment().valueOf();
          }}
          updateKeywords={(params, callback) => {
            this.props.updateKeywords(params, callback);
            this.state.random = moment().valueOf();
          }}
          activePageType={activePageType}
          uri_stem={uri_stem}
          current_day={this.state.current_day}
        />

        <PageDataTable
          pageData={pageData}
          uri_stem={uri_stem}
          page={page}
          page_limit={page_limit}
          total={this.state.total}
          query={this.state.query}
          handleChange={(key, value) => this.handleChange(key, value)}
          onSearch={() => {
            const endtime = moment(this.state.current_day).endOf('day').valueOf();
            const params = {
              dashboard: 'spider',
              page_limit,
              fromtime: this.state.current_day,
              endtime,
              page: 1,
              uri_stem: encodeURIComponent(uri_stem),
              query: encodeURIComponent(this.state.query)
            };
            fetchCrawlerPageData(params);
            this.setState({
              page: 1
            });
          }}
          onDownload={() => {
            const endtime = moment(this.state.current_day).endOf('day').valueOf();
            const params = {
              dashboard: 'spider',
              uri_stem,
              fromtime: this.state.current_day,
              endtime,
              query: this.state.query
            };
            downloadCrawlerPageData(params);
          }}
          onPageChange={(pageValue) => {
            const endtime = moment(this.state.current_day).endOf('day').valueOf();
            const params = {
              dashboard: 'spider',
              page_limit,
              fromtime: this.state.current_day,
              endtime,
              page: pageValue,
              uri_stem: encodeURIComponent(uri_stem),
              query: encodeURIComponent(this.state.query)
            };
            fetchCrawlerPageData(params);
            this.setState({
              page: pageValue
            });
          }}
        />
      </div>
    );
  }
}
export default Crawler;
