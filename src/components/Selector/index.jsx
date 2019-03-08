import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import _ from 'lodash';

import SelectorList from './SelectorList';

import './index.scss';

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

class Selector extends Component {
  static propTypes = {
    children: PropTypes.node,
    overlay: PropTypes.oneOfType([PropTypes.any]),
    value: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
    dataList: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
    selectorType: PropTypes.string,
    selectorClass: PropTypes.string,
    className: PropTypes.string,
    placeholder: PropTypes.string,
    defaultText: PropTypes.string,
    disabled: PropTypes.bool,
    onClick: PropTypes.func,
    onChange: PropTypes.func,
    onFocus: PropTypes.func
  };
  static defaultProps = {
    children: null,
    overlay: null,
    value: undefined,
    dataList: undefined,
    onClick: undefined,
    onChange: undefined,
    onFocus: undefined,
    selectorType: 'list',
    selectorClass: '',
    className: '',
    defaultText: '',
    placeholder: '请选择',
    disabled: false
  };

  constructor(props) {
    super(props);

    const {
      value,
      selectorType
    } = this.props;

    let defaultText = '';

    if (selectorType === 'tree') {
      defaultText = this.getTreeText(value);
    } else {
      const text = (value ? value.text : '');
      defaultText = {
        text,
        title: text
      };
    }

    this.state = {
      showSelector: false,
      selectText: defaultText,
      timestamp: new Date().getTime()
    };
  }

  // 点击选择框
  onClick(e, dataList) {
    const {
      selectorClass,
      disabled
    } = this.props;
    // 禁用
    if (disabled) {
      return;
    }

    let selector;
    if (e.target.className.indexOf('selector ') >= 0) {
      selector = e.target;
    } else {
      selector = e.target.parentElement;
    }

    this.selector = selector;

    // 获取位置
    let ele = document.querySelector(`#selector${this.state.timestamp}`);

    if (!ele) {
      const container = document.createElement('div');
      container.id = `selector${this.state.timestamp}`;
      container.className = `selector-mask ${selectorClass}`;
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

    ReactDOM.render(this.getSelectorList(dataList, selector), ele);

    if (this.props.onClick) {
      this.props.onClick(e);
    }
    if (this.props.onFocus) {
      this.props.onFocus(e);
    }

    this.setState({
      showSelector: true,
      selectText: this.state.selectText,
      selectTitle: this.state.selectTitle
    });
  }

  // 点击选项
  onItemSelect(items) {
    const {
      selectorType
    } = this.props;

    let defaultText = '';
    if (selectorType === 'tree') {
      defaultText = this.getTreeText(items);
    } else {
      const text = (items ? items.text : '');
      defaultText = {
        text,
        title: text
      };
    }

    this.state.selectText = defaultText;

    if (this.props.onChange) {
      this.props.onChange(items);
    }

    this.hidemask();
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
    let title = '';
    const name1 = dataList[value[0]];
    defaultText += `${REMARKS[value[0]]}/${name1[value[1]].remark}`;
    if (value[2]) {
      defaultText += '/';
      const name2 = dataList[value[0]][value[1]].value;
      title = defaultText + (name2[value[2]].remark || name2[value[2]].display_name || value[2]);
      defaultText += (name2[value[2]].display_name || value[2]);
    }

    return {
      text: defaultText,
      title
    };
  }

  // 获取列表
  getSelectorList(dataList, selector) {
    const {
      selectorType,
      overlay,
      children
    } = this.props;

    const ele = selector.getBoundingClientRect();

    const top = ele.top + ele.height + 4;
    const left = ele.left;

    if (selectorType === 'custom') {
      const selectorApi = {
        onClose: this.hidemask.bind(this)
      };

      return (
        <SelectorList
          selectorType={selectorType}
          inputRect={ele}
          ele={selector}
          overlay={overlay}
          selectorApi={selectorApi}
          style={{ top, left }}
        >{children}</SelectorList>
      );
    }

    let width;
    if (selectorType === 'tree') {
      const size = Object.keys(dataList).length;
      width = 222 * size;
    }

    const select = _.get(this.props, 'value.0', Object.keys(dataList)[0]);

    return (
      <SelectorList
        selectorType={selectorType}
        selected={select}
        inputRect={ele}
        ele={selector}
        timestamp={this.state.timestamp}
        onSelect={items => this.onItemSelect(items)}
        dataList={dataList}
        style={{ top, left, width }}
      />
    );
  }

  // 隐藏选择框
  hidemask(e) {
    const mask = document.querySelector(`#selector${this.state.timestamp}`);

    if (e === undefined || e.target.id === `selector${this.state.timestamp}`) {
      this.setState({
        showSelector: false
      });
      mask.style.opacity = 0;
      // 回复颜色
      this.selector.style.backgroundColor = '';
      this.selector.querySelector('input').style.backgroundColor = '';
      setTimeout(() => {
        mask.remove();
      }, 500);
    }
  }

  selector = {};

  render() {
    const {
      placeholder,
      className,
      dataList,
      selectorType,
      defaultText,
      disabled
    } = this.props;

    const {
      selectText
    } = this.state;

    return (
      <div
        className={`selector ${className}${this.state.showSelector ? ' active' : ''}${selectorType === ' tree' || selectorType === ' custom' ? ' tree-selector' : ''}${disabled ? ' disabled' : ''}`}
        onClick={(e) => {
          this.onClick(e, dataList);
        }}
        role="presentation"
      >
        <input
          disabled={disabled}
          className="selector-text"
          readOnly
          title={defaultText || selectText.title}
          placeholder={placeholder}
          value={defaultText || selectText.text}
        />
        <i className={`iconfont ${this.state.showSelector ? 'icon-up' : 'icon-down'}`} />
      </div>
    );
  }
}

export default Selector;
