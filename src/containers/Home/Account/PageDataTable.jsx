import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import Pagination from 'rc-pagination';

import BTable from '../../../components/BTable';
import SvgIcon from '../../../components/SvgIcon';
import FormSearchInput from '../../../components/FormSearchInput';
import NumberFormat from '../../../components/util/NumberFormat';

class PageDataTable extends Component {
  static propTypes = {
    pageData: PropTypes.arrayOf(PropTypes.object).isRequired,
    uri_stem: PropTypes.string.isRequired,
    onSearch: PropTypes.func.isRequired,
    onDownload: PropTypes.func.isRequired,
    onPageChange: PropTypes.func.isRequired,
    handleChange: PropTypes.func.isRequired,
    page: PropTypes.number.isRequired,
    page_limit: PropTypes.number.isRequired,
    total: PropTypes.number.isRequired
  };

  constructor(props) {
    super(props);

    this.state = {
      keyword: ''
    };
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
              onClick={() => onDownload(this.state.keyword)}
            >
              <i className="iconfont icon-upload" />
              导出列表
            </button>

            <FormSearchInput
              className="account-page-search"
              placeholder="search"
              placeholderWidth={55}
              keyword={this.state.keyword}
              onSubmit={keyword => onSearch(keyword)}
              onChange={(keyword) => {
                this.setState({ keyword });
                handleChange('query', keyword);
              }}
            />
          </div>
        </h2>
        <BTable
          className="page-table"
          data={pageData}
          columns={[{
            title: '账号',
            dataIndex: 'key',
            key: 'key',
            width: 240,
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
            title: '风险分值',
            dataIndex: 'risk_score',
            key: 'risk_score',
            width: 70
          }, {
            title: '出现时间',
            dataIndex: 'first_time',
            key: 'first_time',
            width: 75
          }, {
            title: '最后时间',
            type: 'split',
            dataIndex: 'last_time',
            key: 'last_time',
            width: 75
          }, {
            title: '访问源',
            type: 'child',
            dataIndex: 'source_ip',
            key: 'source_ip',
            width: 120
          }, {
            title: '地理位置',
            type: 'child',
            dataIndex: 'geo_city',
            key: 'geo_city',
            width: '10%'
          }, {
            title: '风险标签',
            type: 'child',
            dataIndex: 'tags',
            key: 'tags',
            render: (text, record, index, childIndex) => (
              _.map(record.dataChildren[childIndex].tags, (count, key) => (
                <div key={key} className="hit-tags">
                  <span className="tag-text">{key || '无标签'}</span>
                  <span className="tag-num">{NumberFormat(count)}</span>
                </div>
              ))
            )
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
              this.props.onPageChange(pageValue, this.state.keyword);
            }}
          />
        </div>
      </div>
    );
  }
}
export default PageDataTable;
