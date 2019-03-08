import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import Pagination from 'rc-pagination';

import {
  CATALOG_IP,
  CATALOG_USER,
  CATALOG_DEVICEID
} from '../../../constants/catalogs';
import BTable from '../../../components/BTable';
import SvgIcon from '../../../components/SvgIcon';
import FormSearchInput from '../../../components/FormSearchInput';
import NumberFormat from '../../../components/util/NumberFormat';
import EasyToast from '../../../components/EasyToast';

class PageDataTable extends Component {
  static propTypes = {
    pageData: PropTypes.arrayOf(PropTypes.object).isRequired,
    uri_stem: PropTypes.string.isRequired,
    query: PropTypes.string.isRequired,
    onSearch: PropTypes.func.isRequired,
    handleChange: PropTypes.func.isRequired,
    onDownload: PropTypes.func.isRequired,
    onPageChange: PropTypes.func.isRequired,
    page: PropTypes.number.isRequired,
    page_limit: PropTypes.number.isRequired,
    total: PropTypes.number.isRequired
  };

  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    const {
      pageData,
      uri_stem,
      onSearch,
      onDownload,
      page,
      page_limit,
      total,
      query,
      handleChange
    } = this.props;

    return (
      <div className="account-page-table">
        <h2 className="table-title">
          <span>所选页面</span>
          <span className="selected-url" title={uri_stem}>URL: {uri_stem}</span>
          <div className="download-search">
            <button
              disabled={!pageData || pageData.length === 0}
              className="main-btn middle-btn"
              onClick={() => onDownload()}
            >
              <i className="iconfont icon-upload" />
              导出列表
            </button>
            <FormSearchInput
              className="account-page-search"
              placeholder="search"
              placeholderWidth={55}
              keyword={query}
              onSubmit={() => onSearch()}
              onChange={keyword => handleChange('query', keyword)}
            />
          </div>
        </h2>
        <BTable
          className="page-table"
          data={pageData}
          columns={[{
            title: '风险值',
            dataIndex: 'key',
            key: 'key',
            width: '20%',
            render: (text, record) => (
              <div className="account-text-container">
                <span className="account-text">{text}</span>
                {/* 测试名单 */}
                {record.is_test ? <SvgIcon iconName="cup" /> : null}
                {/* 白名单 */}
                {record.is_white ? <SvgIcon iconName="flag" /> : null}
              </div>
            )
          }, {
            title: '类型',
            dataIndex: 'key_type',
            key: 'key_type',
            width: 80,
            render: (text) => {
              let type = '';
              switch (text) {
                case 'IP':
                  type = CATALOG_IP;
                  break;
                case 'DID':
                  type = CATALOG_DEVICEID;
                  break;
                case 'UID':
                  type = CATALOG_USER;
                  break;
                default:
              }
              return type;
            }
          }, {
            title: '出现时间',
            dataIndex: 'first_time',
            key: 'first_time',
            width: 75
          }, {
            title: '最后时间',
            dataIndex: 'last_time',
            key: 'last_time',
            width: 75
          }, {
            title: '地理位置',
            dataIndex: 'geo_city',
            key: 'geo_city',
            width: '10%'
          }, {
            title: '风险标签',
            dataIndex: 'tags',
            key: 'tags',
            render: (text, record) => (
              _.map(record.tags, (count, key) => (
                <div key={key} className="hit-tags">
                  <span className="tag-text">{key || '无标签'}</span>
                  <span className="tag-num">{NumberFormat(count)}</span>
                </div>
              ))
            )
          }, {
            title: (() => (
              <div>
                贡献占比
                <EasyToast
                  overlayClassName="card-overlay"
                  trigger="hover"
                  placement="bottom"
                  overlay={(
                    <div style={{ width: '140px' }}>所选时间里，IP或DID当前页面的总爬虫请求在页面总爬虫中的占比。</div>
                  )}
                >
                  <i className="iconfont icon-questioncircleo" />
                </EasyToast>
              </div>
            )),
            dataIndex: 'ratio',
            key: 'ratio',
            width: '15%',
            render: text => `${text.toFixed(2)}%`
          }]}
          fixedHeader
          bodyHeight="calc(100% - 41px)"
        />
        <div className="pagination-container">
          <Pagination
            className="ant-pagination"
            current={page}
            pageSize={page_limit}
            total={total}
            onChange={(pageValue) => {
              this.props.onPageChange(pageValue);
            }}
          />
        </div>
      </div>
    );
  }
}
export default PageDataTable;
