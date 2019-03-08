import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import StrategyRequiredSelector from '../../components/Strategies/StrategyRequiredSelector';
import StrategyEditor from '../../components/StrategyEditor';
import StrategyRequiredInput from '../../components/Strategies/StrategyRequiredInput';

import './index.scss';

const EVENT = 'EVENT';
const FUNCTION = 'FUNCTION';
const ACTION = 'ACTION';
const TIME = 'TIME';
const GETLOCATION = 'GETLOCATION';
const COUNT = 'COUNT';
const GETVARIABLE = 'GETVARIABLE';
const SLEEP = 'SLEEP';
const SPL = 'SPL';
const SETBLACKLIST = 'SETBLACKLIST';
const REMARKS = {
  [EVENT]: '事件',
  [FUNCTION]: '条件判断',
  [ACTION]: '处置措施',
  [TIME]: '时间范围',
  [GETLOCATION]: '地理位置',
  [COUNT]: '条件统计',
  [GETVARIABLE]: '内置变量',
  [SLEEP]: '延时判断',
  [SPL]: '高级规则语言',
  [SETBLACKLIST]: '添加风险名单'
};

const ACTION_CREATE = 'ACTION_CREATE';

const OP = 'op';
const VALUE = 'right.config.value';
const REMARK = 'remark';
const CONFIG = 'left.config';

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

