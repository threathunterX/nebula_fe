export const SCENE_VISITOR = 'VISITOR';
export const SCENE_ACCOUNT = 'ACCOUNT';
export const SCENE_TRANSACTION = 'TRANSACTION';
export const SCENE_ORDER = 'ORDER';
export const SCENE_MARKETING = 'MARKETING';
export const SCENE_OTHER = 'OTHER';

export const CHECK_TYPE_MAP = {
  IP: 'IP',
  USER: 'USER',
  DeviceID: 'DeviceID',
  OrderID: 'OrderID',
  'USER(GetFromChannel)': 'USER(register_channel)'
};
export const DECISION_MAP = {
  拒绝: 'reject',
  审核: 'review',
  通过: 'accept'
};
export const TIME_UNIT_SECOND = 1;
export const TIME_UNIT_MINUTE = 60;
export const TIME_UNIT_HOUR = 3600;
export const TIME_UNIT_MAP = {
  小时: TIME_UNIT_HOUR,
  分钟: TIME_UNIT_MINUTE,
  秒: TIME_UNIT_SECOND
};
export const URI_TAGS = 'nebula/tags';
