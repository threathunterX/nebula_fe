var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

(function () {
  // 保存本地缓存
  function setLocalStorageCache(key, value) {
    var localStorage = window.localStorage;
    // 转为json后存入缓存
    var saveValue = JSON.stringify(value);
    localStorage.setItem(key, saveValue);
    // 返回json字符串
    return saveValue;
  }

  // 获取本地缓存值
  function getLocalStorageCache(key) {
    var localStorage = window.localStorage;

    var valueJson = localStorage.getItem(key);
    // 获取不到缓存值
    if (valueJson === undefined || valueJson === null) {
      return null;
    }
    return JSON.parse(valueJson);
  }

  // 删除本地缓存
  function removeLocalStorageCache(key) {
    var localStorage = window.localStorage;

    localStorage.removeItem(key);
  }

  // 参数格式化
  function dealResponse(data) {
    try {
      return JSON.parse(data);
    } catch (e) {
      return {};
    }
  }

  // ajax回调函数
  function ajaxCallBack(xmlhttp, config) {
    if (xmlhttp.status === 200) {
      // 处理返回数据
      var data = dealResponse(xmlhttp.responseText);

      if (config.onSuccess) {
        config.onSuccess(data);
      }
    } else if (config.onError) {
      config.onError();
    }
  }

  // 参数格式化
  function prepareParams(params) {
    var str = '';
    // 非对象则不传参数
    if (!params || (typeof params === 'undefined' ? 'undefined' : _typeof(params)) !== 'object') {
      return '';
    }
    Object.assign(params).forEach(function (key) {
      str += key + '=' + params[key] + '&';
    });
    str = str.substr(0, str.length - 1);

    return str;
  }

  // ajax方法
  function ajax(config) {
    var xmlhttp = void 0;
    if (window.XMLHttpRequest) {
      // code for IE7+, Firefox, Chrome, Opera, Safari
      xmlhttp = new XMLHttpRequest();
    } else {
      // code for IE6, IE5
      xmlhttp = new ActiveXObject('Microsoft.XMLHTTP');
    }

    var method = config.method ? config.method : 'GET';
    method = method.toUpperCase();

    var async = config.async === undefined ? true : config.async;

    // 格式化参数
    var paramStr = prepareParams(config.params);

    var url = paramStr && method === 'GET' ? config.url + '?' + paramStr : config.url;
    xmlhttp.open(method, url, async);

    if (method === 'GET') {
      xmlhttp.send();
    } else {
      xmlhttp.send(JSON.stringify(config.params));
    }

    // 异步同步处理
    if (async) {
      // 回调
      xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState === 4) {
          ajaxCallBack(xmlhttp, config);
        }
      };
    } else {
      ajaxCallBack(xmlhttp, config);
    }
  }

  // 发送Tracker信息
  function sendData(trackerData) {
    ajax({
      method: 'post',
      url: 'http://40.125.201.98/trackerInfo',
      params: trackerData,
      onSuccess: function onSuccess() {
        removeLocalStorageCache('trackerLog');
      },
      onError: function onError() {
        removeLocalStorageCache('trackerLog');
      }
    });
  }

  // 设置Tracker
  function setData(config) {
    var username = config.username,
        appID = config.appID,
        module = config.module,
        level = config.level,
        message = config.message;


    var trackerData = getLocalStorageCache('trackerLog');
    if (!trackerData) {
      trackerData = [{
        time: new Date().getTime(),
        username: username,
        appID: appID,
        module: module,
        level: level,
        message: message,
        count: 1
      }];
    } else {
      var i = void 0;
      for (i = 0; i < trackerData.length; i += 1) {
        var item = trackerData[i];
        // 根据user module level 三个条件来聚合
        if (item.username === username && item.module === module && item.level === level) {
          if (item.message.indexOf(message) < 0) {
            item.message += ' | ' + message;
          }
          item.count += 1;
          break;
        }
      }
      // 循环完毕 无累加数据
      if (i === trackerData.length) {
        trackerData.push({
          time: new Date().getTime(),
          username: username,
          appID: appID,
          module: module,
          level: level,
          message: message,
          count: 1
        });
      }
    }

    // 获取存入的tracker信息
    var trackerDataStr = setLocalStorageCache('trackerLog', trackerData);

    // 信息大于5K，则直接发送
    if (trackerDataStr.length > 5 * 1024) {
      sendData(trackerData);
    }
  }

  // nebula connect请求
  function setConnectData(config) {
    var version = config.version,
        username = config.username,
        requestIn = config.requestIn,
        level = config.level,
        message = config.message;


    switch (requestIn) {
      case 'Home':
        setData({
          version: version,
          username: username,
          appID: 'Dashboard',
          module: 11,
          level: level,
          message: message
        });
        break;
      default:
        break;
    }
  }

  window.threathunterTracker = {
    setData: setData,
    setConnectData: setConnectData
  };

  // 每分钟请求一次
  setInterval(function () {
    var trackerData = getLocalStorageCache('trackerLog');
    if (trackerData) {
      sendData(trackerData);
    }
  }, 60000);

  // 初始化清除缓存
  removeLocalStorageCache('trackerLog');
})();
