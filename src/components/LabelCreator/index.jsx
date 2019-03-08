import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';

import './index.scss';


class LabelCreator extends Component {
  static propTypes = {
    onChange: PropTypes.func,
    onSelect: PropTypes.func,
    className: PropTypes.string,
    labelList: PropTypes.oneOfType([PropTypes.array]),
    selectedLabel: PropTypes.oneOfType([PropTypes.array]),
    style: PropTypes.oneOfType([PropTypes.object]),
    disabled: PropTypes.bool
  };
  static defaultProps = {
    labelList: [],
    selectedLabel: [],
    className: '',
    onChange: undefined,
    onSelect: undefined,
    style: undefined,
    disabled: false
  };

  constructor(props) {
    super(props);

    this.state = {
      labelList: this.props.labelList,
      selectedLabel: this.props.selectedLabel,
      labelInputWidth: '10px',
      showInput: false
    };
  }

  // 添加标签
  addLabel(e) {
    if (e.target.label.value.trim() === '') {
      return;
    }

    this.state.labelList.push(e.target.label.value.trim());

    e.target.label.value = '';

    this.setState({
      labelList: this.state.labelList
    });

    if (this.props.onChange) {
      this.props.onChange(this.state.labelList);
    }
  }

  // 显示标签输入栏
  showInput() {
    this.setState({
      showInput: true
    });
  }

  // 选择标签
  selectLabel(item) {
    const {
      selectedLabel
    } = this.state;

    // 禁用
    if (this.props.disabled) {
      return;
    }

    let selectLabelTemp = [];

    if (selectedLabel.indexOf(item) >= 0) {
      selectedLabel.forEach((v) => {
        if (item !== v) {
          selectLabelTemp.push(v);
        }
      });
    } else {
      selectedLabel.push(item);
      selectLabelTemp = selectedLabel;
    }

    this.setState({ selectedLabel: selectLabelTemp });

    if (this.props.onSelect) {
      this.props.onSelect(selectLabelTemp);
    }
  }

  render() {
    const {
      style,
      className,
      disabled
    } = this.props;

    const {
      selectedLabel,
      labelList,
      showInput
    } = this.state;

    return (
      <div className={`label-creator ${className} ${disabled ? 'disabled' : ''}`} style={style}>
        <div className="label-container">
          {
            _.map(labelList, (item, index) => (
              <span
                key={index}
                className={`label-creator-label ${selectedLabel.indexOf(item) >= 0 ? ' active' : ''}`}
                onClick={() => {
                  this.selectLabel(item);
                }}
                role="presentation"
              >{item}</span>
            ))
          }
        </div>
        {
          showInput && !disabled ?
            (
              <form
                className="creator-footer"
                onSubmit={(e) => {
                  e.preventDefault();
                  this.addLabel(e);
                }}
              >
                <input autoComplete="off" name="label" type="text" />
                <button className="create-btn">创建</button>
              </form>
            )
            :
            (
              <div
                className="creator-footer"
                onClick={() => (disabled ? null : this.showInput())}
                role="presentation"
              >
                <div className="creator-container">
                  <i className="iconfont icon-plus" />
                  <span>创建标签</span>
                </div>
              </div>
            )
        }
      </div>
    );
  }
}

export default LabelCreator;
