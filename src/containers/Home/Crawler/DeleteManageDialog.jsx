import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import BChart from 'BChart';

import Dialog from '../../../components/Dialog';
import Toast from '../../../components/Toast';


class DeleteManageDialog extends Component {
  static propTypes = {
    deleteDataList: PropTypes.oneOfType([PropTypes.array]).isRequired,
    handleChange: PropTypes.func.isRequired,
    updateKeywords: PropTypes.func.isRequired,
    fetchDeleteData: PropTypes.func.isRequired,
    deleteVisible: PropTypes.bool.isRequired
  };

  constructor(props) {
    super(props);

    this.state = {
      visible: false,
      msg: '',
      iconType: 'info'
    };
  }

  render() {
    const {
      deleteVisible,
      deleteDataList,
      handleChange,
      updateKeywords,
      fetchDeleteData
    } = this.props;

    const {
      visible,
      msg,
      iconType
    } = this.state;

    return (
      <Dialog
        className="crawler-manage-dialog"
        visible={deleteVisible}
        title="垃圾箱"
        onClose={() => {
          handleChange('deleteVisible', false);
        }}
      >
        <ul className="crawler-manage-list">
          {
            _.map(deleteDataList, (item, key) => (
              <li key={key}>
                <span className="keyword-text" title={item.keyword}>{item.keyword}</span>
                <span
                  className="recovery"
                  onClick={() => updateKeywords([{
                    keyword: item.keyword,
                    is_ignored: false,
                    keyword_type: 'page'
                  }], (res) => {
                    if (res) {
                      this.setState({
                        msg: '恢复页面成功',
                        visible: true,
                        iconType: 'info'
                      });
                      // 重新获取删除列表
                      fetchDeleteData({
                        is_ignored: true,
                        keyword_type: 'page'
                      });
                    } else {
                      this.setState({
                        msg: '恢复页面失败',
                        visible: true,
                        iconType: 'warning'
                      });
                    }
                  })}
                  role="presentation"
                >恢复</span>
              </li>
            ))
          }
        </ul>
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
export default DeleteManageDialog;
