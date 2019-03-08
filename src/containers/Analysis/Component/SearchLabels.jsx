import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';

import SvgIcon from '../../../components/SvgIcon';
import { labelMap } from './constant';

import './index.scss';

class SearchLabels extends Component {
  static propTypes = {
    searchLabels: PropTypes.oneOfType([PropTypes.array]).isRequired,
    onChange: PropTypes.func.isRequired
  };

  // 判断是否显示虚线
  static getDragDash(enterIndex, dragIndex, index, key) {
    if ((Number(enterIndex.index) === index && Number(enterIndex.key) === key)
      || (Number(dragIndex.index) === index && Number(dragIndex.key) === key)) {
      return ' drag-dash';
    }
    return '';
  }

  constructor(props) {
    super(props);

    this.state = {
      dragIndex: {
        key: -1,
        index: -1
      },
      enterIndex: {
        key: -1,
        index: -1
      },
      editIndex: {
        key: -1,
        index: -1
      }
    };
  }

  // 开始拖动
  onDragStart(e, key, index) {
    this.setState({
      startPos: { top: e.clientY, left: e.clientX },
      dragIndex: { key, index }
    });
  }

  // 拖动过程
  onDrag(e) {
    const {
      startPos
    } = this.state;

    let {
      enterIndex
    } = this.state;

    // 当前标签
    const curLabel = e.currentTarget.parentElement.parentElement;
    // 当前标签位置信息
    const curLabelPos = curLabel.getBoundingClientRect();
    // top坐标处理
    const top = curLabelPos.top + (curLabelPos.height / 2);

    const labelList = this.labelsContainer.querySelectorAll('.label-connect');

    for (let i = 0; i < labelList.length; i += 1) {
      const label = labelList[i];
      // 排除本元素
      if (label !== curLabel) {
        const labelPos = label.getBoundingClientRect();
        // 在此元素内
        if (
          (
            labelPos.left < curLabelPos.left &&
            labelPos.left + labelPos.width > curLabelPos.left
          ) &&
          (labelPos.top < top && labelPos.top + labelPos.height > top)
        ) {
          enterIndex = label.dataset;
          break;
        } else {
          enterIndex = {
            key: -1,
            index: -1
          };
        }
      }
    }

    this.setState({
      movePos: {
        top: e.clientY - startPos.top,
        left: e.clientX - startPos.left,
        zIndex: 99
      },
      enterIndex
    });
  }

  // 开始拖动
  onDragEnd() {
    let {
      searchLabels
    } = this.props;

    const {
      onChange
    } = this.props;

    const {
      enterIndex,
      dragIndex
    } = this.state;

    // 拖入不同分组的标签
    if (dragIndex.key !== enterIndex.key) {
      const cur = searchLabels[dragIndex.key][dragIndex.index];

      // 合并与分裂
      if (enterIndex.key >= 0 && enterIndex.index >= 0) {
        // 合并
        searchLabels[enterIndex.key].push(cur);
      } else if (enterIndex.key === -1 && enterIndex.index === -1) {
        // 分裂
        searchLabels.push([cur]);
      }

      searchLabels[dragIndex.key][dragIndex.index] = undefined;
      // 去掉空值
      searchLabels[dragIndex.key] = searchLabels[dragIndex.key].filter(x => x);
      // 删除标签后数组为空
      if (searchLabels[dragIndex.key].length <= 0) {
        searchLabels[dragIndex.key] = undefined;
        // 去掉空值
        searchLabels = searchLabels.filter(x => x);
      }

      if (onChange) {
        onChange(searchLabels);
      }
    }

    this.setState({
      movePos: {
        top: 0,
        left: 0
      },
      enterIndex: {
        key: -1,
        index: -1
      },
      dragIndex: {
        key: -1,
        index: -1
      }
    });
  }

