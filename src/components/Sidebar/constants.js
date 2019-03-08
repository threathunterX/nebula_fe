import {
  HOME,
  ALERTS,
  RISKS,
  ANALYSIS,
  STRATEGIES,
  SYSTEM_CONFIG,
  LOGS,
  LOGS_ANALYSIS,
  RELATIONS
} from '../../containers/UserManage/constants';

const navList = [{
  iconClass: 'icon-appstoreo',
  text: '总览',
  router: '/home',
  key: HOME
}, {
  iconClass: 'icon-solution',
  text: '风险名单管理',
  router: '/alerts',
  key: ALERTS
}, {
  iconClass: 'icon-exception',
  text: '风险事件管理',
  router: '/risks',
  key: RISKS
}, {
  iconClass: 'icon-linechart',
  text: '风险分析',
  router: '/analysis',
  key: ANALYSIS,
  child: [{
    text: 'User分析',
    router: '/user'
  }, {
    text: 'IP分析',
    router: '/ip'
  }, {
    text: 'PAGE分析',
    router: '/page'
  }, {
    text: 'DeviceID分析',
    router: '/did'
  }, {
    text: '用户档案',
    router: '/profiles'
  }]
}, {
  iconClass: 'icon-search',
  text: '日志查询',
  router: '/logs',
  key: LOGS
}, {
  svgIcon: 'tag',
  text: '策略管理',
  router: '/strategie',
  key: STRATEGIES,
  child: [{
    text: '基础事件',
    router: '/setting'
  },{
    text: '策略管理',
    router: '/user'
  }]

}, {
  iconClass: 'icon-filetext',
  text: '日志解析',
  router: '/logAnalysis',
  key: LOGS_ANALYSIS
}, {
  iconClass: 'icon-sharealt',
  text: '关系图',
  router: '/relations',
  key: RELATIONS
}, {
  iconClass: 'icon-setting',
  text: '系统配置',
  router: '/systemConfig',
  key: SYSTEM_CONFIG
}];

export default navList;
