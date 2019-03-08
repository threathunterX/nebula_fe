import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './index.scss';


class List extends Component {
  static propTypes = {
    onClick: PropTypes.func,
    className: PropTypes.string,
    text: PropTypes.string,
    children: PropTypes.oneOfType([PropTypes.any]),
    defaultFolded: PropTypes.bool
  };
  static defaultProps = {
    className: '',
    text: '',
    children: undefined,
    onClick: undefined,
    defaultFolded: false
  };

  constructor(props) {
    super(props);

    this.state = {
      showChildren: !this.props.defaultFolded
    };
  }

  // 点击列表
  onClick(e) {
    this.setState({
      showChildren: !this.state.showChildren
    });

    if (this.props.onClick) {
      this.props.onClick(e);
    }
  }

  render() {
    const {
      children,
      className,
      text
    } = this.props;

    return (
      <div className={'wd-list-container'}>
        <div
          className={`list-content ${(className) + (children ? ' pointer' : '')}`}
          onClick={(e) => {
            this.onClick(e);
          }}
          role="presentation"
        >
          <span className="list-text">{text}</span>
          {children ? (<i className={`iconfont icon-${this.state.showChildren ? 'caretup' : 'caretdown'}`} />) : ''}
        </div>
        {children ? (<div className={`list-children ${this.state.showChildren ? '' : 'none'}`}>{children}</div>) : ''}
      </div>
    );
  }
}

export default List;
