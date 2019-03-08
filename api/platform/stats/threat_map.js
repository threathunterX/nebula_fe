const city = ['上海市', '武汉市', '北京市', '西安市', '咸宁市', '鄂州市', '昆明市', '长春市', '天津市', '东莞市', '广州市', '台湾', '其他'];
const fromcity = ['上海市', '武汉市', '北京市', '西安市', '咸宁市', '鄂州市', '昆明市', '长春市', '天津市', '英国', '广州市', '美国', '其他'];
const category = ['VISITOR', 'ACCOUNT', 'ORDER', 'TRANSACTION'];
let timestamp = 1478687185602;

const data = [];
for (let i = 0; i < 200; i += 1) {
  timestamp += parseInt(Math.random() * 500, 10) + 100;
  const fromCity = fromcity[parseInt(Math.random() * 12, 10)];
  let toCity = city[parseInt(Math.random() * 12, 10)];
  while (fromCity === toCity) {
    toCity = city[parseInt(Math.random() * 12, 10)];
  }

  data.push({
    from_city: fromCity,
    to_city: toCity,
    timestamp,
    test: i % 4 === 1 || i % 4 === 3,
    category: category[i % 4]
  });
}

module.exports = {
  status: 200,
  values: data
};
