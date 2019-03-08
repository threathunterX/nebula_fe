import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './index.scss';

const loadingFailImg = require('../../../resources/imgs/loadfail.png');

class Loading extends Component {
  static propTypes = {
    complete: PropTypes.bool.isRequired,
    loadFail: PropTypes.bool.isRequired,
    hideComplete: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {
      timer: '',
      strokeDash1: '0 1',
      strokeDashOffset1: 0,
      strokeDash2: '0 1',
      strokeDashOffset2: 0,
      strokeDash3: '0 1',
      strokeDashOffset3: 0
    };
  }

  componentDidMount() {
    const circleS1 = 2 * Math.PI * 49;
    const circleS2 = 2 * Math.PI * 44;
    const circleS3 = 2 * Math.PI * 39;

    let len1 = circleS1 / 4;
    let len2 = circleS2 / 4;
    let len3 = circleS3 / 4;

    let offset1 = circleS1 / 3;
    let offset2 = circleS2 / 3;
    let offset3 = circleS3 / 3;

    this.state.timer = setInterval(() => {
      const { complete, hideComplete, loadFail } = this.props;
      offset1 += 3;
      if (offset1 >= circleS1) {
        offset1 = 0;
      }
      offset2 += 4;
      if (offset2 >= circleS2) {
        offset2 = 0;
      }
      offset3 += 5;
      if (offset3 >= circleS3) {
        offset3 = 0;
      }

      // 完成后圆圈闭合
      if (complete) {
        len1 = len1 >= circleS1 ? circleS1 : len1 + 7;
        len2 = len2 >= circleS2 ? circleS2 : len2 + 7;
        len3 = len3 >= circleS3 ? circleS3 : len3 + 7;

        // 完全闭合
        if (len1 === circleS1 && len2 === circleS2 && len3 === circleS3) {
          clearInterval(this.state.timer);

          setTimeout(() => {
            hideComplete();
          }, 1500);
        }
      }
      // 加载失败，清除定时器
      if (loadFail) {
        clearInterval(this.state.timer);
      }

      this.setState({
        strokeDash1: `${len1} ${circleS1 - len1}`,
        strokeDashOffset1: offset1,
        strokeDash2: `${len2} ${circleS2 - len2}`,
        strokeDashOffset2: offset2,
        strokeDash3: `${len3} ${circleS3 - len3}`,
        strokeDashOffset3: offset3
      });
    }, 10);
  }

  render() {
    const {
      strokeDash1,
      strokeDash2,
      strokeDash3,
      strokeDashOffset1,
      strokeDashOffset2,
      strokeDashOffset3
    } = this.state;
    const { complete, loadFail } = this.props;

    return (

      <div className={`report-loading-container ${complete ? 'hide-loading' : ''}`}>
        {
          loadFail ?
            (
              <div className="load-fail">
                <img src={loadingFailImg} alt="loadingFail" />
                <p className="fail-text">报表生成失败</p>
              </div>
            ) :
            (
              <div className="report-loading-icon">
                <svg className="loading-svg">
                  <linearGradient id="loadingGradient" x1="100%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0" className="stop1" />
                    <stop offset="1" className="stop2" />
                  </linearGradient>
                  <g>
                    <circle
                      id="loadingCircle1"
                      cx="50"
                      cy="50"
                      r="49"
                      fill="none"
                      stroke="url(#loadingGradient)"
                      strokeDasharray={strokeDash1}
                      strokeDashoffset={strokeDashOffset1}
                    />
                    <circle
                      id="loadingCircle2"
                      cx="50"
                      cy="50"
                      r="44"
                      fill="none"
                      stroke="url(#loadingGradient)"
                      strokeDasharray={strokeDash2}
                      strokeDashoffset={strokeDashOffset2}
                    />
                    <circle
                      id="loadingCircle3"
                      cx="50"
                      cy="50"
                      r="39"
                      fill="none"
                      stroke="url(#loadingGradient)"
                      strokeDasharray={strokeDash3}
                      strokeDashoffset={strokeDashOffset3}
                    />
                    {
                      complete ? null : <text className="loading-text" x="50" y="50">loading...</text>
                    }
                  </g>
                </svg>
                {
                  complete ? <i className="iconfont icon-check loading-complete" /> : null
                }
              </div>
            )
        }
      </div>
    );
  }
}

export default Loading;
