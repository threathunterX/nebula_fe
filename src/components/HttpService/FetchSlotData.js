import moment from 'moment';
import _ from 'lodash';

import HttpService from './index';
import { HourMSeconds } from '../util/Constants';

const STATS_SLOT_QUERY = 'platform/stats/slot/query';

const FetchSlotData = (config) => {
  // 非当前小时请求，endtime修改
  const now = moment().startOf('hour').valueOf();
  const end_time = now - 1;
  const params = _.cloneDeep(config.params);
  params.end_time = end_time;

  const paramsSlot = {
    dimension: params.key_type === 'total' ? 'global' : params.key_type,
    variables: params.var_list,
    timestamp: now
  };
  if (params.key) {
    paramsSlot.keys = [params.key];
  }

  const {
    httpRequestParam
  } = config;

  HttpService.all([
    // 历史数据
    HttpService.get({
      httpRequestParam,
      url: config.url,
      loadingIn: config.loadingIn,
      params
    }),
    // 当前小时
    HttpService.post({
      httpRequestParam,
      url: STATS_SLOT_QUERY,
      params: paramsSlot
    })
  ], {
    onSuccess: (results) => {
      if (config.onSuccess) {
        const slotValue = {};
        let historyValue = {};

        let result;
        // 取出数据
        if (results[0].values) {
          historyValue = results[0].values;
          // 赋值取出state和msg等信息
          result = results[0];
        }
        // 取出数据
        if (results[1].values) {
          slotValue[now] = params.key ? _.get(results[1].values, params.key) : results[1].values;
          if (!result) {
            result = results[1];
          }
        }

        result.values = Object.assign({}, historyValue, slotValue);
        config.onSuccess(result);
      }
    },
    onError: (errors) => {
      if (config.onError) {
        config.onError(errors);
      }
    }
  });
};
export default FetchSlotData;

// 补充默认值
export const FillDefaultTimeLine = (valuesOrg, fromTime, endTime, varList) => {
  let values = valuesOrg;
  if (!values) {
    values = [];
  }
  const valueTemp = [];

  const now = moment(endTime).startOf('hour').valueOf();

  const defaultItem = {};

  varList.forEach((vItem) => {
    defaultItem[vItem] = {
      value: 0
    };
  });

  for (let cur = now; cur >= fromTime; cur -= HourMSeconds) {
    valueTemp.push(Object.assign(
      { time_frame: Number(cur) },
      (values[cur] && Object.keys(values[cur]).length > 0) ? values[cur] : defaultItem
    ));
  }

  return _.sortBy(valueTemp, ['time_frame']);
};

