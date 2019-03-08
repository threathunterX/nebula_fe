import {
  API_BASE,
  version
} from 'app.config';
import Raven from 'raven-js';
import Cookies from 'js-cookie';
import URI from 'urijs';
import mockjs from 'mockjs';

import Perf from '../util/Perf';
import http from '../../http';
import Loading from '../../components/Loading/index';


// 标识请求是否已回调
let notBacked = true;

// 合并参数
function prepareParams(orgParam = {}) {
  return orgParam;

  // var params = {};
  // Object.assign(params, APP_CONFIG.DEFAULT_PARAMS, orgParam);
  //
  // return params;
}

function initConfig(cfg) {
  const config = {
    httpRequestParam: cfg.httpRequestParam,
    url: cfg.external ? cfg.url : API_BASE + cfg.url,
    external: cfg.external,
    loadingIn: cfg.loadingIn === undefined ? false : cfg.loadingIn,
    params: prepareParams(cfg.params),
    timeout: cfg.timeout,
    onBefore(configTemp) {
      if (cfg.onBefore !== undefined) {
        cfg.onBefore(configTemp);
      }
    },
    onSuccess(resp) {
      if (cfg.onSuccess !== undefined) {
        cfg.onSuccess(resp);
      }
    },
    onError(type) {
      if (cfg.onError !== undefined) {
        cfg.onError(type);
        Raven.captureException(type);
      }
    }
  };


  // 解析参数值为函数类型的参数
  // if (config.params != undefined) {
  //
  //  for (var name in config.params) {
  //
  //    if (typeof config.params[name] == "function") {
  //
  //      config.params[name] = config.params[name]();
  //    }
  //  }
  // }

  return config;
}

// 请求完成后处理
function requestComplete(config, success) {
  // 修改标记
  notBacked = false;
  if (config.loadingIn !== false) {
    // 隐藏遮罩
    Loading.hideLoading(config.loadingIn);
  }

  if (window.threathunterTracker && config.httpRequestParam) {
    const time = Perf.stop(`${config.loadingIn}_${config.url}`);
    const {
      appID,
      module
    } = config.httpRequestParam;

    if (success) {
      // 请求超时: 大于10秒 写入Tracker
      if (window.threathunterTracker && time > 10000) {
        const username = Cookies.get('username');
        window.threathunterTracker.setData({
          version,
          username,
          appID,
          module,
          level: 2,
          message: 'timeout'
        });
      }
    } else {
      const username = Cookies.get('username');
      window.threathunterTracker.setData({
        version,
        username,
        appID,
        module,
        level: 4,
        message: 'unreachable'
      });
    }
  }
}

