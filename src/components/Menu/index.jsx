import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';

import MenuItems from './MenuItems';

import './index.scss';

class Menu extends Component {
  static propTypes = {
    dataList: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
    menuClass: PropTypes.string,
    className: PropTypes.string,
    menuText: PropTypes.string,
    onSelect: PropTypes.func,
    disabled: PropTypes.bool
  };
  static defaultProps = {
    dataList: undefined,
    onSelect: undefined,
    menuClass: '',
    className: '',
    menuText: '',
    disabled: false
  };

  constructor(props) {
    super(props);

    this.state = {
      showMenu: false,
      timestamp: new Date().getTime()
    };
  }

  // 点击选择框
  onClick(e, dataList) {
    const {
      menuClass
    } = this.props;

    // 获取位置
    let ele = document.querySelector(`#wdMenu${this.state.timestamp}`);

    if (!ele) {
      const container = document.createElement('div');
      container.id = `wdMenu${this.state.timestamp}`;
      container.className = `menu-mask ${menuClass}`;
      container.onclick = this.hidemask.bind(this);
      ele = document.querySelector('body').appendChild(container);
      setTimeout(() => {
        ele.style.opacity = 1;
      }, 0);
    } else {
      ele.style.display = 'block';
      setTimeout(() => {
        ele.style.opacity = 1;
      }, 0);
    }

    ReactDOM.render(this.getMenuItems(dataList, e.currentTarget), ele);

    this.setState({
      showMenu: true
    });
  }

  // 选择
  onItemSelect(item) {
    if (this.props.onSelect) {
      this.props.onSelect(item);
    }

    this.hidemask();
  }

  // 获取列表
  getMenuItems(dataList, menu) {
    const ele = menu.getBoundingClientRect();

    const top = ele.top + ele.height + 2;
    const left = ele.left;
    const width = ele.width;

    return (
      <MenuItems
        disabled={this.props.disabled}
        onSelect={item => this.onItemSelect(item)}
        dataList={dataList}
        style={{ top, left, width }}
      />
    );
  }

  // 隐藏选择框
  hidemask(e) {
    const mask = document.querySelector(`#wdMenu${this.state.timestamp}`);

    if (e === undefined || e.target.id === `wdMenu${this.state.timestamp}`) {
      this.setState({
        showMenu: false
      });
      mask.style.opacity = 0;
      setTimeout(() => {
        mask.remove();
      }, 500);
    }
  }

  render() {
    const {
      className,
      dataList,
      menuText
    } = this.props;

    return (
      <div
        className={`wd-menu ${className}`}
        onClick={(e) => {
          this.onClick(e, dataList);
        }}
        role="presentation"
      >
        <span>{menuText}</span>
        <i className={`iconfont ${this.state.showMenu ? 'icon-caretup' : 'icon-caretdown'}`} />
      </div>
    );
  }
}

export default Menu;
