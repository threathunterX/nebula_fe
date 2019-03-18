/**
 * 
 */
import { connect } from 'react-refetch';
import {
  API_BASE,
  metricsSwitchOn,
  version
} from 'app.config';
import Cookies from 'js-cookie';

import Loading from '../Loading/index';
import Perf from '../util/Perf';

function buildUrl(urlOrg, params) {
  const parts = [];
  let url = urlOrg;

  Object.keys(params).forEach((key) => {
    let v = params[key];

    if (typeof v === 'object') {
      if (v instanceof Array) {
        v.forEach((item) => {
          parts.push(`${key}=${item}`);
        });
        return;
      }
      v = JSON.stringify(v);
    }

    parts.push(`${key}=${v}`);
  });

  if (parts.length > 0) {
    url += ((url.indexOf('?') === -1) ? '?' : '&') + parts.join('&');
  }
  return url;
}

export default function Connect(requestIn) {
  return connect.defaults({
    buildRequest: (mapping) => {
      let body = mapping.body;
      let url = mapping.url;
      const headers = mapping.headers;

      if (body && mapping.method === 'GET') {
        url = buildUrl(url, body);
        body = undefined;
      }

      // 设置遮罩
      if (mapping.loadingIn) {
        headers.loadingIn = mapping.loadingIn;
      }
      headers.perfMark = `${mapping.method}: ${url}`;
      headers.url = `${mapping.method}: ${mapping.url}`;

      const options = {
        url,
        method: mapping.method,
        headers,
        credentials: mapping.credentials,
        redirect: mapping.redirect,
        body
      };

      Perf.start(headers.perfMark);

      return new Request(`${API_BASE}${url}`, options);
    },
    fetch: (input, init) => {
      const req = new Request(input, init);
      const loadingIn = input.headers.get('loadingIn');
      const perfMark = input.headers.get('perfMark');
      const url = input.headers.get('url');
      // 显示遮罩
      if (loadingIn) {
        Loading.showLoading(loadingIn);
      }

      return fetch(req).then((response) => {
        // 隐藏遮罩
        if (loadingIn) {
          Loading.hideLoading(loadingIn);
        }
        const time = Perf.stop(perfMark);

        // 请求成功
        if (response.status < 400) {
          // 请求超时: 大于10秒 写入Tracker
          if (window.threathunterTracker && time > 10000) {
            const username = Cookies.get('username');
            window.threathunterTracker.setConnectData({
              version,
              username,
              requestIn,
              level: 2,
              message: 'timeout'
            });
          }

          if (metricsSwitchOn) {
            console.log(`${perfMark}__________${time}`);
            Perf.writeInflux(url, requestIn, time);
          }
        } else if (window.threathunterTracker) {
          // 无法访问 写入Tracker
          const username = Cookies.get('username');
          window.threathunterTracker.setConnectData({
            version,
            username,
            requestIn,
            level: 4,
            message: 'unreachable'
          });
        }
        return response;
      });
    }
  });
}
