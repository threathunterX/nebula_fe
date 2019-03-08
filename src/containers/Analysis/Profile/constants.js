export const KEY_TYPE_USER = 'uid';
export const KEY_TYPE_DEVICEID = 'did';
export const KEY_TYPE_IP = 'ip';
export const KEY_TYPE = 'key_type';
export const KEY = 'key';
export const KEY_TYPES = {
  [KEY_TYPE_USER]: 'User',
  [KEY_TYPE_DEVICEID]: 'DeviceID',
  [KEY_TYPE_IP]: 'IP'
};

export const userVariables = {
  VISIT_ALARM_INCREMENT_TIMES: 'uid__alarm_count__profile',  // 报警次数
  ACCOUNT_REGISTER_IP: 'uid__registration__account__ip__profile',    // 注册IP
  ACCOUNT_USERNAME: 'uid__registration__account__username__profile',    // 用户名
  ACCOUNT_MAIL: 'uid__registration__account__mail__profile',            // 邮箱
  ACCOUNT_CHANGE_MAIL: 'uid__account_token_change_mail__profile',            // 修改的邮箱
  ACCOUNT_MAIL_CHANGE_TIMES: 'uid__account_token_change_mail_count__profile', // 邮箱修改次数
  ACCOUNT_MAIL_LAST_CHANGE_TIMESTAMP: 'uid__account_token_change_mail_timestamp__profile',  // 最近邮箱修改时间
  ACCOUNT_MOBILE: 'uid__registration__account__mobile__profile',                         // 手机
  ACCOUNT_CHANGE_MOBILE: 'uid__account_token_change_mobile__profile',                         // 手机
  ACCOUNT_MOBILE_CHANGE_TIMES: 'uid__account_token_change_mobile_count__profile',          // 手机修改次数
  ACCOUNT_MOBILE_LAST_CHANGE_TIMESTAMP: 'uid__account_token_change_mobile_timestamp__profile',  // 手机修改时间
  ACCOUNT_LOGIN_LAST10_TIMESTAMP_PROFILE: 'uid__account_login_timestamp_last10__profile',    // 最近10条登录时间
  ACCOUNT_IP_LAST10_PROFILE: 'uid__account_login_ip_last10__profile',    // 最近10条登陆IP
  ACCOUNT_GEO_LAST10_PROFILE: 'uid__account_login_geocity_last10__profile',    // 最近10条登陆地址
  VISIT_HOUR_MERGE: 'uid_timestamp__visit_dynamic_count__profile',           // 用户访问时间偏好
  VISIT_CITY: 'uid_geo_city__visit_dynamic_count__profile',                     // 用户主要访问地区来源
  VISIT_UA: 'uid_useragent__visit_dynamic_count__profile',                         // 用户访问User Agent分布
  VISIT_DEVICE: 'uid_did__visit_dynamic_count__profile',                 // 用户访问设备分布
  ACCOUNT_LAST_VISIT_TIMESTAMP: 'uid__visit_dynamic_last_timestamp__profile', // 用户最后访问时间
  ACCOUNT_LAST_VISIT_IP: 'uid__account_login_ip_last__profile',     // 用户最后访问IP
  ACCOUNT_REGISTER_TIME: 'uid__account_register_timestamp__profile'     // 用户注册时间
};

export const DEFAULT_FORM = {
  [KEY_TYPE]: KEY_TYPE_USER,
  variables: [
    userVariables.VISIT_ALARM_INCREMENT_TIMES,
    userVariables.ACCOUNT_REGISTER_IP,
    userVariables.ACCOUNT_USERNAME,
    userVariables.ACCOUNT_MAIL,
    userVariables.ACCOUNT_CHANGE_MAIL,
    userVariables.ACCOUNT_MAIL_CHANGE_TIMES,
    userVariables.ACCOUNT_MAIL_LAST_CHANGE_TIMESTAMP,
    userVariables.ACCOUNT_MOBILE,
    userVariables.ACCOUNT_CHANGE_MOBILE,
    userVariables.ACCOUNT_MOBILE_CHANGE_TIMES,
    userVariables.ACCOUNT_MOBILE_LAST_CHANGE_TIMESTAMP,
    userVariables.ACCOUNT_LOGIN_LAST10_TIMESTAMP_PROFILE,
    userVariables.ACCOUNT_IP_LAST10_PROFILE,
    userVariables.ACCOUNT_GEO_LAST10_PROFILE,
    userVariables.VISIT_HOUR_MERGE,
    userVariables.VISIT_CITY,
    userVariables.VISIT_UA,
    userVariables.VISIT_DEVICE,
    userVariables.ACCOUNT_LAST_VISIT_TIMESTAMP,
    userVariables.ACCOUNT_LAST_VISIT_IP,
    userVariables.ACCOUNT_REGISTER_TIME
  ]
};
export const URI_PROFILES = 'query/variable';
export const ACTION_RETRIEVE_PROFILE = 'ACTION_RETRIEVE_PROFILE';
export const ACTION_RETRIEVE_VISITS = 'ACTION_RETRIEVE_VISITS';
