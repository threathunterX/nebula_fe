var data = [];
var time = 1471436071000;
for (var i = 0; i < 1000; i++) {

  data.push({
    time_frame: time + i * 3600000,
    count : Math.random()*1500,
    "related_count": {
      page: Math.random()*500,
      user: Math.random()*300,
      did: Math.random()*600,
      ip: Math.random()*300,
      incident: Math.random()*200
    }
  })
}

module.exports = data;

//module.exports  [
//  {
//    "time_frame": 1470711600000,
//    "count": 100,
//    "related_count": {
//      "page": 10,
//      "user": 5,
//      "did": 9,
//      "incident": 10
//    }
//  },
//  {
//    "time_frame": 1470715200000,
//    "count": 100,
//    "related_count": {
//      "page": 10,
//      "user": 5,
//      "did": 9,
//      "incident": 10
//    }
//  }
//];
