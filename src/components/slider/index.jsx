import React from 'react';
import PropTypes from 'prop-types';
import RcSlider from 'rc-slider';
import _ from 'lodash';

import './index.scss';

export default class Slider extends React.Component {
  static propTypes = {
    className: PropTypes.string.isRequired,
    max: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
    marks: PropTypes.oneOfType([PropTypes.array]),
    tipFormatter: PropTypes.string,
    onChange: PropTypes.func,
    onAfterChange: PropTypes.func,
    scale: PropTypes.bool,
    disabled: PropTypes.bool
  };
  static defaultProps = {
    prefixCls: 'wd-slider',
    className: '',
    marks: undefined,
    tipFormatter: undefined,
    onChange: undefined,
    onAfterChange: undefined,
    scale: false,
    disabled: false
  };

  static getScaleValue(orgValue) {
    return Math.round((4096000 * orgValue) ** (1 / 3));
  }

  static getOrgValue(afterValue) {
    return Math.round((afterValue ** 3) / 4096000);
  }

  // 修改时回调
  onChange(value) {
    const {
      onChange,
      scale
    } = this.props;

    let orgValue = value;
    if (scale) {
      orgValue = Slider.getOrgValue(value);
    }

    if (onChange) {
      onChange(orgValue);
    }
  }

  // 修改后回调
  onAfterChange(value) {
    const {
      onAfterChange,
      scale
    } = this.props;

    let orgValue = value;
    if (scale) {
      orgValue = Slider.getOrgValue(value);
    }

    if (onAfterChange) {
      onAfterChange(orgValue);
    }
  }

  render() {
    const {
      max,
      scale,
      value,
      onChange,
      onAfterChange,
      className,
      marks,
      disabled,
      tipFormatter,
      ...others
    } = this.props;

    let scaleValue = value;
    if (scale) {
      scaleValue = Slider.getScaleValue(value);
    }

    let scaleMax = max;
    if (scale) {
      scaleMax = Slider.getScaleValue(max);
    }

    // 当前刻度位置
    const curMarkPos = `${(scaleValue / scaleMax) * 100}%`;

    return (
      <div className={`wd-slider-container ${className}`}>
        <div className="mark-container">
          {
            _.map(marks, (orgValue, index) => {
              let scaleMark = orgValue;
              if (scale) {
                scaleMark = Slider.getScaleValue(orgValue);
              }
              const pos = `${(scaleMark / scaleMax) * 100}%`;
              return (<i key={index} className="mark-icon" style={{ left: pos }} />);
            })
          }
        </div>
        <i className={`cur-mark cur-mark-up ${disabled ? 'disabled-mark' : ''}`} style={{ left: curMarkPos }} />
        <i className={`cur-mark cur-mark-down ${disabled ? 'disabled-mark' : ''}`} style={{ left: curMarkPos }} />
        <RcSlider
          max={scaleMax}
          value={scaleValue}
          onChange={v => this.onChange(v)}
          tipFormatter={null}
          onAfterChange={v => this.onAfterChange(v)}
          disabled={disabled}
          {...others}
        />
      </div>
    );
  }
}
