// const express = require("express");
// const webpackDevMiddleware = require("webpack-dev-middleware");
// const webpack = require("webpack");
// const webpackConfig = require("./webpack.development.config");
//
// const app = express();
// const compiler = webpack(webpackConfig);
// const port = 5003;
//
// app.use(webpackDevMiddleware(compiler));
//
// app.use('/static', express.static(__dirname));
// app.use('/api', require('./api/index'));
//
// app.listen(port, function () {
//   console.info("==> 🌎  Listening on port %s. Open up http://localhost:%s/ in your browser.", port, port);
// });

const express = require("express");
const proxy = require('express-http-proxy');
const webpackDevMiddleware = require("webpack-dev-middleware");
const webpack = require("webpack");
const webpackConfig = require("./webpack.development.config");

const app = express();
const compiler = webpack(webpackConfig);
const port = 5006;

app.use(webpackDevMiddleware(compiler));

app.use('/static', express.static(__dirname));
// app.use('/api', require('./api/index'));
app.use('/api', proxy('http://112.74.58.210:9001'));

app.listen(port, function () {
  console.info("==> 🌎  Listening on port %s. Open up http://localhost:%s/ in your browser.", port, port);
});
