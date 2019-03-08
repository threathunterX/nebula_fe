var express = require('express');
var router = express.Router();

router.post('/auth/login', function (req, res, next) {
  res.json({ msg: 'ceshi', auth: true });
});

router.get('/platform/network/statistics', function (req, res, next) {
  setTimeout(() => {
    res.json(require('./network/statistics'));
  }, 5000);
});

router.get('/platform/alarm/statistics', function (req, res, next) {
  res.json(require('./alarm/statistics'));
});

router.get('/platform/notices', function (req, res, next) {
  res.json(require('./notices'));
});

router.get('/platform/notices/trigger_event', function (req, res, next) {
  setTimeout(() => {
    res.json(require('./platform/notices/trigger_event'));
  }, 600);
});

// 用户点击
router.get('/platform/behavior/clicks_statistics', function (req, res, next) {
  res.json(require('./behavior/clicks_statistics'));
});

router.get('/platform/behavior/continuous_related_statistic', function (req, res, next) {
  res.json(require('./behavior/continuous_related_statistic'));
});

router.get('/platform/alarm/statistics_detail', function (req, res, next) {
  res.json(require('./alarm/statistics_detail'));
});

router.get('/platform/behavior/page_statistics', function (req, res, next) {
  res.json(require('./behavior/page_statistics'));
});

router.get('/platform/behavior/related_statistics', function (req, res, next) {
  res.json(require('./behavior/related_statistics'));
});

router.get('/platform/risks/realtime', function (req, res, next) {
  res.json(require('./risks/realtime'));
});

router.get('/platform/risks/history', function (req, res, next) {
  res.json(require('./risks/history'));
});

router.get('/platform/behavior/scene_statistic', function (req, res, next) {
  res.json(require('./behavior/scene_statistic'));
});

router.get('/platform/behavior/statistics', function (req, res, next) {
  res.json(require('./behavior/statistics'));
});

router.get('/platform/behavior/continuous_top_related_statistic', function (req, res, next) {
  res.json(require('./behavior/continuous_top_related_statistic'));
});
router.get('/platform/behavior/clicks_period', function (req, res, next) {
  res.json(require('./behavior/clicks_period'));
});
router.get('/platform/online/clicks_period', function (req, res, next) {
  res.json(require('./behavior/clicks_period'));
});
router.get('/platform/behavior/visit_stream', function (req, res, next) {
  res.json(require('./behavior/visit_stream'));
});
router.get('/platform/behavior/strategy_statistic', function (req, res, next) {
  res.json(require('./behavior/strategy_statistic'));
});
router.post('/platform/behavior/clicks', function (req, res, next) {
  res.json(require('./behavior/clicks'));
});
router.post('/platform/online/clicks', function (req, res, next) {
  res.json(require('./behavior/clicks'));
});
router.get('/platform/behavior/top/clicks_location', function (req, res, next) {
  res.json(require('./behavior/top/clicks_location'));
});
router.get('/platform/behavior/tag_statistics', function (req, res, next) {
  res.json(require('./behavior/tag_statistics'));
});

router.get('/nebula/events', function (req, res, next) {
  res.json(require('./nebula/events'));
});

router.get('/nebula/variables', function (req, res, next) {
  res.json(require('./nebula/variables'));
});

router.get('/nebula/strategies', function (req, res, next) {
  res.json(require('./nebula/strategies'));
});

router.post('/nebula/strategies', function (req, res, next) {
  res.json(require('./nebula/strategies'));
});

router.get('/nebula/strategyweigh', function (req, res, next) {
  res.json(require('./nebula/strategyweigh'));
});

router.get('/nebula/tags', function (req, res, next) {
  res.json(require('./nebula/tags'));
});

// 获取每小时风险事件统计列表
router.get('/platform/risks/statistics', function (req, res, next) {
  res.json(require('./risks/statistics'));
});

router.get('/platform/config', function (req, res, next) {
  res.json(require('./config/setting'));
});

// redq auth
router.get('/platform/config/redq.auth', function (req, res, next) {
  res.json(require('./config/redq'));
});

router.get('/platform/alarm/valid_count', function (req, res, next) {
  res.json(require('./alarm/valid_count'));
});

router.post('/platform/logquery', function (req, res, next) {
  res.json(require('./platform/logquery'));
});

router.get('/platform/logparser', function (req, res, next) {
  res.json(require('./platform/logparser'));
});

router.get('/platform/persistent_query/data', function (req, res, next) {
  res.json(require('./platform/persistent_query_get_data'));
});

router.get('/platform/persistent_query', function (req, res, next) {
  res.json(require('./platform/persistent_query'));
});

router.get('/platform/persistent_query/progress', function (req, res, next) {
  res.json(require('./platform/persistent_query_progress'));
});

router.post('/platform/persistent_query', function (req, res, next) {
  // res.status(503).send(require('./platform/persistent_query_post'));
  res.status(503).send('信息信息信息信息信息');
});

