var data = [{
  "status": "test",
  "terms": [{
    "remark": "",
    "op": "contain",
    "right": {"subtype": "", "config": {"value": "."}, "type": "constant"},
    "left": {"subtype": "", "config": {"field": "c_ip", "event": ["nebula", "HTTP_DYNAMIC"]}, "type": "event"}
  }, {
    "remark": null,
    "op": "<",
    "right": {"subtype": "", "config": {"value": "5"}, "type": "constant"},
    "left": {
      "subtype": "getvariable",
      "config": {
        "variable": ["nebula", "ip__visit__clicks_count_refererhit__5m__rt"],
        "trigger": {"keys": ["c_ip"], "event": ["nebula", "HTTP_DYNAMIC"]}
      },
      "type": "func"
    }
  }, {
    "remark": null,
    "op": "",
    "right": null,
    "left": {
      "subtype": "setblacklist",
      "config": {
        "remark": "ttt",
        "name": "VISITOR",
        "checktype": "IP",
        "decision": "review",
        "checkvalue": "c_ip",
        "checkpoints": "test",
        "ttl": 4
      },
      "type": "func"
    }
  }],
  "tags": ["爬虫"],
  "app": "nebula",
  "starteffect": 1472473401168,
  "endeffect": 1630326202710,
  "modifytime": 1472473462672,
  "score": 235,
  "category": "VISITOR",
  "remark": "fsdf",
  "isLock": false,
  "name": "testtest",
  "version": 1472527255721,
  "createtime": 1472473462672
}, {
  "status": "inedit",
  "terms": [{
    "remark": "",
    "op": "contain",
    "right": {"subtype": "", "config": {"value": "."}, "type": "constant"},
    "left": {"subtype": "", "config": {"field": "c_ip", "event": ["nebula", "HTTP_DYNAMIC"]}, "type": "event"}
  }, {
    "remark": null,
    "op": ">",
    "right": {"subtype": "", "config": {"value": "10"}, "type": "constant"},
    "left": {
      "subtype": "count",
      "config": {
        "algorithm": "count",
        "interval": 300,
        "sourceevent": ["nebula", "HTTP_DYNAMIC"],
        "trigger": {"keys": ["c_ip"], "event": ["nebula", "HTTP_DYNAMIC"]},
        "operand": [],
        "groupby": ["c_ip"],
        "condition": [{"right": "c_ip", "left": "c_ip", "op": "="}, {
          "right": "api.diyidan.net/",
          "left": "uri_stem",
          "op": "=="
        }]
      },
      "type": "func"
    }
  }, {
    "remark": null,
    "op": "",
    "right": null,
    "left": {
      "subtype": "setblacklist",
      "config": {
        "remark": "t",
        "name": "VISITOR",
        "checktype": "IP",
        "decision": "review",
        "checkvalue": "c_ip",
        "checkpoints": "visit",
        "ttl": 3
      },
      "type": "func"
    }
  }],
  "tags": ["XSS"],
  "app": "nebula",
  "starteffect": 1472475830097,
  "endeffect": 1630242231519,
  "modifytime": 1472475949409,
  "score": 6,
  "category": "VISITOR",
  "remark": "",
  "isLock": false,
  "name": "scan",
  "version": 1472527255721,
  "createtime": 1472475949409
}, {
  "status": "test",
  "terms": [{
    "remark": "",
    "op": "==",
    "right": {"subtype": "", "config": {"value": "127.0.0.1"}, "type": "constant"},
    "left": {"subtype": "", "config": {"field": "c_ip", "event": ["nebula", "HTTP_DYNAMIC"]}, "type": "event"}
  }, {
    "remark": null,
    "op": "",
    "right": null,
    "left": {
      "subtype": "setblacklist",
      "config": {
        "remark": "test",
        "name": "ACCOUNT",
        "checktype": "IP",
        "decision": "review",
        "checkvalue": "c_ip",
        "checkpoints": "",
        "ttl": 20
      },
      "type": "func"
    }
  }],
  "tags": ["爬虫"],
  "app": "nebula",
  "starteffect": 1472470957151,
  "endeffect": 1472557361007,
  "modifytime": 1472472181429,
  "score": 161,
  "category": "VISITOR",
  "remark": "test",
  "isLock": true,
  "name": "test_scan",
  "version": 1472527255721,
  "createtime": 1472472181429
}, {
  "status": "test",
  "terms": [{
    "remark": "",
    "op": "==",
    "right": {"subtype": "", "config": {"value": "127.0.0.1"}, "type": "constant"},
    "left": {"subtype": "", "config": {"field": "c_ip", "event": ["nebula", "HTTP_DYNAMIC"]}, "type": "event"}
  }, {
    "remark": null,
    "op": "==",
    "right": {"subtype": "", "config": {"value": "1"}, "type": "constant"},
    "left": {"subtype": "", "config": {"field": "uid", "event": ["nebula", "HTTP_DYNAMIC"]}, "type": "event"}
  }, {
    "remark": null,
    "op": "",
    "right": null,
    "left": {
      "subtype": "setblacklist",
      "config": {
        "remark": "test",
        "name": "VISITOR",
        "checktype": "IP",
        "decision": "review",
        "checkvalue": "c_ip",
        "checkpoints": "",
        "ttl": 3
      },
      "type": "func"
    }
  }],
  "tags": [],
  "app": "nebula",
  "starteffect": 1472472475607,
  "endeffect": 1472645277333,
  "modifytime": 1472472573512,
  "score": 222,
  "category": "VISITOR",
  "remark": "test",
  "isLock": true,
  "name": "test_add",
  "version": 1472527255721,
  "createtime": 1472472573512
}, {
  "status": "inedit",
  "terms": [{
    "remark": "22",
    "op": "!=",
    "right": {"subtype": "", "config": {"value": "0"}, "type": "constant"},
    "left": {"subtype": "", "config": {"field": "sid", "event": ["nebula", "HTTP_DYNAMIC"]}, "type": "event"}
  }, {
    "remark": null,
    "op": "",
    "right": null,
    "left": {
      "subtype": "setblacklist",
      "config": {
        "remark": "",
        "name": "VISITOR",
        "checktype": "IP",
        "decision": "review",
        "checkvalue": "c_ip",
        "checkpoints": "",
        "ttl": 2
      },
      "type": "func"
    }
  }, {
    "remark": null,
    "op": ">",
    "right": {"subtype": "", "config": {"value": "0"}, "type": "constant"},
    "left": {
      "subtype": "getvariable",
      "config": {
        "variable": ["nebula", "ip__visit__clicks_count_refererhit__5m__rt"],
        "trigger": {"keys": ["id"], "event": ["nebula", "HTTP_DYNAMIC"]}
      },
      "type": "func"
    }
  }],
  "tags": ["SQL注入"],
  "app": "nebula",
  "starteffect": 1470745187731,
  "endeffect": 1503145190380,
  "modifytime": 1472473362687,
  "score": 57,
  "category": "VISITOR",
  "remark": "123",
  "isLock": false,
  "name": "123",
  "version": 1472527255721,
  "createtime": 1472473362687
}, {
  "status": "inedit",
  "terms": [{
    "remark": "22",
    "op": "!=",
    "right": {"subtype": "", "config": {"value": "0"}, "type": "constant"},
    "left": {"subtype": "", "config": {"field": "sid", "event": ["nebula", "HTTP_DYNAMIC"]}, "type": "event"}
  }, {
    "remark": null,
    "op": "",
    "right": null,
    "left": {
      "subtype": "setblacklist",
      "config": {
        "remark": "",
        "name": "VISITOR",
        "checktype": "IP",
        "decision": "review",
        "checkvalue": "c_ip",
        "checkpoints": "",
        "ttl": 2
      },
      "type": "func"
    }
  }, {
    "remark": null,
    "op": ">",
    "right": {"subtype": "", "config": {"value": "0"}, "type": "constant"},
    "left": {
      "subtype": "getvariable",
      "config": {
        "variable": ["nebula", "ip__visit__clicks_count_refererhit__5m__rt"],
        "trigger": {"keys": ["id"], "event": ["nebula", "HTTP_DYNAMIC"]}
      },
      "type": "func"
    }
  }],
  "tags": ["SQL注入"],
  "app": "nebula",
  "starteffect": 1470745187731,
  "endeffect": 1503145190380,
  "modifytime": 1472473362687,
  "score": 57,
  "category": "ACCOUNT",
  "remark": "123",
  "isLock": false,
  "name": "123",
  "version": 1472527255721,
  "createtime": 1472473362687
}];

module.exports = {
  "status": 200,
  "msg": "ok",
  values: data
};
