import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import BChart from 'BChart';

import Dialog from '../../../components/Dialog';
import Toast from '../../../components/Toast';
import Input from '../../../components/Input';


class CareManageDialog extends Component {
  static propTypes = {
    cardDataList: PropTypes.oneOfType([PropTypes.array]).isRequired,
    handleChange: PropTypes.func.isRequired,
    deleteKeywords: PropTypes.func.isRequired,
    fetchFollowKeyword: PropTypes.func.isRequired,
    updateKeywords: PropTypes.func.isRequired,
    careVisible: PropTypes.bool.isRequired,
    addKeyWord: PropTypes.bool.isRequired
  };

  constructor(props) {
    super(props);

    this.state = {
      visible: false,
      msg: '',
      iconType: 'info',
      keywordText: ''
    };
  }

  render() {
    const {
      careVisible,
      cardDataList,
      addKeyWord,
      handleChange,
      deleteKeywords,
      fetchFollowKeyword,
      updateKeywords
    } = this.props;

    const {
      visible,
      msg,
      iconType,
      keywordText
    } = this.state;

    return (
      <Dialog
        className="crawler-manage-dialog"
        visible={careVisible}
        title="关注管理"
        onClose={() => {
          handleChange('careVisible', false);
        }}
      >
        <ul className="crawler-manage-list">
          {
            _.map(cardDataList, (item, key) => (
              <li key={key}>
                <i className="iconfont icon-bars" />
                <span className="keyword-text" title={item.keyword}>{item.keyword}</span>
                <span
                  className="cancel-follow"
                  onClick={() => deleteKeywords([item.keyword], item.keyword_type, (res) => {
                    if (res) {
                      this.setState({
                        msg: '取消关注成功',
                        visible: true,
                        iconType: 'info'
                      });
                      // 重新获取关注列表
                      fetchFollowKeyword({
                        is_followed: true,
                        is_ignored: false,
                        keyword_type: 'page'
                      });
                    } else {
                      this.setState({
                        msg: '取消关注失败',
                        visible: true,
                        iconType: 'warning'
                      });
                    }
                  })}
                  role="presentation"
                >取消关注</span>
              </li>
            ))
          }
        </ul>
        {
          addKeyWord ? (
            <footer className="care-input">
              <Input
                className="input"
                type="text"
                value={keywordText}
                placeholder="请输入关键词(不支持中文）"
                onChange={(keyword) => {
                  let keywordTemp = keyword;
                  if (keywordTemp.length > 255) {
                    keywordTemp = keywordTemp.slice(0, 255);
                  }
                  this.setState({ keywordText: keywordTemp });
                }}
              />
              <span
                className="commit"
                onClick={() => {
                  if (/[\u4E00-\u9FA5]/i.test(this.state.keywordText)) {
                    // 有中文
                    this.setState({
                      msg: '不支持中文',
                      visible: true,
                      iconType: 'warning'
                    });
                    return;
                  }
                  if (_.filter(cardDataList, { keyword: this.state.keywordText }).length > 0) {
                    // 存在关键字
                    this.setState({
                      msg: '此页面已被关注，不能重复关注',
                      visible: true,
                      iconType: 'info'
                    });
                    return;
                  }
                  updateKeywords([{
                    keyword: this.state.keywordText,
                    is_followed: true,
                    is_ignored: false,
                    keyword_type: 'page'
                  }], (res) => {
                    if (res) {
                      this.setState({
                        msg: '添加关注成功',
                        visible: true,
                        iconType: 'info',
                        keywordText: ''
                      });
                      // 重新获取关注列表
                      fetchFollowKeyword({
                        is_followed: true,
                        is_ignored: false,
                        keyword_type: 'page'
                      });
                    } else {
                      this.setState({
                        msg: '添加关注失败',
                        visible: true,
                        iconType: 'warning'
                      });
                    }
                  });
                }}
                role="presentation"
              >
                  确认
                </span>
              <span
                className="cancel"
                onClick={() => {
                  handleChange('addKeyWord', false);
                  this.setState({
                    keywordText: ''
                  });
                }}
                role="presentation"
              >
                  取消
                </span>
            </footer>
          ) : (
            <footer
              className={`care-add-button${cardDataList.length >= 200 ? ' disabled' : ''}`}
              onClick={() => {
                if (cardDataList.length >= 200) {
                  return;
                }
                handleChange('addKeyWord', true);
              }}
              role="presentation"
            >
              <i className="iconfont icon-pluscircleo" />
              <span>添加关注</span>
            </footer>
          )
        }
        <Toast
          visible={visible}
          iconType={iconType}
          onClose={() => this.setState({ visible: false })}
          duration={3000}
        >
          {msg}
        </Toast>
      </Dialog>
    );
  }
}
export default CareManageDialog;