// 请求准备
function requestPrepare(orgConfig) {
  const config = initConfig(orgConfig);

  if (!orgConfig.useOrgUrl) {
    // 如果 url 中包含双斜线，则替换为单斜线
    config.url = config.url.replace(/\/\//g, '/').replace('http:/', 'http://');
  }
  // 设置 timeout
  config.timeout = config.timeout === undefined ? 30000 : config.timeout;

  // 本地加载无需显示加载提示
  if (config.loadingIn !== false) {
    Loading.showLoading(config.loadingIn);
    setTimeout(() => {
      if (notBacked) {
        Loading.hideLoading(config.loadingIn);
      }
    }, config.timeout);
  }
  // 发请求前的预处理
  if (config.onBefore) {
    config.onBefore(config);
  }

  if (window.threathunterTracker && config.httpRequestParam) {
    Perf.start(`${config.loadingIn}_${config.url}`);
  }
  return config;
}

const HttpService = {
  get(orgConfig) {
    // 请求前准备
    const config = requestPrepare(orgConfig);

    const promise = new Promise((resolve, reject) => {
      http.get(config.url, config.params, config.external)
        .then((data) => {
          // 修改标记
          requestComplete(config, true, data);
          // 请求成功
          resolve(data);
        })
        .catch((e) => {
          // 修改标记
          requestComplete(config, false, e);
          // 失败回调
          reject(e);
        });
    });

    // 请求返回
    promise.then((data) => {
      // 成功回调
      if (config.onSuccess) {
        config.onSuccess(data);
      }
    }, (error) => {
      // 失败回调
      if (config.onError) {
        config.onError(error);
        Raven.captureException(error);
      }
    });

    return promise;
  },
  post(orgConfig) {
    // 请求前准备
    const config = requestPrepare(orgConfig);

    const promise = new Promise((resolve, reject) => {
      http.post(config.url, config.params, config.external)
        .then((data) => {
          // 修改标记
          requestComplete(config, true, data);
          // 请求成功
          resolve(data);
        })
        .catch((e) => {
          // 修改标记
          requestComplete(config, false, e);
          // 失败回调
          reject(e);
        });
    });

    // 请求返回
    promise.then((data) => {
      // 成功回调
      if (config.onSuccess) {
        config.onSuccess(data);
      }
    }, (error) => {
      // 失败回调
      if (config.onError) {
        config.onError(error);
        Raven.captureException(error);
      }
    });

    return promise;
  },
  put(orgConfig) {
    // 请求前准备
    const config = requestPrepare(orgConfig);

    const promise = new Promise((resolve, reject) => {
      http.put(config.url, config.params, config.external)
        .then((data) => {
          // 修改标记
          requestComplete(config, true, data);
          // 请求成功
          resolve(data);
        })
        .catch((e) => {
          // 修改标记
          requestComplete(config, false, e);
          // 失败回调
          reject(e);
        });
    });

    // 请求返回
    promise.then((data) => {
      // 成功回调
      if (config.onSuccess) {
        config.onSuccess(data);
      }
    }, (error) => {
      // 失败回调
      if (config.onError) {
        config.onError(error);
        Raven.captureException(error);
      }
    });

    return promise;
  },
  delete(orgConfig) {
    // 请求前准备
    const config = requestPrepare(orgConfig);

    const promise = new Promise((resolve, reject) => {
      http.delete(config.url, config.params, config.external)
        .then((data) => {
          // 修改标记
          requestComplete(config, true, data);
          // 请求成功
          resolve(data);
        })
        .catch((e) => {
          // 修改标记
          requestComplete(config, false, e);
          // 失败回调
          reject(e);
        });
    });

    // 请求返回
    promise.then((data) => {
      // 成功回调
      if (config.onSuccess) {
        config.onSuccess(data);
      }
    }, (error) => {
      // 失败回调
      if (config.onError) {
        config.onError(error);
        Raven.captureException(error);
      }
    });

    return promise;
  },

  // 多个请求合并
  all(promises, config) {
    Promise.all(promises).then((posts) => {
      // 成功回调
      if (config.onSuccess) {
        config.onSuccess(posts);
      }
    }, (errors) => {
      // 失败回调
      if (config.onError) {
        config.onError(errors);
        Raven.captureException(errors);
      }
    }).catch(reason => reason);
  },

  // mockserver专用请求
  mock(org) {
    const orgConfig = org;
    orgConfig.external = true;
    orgConfig.url = `http://172.16.10.243:8080/mockjs/${orgConfig.projectId || 1}/${orgConfig.url}`;
    // 请求前准备
    const config = requestPrepare(orgConfig);

    const params = {};
    Object.keys(config.params).forEach((key) => {
      params[key] = JSON.stringify(config.params[key]);
    });

    fetch(URI(config.url).search(params).valueOf())
      .then((res) => {
        if (res.ok) {
          return res.text();
        }
        throw new Error('请求失败');
      })
      .then((res) => {
        requestComplete(config, true, res);
        if (config.onSuccess) {
          /* eslint no-eval: "off" */
          let data = eval(`(${res})`);
          data = mockjs.mock(data);
          config.onSuccess(data);
        }
      })
      .catch((e) => {
        requestComplete(config, false, e);
        if (config.onError) {
          config.onError(e);
        }
      });
  }
};
export default HttpService;

export const STATS_ONLINE = 'platform/stats/online';
export const STATS_SLOT_MERGE_QUERY = 'platform/stats/slot/mergequery';
export const STATS_SLOT_QUERY = 'platform/stats/slot/query';
export const STATS_SLOT_BASELINE = 'platform/stats/slot_baseline';
export const STATS_OFFLINE_BASELINE = 'platform/stats/offline_baseline';
export const STATS_OFFLINE_SERIAL = 'platform/stats/offline_serial';
export const STATS_METRICS = 'platform/stats/metrics';
export const STATS_GEO = 'platform/stats/geo';
