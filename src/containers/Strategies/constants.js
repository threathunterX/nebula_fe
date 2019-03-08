export const CATEGORY_VISITOR = 'VISITOR';
export const CATEGORY_ACCOUNT = 'ACCOUNT';
export const CATEGORY_TRANSACTION = 'TRANSACTION';
export const CATEGORY_ORDER = 'ORDER';
export const CATEGORY_MARKETING = 'MARKETING';
export const CATEGORY_OTHER = 'OTHER';

export const STATUS_INEDIT = 'inedit';
export const STATUS_TEST = 'test';
export const STATUS_ONLINE = 'online';
export const STATUS_OUTLINE = 'outline';

export const DEFAULT_STRATEGY = {
  app: 'nebula',
  tags: [],
  category: CATEGORY_VISITOR,
  createtime: 0,
  endeffect: 0,
  modifytime: 0,
  name: '',
  remark: '',
  starteffect: 0,
  status: STATUS_INEDIT,
  terms: [
    {
      remark: '',
      op: '',
      left: {
        subtype: '',
        config: {
          event: ['nebula', '']
        },
        type: ''
      }
    },
    {
      remark: '',
      op: '',
      left: {
        subtype: 'setblacklist',
        config: {
          checkpoints: '',
          checktype: '',
          checkvalue: '',
          decision: '',
          name: '',
          remark: '',
          ttl: 0
        },
        type: 'func'
      }
    }
  ]
};
