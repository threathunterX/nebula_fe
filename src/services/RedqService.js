import EventEmitter3 from 'eventemitter3';
import _ from 'lodash';

import HttpService from '../components/HttpService';

const EventEmitter = new EventEmitter3();

export const REDQ_STATUS = 'redqStatus';
export const EVENT_REDQ_STATUS_CHANGED = 'redqStatusChanged';
const API_REDQ_AUTH = 'platform/config/redq.auth';
const API_REDQ_INFO = 'http://api.threathunter.cn/redq/v2/query/?';

export function getRedqStatus() {
  return window.localStorage[REDQ_STATUS] === 'true' || false;
}

export function getEventEmitterInstance() {
  return EventEmitter;
}

export function setRedqStatus(value) {
  window.localStorage[REDQ_STATUS] = value;
  EventEmitter.emit(EVENT_REDQ_STATUS_CHANGED, value);
}

function getRedqAuth(maskClass) {
  return new Promise((resolve, reject) => {
    HttpService.get({
      url: API_REDQ_AUTH,
      params: {},
      loadingIn: maskClass,
      onSuccess: (data) => {
        resolve(data.values[0].value);
      },
      onError: error => reject(error)
    });
  });
}
export function getRedqInfo(keyType, key, maskClass) {
  return new Promise((resolve, reject) => {
    if (keyType !== 'ip' && keyType !== 'mobile') {
      reject(`暂不支持${keyType}类型`);
    } else {
      getRedqAuth(maskClass)
        .then((auth) => {
          HttpService.get({
            url: API_REDQ_INFO,
            params: {
              ip: keyType === 'ip' ? key : undefined,
              mobile: keyType === 'mobile' ? key : undefined,
              auth,
              qtype: 'mix',
              readable: 1
            },
            external: true,
            loadingIn: maskClass,
            onSuccess: (resp) => {
              const data = resp.rsp_body;
              let tags = [];
              let redqInfo = {};
              let location = '';

              if (resp.ret_code === 1) {
                tags = _.transform(data[keyType], (result, item) => {
                  if (typeof item === 'object' && item.value) {
                    result.push(item.comment);
                  }
                }, []);

                if (data[keyType].province === data[keyType].city && data[keyType].city) {
                  location = `${data[keyType].city}`;
                } else {
                  location = `${data[keyType].province}.${data[keyType].city}`;
                }
              } else {
                tags.push(resp.ret_desc);
                location = '.';
              }

              redqInfo = {
                score: data.score,
                keyType,
                keyValue: key,
                location,
                tags,
                status: true
              };
              resolve(redqInfo);
            },
            onError: error => reject(error)
          });
        })
        .catch(error => reject(error));
    }
  });
}
