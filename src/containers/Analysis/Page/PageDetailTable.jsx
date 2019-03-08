import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { CopyToClipboard } from 'react-copy-to-clipboard';

import BTable from '../../../components/BTable';
import EasyToast from '../../../components/EasyToast';
import Notification from '../../../components/Notification';
import './index.scss';

const notification = Notification.getNewInstance();

class PageDetailTable extends Component {
  static propTypes = {
    pageDataList: PropTypes.oneOfType([PropTypes.array]).isRequired,
    total: PropTypes.number.isRequired,
    openFolder: PropTypes.func.isRequired,
    onLoadMore: PropTypes.func.isRequired,
    selectPage: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);

    const tableItemList = [{
      title: '风险事件数',
      dataIndex: 'incidentCount',
      key: 'incidentCount',
      width: 70,
      sorter: (a, b) => a.incidentCount - b.incidentCount
    }, {
      title: '前3IP点击数',
      dataIndex: 'top3IpClick',
      key: 'top3IpClick',
      width: 70,
      sorter: (a, b) => a.top3IpClick - b.top3IpClick
    }, {
      title: 'IP数',
      dataIndex: 'ipCount',
      key: 'ipCount',
      width: 70,
      sorter: (a, b) => a.ipCount - b.ipCount
    }, {
      title: '前3IP点击数%',
      dataIndex: 'top3IpClickPercent',
      key: 'top3IpClickPercent',
      width: 70,
      sorter: (a, b) => a.top3IpClickPercent - b.top3IpClickPercent
    }, {
      title: 'USER数',
      dataIndex: 'userCount',
      key: 'userCount',
      width: 70,
      sorter: (a, b) => a.userCount - b.userCount
    }, {
      title: '前3USER点击数',
      dataIndex: 'top3UserClick',
      key: 'top3UserClick',
      width: 70,
      sorter: (a, b) => a.top3UserClick - b.top3UserClick
    }, {
      title: '前3USER点击数%',
      dataIndex: 'top3UserClickPercent',
      key: 'top3UserClickPercent',
      width: 70,
      sorter: (a, b) => a.top3UserClickPercent - b.top3UserClickPercent
    }, {
      title: 'DID数',
      dataIndex: 'didCount',
      key: 'didCount',
      width: 70,
      sorter: (a, b) => a.didCount - b.didCount
    }, {
      title: '前3DID点击数',
      dataIndex: 'top3DidClick',
      key: 'top3DidClick',
      width: 70,
      sorter: (a, b) => a.top3DidClick - b.top3DidClick
    }, {
      title: '前3DID点击数%',
      dataIndex: 'top3DidClickPercent',
      key: 'top3DidClickPercent',
      width: 70,
      sorter: (a, b) => a.top3DidClickPercent - b.top3DidClickPercent
    }];

    this.state = {
      necessaryColumns: [{
        title: 'PAGE',
        dataIndex: 'uri',
        key: 'uri',
        render: text => (
          <div className="page-text" title={text}>
            <span>{text}</span>
            <div className="page-icon-container">
              <EasyToast trigger="hover" placement="top" overlay="复制路径">
                <CopyToClipboard text={text} onCopy={() => notification.success({ message: '复制成功！' })}>
                  <i
                    className="iconfont icon-copy"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                    }}
                    role="presentation"
                  />
                </CopyToClipboard>
              </EasyToast>
              <EasyToast trigger="hover" placement="top" overlay="查看原路径">
                <i
                  className="iconfont icon-eyeo"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    this.props.openFolder(text);
                  }}
                  role="presentation"
                />
              </EasyToast>
            </div>
          </div>
        )
      }, {
        title: '点击数',
        dataIndex: 'cnt',
        key: 'cnt',
        width: 70,
        sorter: (a, b) => a.cnt - b.cnt
      }],
      tableItemList,
      selectedItem: [
        tableItemList[0],
        tableItemList[1]
      ],
      showItemList: false
    };

    function setItemListShow(e) {
      const itemList = document.querySelector('.b-table-header-column .table-item-list');
      if (itemList && this.state.showItemList) {
        if (e.target.className.indexOf('none') >= 0 ||
          e.target.className.indexOf('icon-setting') >= 0 ||
          e.target.className.indexOf('icon-check') >= 0 ||
          e.target.className.indexOf('table-col-item') >= 0) {
          return;
        }
        this.setState({
          showItemList: false
        });
      }
    }

    document.body.removeEventListener('click', setItemListShow.bind(this));
    document.body.addEventListener('click', setItemListShow.bind(this));
  }

  render() {
    const {
      pageDataList,
      selectPage,
      total,
      onLoadMore
    } = this.props;
    const {
      necessaryColumns,
      tableItemList,
      selectedItem,
      showItemList
    } = this.state;

    const columns = necessaryColumns.concat(selectedItem);
    columns.push({
      title: () => (
        <div>
          <EasyToast trigger="hover" placement="top" overlay="添加列表项">
            <i
              className="iconfont icon-setting"
              onClick={() => {
                this.setState({
                  showItemList: !showItemList
                });
              }}
              role="presentation"
            />
          </EasyToast>
          <ul className={`table-item-list${showItemList ? '' : ' none'}`}>
            {
              _.map(tableItemList, (item, index) => {
                const selected = (_.findIndex(selectedItem, { key: item.key }) >= 0);
                return (
                  <li
                    key={index}
                    className={`table-col-item${selected ? ' active' : ''}`}
                    onClick={() => {
                      if (selected) {
                        _.remove(selectedItem, { key: item.key });
                      } else {
                        selectedItem.push(item);
                      }

                      this.setState({
                        selectedItem
                      });
                    }}
                    role="presentation"
                  >
                    {item.title}
                    {
                      selected ? (
                        <i className="iconfont icon-check" />
                      ) : null
                    }
                  </li>
                );
              })
            }
          </ul>
        </div>
      ),
      width: 40
    });

    return (
      <div className="data-table">
        <BTable
          updateType="all"
          fixedHeader
          className="page-data"
          data={pageDataList}
          columns={columns}
          onRowClick={item => selectPage(item.uri)}
          totalDataLength={total > 200 ? 200 : total}
          onLoadMore={callback => onLoadMore(callback)}
        />
      </div>
    );
  }
}

export default PageDetailTable;
