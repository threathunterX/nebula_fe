import ChangeCase from 'change-case';
import _ from 'lodash';

import HttpService from '../../components/HttpService';

const SETTING_URL = 'platform/config';

function getConfigByPart(configs, data, part) {
  const dataTemp = data;
  configs.forEach((item) => {
    const keys = item.key.split('.');
    if (keys && keys.length >= 2) {
      let key = '';
      if (keys[0] === part && keys[1]) {
        key = ChangeCase.camelCase(keys[1]);
      } else if (`${keys[0]}.${keys[1]}` === part && keys[2]) {
        key = ChangeCase.camelCase(keys[2]);
      }

      if (dataTemp[key]) {
        if (dataTemp[key].array || dataTemp[key].value instanceof Array) {
          dataTemp[key].value = item.value ? item.value.split(',') : [];
        } else if (_.isBoolean(dataTemp[key].value)) {
          dataTemp[key].value = (item.value === '1' || item.value === 'true');
        } else {
          dataTemp[key].value = item.value;
        }
      }
    }
  });

  return dataTemp;
}

function getConfigs(part, dataModel) {
  let resolveData = _.clone(dataModel);
  return new Promise((resolve, reject) => {
    HttpService.get({
      url: SETTING_URL,
      loadingIn: '.config-container',
      params: {},
      onSuccess: (data) => {
        const configs = data.values;
        resolveData = getConfigByPart(configs, resolveData, part);
        resolve(resolveData);
      },
      onError: (error) => {
        reject(error);
      }
    });
  });
}

function transformToKeyValue(configs, prefix) {
  return _.transform(configs, (result, item, key) => {
    let value = item.value;
    if (_.isArray(value)) {
      value = item.value.join(',');
    }
    if (_.isBoolean(value)) {
      value = item.value ? '1' : '0';
    }
    result.push({
      key: `${prefix}.${ChangeCase.snakeCase(key, null, '_')}`, // eg: sendEmail -> send_email
      value
    });
  }, []);
}

function saveConfigs(configs, prefix) {
  return new Promise((resolve, reject) => {
    const sendConfigs = transformToKeyValue(configs, prefix);
    console.log(sendConfigs)
    HttpService.post({
      url: SETTING_URL,
      params: sendConfigs,
      onSuccess: () => {
        resolve('更新成功');
      },
      onError: () => {
        reject('更新失败');
      }
    });
  });
}

const ConfigService = {
  getConfigs,
  saveConfigs
};

export default ConfigService;
