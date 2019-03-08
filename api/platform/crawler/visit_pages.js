/**
 * Created by jason on 17/8/1.
 */


const values = [];
for (let i = 0; i < 50; i += 1) {

  const continuous_data = {};

  for (let j = 0; j < 24; j += 1) {
    continuous_data[`${j < 10 ? `0${j}` : j}`] = {
      count: 100,
      crawler_count: Math.random() * 100,
      latency: parseInt(Math.random() * 2000, 10),
      upload_bytes: parseInt(Math.random() * 2000, 10),
      '2XX': parseInt(Math.random() * 100, 10),
      '3XX': parseInt(Math.random() * 100, 10),
      '4XX': parseInt(Math.random() * 100, 10),
      '5XX': parseInt(Math.random() * 100, 10)
    };
  }

  values.push({
    url: `www.test.com/${i}`,
    count: 100,
    crawler_count: Math.random() * 100,
    latency: parseInt(Math.random() * 100, 10),
    upload_bytes: parseInt(Math.random() * 2000, 10),
    is_followed: parseInt(Math.random() * 5, 10) === 1,
    is_ignored: parseInt(Math.random() * 10, 10) === 1,
    continuous_data
  });
}

module.exports = {
  status: 200,
  msg: 'ok',
  values
};
