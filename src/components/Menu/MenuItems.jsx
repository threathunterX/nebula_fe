import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';

import './index.scss';


class MenuItems extends Component {
  static propTypes = {
    dataList: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
    style: PropTypes.oneOfType([PropTypes.object]),
    onSelect: PropTypes.func,
    disabled: PropTypes.bool
  };
  static defaultProps = {
    dataList: undefined,
    style: undefined,
    onSelect: undefined,
    disabled: false
  };

  // 选择项目
  onSelectItem(item) {
    if (this.props.onSelect) {
      this.props.onSelect(item);
    }
  }

  render() {
    const {
      dataList,
      style,
      disabled
    } = this.props;

    return (
      <div className={`menu-item-list ${disabled ? ' disabled' : ''}`} style={style}>
        {_.map(dataList, (item, index) => (
          <div
            key={index}
            className="menu-item"
            onClick={() => {
              if (disabled) {
                return;
              }
              this.onSelectItem(item);
            }}
            title={item.text}
            role="presentation"
          >
            {item.text}
          </div>
        ))}
      </div>
    );
  }
}

export default MenuItems;
