import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';

import './index.scss';

class ContrastButtons extends Component {
  static propTypes = {
    onMainChoose: PropTypes.func.isRequired,
    onRedChoose: PropTypes.func.isRequired,
    onRedMainSwap: PropTypes.func.isRequired,
    btnList: PropTypes.oneOfType([PropTypes.array]).isRequired
  };

  constructor(props) {
    super(props);

    this.state = {
      mainIndex: 0,
      redIndex: 1
    };
  }

  // 选择
  onMainChoose(e, index) {
    if (this.props.onMainChoose) {
      this.props.onMainChoose(e, index);
    }

    this.setState({
      mainIndex: index
    });
  }

  // 选择
  onRedChoose(e, index) {
    if (this.props.onRedChoose) {
      this.props.onRedChoose(e, index);
    }
    this.setState({
      redIndex: index
    });
  }

  // 交换
  onRedMainSwap(red, main) {
    if (this.props.onRedMainSwap) {
      this.props.onRedMainSwap(red, main);
    }
    this.setState({
      redIndex: main,
      mainIndex: red
    });
  }

  render() {
    const {
      btnList
    } = this.props;

    const {
      mainIndex,
      redIndex
    } = this.state;

    return (

      <div className="analysis-contrast-btns">
        <span>对比数据</span>
        {
          _.map(btnList, (item, index) => (
            <div
              key={index}
              className={`button${mainIndex === index ? ' main-btn' : ''}${redIndex === index ? ' red-btn' : ''}${item.text.length > 4 ? ' long-text' : ''}`}
            >
              {item.text}
              <div className="hover-menu">
                <div
                  className="main-item"
                  onClick={(e) => {
                    this.onMainChoose(e, index);
                  }}
                  role="button"
                  tabIndex="0"
                />
                <div
                  className="red-item"
                  onClick={(e) => {
                    this.onRedChoose(e, index);
                  }}
                  role="button"
                  tabIndex="0"
                />
              </div>
            </div>
          ))
        }
        <div
          className="red-main-swap button"
          onClick={() => {
            this.onRedMainSwap(redIndex, mainIndex);
          }}
          role="presentation"
        >
          <i className={mainIndex < redIndex ? 'main-rect' : 'red-rect'} />
          <i className="iconfont icon-retweet" />
          <i className={mainIndex < redIndex ? 'red-rect' : 'main-rect'} />
        </div>
      </div>
    );
  }
}

export default ContrastButtons;