  // 修改标签文字
  onLabelTextChange(e, key, index) {
    const {
      searchLabels,
      onChange
    } = this.props;

    if (searchLabels[key][index].right !== e.target.value) {
      searchLabels[key][index].right = e.target.value;

      if (onChange) {
        onChange(searchLabels);
      }
    }

    this.setState({
      editIndex: {
        key: -1,
        index: -1
      }
    });
  }

  // 删除标签
  delLabel(key, index) {
    let {
      searchLabels
    } = this.props;

    const {
      onChange
    } = this.props;

    searchLabels[key][index] = undefined;
    // 去掉空值
    searchLabels[key] = searchLabels[key].filter(x => x);
    // 删除标签后数组为空
    if (searchLabels[key].length <= 0) {
      searchLabels[key] = undefined;
      // 去掉空值
      searchLabels = searchLabels.filter(x => x);
    }

    if (onChange) {
      onChange(searchLabels);
    }
  }

  // 启用或禁用标签
  labelStatus(key, index) {
    const {
      searchLabels,
      onChange
    } = this.props;

    searchLabels[key][index].disabled = !searchLabels[key][index].disabled;

    if (onChange) {
      onChange(searchLabels);
    }
  }

  // 启用编辑
  editLabel(key, index) {
    this.setState({ editIndex: { key, index } }, () => {
      this[`input_${key}_${index}`].focus();
    });
  }

  render() {
    const {
      searchLabels
    } = this.props;

    const {
      movePos,
      dragIndex,
      enterIndex,
      editIndex
    } = this.state;

    return (

      <div ref={node => (this.labelsContainer = node)} className="labels-container">
        {
          _.map(searchLabels, (items, key) => (
            <div key={key} className="search-label">
              {
                _.map(items, (item, index) => (
                  <div
                    key={index}
                    className={`label-connect${SearchLabels.getDragDash(enterIndex, dragIndex, index, key)}${item.disabled ? ' disabled' : ''}`}
                    data-key={key}
                    data-index={index}
                    style={dragIndex.index === index && dragIndex.key === key ? movePos : {}}
                  >
                    <div className="label-text">
                      <span>{_.find(labelMap, { value: item.left }).text}:</span>
                      {
                        editIndex.key === key && editIndex.index === index ? (
                          <input
                            ref={node => (this[`input_${key}_${index}`] = node)}
                            type="text"
                            defaultValue={item.right}
                            onBlur={(e) => {
                              this.onLabelTextChange(e, key, index);
                            }}
                          />
                        ) : (
                          <span>{item.right}</span>
                        )
                      }
                    </div>

                    <div
                      className="tools"
                      style={{ display: editIndex.key === key && editIndex.index === index ? 'none' : '' }}
                    >
                      <i
                        draggable
                        onDragStart={(e) => {
                          this.onDragStart(e, key, index);
                        }}
                        onDrag={(e) => {
                          this.onDrag(e);
                        }}
                        onDragEnd={() => {
                          this.onDragEnd();
                        }}
                      >
                        <SvgIcon iconName="drag" className="label-icon drag-icon" />
                      </i>

                      <div className="split-bar" />
                      <i
                        className={`iconfont ${item.disabled ? 'icon-plussquareo' : 'icon-minussquareo'} label-icon`}
                        onClick={() => {
                          this.labelStatus(key, index);
                        }}
                        role="button"
                        tabIndex="0"
                      />

                      <div className="split-bar" />
                      <i
                        className="iconfont icon-delete label-icon"
                        onClick={() => {
                          this.delLabel(key, index);
                        }}
                        role="button"
                        tabIndex="0"
                      />

                      <div className="split-bar" />
                      <i
                        className="iconfont icon-edit label-icon"
                        onClick={() => {
                          this.editLabel(key, index);
                        }}
                        role="button"
                        tabIndex="0"
                      />
                    </div>
                  </div>
                ))
              }
            </div>
          ))
        }
      </div>
    );
  }
}

export default SearchLabels;
