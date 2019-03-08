/**
 * 创建内容：缓存服务
 * 创建时间：2016年11月29日15:34:57
 *
 * */

const CacheService = (() => {
  const cache = {};
  return {

    // 设置内存缓存
    setMemoryCache(key, value) {
      // 存入时间戳
      cache[key] = {
        timestamp: new Date().getTime(),
        value
      };
    },
    // 获取内存缓存值
    getMemoryCache(key) {
      return cache[key] === undefined ? undefined : cache[key].value;
    },
    // 删除内存缓存
    removeMemoryCache(key) {
      if (key !== undefined) {
        cache[key] = undefined;
      }
    },
    // 获取内存缓存信息
    getMemoryCacheInfo(key) {
      return cache[key];
    },


    // 保存本地缓存
    setLocalStorageCache(key, value) {
      const localStorage = window.localStorage;
      // 转为json后存入缓存
      const saveValue = JSON.stringify({
        timestamp: new Date().getTime(),
        value
      });
      localStorage.setItem(key, saveValue);
    },
    // 获取本地缓存值
    getLocalStorageCache(key) {
      const localStorage = window.localStorage;

      const valueJson = localStorage.getItem(key);
      // 获取不到缓存值
      if (valueJson === undefined || valueJson === null) {
        return null;
      }
      const orgValue = JSON.parse(valueJson);
      return orgValue.value;
    },
    // 删除本地缓存
    removeLocalStorageCache(key) {
      const localStorage = window.localStorage;

      localStorage.removeItem(key);
    },
    // 获取本地缓存信息
    getLocalStorageInfo(key) {
      const localStorage = window.localStorage;

      const valueJson = localStorage.getItem(key);
      // 获取不到缓存值
      if (valueJson === undefined) {
        return undefined;
      }

      return JSON.parse(valueJson);
    }
  };
})();

export default CacheService;

