import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import '../InputNumber/index.scss';
import './index.scss';
import CountEditor from './CountEditor';
import GetVariableEditor from './GetVariableEditor';
import SetblacklistEditor from './SetblacklistEditor';
import TimeEditor from './TimeEditor';
import GetLocationEditor from './GetLocationEditor';
import SleepEditor from './SleepEditor';
import SPLEditor from './SPLEditor';

const TIME = 'TIME';
const GETLOCATION = 'GETLOCATION';
const COUNT = 'COUNT';
const GETVARIABLE = 'GETVARIABLE';
const SLEEP = 'SLEEP';
const SPL = 'SPL';
const SETBLACKLIST = 'SETBLACKLIST';
const REMARKS = {
  EVENT: '事件',
  FUNCTION: '条件判断',
  ACTION: '处置措施',
  TIME: '时间范围',
  GETLOCATION: '地理位置',
  COUNT: '条件统计',
  GETVARIABLE: '内置变量',
  SLEEP: '延时判断',
  SPL: '高级规则语言',
  SETBLACKLIST: '添加风险名单'
};

class EditorContent extends Component {
  static propTypes = {
    config: PropTypes.oneOfType([PropTypes.object]),
    item: PropTypes.oneOfType([PropTypes.object]),
    elePos: PropTypes.oneOfType([PropTypes.object]),
    dataList: PropTypes.oneOfType([PropTypes.object]),
    name: PropTypes.oneOfType([PropTypes.array]),
    tags: PropTypes.oneOfType([PropTypes.array]),
    events: PropTypes.oneOfType([PropTypes.array]),
    event: PropTypes.oneOfType([PropTypes.array]),
    onChange: PropTypes.func,
    onChange2: PropTypes.func,
    onCancel: PropTypes.func,
    className: PropTypes.string,
    readOnly: PropTypes.bool
  };
  static defaultProps = {
    tags: undefined,
    events: undefined,
    event: undefined,
    dataList: undefined,
    elePos: undefined,
    item: undefined,
    name: undefined,
    config: undefined,
    onChange: undefined,
    onChange2: undefined,
    onCancel: undefined,
    className: '',
    readOnly: false
  };

  constructor(props) {
    super(props);
    this.state = {
      config: _.cloneDeep(this.props.config)
    };
  }

  componentDidMount() {
    const {
      elePos
    } = this.props;
    // 调整对话框位置
    const ele = document.querySelector('.strategy-editor-mask .editor-container');
    const pos = ele.getBoundingClientRect();
    const left = (elePos.left + (elePos.width / 2)) - (pos.width / 2);
    ele.style.left = `${left}px`;
    let top = elePos.top + 28;
    // 超出屏幕
    if (pos.height + top > window.innerHeight) {
      top = elePos.top - pos.height - 5;
      ele.querySelector('.iconfont').className = 'iconfont icon-caretdown';
    }
    ele.style.top = `${top}px`;

    this.checkDisabled();
  }

  componentDidUpdate() {
    this.checkDisabled();
  }

  onCancel(e) {
    const {
      onCancel,
      config
    } = this.props;

    if (onCancel) {
      onCancel(e);
    }
    this.setState({ config });
  }

  // 获取树形结构选择框内容
  getTreeText(value) {
    if (!(value && value.length > 0)) {
      return '';
    }
    const {
      dataList
    } = this.props;

    let defaultText = '';
    const name1 = dataList[value[0]];
    defaultText += `${REMARKS[value[0]]}/${name1[value[1]].remark}`;
    if (value[2]) {
      defaultText += '/';
      const name2 = dataList[value[0]][value[1]].value;
      defaultText += (name2[value[2]].remark || name2[value[2]].display_name || value[2]);
    }

    return defaultText;
  }

  checkDisabled() {
    let disabled = false;
    if (this.refs.config) {
      _.forEach(
        this.refs.config.refs,
        (v) => {
          if (_.isEmpty(v.props.value)) {
            disabled = true;
          }
        }
      );
    }
    if (this.disabled !== disabled) {
      this.disabled = disabled;
      this.forceUpdate();
    }
  }

  handleChange(config) {
    this.setState({ config });
  }

  handleChange2(tags) {
    this.setState({ tags });
  }

  render() {
    const {
      item,
      tags,
      className,
      name,
      onChange,
      onChange2,
      events,
      event,
      readOnly
    } = this.props;

    const {
      config
    } = this.state;

    const fields = _.map(
      _.get(_.filter(events, { name: event[1] }), '[0].fields', []),
      v => ({ text: v.name, value: v.name })
    );

    const editor = (() => {
      switch (name[1]) {
        case TIME:
          return (
            <TimeEditor
              ref="config"
              name={name}
              config={config}
              fields={fields}
              readOnly={readOnly}
              onChange={v => this.handleChange(v)}
            />
          );
        case GETLOCATION:
          return (
            <GetLocationEditor
              ref="config"
              name={name}
              config={config}
              fields={fields}
              readOnly={readOnly}
              onChange={v => this.handleChange(v)}
            />
          );
        case COUNT:
          return (
            <CountEditor
              ref="config"
              name={name}
              config={config}
              fields={fields}
              readOnly={readOnly}
              onChange={v => this.handleChange(v)}
            />
          );
        case GETVARIABLE:
          return (
            <GetVariableEditor
              ref="config"
              name={name}
              config={config}
              fields={fields}
              readOnly={readOnly}
              onChange={v => this.handleChange(v)}
            />
          );
        case SLEEP:
          return (
            <SleepEditor
              ref="config"
              name={name}
              config={config}
              fields={fields}
              readOnly={readOnly}
              onChange={v => this.handleChange(v)}
            />
          );
        case SPL:
          return (
            <SPLEditor
              ref="config"
              name={name}
              config={config}
              fields={fields}
              readOnly={readOnly}
              onChange={v => this.handleChange(v)}
            />
          );
        case SETBLACKLIST:
          return (
            <SetblacklistEditor
              ref="config"
              item={item}
              name={name}
              config={config}
              tags={tags}
              fields={fields}
              readOnly={readOnly}
              onChange={v => this.handleChange(v)}
              onChange2={v => this.handleChange2(v)}
            />
          );
        default:
          return null;
      }
    })();

    return (
      <div className={`editor-container ${className}`}>
        <i className="iconfont icon-caretup" />
        <div className="editor-title">
          <span className="title-text">{this.getTreeText(name)}</span>
        </div>
        {editor}
        <footer className="editor-footer">
          <button
            className="save main-btn middle-btn"
            disabled={this.disabled}
            onClick={() => {
              let valid = true;

              _.forEach(
                this.refs.config.refs,
                (v) => {
                  if (!v.handleCheck(v.props.value)) {
                    valid = false;
                  }
                }
              );

              if (!valid) {
                return;
              }

              onChange(_.set(_.omit(config, 'error'), 'valid', true));
              // 未修改tags
              let tagsTemp = this.state.tags;
              if (tagsTemp === undefined) {
                tagsTemp = item.tags;
              }
              onChange2(tagsTemp);
            }}
          >确认
          </button>
          <button className="cancel ghost-btn middle-btn" onClick={e => this.onCancel(e)}>取消</button>
        </footer>
      </div>
    );
  }
}

export default EditorContent;