export const slotMap = {
  TOTAL_DYNAMIC_COUNT: 'global__visit_dynamic_count__1h__slot',
  TOTAL_DYNAMIC_IP: 'global__visit_dynamic_distinct_count_ip__1h__slot',
  TOTAL_DYNAMIC_USER: 'global__visit_dynamic_distinct_count_uid__1h__slot',
  TOTAL_DYNAMIC_DID: 'global__visit_dynamic_distinct_count_did__1h__slot',
  TOTAL_DYNAMIC_ORDER: 'global__order_submit_count__1h__slot',
  TOTAL_INCIDENT_COUNT: 'global__visit_incident_count__1h__slot',
  TOTAL_INCIDENT_USER: 'global__visit_incident_distinct_count_uid__1h__slot',
  TOTAL_ORDER_COUNT: 'global__order_submit_incident_count__1h__slot',
  TOTAL_MARKETING_COUNT: 'total__visit__marketing_incident_count__1h__slot',
  TOTAL_TRANSACTION_COUNT: 'global__transaction_withdraw_count__1h__slot',
  TOTAL_TRANSACTION_INCIDENT_COUNT: 'global__transaction_withdraw_incident_count__1h__slot',
  TOTAL_TRANSACTION_SUM: 'global__transaction_withdraw_sum_withdraw_amount__1h__slot',
  TOTAL_TRANSACTION_INCIDENT_SUM: 'global__transaction_withdraw_incident_sum_withdraw_amount__1h__slot',
  TOTAL_MARKETING_SUM: 'global__marketing_count__1h__slot',
  TOTAL_MARKETING_INCIDENT_SUM: 'global__marketing_incident_count__1h__slot',
  // TOTAL_INCIDENT_IP: 'total__visit__incident_distinct_ip__1h__slot',
  // TOTAL_INCIDENT_ORDER: 'total__visit__incident_distinct_order__1h__slot',
  // TOTAL_VISITOR_COUNT: 'total__visit__visitor_incident_count__1h__slot',
  // TOTAL_ACCOUNT_COUNT: 'total__visit__account_incident_count__1h__slot',
  // TOTAL_OTHER_COUNT: 'total__visit__other_incident_count__1h__slot',

  SCENE_VISIT_STRATEGY_20_COUNT: 'scene_strategy__visit_incident_count_top20__1h__slot',

  IP_DYNAMIC_100_COUNT: 'ip__visit_dynamic_count_top100__1h__slot',
  IP_DYNAMIC_COUNT: 'ip__visit_dynamic_count__1h__slot',
  IP_DYNAMIC_PAGE: 'ip__visit_dynamic_distinct_count_page__1h__slot',
  IP_DYNAMIC_DID: 'ip__visit_dynamic_distinct_count_did__1h__slot',
  IP_DYNAMIC_USER: 'ip__visit_dynamic_distinct_count_uid__1h__slot',
  IP_SCENE_INCIDENT_COUNT: 'ip_scene__visit_incident_group_count__1h__slot',
  IP_DID_DYNAMIC_20_COUNT: 'ip_did__visit_dynamic_count_top20__1h__slot',
  IP_PAGE_DYNAMIC_20_COUNT: 'ip_page__visit_dynamic_count_top20__1h__slot',
  IP_USER_DYNAMIC_20_COUNT: 'ip_uid__visit_dynamic_count_top20__1h__slot',
  IP_GEO_DYNAMIC_20_COUNT: 'ip_geo_city__visit_dynamic_count_top20__1h__slot',
  IP_UA_20_COUNT: 'ip_useragent__visit_dynamic_count_top20__1h__slot',
  IP_INCIDENT_COUNT: 'ip__visit_incident_count__1h__slot',
  IP_TAG_20_COUNT: 'ip_tag__visit_incident_count_top20__1h__slot',

  IP_PAGE_DYNAMIC_100_COUNT: 'ip__visit_dynamic_distinct_count_page_top100__1h__slot',
  IP_UID_DYNAMIC_100_COUNT: 'ip__visit_dynamic_distinct_count_uid_top100__1h__slot',
  IP_DID_DYNAMIC_100_COUNT: 'ip__visit_dynamic_distinct_count_did_top100__1h__slot',
  IP_INCIDENT_100_COUNT: 'ip__visit_incident_count_top100__1h__slot',
  IP_INCIDENT_MAX_RATE: 'ip__visit_incident_max_rate__1h__slot',
  IP_SCENE_STRATEGY_GROUP_COUNT: 'ip_scene_strategy__visit_incident_group_count__1h__slot',

  // IP_INCIDENT_SCORE: 'ip__visit_incident_score__1h__slot',
  // IP_DYNAMIC_UA: 'ip__visit__dynamic_distinct_ua__1h__slot',
  // IP_DID_INCIDENT_COUNT: 'ip__visit__did_incident_count__1h__slot',
  // IP_PAGE_INCIDENT_COUNT: 'ip__visit__page_incident_count__1h__slot',
  // IP_INCIDENT_STRATEGY: 'ip__visit__incident_distinct_strategy__1h__slot',
  // IP_INCIDENT_USER: 'ip__visit__incident_distinct_user__1h__slot',
  // IP_INCIDENT_MIN_TIMESTAMP: 'ip__visit__incident_min_timestamp__1h__slot',
  // IP_LOGIN_COUNT: 'ip__account__login_count__1h__slot',
  // IP_REGISTRATION_COUNT: 'ip__account__registration_count__1h__slot',

  USER_DYNAMIC_100_COUNT: 'uid__visit_dynamic_count_top100__1h__slot',
  USER_DYNAMIC_COUNT: 'uid__visit_dynamic_count__1h__slot',
  USER_DYNAMIC_PAGE: 'uid__visit_dynamic_distinct_count_page__1h__slot',
  USER_DYNAMIC_DID: 'uid__visit_dynamic_distinct_count_did__1h__slot',
  USER_DYNAMIC_IP: 'uid__visit_dynamic_distinct_count_ip__1h__slot',
  USER_DID_DYNAMIC_20_COUNT: 'uid_did__visit_dynamic_count_top20__1h__slot',
  USER_SCENE_INCIDENT_COUNT: 'uid_scene__visit_incident_group_count__1h__slot',
  USER_INCIDENT_COUNT: 'uid__visit_incident_count__1h__slot',
  USER_PAGE_DYNAMIC_20_COUNT: 'uid_page__visit_dynamic_count_top20__1h__slot',
  USER_IP_DYNAMIC_20_COUNT: 'uid_ip__visit_dynamic_count_top20__1h__slot',
  USER_GEO_DYNAMIC_20_COUNT: 'uid_geo_city__visit_dynamic_count_top20__1h__slot',
  USER_UA_20_COUNT: 'uid_useragent__visit_dynamic_count_top20__1h__slot',
  USER_TAG_20_COUNT: 'uid_tag__visit_incident_count_top20__1h__slot',

  USER_PAGE_DYNAMIC_100_COUNT: 'uid__visit_dynamic_distinct_count_page_top100__1h__slot',
  USER_DID_DYNAMIC_100_COUNT: 'uid__visit_dynamic_distinct_count_did_top100__1h__slot',
  USER_IP_DYNAMIC_100_COUNT: 'uid__visit_dynamic_distinct_count_ip_top100__1h__slot',
  USER_INCIDENT_100_COUNT: 'uid__visit_incident_count_top100__1h__slot',
  // USER_DYNAMIC_UA: 'user__visit__dynamic_distinct_ua__1h__slot',
  // USER_INCIDENT_STRATEGY: 'user__visit__incident_distinct_strategy__1h__slot',
  // USER_AGENT_COUNT: 'user__visit__agent_dynamic_count__1h__slot',
  // USER_LOGIN_COUNT: 'user__account__login_count__1h__slot',
  // USER_REGISTRATION_COUNT: 'user__account__registration_count__1h__slot',

  DID_DYNAMIC_100_COUNT: 'did__visit_dynamic_count_top100__1h__slot',
  DID_DYNAMIC_COUNT: 'did__visit_dynamic_count__1h__slot',
  DID_DYNAMIC_PAGE: 'did__visit_dynamic_distinct_count_page__1h__slot',
  DID_DYNAMIC_USER: 'did__visit_dynamic_distinct_count_uid__1h__slot',
  DID_DYNAMIC_IP: 'did__visit_dynamic_distinct_count_ip__1h__slot',
  DID_SCENE_INCIDENT_COUNT: 'did_scene__visit_incident_group_count__1h__slot',
  DID_USER_DYNAMIC_20_COUNT: 'did_uid__visit_dynamic_count_top20__1h__slot',
  DID_PAGE_DYNAMIC_20_COUNT: 'did_page__visit_dynamic_count_top20__1h__slot',
  DID_IP_DYNAMIC_20_COUNT: 'did_ip__visit_dynamic_count_top20__1h__slot',
  DID_GEO_DYNAMIC_20_COUNT: 'did_geo_city__visit_dynamic_count_top20__1h__slot',
  DID_UA_20_COUNT: 'did_useragent__visit_dynamic_count_top20__1h__slot',
  DID_INCIDENT_COUNT: 'did__visit_incident_count__1h__slot',
  DID_TAG_20_COUNT: 'did_tag__visit_incident_count_top20__1h__slot',

  DID_PAGE_DYNAMIC_100_COUNT: 'did__visit_dynamic_distinct_count_page_top100__1h__slot',
  DID_UID_DYNAMIC_100_COUNT: 'did__visit_dynamic_distinct_count_uid_top100__1h__slot',
  DID_IP_DYNAMIC_100_COUNT: 'did__visit_dynamic_distinct_count_ip_top100__1h__slot',
  DID_INCIDENT_100_COUNT: 'did__visit_incident_count_top100__1h__slot',
  // DID_DYNAMIC_AGENT: 'did__visit__dynamic_distinct_agent__1h__slot',
  // DID_DYNAMIC_UA: 'did__visit__dynamic_distinct_ua__1h__slot',
  // DID_INCIDENT_STRATEGY: 'did__visit__incident_distinct_strategy__1h__slot',
  // DID_AGENT_COUNT: 'did__visit__agent_dynamic_count__1h__slot',
  // DID_LOGIN_COUNT: 'did__account__login_count__1h__slot',
  // DID_REGISTRATION_COUNT: 'did__account__registration_count__1h__slot',

  PAGE_DYNAMIC_COUNT: 'page__visit_dynamic_count__1h__slot',
  PAGE_DYNAMIC_DID: 'page__visit_dynamic_distinct_count_did__1h__slot',
  PAGE_DYNAMIC_USER: 'page__visit_dynamic_distinct_count_uid__1h__slot',
  PAGE_DYNAMIC_IP: 'page__visit_dynamic_distinct_count_ip__1h__slot',
  PAGE_INCIDENT_COUNT: 'page__visit_incident_count__1h__slot',
  PAGE_GEO_DYNAMIC_COUNT: 'page_geo_city__visit_dynamic_count_top20__1h__slot',
  PAGE_IP_DYNAMIC_100_COUNT: 'page_ip__visit_dynamic_count_top100__1h__slot',
  PAGE_UID_DYNAMIC_100_COUNT: 'page_uid__visit_dynamic_count_top100__1h__slot',
  PAGE_DID_DYNAMIC_100_COUNT: 'page_did__visit_dynamic_count_top100__1h__slot',
  // PAGE_INCIDENT_STRATEGY: 'page__visit__incident_distinct_strategy__1h__slot',
  // PAGE_USER_DYNAMIC_COUNT: 'page__visit__user_dynamic_count__1h__slot',
  // PAGE_DID_DYNAMIC_COUNT: 'page__visit__did_dynamic_count__1h__slot',
  // PAGE_IP_DYNAMIC_COUNT: 'page__visit__ip_dynamic_count__1h__slot',

  PAGE_ACCOUNT_LOGIN_COUNT: 'page__account__login_event_count__profile',
  PAGE_ACCOUNT_LOGIN_INCIDENT_COUNT: 'page__account__login_risk_event_count__profile',
  PAGE_ACCOUNT_REGISTRATION_COUNT: 'page__account__register_event_count__profile',
  PAGE_ACCOUNT_REGISTRATION_INCIDENT_COUNT: 'page__account__register_risk_event_count__profile',
  PAGE_ACCOUNT_LOGIN_SUCCESS_COUNT: 'page__account__login__succ_event_count__profile',
  PAGE_ACCOUNT_LOGIN_FAIL_COUNT: 'page__account__login__fail_event_count__profile',
  PAGE_ACCOUNT_REGISTRATION_SUCCESS_COUNT: 'page__account__register__succ_event_count__profile',
  PAGE_ACCOUNT_REGISTRATION_FAIL_COUNT: 'page__account__register__fail_event_count__profile',
  PAGE_ACCOUNT_LOGIN_CODE23_COUNT: 'page__account__login__23_event_count__profile',
  PAGE_ACCOUNT_REGISTRATION_CODE23_COUNT: 'page__account__register__23_event_count__profile',
  PAGE_ACCOUNT_LOGIN_CODE45_COUNT: 'page__account__login__45_event_count__profile',
  PAGE_ACCOUNT_REGISTRATION_CODE45_COUNT: 'page__account__register__45_event_count__profile',
  PAGE_ACCOUNT_LOGIN_RISK_COUNT: 'page__account__login_risk_uids__profile',
  PAGE_ACCOUNT_REGISTRATION_RISK_COUNT: 'page__account__register_risk_uids__profile'
};
