/**
 * Created by jason on 17/7/5.
 */

module.exports = {
  "status": 0,
  "values": [{
    "key": "",
    "key_type":"ip",
    "ratio":20.4,
    "geo_city": "上海市",
    "tags": { "爬虫": 100, "访客": 100 },
    "first_time": "HH:mm:ss",
    "last_time": "HH:mm:ss",
    "risk_score": 10,
    "is_test": true,
    "is_white": true,
    "origin": [{
      "source_ip": "1.1.1.1",
      "geo_city": "上海市",
      "tags": { "爬虫": 100, "访客": 100 }
    }]
  }, {
    "key": "123333",
    "key_type":"ip",
    "ratio":20.4,
    "geo_city": "上海市",
    "tags": { "": 100, "访客": 100 },
    "first_time": "HH:mm:ss",
    "last_time": "HH:mm:ss",
    "risk_score": 10,
    "is_test": true,
    "is_white": true,
    "origin": null
  }, {
    "key": "aaaaa123333",
    "key_type":"did",
    "ratio":20.4,
    "geo_city": "上海市",
    "tags": { "爬虫": 100, "访客": 100 },
    "first_time": "HH:mm:ss",
    "last_time": "HH:mm:ss",
    "risk_score": 6.2,
    "is_test": true,
    "is_white": false,
    "origin": [{
      "source_ip": "255.205.255.205",
      "geo_city": "上海市",
      "tags": { "访客": 100 }
    }, {
      "source_ip": "25.25.25.25",
      "geo_city": "上海市",
      "tags": { "爬虫": 100 }
    }, {
      "source_ip": "55.25.25.255",
      "geo_city": "上海市",
      "tags": { "爬虫": 100 }
    }]
  }],
  total_count: 8
};
