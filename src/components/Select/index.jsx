import React, { Component } from 'react';
import PropTypes from 'prop-types';
import RcSelect, { Option } from 'rc-select';
import _ from 'lodash';

import './index.scss';


class Select extends Component {
  static propTypes = {
    dataList: PropTypes.oneOfType([PropTypes.array]).isRequired,
    onChange: PropTypes.func,
    defaultValue: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
    value: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
    type: PropTypes.string,
    optionLabelProp: PropTypes.string,
    optionFilterProp: PropTypes.string,
    animation: PropTypes.string,
    className: PropTypes.string
  };
  static defaultProps = {
    type: 'single',
    className: '',
    optionLabelProp: '',
    optionFilterProp: '',
    animation: '',
    defaultValue: undefined,
    value: undefined,
    onChange: undefined
  };

  constructor(props) {
    super(props);

    const {
      type,
      defaultValue
    } = this.props;

    let text;

    if (type === 'multiple') {
      text = [];
      if (defaultValue) {
        defaultValue.forEach((item) => {
          text.push(`${item.text}`);
        });
      }
    } else {
      text = _.get(defaultValue, 'text');
    }

    this.state = {
      value: text
    };
  }


  onChange(value) {
    this.setState({
      value
    });

    if (this.props.onChange) {
      this.props.onChange(value);
    }
  }

  // 输入选择框
  onInputChange(e) {
    let value;
    if (e && e.target) {
      value = e.target.value;
    } else {
      value = e;
    }

    this.setState({
      value
    });

    if (this.props.onChange) {
      this.props.onChange(value);
    }
  }

  // 多选
  getMultipleSelect() {
    const {
      className,
      onChange,
      value,
      optionLabelProp,
      optionFilterProp,
      animation,
      defaultValue,
      ...other
    } = this.props;

    let stateValue = this.state.value;
    if (value !== undefined) {
      stateValue = [];
      value.forEach((item) => {
        stateValue.push(`${item.text}`);
      });
    }

    const {
      children
    } = this.state;

    return (
      <RcSelect
        className={className}
        onChange={v => this.onChange(v)}
        value={stateValue}
        optionLabelProp="children"
        optionFilterProp="children"
        multiple
        animation="side-up"
        {...other}
      >{children}</RcSelect>
    );
  }

  // 输入框
  getInputSelect() {
    const {
      className,
      onChange,
      value,
      optionLabelProp,
      optionFilterProp,
      animation,
      defaultValue,
      ...other
    } = this.props;

    const {
      children
    } = this.state;

    let stateValue = this.state.value;
    if (value !== undefined) {
      stateValue = value.text;
    }

    return (
      <RcSelect
        className={className}
        onChange={e => this.onInputChange(e)}
        value={stateValue}
        optionLabelProp="children"
        optionFilterProp="text"
        animation="side-up"
        {...other}
      >{children}</RcSelect>
    );
  }

  render() {
    const {
      type,
      dataList
    } = this.props;

    const children = [];
    dataList.forEach((item) => {
      if (type === 'multiple') {
        children.push(<Option key={item.value}>{item.text}</Option>);
      } else {
        children.push(
          <Option key={item.value} value={item.value} text={item.text}>{item.text}</Option>
        );
      }
    });
    this.state.children = children;

    let select;
    if (type === 'multiple') {
      select = this.getMultipleSelect();
    } else {
      select = this.getInputSelect();
    }

    return select;
  }
}

export default Select;
