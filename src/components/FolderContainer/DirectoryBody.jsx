import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';

import NumberFormat from '../../components/util/NumberFormat';

import './index.scss';

class DirectoryBody extends Component {
  static propTypes = {
    folderList: PropTypes.arrayOf(PropTypes.array).isRequired,
    getChildNode: PropTypes.func.isRequired,
    showChildNode: PropTypes.func.isRequired
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
      showChildNode,
      getChildNode
    } = this.props;

    let width = '';
    if (folderList.length <= 2) {
      width = '50%';
    } else if (folderList.length === 3) {
      width = '33.34%';
    }

    return (
      <div className="directory-body">
        {
          _.map(folderList, (folders, colNum) => {
            let split = false;
            return (
              <ul key={colNum} className="folder-list" style={{ width }}>
                {
                  _.map(folders, (folder, index) => {
                    const {
                      name,
                      size,
                      selected,
                      hasChild
                    } = folder;

                    let splitClass = '';
                    if (!split && !hasChild) {
                      splitClass = 'split-line';
                      split = true;
                    }
                    return (
                      <li
                        key={index}
                        className={`${splitClass}${selected ? ' active' : ''}${hasChild ? ' has-child' : ''}`}
                        onClick={() => {
                          if (hasChild) {
                            getChildNode({
                              colNum,
                              index,
                              folder
                            });
                            return;
                          }
                          showChildNode({
                            colNum,
                            index,
                            folder,
                            type: 'node'
                          });
                        }}
                        role="presentation"
                      >
                        <span
                          className="folder-name"
                          title={name}
                        >
                          {name}
                        </span>
                        <div className="path-detail">
                          <span className="size-text">{NumberFormat(size)}</span>
                          {
                            hasChild ? (
                              <i className="iconfont icon-caretright" />
                            ) : <i className="empty-icon" />
                          }
                        </div>
                        {/* {
                          hasChild ? (
                            <i
                              className="iconfont icon-eyeo"
                              onClick={(e) => {
                                e.stopPropagation();
                                getChildNode({
                                  colNum,
                                  index,
                                  folder,
                                  type: 'path'
                                });
                              }}
                              role="presentation"
                            />
                          ) : null
                         } */}
                      </li>
                    );
                  })
                }
              </ul>
            );
          })
        }
      </div>
    );
  }
}

export default DirectoryBody;
