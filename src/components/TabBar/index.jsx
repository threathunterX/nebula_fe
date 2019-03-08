import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';

import SvgIcon from '../../components/SvgIcon';

import './index.scss';

class TabBar extends Component {
  static propTypes = {
    tabList: PropTypes.oneOfType([PropTypes.array]),
    className: PropTypes.string,
    selectIndex: PropTypes.number,
    onSelect: PropTypes.func
  };
  static defaultProps = {
    tabList: undefined,
    onSelect: undefined,
    selectIndex: undefined,
    className: ''
  };

  constructor(props) {
    super(props);
    this.state = {
      select: 0
    };
  }

  // 点击页签
  onClick(event, index) {
    // 禁用
    if (this.props.tabList && this.props.tabList[index].disabled) {
      return;
    }

    this.setState({
      select: index
    });

    let tabItem;
    if (this.props.tabList) {
      tabItem = this.props.tabList[index];
      tabItem.tabIndex = index;
    }

    if (this.props.onSelect) {
      this.props.onSelect(event, tabItem);
    }
  }

  render() {
    const {
      className,
      selectIndex,
      tabList
    } = this.props;

    let select2 = selectIndex;
    if (selectIndex === undefined) {
      select2 = this.state.select;
    }

    if (!tabList || tabList.length === 0) {
      return '';
    }

    return (
      <div className={`tab-bar ${className}`}>
        {_.map(tabList, (item, index) => {
          let icon;
          if (item.iconName) {
            icon = (
              <SvgIcon
                className={`tab-bar-svg-icon ${item.iconClass}`}
                iconName={item.iconName}
              />
            );
          } else {
            icon = (
              <i className={`iconfont ${item.iconClass}`} />
            );
          }

          let active = '';
          if (index === select2) {
            active = ' active';
          }

          return (
            <div
              key={index}
              className={`tab-item ${active || ''} ${item.disabled ? 'disabled' : ''}`}
              onClick={(e) => {
                this.onClick(e, index);
              }}
              role="presentation"
            >
              {icon}
              <span className="tab-text">{item.tabText}</span>
            </div>
          );
        })}
      </div>
    );
  }
}

export default TabBar;
