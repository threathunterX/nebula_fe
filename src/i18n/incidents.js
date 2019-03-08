import {
  FIELD_RISK_SCORE,
  FIELD_START_TIME,
  FIELD_IP,
  FIELD_USERS_COUNT,
  FIELD_MOST_VISITED,
  FIELD_HIT_TAGS,
  FIELD_STRATEGIES
} from '../constants/incidents';

export default {
  [FIELD_RISK_SCORE]: '风险分值',
  [FIELD_START_TIME]: '起始时间',
  [FIELD_IP]: 'IP',
  [FIELD_USERS_COUNT]: '关联用户',
  [FIELD_MOST_VISITED]: '请求最多的地址',
  [FIELD_HIT_TAGS]: '风险标签',
  [FIELD_STRATEGIES]: '命中策略'
};