router.post('/platform/stats/profile', function (req, res, next) {
  res.json(require('./platform/stats/profile'));
});

router.get('/system/license', function (req, res, next) {
  res.json(require('./system/licence'));
});

router.get('/system/performance/digest', function (req, res, next) {
  res.json(require('./system/performance'));
});

router.get('/platform/stats/offline_serial', function (req, res, next) {
  res.json(require('./platform/stats/offline_serial'));
});

router.get('/platform/stats/offline', function (req, res, next) {
  res.json(require('./platform/stats/offline'));
});

router.get('/platform/stats/analyze_url_query', function (req, res, next) {
  res.json(require('./platform/stats/analyze_url_query'));
});

router.get('/platform/stats/slot', function (req, res, next) {
  res.json(require('./platform/stats/slot'));
});

router.get('/platform/stats/threat_map', function (req, res, next) {
  res.json(require('./platform/stats/threat_map'));
});

router.get('/platform/stats/notice_report', function (req, res, next) {
  res.json(require('./platform/stats/notice_report'));
});

router.get('/platform/stats/dashboard_page_search', function (req, res, next) {
  setTimeout(() => {
    res.json(require('./platform/stats/dashboard_page_search'));
  }, 600);
});

router.get('/platform/stats/account_risk', function (req, res, next) {
  setTimeout(() => {
    res.json(require('./platform/stats/account'));
  }, 500);
});

router.get('/platform/stats/crawler_risk', function (req, res, next) {
  setTimeout(() => {
    res.json(require('./platform/crawler/risk_trend'));
  }, 500);
});

router.get('/platform/stats/crawler_page_risk', function (req, res, next) {
  setTimeout(() => {
    res.json(require('./platform/crawler/visit_pages'));
  }, 500);
});

router.get('/platform/follow_keyword', function (req, res, next) {
  setTimeout(() => {
    res.json(require('./platform/crawler/follow_keyword'));
  }, 500);
});

router.post('/platform/follow_keyword', function (req, res, next) {
  setTimeout(() => {
    res.json(require('./platform/crawler/follow_keyword_post'));
  }, 500);
});

router.delete('/platform/follow_keyword', function (req, res, next) {
  setTimeout(() => {
    res.json(require('./platform/crawler/follow_keyword_delete'));
  }, 500);
});

router.post('/platform/stats/account_page_risk', function (req, res, next) {
  setTimeout(() => {
    res.json(require('./platform/stats/page_risk'));
  }, 500);
});

router.post('/platform/stats/dashboard_page_search', function (req, res, next) {
  setTimeout(() => {
    res.json(require('./platform/stats/dashboard_page_search_post'));
  }, 500);
});

router.get('/auth/groups', function (req, res, next) {
  res.json(require('./auth/groups'));
});

router.get('/auth/strategy_access', function (req, res, next) {
  res.json(require('./auth/strategy_access'));
});

router.get('/auth/users', function (req, res, next) {
  res.json(require('./auth/users'));
});

router.get('/auth/privileges', function (req, res, next) {
  res.json(require('./auth/privileges'));
});

router.post('/nebula/strategy/import', function (req, res, next) {
  res.json(require('./nebula/strategy/import'));
});

router.get('/nebula/strategies/changestatus', function (req, res, next) {
  res.json(require('./nebula/strategies/changestatus'));
});
router.post('/nebula/strategies/changestatus', function (req, res, next) {
  res.json(require('./nebula/strategies/changestatus'));
});

router.post('/platform/stats/slot/query', function (req, res, next) {
  res.json(require('./platform/stats/query'));
});
router.post('/platform/stats/slot/mergequery', function (req, res, next) {
  res.json({
    status: 200,
    values: {}
  });
});

router.get('/page_analysis/parent_uri', function (req, res, next) {
  const result = [];
  for (let i = 0; i < parseInt(Math.random() * 50, 10) + 1; i += 1) {
    result.push({
      uri: `${Math.random()}`,
      is_leaf: i % 4 === 1,
      cnt: parseInt(Math.random() * 5000, 10)
    });
  }
  res.json({
    status: 200,
    result
  });
});

router.get('/page_analysis/leaf', function (req, res, next) {
  const requestData = {};
  const riskRequestData = {};
  const time = new Date().getTime();
  for (let i = 0; i < 72; i += 1) {
    const y = parseInt((Math.random() * 100) + 100, 10);
    requestData[time + (i * 3600000)] = y;
    riskRequestData[time + (i * 3600000)] = y - (Math.random() * 100);
  }
  res.json({
    status: 200,
    result: {
      total_trend: requestData,
      risk_trend: riskRequestData
    }
  });
});

router.get('/page_analysis/search', function (req, res, next) {
  const result = [];
  for (let i = 0; i < 10; i += 1) {
    result.push({
      uri: Math.random(),
      cnt: parseInt((Math.random() * 100) + 10, 10)
    });
  }
  res.json({
    status: 200,
    total: 1000,
    result
  });
});

module.exports = router;
