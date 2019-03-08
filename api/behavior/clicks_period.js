var data = {
  status:0,
  values:{}
};
var time = 1484845200000;
for (var i = 0; i < 120; i++) {

  if(i > 80) {
    data.values[time + i * 30 * 1000] = {
      count: 0,
      if_notice: Math.random() * 10 > 7
    }
    continue;
  }
  data.values[time + i * 30 * 1000] = {
    count: Math.random() * 100,
    if_notice: Math.random() * 10 > 7
  };
}

module.exports = data;
