import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';

import VariableSearchSelect from '../VariableSearchSelect';
import List2 from '../List2';

import './index.scss';

const EVENT = 'EVENT';
const FUNCTION = 'FUNCTION';
const ACTION = 'ACTION';
const GETVARIABLE = 'GETVARIABLE';
const COUNT = 'COUNT';
const REMARKS = {
  [EVENT]: '事件',
  [FUNCTION]: '条件判断',
  [ACTION]: '处置措施',
  [COUNT]: '条件统计',
  [GETVARIABLE]: '内置变量'
};

class SelectorList extends Component {
  static propTypes = {
    selectorType: PropTypes.string.isRequired,
    ele: PropTypes.oneOfType([PropTypes.object]),
    overlay: PropTypes.oneOfType([PropTypes.any]),
    dataList: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
    inputRect: PropTypes.oneOfType([PropTypes.object]),
    selectorApi: PropTypes.oneOfType([PropTypes.object]),
    style: PropTypes.oneOfType([PropTypes.object]),
    selected: PropTypes.string,
    onSelect: PropTypes.func
  };
  static defaultProps = {
    ele: null,
    overlay: null,
    children: null,
    dataList: undefined,
    inputRect: undefined,
    selectorApi: undefined,
    style: undefined,
    onSelect: undefined,
    selected: ''
  };

  constructor(props) {
    super(props);

    this.state = {
      selectedTitle: this.props.selected,
      subTitle: ''
    };
  }

  componentDidMount() {
    const {
      selectorType
    } = this.props;
    if (selectorType === 'custom') {
      // 自定义选择框
      const customSelectorDom = this.customSelector;
      const customSelectorRect = customSelectorDom.getBoundingClientRect();

      const rect = this.props.inputRect;

      if (rect.left + customSelectorRect.width > window.innerWidth) {
        customSelectorDom.style.right = '10px';
        customSelectorDom.style.left = '';
      }

      if (rect.top + customSelectorRect.height + rect.height > window.innerHeight) {
        customSelectorDom.style.bottom = `${window.innerHeight - rect.top}px`;
        customSelectorDom.style.top = '';
      }
    }
  }

  // 选择标题
  onSelectTitle(selectedTitle) {
    this.setState({
      selectedTitle,
      subTitle: ''
    });
  }

  // 点击二级标题
  onSelectSub(subTitle, itemObj) {
    // 没有子项
    if (Object.keys(itemObj).length <= 0) {
      this.props.onSelect([this.state.selectedTitle, subTitle]);
      return;
    }
    this.onEnterLeaveSub(subTitle);
  }

  // 选择或取消二级标题
  onEnterLeaveSub(subTitle) {
    let subTitleTemp = subTitle;
    if (subTitle === this.state.subTitle) {
      subTitleTemp = '';
    }

    this.setState({ subTitle: subTitleTemp });
  }

  // 选择项目
  onSelectItem(item) {
    if (this.props.onSelect) {
      this.props.onSelect([this.state.selectedTitle, this.state.subTitle, item]);
    }
  }

  // 选择项目
  onSelectListItem(item) {
    if (this.props.onSelect) {
      this.props.onSelect(item);
    }
  }

