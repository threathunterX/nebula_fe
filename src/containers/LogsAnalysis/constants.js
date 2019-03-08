import _ from 'lodash';

const GREATER_THAN = '大于';
const LESS_THAN = '小于';
const GREATER_THAN_OR_EQUAL_TO = '大于等于';
const LESS_THAN_OR_EQUAL_TO = '小于等于';
const EQUAL_TO = '等于';
const NOT_EQUAL_TO = '不等于';
const BETWEEN = '介于';
const IN = '属于';
const NOT_IN = '不属于';
const CONTAIN = '包含';
const NOT_CONTAIN = '不包含';
const START_WITH = '以..开始';
const NOT_START_WITH = '不以..开始';
const END_WITH = '以..结束';
const NOT_END_WITH = '不以..结束';
const CONTAIN_REGEX = '包含正则';
const NOT_CONTAIN_REGEX = '不包含正则';
const EQUAL_TO_VARIABLE = '等于变量';

const ops = {
  [GREATER_THAN]: '>',
  [LESS_THAN]: '<',
  [GREATER_THAN_OR_EQUAL_TO]: '>=',
  [LESS_THAN_OR_EQUAL_TO]: '<=',
  [EQUAL_TO]: '==',
  [NOT_EQUAL_TO]: '!=',
  [BETWEEN]: 'between',
  [IN]: 'in',
  [NOT_IN]: '!in',
  [CONTAIN]: 'contain',
  [NOT_CONTAIN]: '!contain',
  [START_WITH]: 'startwith',
  [NOT_START_WITH]: '!startwith',
  [END_WITH]: 'endwith',
  [NOT_END_WITH]: '!endwith',
  [CONTAIN_REGEX]: 'regex',
  [NOT_CONTAIN_REGEX]: '!regex',
  [EQUAL_TO_VARIABLE]: '='
};
export const opsString = _.map(
  _.pick(ops, [
    GREATER_THAN,
    LESS_THAN,
    GREATER_THAN_OR_EQUAL_TO,
    LESS_THAN_OR_EQUAL_TO,
    EQUAL_TO,
    NOT_EQUAL_TO,
    BETWEEN,
    IN,
    NOT_IN,
    CONTAIN,
    NOT_CONTAIN,
    START_WITH,
    NOT_START_WITH,
    END_WITH,
    NOT_END_WITH,
    CONTAIN_REGEX,
    NOT_CONTAIN_REGEX
  ]),
  (value, key) => ({ text: key, value })
);

export const opsString2 = [{
  text: '等于',
  value: 'set'
}, {
  text: '等于变量',
  value: 'extract_set'
}, {
  text: '条件值',
  value: 'switch'
}];

export const defaultAnalysisDefault = {
  source: '',
  dest: '',
  terms: {
    when: [
      {
        src_col: '',
        op: '',
        op_string: ''
      }
    ],
    then: [
      {
        src_col: '',
        tar_col: '',
        op: '',
        op_string: ''
      }
    ]
  },
  host: '',
  url: '',
  remark: '',
  status: 0
};

export const defaultSwitchSelector = [
  {
    src_col: '',
    op: '',
    op_string: [
      {
        op: '',
        src_col: '',
        op_string: ''
      }
    ],
    op_value: ''
  },
  {
    op: 'default',
    op_value: ''
  }
];
