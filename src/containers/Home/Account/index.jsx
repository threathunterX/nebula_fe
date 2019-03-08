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
import { slotMap } from '../../../components/HttpService/FetchSlotData';
import PageDataTable from './PageDataTable';
import WeekTrend from './WeekTrend';
import AccountSource from './AccountSource';

import './index.scss';

const DASHBOARD_PAGE_SEARCH = 'platform/stats/dashboard_page_search';
const ACCOUNT_URL = 'platform/stats/account_risk';
const PAGE_RISK_URL = 'platform/stats/account_page_risk';
const GET_URLS = 'platform/logparser';
const page_limit = 25;

const LOGIN_TYPE = 'LOGIN';
const REGISTRATION_TYPE = 'REGISTRATION';

@Connect('Account')(() => ({
  // 获取“页面列表”
  fetchUrls: callback => ({
    pagesData: {
      url: GET_URLS,
      then: (data) => {
        const {
          status,
          values
        } = data;

        let pages = [];
        if (status === 0) {
          pages = values;
        }
        callback(pages);

        return {
          value: pages
        };
      }
    }
  }),
  // 获取“所选页面详细列表”
  fetchAccountPageData: params => ({
    accountPageData: {
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
          pageData = _.map(values, (item) => {
            const itemTemp = item;
            itemTemp.dataChildren = item.origin || [{}];
            delete itemTemp.origin;
            return itemTemp;
          });
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
  downloadAccountPageData: params => ({
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
  // 本周趋势和当日趋势
  fetchAccountChartData: (params, loadingIn) => ({
    accountChartData: {
      url: ACCOUNT_URL,
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
          const weekKeys = Object.keys(values.trend_week);
          _.sortBy(weekKeys).forEach((key) => {
            value.trend_week.all_count.push({
              x: key,
              y: values.trend_week[key].user_account
            });
            value.trend_week.risk_count.push({
              x: key,
              y: values.trend_week[key].risk_user_account
            });
          });

          value.trend_day = _.sortBy(value.trend_day, o => o.x);
        }

        return { value };
      }
    }
  }),
  // 账号来源数据
  fetchPageSourceData: (params, callback) => ({
    pageSourceData: {
      url: PAGE_RISK_URL,
      method: 'POST',
      loadingIn: 'account-chart',
      body: JSON.stringify(params),
      then: (data) => {
        const {
          status,
          values
        } = data;

        let value = {};
        if (status === 200) {
          value = values;
          _.map(value, (pageItems, page) => {
            _.map(pageItems, (pageItem, pageItemKey) => {
              switch (pageItemKey) {
                case slotMap.PAGE_ACCOUNT_LOGIN_COUNT:
                case slotMap.PAGE_ACCOUNT_LOGIN_INCIDENT_COUNT:
                case slotMap.PAGE_ACCOUNT_REGISTRATION_COUNT:
                case slotMap.PAGE_ACCOUNT_REGISTRATION_INCIDENT_COUNT: {
                  const pageItemData = _.map(pageItem, (item, key) => ({
                    x: `${key}:00`,
                    y: item
                  }));
                  value[page][pageItemKey] = _.sortBy(pageItemData, 'x');
                  break;
                }
                default:
              }
            });
          });
        }
        callback(value);
        return { value };
      }
    }
  })
}))
class Account extends Component {
  static propTypes = {
    fetchUrls: PropTypes.func.isRequired,
    fetchAccountPageData: PropTypes.func.isRequired,
    fetchAccountChartData: PropTypes.func.isRequired,
    downloadAccountPageData: PropTypes.func.isRequired,
    fetchPageSourceData: PropTypes.func.isRequired,
    accountPageData: PropTypes.instanceOf(PromiseState),
    accountChartData: PropTypes.instanceOf(PromiseState),
    pageSourceData: PropTypes.instanceOf(PromiseState),
    pagesData: PropTypes.instanceOf(PromiseState)
  };
  static defaultProps = {
    pageList: undefined,
    accountPageData: undefined,
    accountChartData: undefined,
    pageSourceData: undefined,
    pagesData: undefined
  };

  constructor(props) {
    super(props);

    this.state = {
      uri_stem: '',
      query: '',
      activeSourceType: LOGIN_TYPE,
      page: 1,
      total: 0,
      current_day: moment().startOf('day').valueOf()
    };
  }

  componentDidMount() {
    this.props.fetchUrls((pageList) => {
      this.fetchPageSourceData(pageList);
    });

    const accountParams = {
      current_day: this.state.current_day,
      start_day: moment().subtract(6, 'days').startOf('day').valueOf(),
      end_day: moment().endOf('day').valueOf()
    };

    this.props.fetchAccountChartData(accountParams, '.week-trend-container>div');
  }

  componentWillUpdate() {
    if (metricsSwitchOn) {
      Perf.start('Account_Update');
    }
  }

  componentDidUpdate() {
    if (metricsSwitchOn) {
      const cost = Perf.stop('Account_Update');
      console.log(`Account_Update: cost__${cost}ms`);
      Perf.writeInflux('', 'Account', cost);
    }
  }

  handleChange(key, value) {
    this.setState({ [key]: value });
  }

  fetchPageSourceData(pages) {
    let pageList = [];
    if (this.state.activeSourceType === LOGIN_TYPE) {
      pageList = _.filter(pages, o => o.dest === 'ACCOUNT_LOGIN');
    } else if (this.state.activeSourceType === REGISTRATION_TYPE) {
      pageList = _.filter(pages, o => o.dest === 'ACCOUNT_REGISTRATION');
    }
    pageList = _.map(pageList, o => o.host + o.url);

    this.props.fetchPageSourceData({
      current_day: this.state.current_day,
      pages: pageList
    }, (urlsData) => {
      this.state.uri_stem = Object.keys(urlsData)[0] || '';
      if (this.state.uri_stem) {
        const endtime = moment(this.state.current_day).endOf('day').valueOf();

        const params = {
          dashboard: 'account',
          page_limit,
          fromtime: this.state.current_day,
          endtime,
          page: 1,
          uri_stem: encodeURIComponent(this.state.uri_stem),
          query: this.state.query
        };
        this.props.fetchAccountPageData(params);
      }
    });
  }

  render() {
    const {
      accountPageData,
      fetchAccountPageData,
      downloadAccountPageData,
      accountChartData,
      pageSourceData
    } = this.props;

    const {
      uri_stem,
      page,
      activeSourceType,
      current_day
    } = this.state;

    let pageData = [];
    if (accountPageData && accountPageData.fulfilled) {
      pageData = accountPageData.value.pageData;
      this.state.total = accountPageData.value.total_count;
    }

    let chartData = {
      trend_day: [],
      trend_week: {
        user_account: [],
        risk_user_account: []
      }
    };
    if (accountChartData && accountChartData.fulfilled) {
      chartData = accountChartData.value;
    }

    let pageSourceDataItem = {};
    if (pageSourceData && pageSourceData.fulfilled) {
      pageSourceDataItem = pageSourceData.value;
    }

    return (
      <div className="wd-account container">
        <h1>账号统计</h1>

        <WeekTrend
          type="user"
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
            this.props.fetchAccountChartData(accountParams, '.week-trend-container .day-statistics');

            this.fetchPageSourceData(this.props.pagesData.value);
          }}
        />

        <AccountSource
          uri_stem={uri_stem}
          pageSourceData={pageSourceDataItem}
          activeSourceType={activeSourceType}
          onTypeChange={(key, value) => {
            this.setState({
              [key]: value
            }, () => {
              this.fetchPageSourceData(this.props.pagesData.value);
            });
          }}
          onUrlChange={(value) => {
            this.handleChange('uri_stem', value);
            const endtime = moment(this.state.current_day).endOf('day').valueOf();
            const params = {
              dashboard: 'account',
              page_limit,
              fromtime: this.state.current_day,
              endtime,
              page: 1,
              uri_stem: encodeURIComponent(value),
              query: encodeURIComponent(this.state.query)
            };
            this.props.fetchAccountPageData(params);
          }}
          current_day={moment(Number(current_day)).format('YYYY.MM.DD')}
        />

        <PageDataTable
          pageData={pageData}
          uri_stem={uri_stem}
          page={page}
          page_limit={page_limit}
          total={this.state.total}
          handleChange={(key, value) => this.handleChange(key, value)}
          onSearch={(query) => {
            if (this.state.uri_stem) {
              const endtime = moment(this.state.current_day).endOf('day').valueOf();
              const params = {
                dashboard: 'account',
                page_limit,
                page: 1,
                fromtime: this.state.current_day,
                endtime,
                uri_stem: encodeURIComponent(this.state.uri_stem),
                query: encodeURIComponent(query)
              };
              fetchAccountPageData(params);
              this.setState({ page: 1 });
            }
          }}
          onDownload={(query) => {
            if (this.state.uri_stem) {
              const params = {
                dashboard: 'account',
                fromtime: this.state.current_day,
                endtime: moment(this.state.current_day).endOf('day').valueOf(),
                uri_stem: this.state.uri_stem,
                query: encodeURIComponent(query)
              };
              downloadAccountPageData(params);
            }
          }}
          onPageChange={(pageValue, query) => {
            if (this.state.uri_stem) {
              const endtime = moment(this.state.current_day).endOf('day').valueOf();
              const params = {
                dashboard: 'account',
                page_limit,
                page: pageValue,
                fromtime: this.state.current_day,
                endtime,
                uri_stem: encodeURIComponent(this.state.uri_stem),
                query: encodeURIComponent(query)
              };
              fetchAccountPageData(params);
              this.setState({ page: pageValue });
            }
          }}
        />
      </div>
    );
  }
}
export default Account;
