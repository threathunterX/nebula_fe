import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';

import './index.scss';

class TabSelector extends Component {
  static propTypes = {
    selectIndex: PropTypes.number.isRequired,
    items: PropTypes.oneOfType([PropTypes.array]),
    className: PropTypes.string,
    onSelect: PropTypes.func,
    onRemove: PropTypes.func,
    onAppend: PropTypes.func
  };
  static defaultProps = {
    items: undefined,
    onSelect: undefined,
    onRemove: undefined,
    onAppend: undefined,
    className: ''
  };

  // 点击页签
  onClick(index) {
    let tabItem;
    if (this.props.items) {
      tabItem = this.props.items[index];
      tabItem.index = index;
    }

    if (this.props.onSelect) {
      this.props.onSelect(tabItem);
    }
  }

  // 关闭页签
  onClose(event, index) {
    event.stopPropagation();

    if (this.props.onRemove) {
      this.props.onRemove(index);
    }
  }

  // 添加页签
  addItem() {
    if (this.props.onAppend) {
      this.props.onAppend();
    }
  }

  render() {
    const {
      className,
      selectIndex,
      items
    } = this.props;

    return (
      <div className={`tab-selector ${className}`}>
        {_.map(items, (item, index) => {
          let active = '';
          if (index === selectIndex) {
            active = ' active';
          }

          return (
            <div
              key={index}
              className={`tab-item ${active || ''}`}
              onClick={() => {
                this.onClick(index);
              }}
              role="presentation"
            >
              <span title={item.text} className="tab-text">{item.text}</span>
              <i
                className="iconfont icon-cross"
                onClick={(e) => {
                  this.onClose(e, index);
                }}
                role="presentation"
              />
            </div>
          );
        })}
        <div
          className="add-item"
          onClick={() => {
            this.addItem();
          }}
          role="presentation"
        >
          <i className="iconfont icon-pluscircleo" />
        </div>
      </div>
    );
  }
}

export default TabSelector;
