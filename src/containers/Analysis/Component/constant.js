/**
 * Created by jason on 17/4/5.
 */
export const AnalysisMap = {
  USER: 'uid',
  DeviceID: 'did',
  PAGE: 'page',
  SessionID: 'sid',
  IP: 'c_ip'
};

export const labelMap = [{
  text: 'IP',
  value: 'c_ip'
}, {
  text: '账号',
  value: 'uid'
}, {
  text: 'DID',
  value: 'did'
}, {
  text: 'Host',
  value: 'host'
}, {
  text: '页面',
  value: 'page'
}, {
  text: '风险名单',
  value: 'notices'
}, {
  text: 'SID',
  value: 'sid'
}, {
  text: '请求体',
  value: 'c_body'
}, {
  text: '响应体',
  value: 's_body'
}, {
  text: 'cookie',
  value: 'cookie'
}, {
  text: 'useragent',
  value: 'useragent'
}];
