

//模拟散点数据
var pointData = {};
var user = ["user01", "user02", "user03", "user04", "user05", "user06", "user07", "user08", "user09", "user10", "user11", "user12", "user13", "user14", "user15"];

for (var i = 0; i < user.length; i++) {
  pointData[user[i]] = {};
  for (var j = 0; j < 50; j++) {
    pointData[user[i]][Math.random() * 200] = Math.ceil(Math.random() * 10);
  }
}

module.exports = pointData;
