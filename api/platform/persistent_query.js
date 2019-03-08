module.exports = {
  status: 200,
  msg: 'ok',
  values: [{
    "show_cols": ["timestamp", "did"],
    endtime: 1502262022000,
    fromtime: 1501570818000,
    "status": "success",
    remark: 'test11',
    event_name: 'ACCOUNT_LOGIN',
    "terms": [{
      "right": "Frank",
      "left": "uid",
      "op": "contain"
    }],
    "error": "",
    "id": 7
  }, {
    "show_cols": ["timestamp", "did"],
    endtime: 1502262022000,
    fromtime: 1501570818000,
    "status": "process",
    remark: 'test11',
    event_name: 'HTTP_CLICK',
    "terms": [{
      "right": "Frank",
      "left": "uid",
      "op": "contain"
    }],
    "error": "",
    "id": 8
  }, {
    "show_cols": ["timestamp", "did"],
    endtime: 1502262022000,
    fromtime: 1501570818000,
    "status": "failed",
    remark: 'test11',
    event_name: 'HTTP_DYNAMIC',
    "terms": [{
      "right": ".",
      "left": "c_ip",
      "op": "contain"
    }],
    "error": "失败原因",
    "id": 9
  }, {
    "show_cols": ["timestamp", "did"],
    endtime: 1502262022000,
    fromtime: 1501570818000,
    "status": "wait",
    remark: 'test11',
    event_name: 'HTTP_DYNAMIC',
    "terms": [{
      "right": ".",
      "left": "c_ip",
      "op": "contain"
    }],
    "error": "",
    "id": 10
  }]
};
