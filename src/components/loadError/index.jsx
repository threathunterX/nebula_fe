import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import './index.scss';

class LoadError extends PureComponent {
  static propTypes = {
    refresh: PropTypes.func,
    text: PropTypes.string,
    refreshText: PropTypes.string
  };
  static defaultProps = {
    refreshText: '重新加载',
    text: '抱歉！加载失败，请',
    refresh: undefined
  };

  render() {
    const {
      refresh,
      text,
      refreshText
    } = this.props;

    return (
      <div className="loading-error">
        <div>
          <i className="iconfont icon-crosscircle loading-error-icon" />
          <div style={{ display: 'inline-block' }}>
            {text}
            <span onClick={refresh} role="presentation">{refreshText}</span>
          </div>
        </div>
      </div>
    );
  }
}

export default LoadError;
