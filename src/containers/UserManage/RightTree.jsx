import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Tree from '../../components/Tree';

import {
  USER_MANAGE,
  HOME,
  ALERTS,
  RISKS,
  ANALYSIS,
  STRATEGIES,
  SYSTEM_CONFIG,
  GOD_EYE,
  LOGS,
  LOGS_ANALYSIS,
  RELATIONS
} from './constants';

class RightTree extends Component {
  static propTypes = {
    groupTree: PropTypes.oneOfType([PropTypes.array]).isRequired,
    onChange: PropTypes.func,
    privileges: PropTypes.string,
    className: PropTypes.string,
    disabled: PropTypes.bool
  };
  static defaultProps = {
    className: '',
    privileges: '',
    disabled: false,
    onChange: undefined
  };

  constructor(props) {
    super(props);
    this.state = {
      treeData: [{
        text: '所有功能',
        children: [{
          key: USER_MANAGE,
          text: '用户管理'
        }, {
          text: '页面功能',
          children: [{
            type: 'label',
            key: HOME,
            text: '总览'
          }, {
            type: 'label',
            key: ALERTS,
            text: '风险名单管理'
          }, {
            type: 'label',
            key: RISKS,
            text: '风险事件管理'
          }, {
            type: 'label',
            key: ANALYSIS,
            text: '风险分析'
          }, {
            type: 'label',
            key: STRATEGIES,
            text: '策略管理'
          }, {
            type: 'label',
            key: LOGS,
            text: '日志查询'
          }, {
            type: 'label',
            key: LOGS_ANALYSIS,
            text: '日志解析'
          }, {
            type: 'label',
            key: SYSTEM_CONFIG,
            text: '系统配置'
          }, {
            type: 'label',
            key: GOD_EYE,
            text: '监控大屏'
          }, {
            type: 'label',
            key: RELATIONS,
            text: '关系图'
          }]
        }, {
          text: '规则管理',
          children: []
        }]
      }]
    };
  }

  initGroup(privileges) {
    let pages = [];

    if (privileges) {
      pages = privileges.split(',');
    }
    // 选中
    pages.forEach((value) => {
      this.dealPages(this.state.treeData, value);
    });
  }

  dealPages(items, value) {
    for (let i = 0; i < items.length; i += 1) {
      const pageItem = items[i];
      if (pageItem.children) {
        this.dealPages(pageItem.children, value);
      }
      if (pageItem.key === value) {
        pageItem.checked = true;
        break;
      }
    }
  }

  // 清空选中
  clearCheck(items) {
    for (let i = 0; i < items.length; i += 1) {
      const pageItem = items[i];
      if (pageItem.children) {
        this.clearCheck(pageItem.children);
      }
      pageItem.checked = false;
    }
  }

  render() {
    const {
      privileges,
      onChange,
      className,
      disabled,
      groupTree
    } = this.props;

    const {
      treeData
    } = this.state;

    // 清空选中
    this.clearCheck(treeData);

    // 添加规则管理
    if (groupTree) {
      // 未开通策略管理权限则不能配置规则管理
      if (privileges.split(',').indexOf(STRATEGIES) >= 0) {
        treeData[0].children[2].disabled = false;
      } else {
        treeData[0].children[2].disabled = true;
      }
      treeData[0].children[2].children = groupTree;
    }

    this.initGroup(privileges);

    return (
      <Tree
        disabled={disabled}
        className={className}
        treeList={treeData}
        onChange={(param) => {
          if (onChange) {
            onChange(param);
          }
        }}
      />
    );
  }
}

export default RightTree;
