import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import CheckBox from '../CheckBox';

import './index.scss';

class Tree extends Component {
  static propTypes = {
    treeList: PropTypes.oneOfType([PropTypes.array]).isRequired,
    className: PropTypes.string,
    onChange: PropTypes.func,
    disabled: PropTypes.bool
  };
  static defaultProps = {
    onChange: undefined,
    disabled: false,
    className: ''
  };

  constructor(props) {
    super(props);

    this.state = {
      treeList: this.props.treeList
    };
  }

  // 获取树
  getTreeBody(data) {
    const {
      disabled
    } = this.props;

    return (
      <ul className="tree-container">
        {_.map(data, (v, key) => {
          const item = data[key];
          if (item.children) {
            item.checked = this.isChildrenAllChecked(item.children);
          }
          // 该元素禁用则子元素全部禁用
          if (item.disabled) {
            this.setDisabled(item);
          }

          return (!item.children && item.type === 'label') ?
            // 标签子元素
            (
              <li
                key={key}
                className={`label-item ${item.checked ? 'checked' : ''} ${disabled || item.disabled ? 'disabled' : ''}`}
                onClick={() => (disabled || item.disabled ? '' : this.clickCheckBox(item))}
                role="presentation"
              >
                <span>{item.text}</span>
              </li>
            ) :
            // 标准子元素
            (
              <li key={key}>
                {
                  item.children ?
                    <i
                      className={`iconfont folder ${item.folded ? 'icon-caretright' : 'icon-caretdown'}`}
                      onClick={() => {
                        item.folded = !item.folded;
                        this.forceUpdate();
                      }}
                      role="presentation"
                    /> :
                    <i className="folder" />
                }
                <a
                  className="tree-item"
                  onClick={() => (disabled || item.disabled ? '' : this.clickCheckBox(item))}
                  role="presentation"
                >
                  <span className="item-text">{item.text}</span>

                  <CheckBox checked={item.checked} disabled={disabled || item.disabled} />
                </a>
                {
                  item.children && !item.folded ?
                    this.getTreeBody(item.children, item) :
                    ''
                }
              </li>
            );
        })}
      </ul>
    );
  }

  // 子元素设置禁用
  setDisabled(value) {
    const item = value;
    item.disabled = true;
    if (item.children) {
      // 将子元素设置禁用
      item.children.forEach((child) => {
        this.setDisabled(child);
      });
    }
  }

  // 获取叶子元素集合
  getResult(item, result) {
    item.forEach((value) => {
      if (value.children) {
        this.getResult(value.children, result);
      } else {
        result.push(value);
      }
    });
  }

  // 点击checkbox
  clickCheckBox(item) {
    this.checkChange(item, !item.checked);
    this.forceUpdate();

    if (this.props.onChange) {
      const result = [];
      this.getResult(this.state.treeList, result);
      this.props.onChange(result, this.state.treeList);
    }
  }

  checkChange(value, checked) {
    const item = value;
    item.checked = checked;

    if (item.children) {
      // 将子元素全部勾上，或全部取消
      item.children.forEach((child) => {
        // 禁用则跳过
        if (!child.disabled) {
          this.checkChange(child, checked);
        }
      });
    }
  }

  // 判断子孙元素是否全部选中
  isChildrenAllChecked(item) {
    for (let i = 0; i < item.length; i += 1) {
      const value = item[i];
      if (value.children) {
        // 禁用则跳过判断
        if (value.disabled) {
          return true;
        }
        value.checked = this.isChildrenAllChecked(value.children);
      }

      if (!value.checked) {
        return false;
      }
    }
    return true;
  }

  render() {
    const {
      className
    } = this.props;

    const {
      treeList
    } = this.state;

    const treeBody = this.getTreeBody(treeList);

    return (
      <div className={`wd-tree ${className}`}>
        {treeBody}
      </div>
    );
  }
}

export default Tree;