const opsString = _.map(
  _.pick(ops, [
    EQUAL_TO,
    NOT_EQUAL_TO,
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

const opsNumber = _.map(
  _.pick(ops, [
    GREATER_THAN,
    LESS_THAN,
    GREATER_THAN_OR_EQUAL_TO,
    LESS_THAN_OR_EQUAL_TO,
    EQUAL_TO,
    NOT_EQUAL_TO,
    BETWEEN,
    IN,
    NOT_IN
  ]),
  (value, key) => ({ text: key, value })
);

const opsFunction = _.map(ops, (value, key) => ({ text: key, value }));

class Terms extends Component {
  static propTypes = {
    scene: PropTypes.oneOfType([PropTypes.object]).isRequired,
    events: PropTypes.oneOfType([PropTypes.array]),
    variables: PropTypes.oneOfType([PropTypes.array]),
    terms: PropTypes.oneOfType([PropTypes.array]),
    tags: PropTypes.oneOfType([PropTypes.array]),
    item: PropTypes.oneOfType([PropTypes.object]),
    onChange: PropTypes.func,
    disabled: PropTypes.bool,
    action: PropTypes.string
  };

  static defaultProps = {
    events: undefined,
    terms: undefined,
    tags: undefined,
    item: undefined,
    variables: undefined,
    onChange: undefined,
    disabled: false,
    action: ''
  };

  static contextTypes = {
    router: PropTypes.object.isRequired
  };

  static getCurrentEvent(left) {
    const { type, config, subtype } = left;

    switch (type) {
      case 'event': {
        const { event, field } = config;

        return [EVENT, event[1], field];
      }
      case 'func':
        switch (_.toUpper(subtype)) {
          case TIME:
            return [FUNCTION, TIME];
          case GETLOCATION:
            return [FUNCTION, GETLOCATION];
          case COUNT: {
            const { sourceevent } = config;

            return [FUNCTION, COUNT, sourceevent[1]];
          }
          case GETVARIABLE: {
            const { variable } = config;

            return [FUNCTION, GETVARIABLE, variable[1]];
          }
          case SLEEP:
            return [FUNCTION, SLEEP];
          case SPL:
            return [FUNCTION, SPL];
          case SETBLACKLIST:
            return [ACTION, SETBLACKLIST];
          default:
            return [];
        }
      default:
        return [];
    }
  }

  getOperands(index) {
    const { events, item } = this.props;
    let { variables } = this.props;
    const { terms } = item;
    let result;

    switch (index) {
      case 0:
        result = {
          [EVENT]: {},
          [FUNCTION]: {
            disabled: true
          },
          [ACTION]: {
            disabled: true
          }
        };

        result[EVENT] = _.reduce(
          events, (res, value) => {
            const { fields, name, remark } = value;
            return Object.assign(
              res,
              {
                [name]: {
                  remark,
                  value: _.reduce(fields, (res1, value1) =>
                    Object.assign(res1, { [value1.name]: { remark: value1.remark } }), {})
                }
              }
            );
          }, {});

        return result;
      default: {
        const event = Terms.getCurrentEvent(terms[0].left);
        result = {
          [EVENT]: {},
          [FUNCTION]: {
            [COUNT]: {
              remark: REMARKS[COUNT],
              value: {}
            },
            [TIME]: {
              remark: REMARKS[TIME],
              value: {}
            },
            [GETLOCATION]: {
              remark: REMARKS[GETLOCATION],
              value: {}
            },
            [GETVARIABLE]: {
              remark: REMARKS[GETVARIABLE],
              value: {}
            },
            [SLEEP]: {
              remark: REMARKS[SLEEP],
              value: {}
            },
            [SPL]: {
              remark: REMARKS[SPL],
              value: {}
            }
          },
          [ACTION]: {
            [SETBLACKLIST]: {
              remark: REMARKS[SETBLACKLIST],
              value: {}
            }
          }
        };

        result[EVENT] = _.reduce(events, (res, value) => {
          const { fields, name, remark } = value;
          return Object.assign(
            res,
            {
              [name]: {
                remark,
                value: (name === event[1]
                  ? _.reduce(
                    fields,
                    (res1, value1) =>
                      Object.assign(res1, { [value1.name]: { remark: value1.remark } }), {}
                  ) : { disabled: true })
              }
            }
          );
        }, {});

        result[FUNCTION][COUNT].value =
          _.reduce(
            events,
            (res, value) =>
              Object.assign(
                res,
                { [value.name]: { remark: value.remark, display_name: value.remark } }
              ),
            {}
          );

        variables = _.sortBy(variables, ['name']);

        result[FUNCTION][GETVARIABLE].value = _.reduce(variables, (res, value) =>
          Object.assign(res, {
            [value.name]: {
              display_name: value.display_name
            }
          }), {});

        return result;
      }
    }
  }

  getOperators(event) {
    switch (_.first(event)) {
      case EVENT: {
        const { events } = this.props;
        const fields = _.get(_.filter(events, { name: event[1] }), '[0].fields', []);
        const field = _.filter(fields, { name: event[2] });

        switch (field[0].type) {
          case 'long':
          case 'double':
            return opsNumber;
          default:
            return opsString;
        }
      }
      case FUNCTION:
        return opsFunction;
      default:
        return [];
    }
  }

  removeTerm(index) {
    if (index === 0) {
      return;
    }

    const { terms, onChange } = this.props;

    terms.splice(index, 1);

    onChange('terms', terms);
  }

  upTerm(index) {
    if (index === 0 || index === 1) {
      return;
    }

    const { terms, onChange } = this.props;

    const items = terms.splice(index, 1);
    terms.splice(index - 1, 0, ...items);

    onChange('terms', terms);
  }

  downTerm(index) {
    const { terms, onChange } = this.props;

    if (index === 0 || index === terms.length - 1) {
      return;
    }

    const items = terms.splice(index, 1);
    terms.splice(index + 1, 0, ...items);

    onChange('terms', terms);
  }

  insertTerm(index) {
    const { terms, onChange } = this.props;
    const termsTemp = [];

    terms.forEach((item, i) => {
      termsTemp.push(item);
      if (index === i) {
        termsTemp.push({
          left: {
            subtype: '',
            config: {
              event: ['nebula', '']
            },
            type: ''
          }
        });
      }
    });

    onChange('terms', termsTemp);
  }

  handleChange(value, key, event) {
    const { terms, scene } = this.props;
    const valueTemp = value;
    if (_.get(event, '1') === SETBLACKLIST) {
      valueTemp.name = scene.value;
    }

    this.props.onChange('terms', _.set(terms, key, valueTemp));
  }

  handleChange2(values) {
    this.props.onChange('tags', values);
  }

  handleTermChange(values, index) {
    if (_.isEmpty(values)) {
      return;
    }

    const { terms } = this.props;
    const term = terms[index];

    switch (values[1]) {
      case SETBLACKLIST:
        Object.assign(term, {
          left: {
            subtype: 'setblacklist',
            config: {
              remark: '',
              name: '',
              checktype: '',
              decision: '',
              checkvalue: '',
              checkpoints: '',
              ttl: 0
            },
            type: 'func'
          },
          right: undefined
        });
        break;
      case SPL:
        Object.assign(term, {
          left: {
            subtype: 'spl',
            config: {
              expression: '$'
            },
            type: 'func'
          },
          right: undefined,
          op: undefined,
          remark: undefined
        });
        break;
      case TIME:
        Object.assign(term, {
          left: {
            subtype: 'time',
            config: {
              valid: true,
              start: '00:00',
              end: '00:00'
            },
            type: 'func'
          },
          right: undefined
        });
        break;
      case GETLOCATION:
        Object.assign(term, {
          left: {
            subtype: 'getlocation',
            config: {
              source_event_key: `nebula.${terms[0].left.config.event[1]}.${terms[0].left.config.field}`,
              op: '',
              location_type: '',
              location_string: []
            },
            type: 'func'
          },
          right: undefined
        });
        break;
      case COUNT:
        Object.assign(term, {
          left: {
            subtype: 'count',
            config: {
              algorithm: 'count',
              interval: 300,
              sourceevent: [
                'nebula',
                values[2]
              ],
              trigger: {
                keys: [],
                event: [
                  'nebula',
                  terms[0].left.config.event[1]
                ]
              },
              operand: [],
              groupby: [],
              condition: [
                {
                  left: '',
                  right: '',
                  op: ''
                }
              ]
            },
            type: 'func'
          },
          right: {
            subtype: '',
            config: {
              value: ''
            },
            type: 'constant'
          }
        });
        break;
      case GETVARIABLE:
        Object.assign(term, {
          left: {
            subtype: 'getvariable',
            config: {
              variable: [
                'nebula',
                values[2]
              ],
              trigger: {
                keys: [],
                event: [
                  'nebula',
                  terms[0].left.config.event[1]
                ]
              }
            },
            type: 'func'
          },
          right: {
            subtype: '',
            config: {
              value: ''
            },
            type: 'constant'
          }
        });
        break;
      case SLEEP:
        Object.assign(term, {
          left: {
            subtype: 'sleep',
            config: {
              duration: 0,
              unit: 'm'
            },
            type: 'func'
          },
          right: undefined
        });
        break;
      default:
        Object.assign(term, {
          left: {
            subtype: '',
            config: {
              valid: true,
              field: values[2],
              event: ['nebula', values[1]]
            },
            type: 'event'
          },
          right: {
            subtype: '',
            config: {
              value: ''
            },
            type: 'constant'
          }
        });
        if (index === 0) {
          // terms.splice(1, terms.length - 1);
          _.remove(terms, (o, i) => (
            _.get(o, 'left.subtype') !== 'setblacklist' && i !== 0
          ));
        }
        break;
    }

    this.props.onChange('terms', terms);
  }

  render() {
    const { item, events, tags, disabled, action, terms } = this.props;

    return (
      <div className="strategy-clause">
        <h2>策略条款</h2>
        <section className="clause-form">
          <div className="clause-title">
            <div className="actions">操作</div>
            <div className="event">
              {
                action === ACTION_CREATE ?
                  (
                    <span className="star-icon form-star">*判断</span>
                  ) : null
              }
            </div>
            <div className="edit">
              {
                action === ACTION_CREATE ?
                  (
                    <span className="star-icon form-star" />
                  ) : null
              }
            </div>
            <div className="operator">
              {
                action === ACTION_CREATE ?
                  (
                    <span className="star-icon form-star">*条件</span>
                  ) : null
              }
            </div>
            <div className="value">
              {
                action === ACTION_CREATE ?
                  (
                    <span className="star-icon form-star">*条件值</span>
                  ) : null
              }
            </div>
            <div className="mark">备注</div>
          </div>
          {
            _.map(terms, (term, index) => {
              const { left, right } = term;
              const event = Terms.getCurrentEvent(left);
              const oplist = this.getOperators(event);
              let op;
              let value;
              let remark;

              const key = `${event.join('.')}.${_.get(term, 'op')}.${index}`;

              const dataList = this.getOperands(index);

              const message = _.get(left.config, 'error.ERROR_REQUIRED');

              if (right) {
                op = (
                  <div className="rule-selection">
                    <StrategyRequiredSelector
                      ref={`terms.${index}.op`}
                      disabled={disabled}
                      selectorType="list"
                      className="rule-selector"
                      dataList={oplist}
                      value={_.filter(oplist, { value: term.op })[0]}
                      onChange={selected => this.handleChange(_.get(selected, 'value'), `${index}.${OP}`)}
                      error={_.get(terms, `${index}.error.op`)}
                      onError={(valueTemp, keyTemp) => {
                        this.handleChange('', `${index}.error.op.${keyTemp}`);
                      }}
                      onFocus={() => {
                        this.handleChange(null, `${index}.error.op`);
                      }}
                    />
                  </div>
                );
                value = (
                  <div className="value">
                    <StrategyRequiredInput
                      ref={`terms.${index}.value`}
                      disabled={disabled}
                      type="text"
                      placeholder="请输入"
                      value={right.config.value}
                      onChange={valueTemp => this.handleChange(valueTemp, `${index}.${VALUE}`)}
                      error={_.get(terms, `${index}.error.value`)}
                      onError={(valueTemp, keyTemp) => {
                        this.handleChange('', `${index}.error.value.${keyTemp}`);
                      }}
                      onFocus={() => {
                        this.handleChange(null, `${index}.error.value`);
                      }}
                    />
                  </div>
                );
                remark = (
                  <div>
                    <input
                      disabled={disabled}
                      type="text"
                      placeholder="关于本行条款说明"
                      className="marks-input"
                      defaultValue={term.remark}
                      onBlur={e => this.handleChange(e.target.value, `${index}.${REMARK}`)}
                    />
                  </div>
                );
              }
              return (
                <div key={key} className="clause-content">
                  <div className="edit-container">
                    {
                      disabled
                        ? <i className="iconfont icon-pluscircleo disabled" />
                        :
                        <i
                          className="iconfont icon-pluscircleo"
                          onClick={() => this.insertTerm(index)}
                          role="presentation"
                        />
                    }
                    {
                      (index === 0 || disabled)
                        ? <i className="iconfont icon-crosscircleo disabled" />
                        :
                        <i
                          className="iconfont icon-crosscircleo"
                          onClick={() => this.removeTerm(index)}
                          role="presentation"
                        />
                    }
                    {
                      (index === 0 || index === 1 || disabled)
                        ? <i className="iconfont icon-caretup disabled" />
                        :
                        <i
                          className="iconfont icon-caretup"
                          onClick={() => this.upTerm(index)}
                          role="presentation"
                        />
                    }
                    {
                      (index === 0 || index === (terms.length - 1) || disabled)
                        ? <i className="iconfont icon-caretdown disabled" />
                        :
                        <i
                          className="iconfont icon-caretdown"
                          onClick={() => this.downTerm(index)}
                          role="presentation"
                        />
                    }
                  </div>
                  <div className="content-selection">
                    <StrategyRequiredSelector
                      ref={`terms.${index}.event`}
                      disabled={disabled}
                      selectorType="tree"
                      value={event}
                      error={_.get(terms, `${index}.error.event`)}
                      dataList={dataList}
                      onChange={values => this.handleTermChange(values, index)}
                      onError={(valueTemp, keyTemp) => {
                        this.handleChange('', `${index}.error.event.${keyTemp}`);
                      }}
                      onFocus={() => {
                        this.handleChange(null, `${index}.error.event`);
                      }}
                    />
                  </div>
                  <div className="edit-content">
                    <StrategyEditor
                      className={message && index !== 0 ? 'error-text' : ''}
                      item={item}
                      name={event}
                      tags={tags}
                      config={left.config}
                      dataList={dataList}
                      events={events}
                      event={Terms.getCurrentEvent(terms[0].left)}
                      disabled={index === 0 || event.length === 0 || event[0] === EVENT}
                      onChange={valueTemp => this.handleChange(valueTemp, `${index}.${CONFIG}`, event)}
                      onChange2={values => this.handleChange2(values)}
                      onCancel={() => {
                        this.forceUpdate();
                      }}
                      onClick={() => this.handleChange(null, `${index}.left.config.error`)}
                      readOnly={disabled}
                    >
                      <i className="iconfont icon-edit" />
                      <span>编辑参数</span>
                    </StrategyEditor>
                    {
                      message && index !== 0 ? (
                        <span className="config-error-message">
                          {message}
                        </span>
                      ) : null
                    }
                  </div>
                  {op}
                  {value}
                  {remark}
                </div>
              );
            })
          }
        </section>
      </div>
    );
  }
}

export default Terms;
