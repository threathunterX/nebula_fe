import React, { Component } from 'react';
import PropTypes from 'prop-types';
import EasyToast from '../../components/EasyToast';
import PopConfirm from '../../components/PopConfirm';
import BTable from '../../components/BTable';

import TableExpendData from './TableExpendData2';
import Dialog from "../../components/Dialog";
import HttpService from "../../components/HttpService";
import Notification from "../../components/Notification";


const notification = Notification.getNewInstance();
const ACTION_DELETE = 'ACTION_DELETE';
const API_ALERTS_DETAIL = 'nebula/NebulaStrategy';
const appID = 'Strategie';
const httpRequestParam = {
  appID,
  module: 2
};
class ResultTable2 extends Component {
  static propTypes = {
    items: PropTypes.oneOfType([PropTypes.array]).isRequired,
    itemDetail: PropTypes.object.isRequired,
    onSubmit: PropTypes.func.isRequired,
    onChange: PropTypes.func.isRequired,
    onReload: PropTypes.func.isRequired,
    onGetDetail: PropTypes.func.isRequired,
  };
  static defaultProps = {
    xxx: undefined
  };

  constructor(props) {
    super(props);

    const me = this;

    this.state = {
      itemCacheIndex: -1,
      selectedIndex: -1,
      cloneVisible: false,
      remark:'',
      filelds:'',
      name:'',
      columns: [
      {
        title: '策略中文名',
        dataIndex: 'remark',
        key: 'remark',
        width: 200
      }, {
        title: '策略英文名',
        dataIndex: 'name',
        key: 'name',
        width: 255
      },
      {
        title: '操作',
        width: 70,
        render: (key, item, index) => (
          <div>
            <EasyToast trigger="hover" placement="top" overlay="删除脚本">
              <PopConfirm
                trigger="click"
                placement="top"
                overlay="确认删除这条脚本吗?"
                onConfirm={(e, res) => (

                  res &&
                  this.props.onSubmit({
                    key: item.name
                  }, ACTION_DELETE)
                )}
              >
                <i className="iconfont icon-delete" />
              </PopConfirm>
            </EasyToast>
            <EasyToast trigger="hover" placement="top" overlay="查看脚本">
              <i className={`iconfont icon-${index === me.state.selectedIndex ? 'caretup' : 'caretdown'}`} />
            </EasyToast>
            <EasyToast trigger="hover" placement="top" overlay="修改脚本">
              <i
                className="iconfont icon-copy operate-btn"
                onClick={(e) => {
                  this.showClone(e,item);
                }}
              />
            </EasyToast>
          </div>
        )
      }]
    };
  }

  // 策略对话框
  showClone(e,item) {
    e.stopPropagation();

    const params = {"strategy" : item.name};

    HttpService.get({
      httpRequestParam,
      url: API_ALERTS_DETAIL,
      params,
      onSuccess: (data) => {
        this.setState({
          cloneVisible: true,
          remark: item.remark,
          name: item.name,
          filelds: data.py_content
        });
      }
    });
  }

  handChangd(e) {
    this.setState({
      filelds: e.target.value,
    });
  }


  componentDidUpdate(props) {

  }

  render() {
    const {
      items,
      onGetDetail,
      itemDetail
    } = this.props;
    const cloneBtns = [{
      text: '确定',
      onClick: () => {
        // 修改脚本
        this.setState({ isError: false });
        const params ={"py_name" : this.state.name, "py_content":this.state.filelds}

          HttpService.put({
            url: '/nebula/NebulaStrategy',
            params: params,
            onSuccess: (data) => {
              onGetDetail(this.state.name,this.state.name)
              this.setState({ cloneVisible: false });
              notification.success({ message: '修改成功' });
            },
            onError: () => notification.error({ message: '修改失败' })
          });
      }
    }, {
      text: '取消',
      cls: 'cancel-btn',
      onClick: () => {
        this.setState({ cloneVisible: false });
      }
    }];
    return (
      <div className="items-warpper">

        <BTable
          className="risk-table"
          data={items}
          columns={this.state.columns}
          itemDetail={itemDetail}
          fixedHeader
          bodyHeight="calc(100% - 41px)"
          onRowExpand={(index) => {
            if (index === this.state.selectedIndex) {
              this.setState({
                selectedIndex: -1
              });
              return;
            }
            // 缓存中数据不是展开的数据
            if (index !== this.state.itemCacheIndex) {
              onGetDetail(items[index].key, items[index].name);
              this.state.itemCacheIndex = index;
            }
            this.setState({
              selectedIndex: index
            });
          }}
          expandedRow={() => (
            <TableExpendData dataList={itemDetail} />
          )}
        />

        <Dialog
          visible={this.state.cloneVisible}
          className="strategy-clone-dialog"
          destroy
          title="脚本设置"
          buttons={cloneBtns}
          onClose={() => {
            this.setState({ cloneVisible: false });
          }}
        >
          <p>
            <span className="clone-title">
              策略脚本为
              <span className="clone-name">{this.state.remark}</span>
              ，请在下面修改脚本。
            </span>
          </p>
          <textarea className="input" onChange={(e) => this.handChangd(e)} type="text" value={this.state.filelds}/>
        </Dialog>
      </div>
    );
  }
}

export default ResultTable2;
