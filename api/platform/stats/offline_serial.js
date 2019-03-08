const values = {};
const time = 1500444000000;
for (let i = 0; i < 1000; i += 1) {
  values[time + (i * 3600000)] = {
    "page__visit__dynamic_count__1h__slot": {
      key: time + (i * 3600000),
      value: parseInt(Math.random() * 100, 10)
    },
    "page__visit__dynamic_distinct_did__1h__slot": {
      key: time + (i * 3600000),
      value: parseInt(Math.random() * 100, 10)
    },
    "page__visit__dynamic_distinct_ip__1h__slot": {
      key: time + (i * 3600000),
      value: parseInt(Math.random() * 100, 10)
    },
    "page__visit__dynamic_distinct_user__1h__slot": {
      key: time + (i * 3600000),
      value: parseInt(Math.random() * 100, 10)
    },
    "page__visit__incident_count__1h__slot": {
      key: time + (i * 3600000),
      value: parseInt(Math.random() * 100, 10)
    }
  };
}

module.exports = {
  status: 0,
  values
};
