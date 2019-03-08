//模拟散点数据
var user = ["user01", "user02", "user03", "user04", "user05", "user06", "user07", "user08", "user09", "user10", "user11", "user12", "user13", "user14", "user15", "user16", "user17", "user14", "user15", "user15", "user17", "user18", "user19", "user2012321313213131231231321312321313"];
var ip = ["ip01", "ip02", "ip03", "ip04", "ip05", "ip06", "ip07", "ip08", "ip09", "ip10", "ip11", "ip12", "ip13", "ip14", "ip15", "ip16", "ip17", "ip14", "ip15", "ip15", "ip17", "ip18", "ip19", "ip20"];
var did = ["did01", "did02", "did03", "did04", "did05", "did06", "did07", "did08", "did09", "did10", "did11", "did12", "did13", "did14", "did15", "did16", "did17", "did14", "did15", "did15", "did17", "did18", "did19", "did20"];
var page = ["page01", "page02", "page03", "page04", "page05", "page06", "page07", "page08", "page09", "page10", "page11", "page12", "page13", "page14", "page15", "page16", "page17", "page14", "page15", "page15", "page17", "page18", "page19", "page20"];
var sid = ["sid01", "sid02", "sid03", "sid04", "sid05", "sid06", "sid07", "sid08", "sid09", "sid10", "sid11", "sid12", "sid13", "sid14", "sid15", "sid16", "sid17", "sid14", "sid15", "sid15", "sid17", "sid18", "sid19", "sid20"];
var time = 1484845200000;
var data = [];
for (var i = 0; i < user.length; i++) {
  for (var j = 0; j < 50; j++) {
    data.push({
      ip: ip[i],
      user: user[i],
      did: did[i],
      page: page[i],
      sid: sid[i],
      timestamp: time + parseInt(Math.random() * 200000),
      if_notice: Math.random() * 10 > 8
    })
  }
}

data.push({
  ip: "ip17",
  user: "user17",
  did: "did17",
  page: "page17",
  sid: "sid17",
  timestamp: time + 230000,
  if_notice: true
});

module.exports = {values:data};
