import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';

import './index.scss';


class LabelInput extends Component {
  static propTypes = {
    onChange: PropTypes.func,
    onSelect: PropTypes.func,
    className: PropTypes.string,
    labelClass: PropTypes.string,
    errorText: PropTypes.string,
    placeholder: PropTypes.string,
    labelList: PropTypes.oneOfType([PropTypes.array]),
    style: PropTypes.oneOfType([PropTypes.object]),
    disabled: PropTypes.bool,
    isError: PropTypes.bool
  };
  static defaultProps = {
    labelList: [],
    className: '',
    labelClass: '',
    errorText: '',
    placeholder: '添加标签',
    onChange: undefined,
    onSelect: undefined,
    style: undefined,
    disabled: false,
    isError: false
  };

  // 聚焦输入框
  static focusInput(e) {
    if (e.target.querySelector('input')) {
      e.target.querySelector('input').focus();
    }
  }

  constructor(props) {
    super(props);

    this.state = {
      defaultLabelList: this.props.labelList,
      labelList: this.props.labelList,
      labelInputWidth: '10px'
    };
  }

  // 点击选项
  onItemSelect(e, item) {
    if (this.props.onSelect) {
      this.props.onSelect(e, item);
    }
  }

  changeText(e) {
    let width = 10;
    if (e.target.value !== undefined && e.target.value !== '') {
      const textTemp = document.createElement('span');
      textTemp.innerHTML = e.target.value.replace(/ /g, '&nbsp;');
      document.body.appendChild(textTemp);
      width = textTemp.offsetWidth;
      textTemp.remove();
    }

    this.setState({
      labelInputWidth: `${width}px`
    });
  }

  // 添加标签
  addLabel(e) {
    if (e.target.label.value.trim() === '') {
      return;
    }

    const curLabel = e.target.label.value.trim();

    this.state.labelList.push(curLabel);

    e.target.label.value = '';

    this.changeText({ target: '' });

    this.setState({
      labelList: this.state.labelList
    });

    if (this.props.onChange) {
      this.props.onChange(this.state.labelList, curLabel);
    }
  }

  // 删除标签
  delLabel(e, index) {
    const labelList = [];

    this.state.labelList.forEach((v, i) => {
      if (i !== index) {
        labelList.push(v);
      }
    });

    this.setState({
      labelList
    });

    if (this.props.onChange) {
      this.props.onChange(labelList);
    }
  }

  render() {
    const {
      style,
      className,
      labelClass,
      labelList,
      isError,
      errorText,
      placeholder,
      disabled
    } = this.props;

    let newLabelList = this.state.labelList;

    if (labelList !== this.state.defaultLabelList) {
      newLabelList = labelList;
      this.state.defaultLabelList = newLabelList;
      this.state.labelList = newLabelList;
    }

    return (
      <div
        className={`label-input ${disabled ? 'disabled' : ''} ${className} ${this.state.focusInput ? '' : ''} ${isError ? 'error-border' : ''}`}
        style={style}
        onClick={e => (disabled ? null : LabelInput.focusInput(e))}
        role="presentation"
      >
        {
          _.map(newLabelList, (item, index) => (
            <div key={index} className={`label-container ${labelClass || ''}`}>
              <span>{item}</span>
              <i
                className="iconfont icon-cross"
                onClick={e => (disabled ? null : this.delLabel(e, index))}
                role="presentation"
              />
            </div>
          ))
        }

        <form onSubmit={(e) => {
          e.preventDefault();
          this.addLabel(e);
        }}
        >
          <input
            style={{ width: (this.state.labelList.length > 0 ? this.state.labelInputWidth : '100%') }}
            disabled={disabled}
            className={labelClass}
            autoComplete="off"
            name="label"
            type="text"
            onChange={(e) => {
              this.changeText(e);
            }}
            placeholder={this.state.labelList.length > 0 ? '' : (placeholder)}
          />
        </form>
        {isError ? (<div className="prompt">{`＊${errorText}`}</div>) : ''}
      </div>
    );
  }
}

export default LabelInput;
