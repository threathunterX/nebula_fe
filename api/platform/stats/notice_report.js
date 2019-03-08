
function getLineData() {

  var lineData = [];
  var time = 1473746400000;
  for (var i = 0; i < 100; i++) {

    lineData.push({
      [time + i * 3600000]: parseInt(Math.random() * 500)+500
    });
  }
  return lineData;
}

var risk_trend = getLineData();

var risk_tag_top = [{
  "爬虫": 50
}, {
  "机器访问": 32
}, {
  "恶意扫描": 23
}, {
  "短信轰炸": 19
}, {
  "撞库": 15
}, {
  "其他": 40
}];

var risk_user_top = [];
var risk_ip_top = [];
var risk_url_top = [];
for (var i = 0; i < 10; i++) {

  risk_user_top.push({
    "name": "user" + i,
    "count": parseInt(Math.random() * 3000),
    "trend": getLineData(),
    "type": {
      "爬虫": parseInt(Math.random() * 200),
      "短信轰炸": parseInt(Math.random() * 150)
    }
  });

  risk_ip_top.push({
    "name": "ipaddress__" + i,
    "geo_city": "上海市",
    "count": parseInt(Math.random() * 3000),
    "trend": getLineData(),
    "type": {
      "爬虫": parseInt(Math.random() * 200),
      XSS: parseInt(Math.random() * 150)
    }
  });

  risk_url_top.push({
    "name": "www.test.com/member/login.html_" + i,
    "count": parseInt(Math.random() * 3000),
    "trend": getLineData()
  });
}

var risk_geo_top = [{
  "北京市": 600
}, {
  "天津市": 360
}, {
  "深圳市": 200
}, {
  "成都市": 180
}, {
  "上海市": 130
}, {
  "武汉市": 120
}, {
  "西安市": 60
}, {
  "乌鲁木齐市": 60
}];

module.exports = {
  "status": 200,
  "values": {
    risk_trend,
    risk_tag_top,
    risk_block_stat_user: 2315,
    risk_discover_stat_user: 6332,
    risk_user_top,
    risk_block_stat_ip: 1315,
    risk_discover_stat_ip: 2332,
    risk_ip_top,
    risk_geo_top,
    risk_url_top
  }
};