  // 关系型选择栏
  getTreeSelector(dataList, stl) {
    const style = stl;

    const {
      selectedTitle,
      subTitle
    } = this.state;

    const ele = this.props.inputRect;

    if (style.width + ele.left > window.innerWidth) {
      style.right = '10px';
      style.left = '';
    }

    if (!dataList[selectedTitle]) {
      return (<div />);
    }

    const height = 285;

    if (ele.top + ele.height + height > window.innerHeight) {
      style.bottom = window.innerHeight - ele.top;
      style.top = '';
    }

    return (
      <div className="selector-list-multiple multiple" style={style}>
        <div className="selector-tab">
          {
            _.map(dataList, (item, index) => (
              item === 'disabled' ? '' : (
                <div
                  key={index}
                  onClick={() => (item.disabled ? '' : this.onSelectTitle(index))}
                  className={`selector-title ${index === selectedTitle ? 'active' : ''} ${item.disabled ? 'disable-item' : ''}`}
                  role="presentation"
                >
                  {REMARKS[index]}
                </div>
              )
            ))
          }
        </div>
        <ul className="selector-content">
          {
            (() => {
              const items = _.get(dataList, selectedTitle);

              return _.map(
                items,
                (itemObj, key) => {
                  const index = _.indexOf(_.keys(items), key);

                  const item = itemObj.value;

                  return (
                    item === 'disabled' ? '' : (
                      <li
                        key={key}
                        title={key}
                        onClick={() => (item.disabled ? '' : this.onSelectSub(key, item))}
                        className={`item selector-sub ${key === subTitle ? 'active' : ''} ${item.disabled ? 'disable-item' : ''}`}
                        role="presentation"
                      >
                        <span className="title">{itemObj.remark}</span>
                        {
                          selectedTitle === EVENT || key === COUNT || key === GETVARIABLE ? (
                            <i className="iconfont icon-right" />
                          ) : null
                        }
                        {
                          (() => {
                            if (key !== subTitle) {
                              return null;
                            }

                            switch (selectedTitle) {
                              case EVENT:
                                return (
                                  <List2
                                    className="fields"
                                    style={{ left: 221 * ((index + 1) % 3 === 2 ? 2 : 1) }}
                                    items={_.get(_.get(items, subTitle), 'value')}
                                    onChange={value => this.onSelectItem(value)}
                                  />
                                );
                              case FUNCTION:
                                switch (subTitle) {
                                  case COUNT:
                                    return (
                                      <List2
                                        className="counters"
                                        items={_.get(_.get(items, subTitle), 'value')}
                                        onChange={value => this.onSelectItem(value)}
                                      />
                                    );
                                  case GETVARIABLE:
                                    return (
                                      <VariableSearchSelect
                                        items={_.get(_.get(items, subTitle), 'value')}
                                        onChange={value => this.onSelectItem(value)}
                                      />
                                    );
                                  default:
                                    return null;
                                }
                              default:
                                return null;
                            }
                          })()
                        }
                      </li>
                    )
                  );
                }
              );
            })()
          }
        </ul>
      </div>
    );
  }

  // 列表选择栏
  getListSelector(dataList, stl) {
    const style = stl;

    const rect = this.props.inputRect;
    const ele = this.props.ele;

    style.width = rect.width;
    style.top -= 4;

    if (style.width + style.left > window.innerWidth) {
      style.right = '10px';
      style.left = '';
    }

    let height = (dataList.length * 26) + 38;

    height = height > 227 ? 227 : height;

    if (rect.top + rect.height + height > window.innerHeight) {
      style.bottom = window.innerHeight - rect.top;
      style.top = '';
    }

    // 输入框变色
    ele.style.backgroundColor = '#1B1F2A';
    ele.querySelector('input').style.backgroundColor = '#1B1F2A';

    return (
      <div className="selector-list" style={style}>
        {_.map(dataList, (item, index) => (
          <div
            key={index}
            onClick={() => {
              this.onSelectListItem(item);
            }}
            className="selector-list-item"
            title={item.text}
            role="presentation"
          >
            {item.text}
          </div>
        ))}
      </div>
    );
  }

  getCustomSelector(stl) {
    const style = stl;
    const {
      selectorApi
    } = this.props;

    style.top -= 4;
    return (
      <div
        ref={(node) => {
          this.customSelector = node;
        }}
        style={style}
        className="selector-list"
      >
        {this.props.overlay(selectorApi)}
      </div>
    );
  }

  render() {
    const {
      selectorType,
      dataList,
      style
    } = this.props;

    let selector = '';
    if (selectorType === 'tree') {
      selector = this.getTreeSelector(dataList, style);
    } else if (selectorType === 'custom') {
      selector = this.getCustomSelector(style);
    } else {
      selector = this.getListSelector(dataList, style);
    }

    return selector;
  }
}

export default SelectorList;
