import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { CopyToClipboard } from 'react-copy-to-clipboard';

import DirectoryBody from './DirectoryBody';
import Notification from '../Notification';

import './index.scss';

const notification = Notification.getNewInstance();

class FolderContainer extends Component {
  static propTypes = {
    folderList: PropTypes.arrayOf(PropTypes.array).isRequired,
    title: PropTypes.string.isRequired,
    getChildNode: PropTypes.func.isRequired,
    showChildNode: PropTypes.func.isRequired,
    children: PropTypes.node
  };

  static defaultProps = {
    children: ''
  };

  constructor(props) {
    super(props);
    this.state = {
      keyword: ''
    };
  }

  componentDidMount() {
    // 趋势统计
  }

  render() {
    const {
      folderList,
      title,
      children,
      showChildNode,
      getChildNode
    } = this.props;

    return (
      <div className="wd-folder-container">
        <header title={title}>
          <span className="folder-path">{title}</span>
          <CopyToClipboard text={title} onCopy={() => notification.success({ message: '复制成功！' })}>
            <i className="iconfont icon-copy" />
          </CopyToClipboard>
        </header>
        <div className="folder-body">
          <div className="directory-container">
            <DirectoryBody
              folderList={folderList}
              getChildNode={getChildNode}
              showChildNode={showChildNode}
            />
          </div>
          <div className="open-detail-container">
            {children}
          </div>
        </div>
      </div>
    );
  }
}

export default FolderContainer;
