const values = [];
for (let i = 0; i < 50; i += 1) {
  values.push({
    id: i,
    keyword: i % 7 === 0 ? `login${i}` : `www.test${i}.com`,
    is_followed: parseInt(Math.random() * 5, 10) !== 1,
    is_ignored: parseInt(Math.random() * 10, 10) !== 1
  });
}

module.exports = {
  status: 200,
  msg: 'ok',
  values
};
