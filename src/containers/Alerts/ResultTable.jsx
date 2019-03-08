import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import _ from 'lodash';
import Pagination from 'rc-pagination';

import SvgIcon from '../../components/SvgIcon';
import EasyToast from '../../components/EasyToast';
import PopConfirm from '../../components/PopConfirm';
import BTable from '../../components/BTable';
import {
  SCENE_VISITOR,
  SCENE_ACCOUNT,
  SCENE_TRANSACTION,
  SCENE_ORDER,
  SCENE_MARKETING,
  SCENE_OTHER
} from '../../constants/scenes';
import {
  DECISION_REJECT,
  DECISION_REVIEW,
  DECISION_ACCEPT
} from '../../constants/decisions';

import {
  CATALOG_IP,
  CATALOG_USER,
  CATALOG_DEVICEID,
  CATALOG_ORDERID
} from '../../constants/catalogs';
import TableExpendData from './TableExpendData';

const ACTION_DELETE = 'ACTION_DELETE';

const scenes = [
  { text: '访客', value: SCENE_VISITOR },
  { text: '帐号', value: SCENE_ACCOUNT },
  { text: '支付', value: SCENE_TRANSACTION },
  { text: '订单', value: SCENE_ORDER },
  { text: '营销', value: SCENE_MARKETING },
  { text: '其它', value: SCENE_OTHER }
];

const decisions = [
  { text: '拒绝', value: DECISION_REJECT },
  { text: '审核', value: DECISION_REVIEW },
  { text: '通过', value: DECISION_ACCEPT }
];

class ResultTable extends Component {
  static propTypes = {
    offset: PropTypes.number.isRequired,
    count: PropTypes.number.isRequired,
    limit: PropTypes.number.isRequired,
    items: PropTypes.oneOfType([PropTypes.array]).isRequired,
    itemDetail: PropTypes.oneOfType([PropTypes.array]).isRequired,
    onSubmit: PropTypes.func.isRequired,
    onChange: PropTypes.func.isRequired,
    onReload: PropTypes.func.isRequired,
    onGetDetail: PropTypes.func.isRequired,
    timestamp: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    xxx: PropTypes.number
  };
  static defaultProps = {
    xxx: undefined
  };

  // 跳转到分析页面
  static toAnalysisPage(item) {
    let type = '';
    switch (item.check_type.toUpperCase()) {
      case CATALOG_IP:
        type = 'ip';
        break;
      case CATALOG_DEVICEID:
        type = 'did';
        break;
      case CATALOG_USER:
        type = 'user';
        break;
      default:
    }
    if (type === '') {
      return;
    }
    // 跳转页面
    window.open(`/#/analysis/${type}/clickStream/${encodeURIComponent(item.key)}?timestamp=${item.timestamp}`);
  }

  constructor(props) {
    super(props);

    const me = this;

    this.state = {
      itemCacheIndex: -1,
      selectedIndex: -1,
      columns: [{
        title: '命中时间',
        dataIndex: 'timestamp',
        key: 'timestamp',
        width: '15%',
        render: text => moment(text).format('YYYY/MM/DD HH:mm:ss')
      }, {
        title: '类型',
        dataIndex: 'check_type',
        key: 'check_type',
        width: 70
      }, {
        title: '风险值',
        dataIndex: 'key',
        key: 'key',
        width: 255,
        render: (text, item) => (
          <div>
            <span
              className={`waring-btn ${item.check_type === CATALOG_ORDERID ? 'show-only' : ''}`}
              onClick={() => {
                ResultTable.toAnalysisPage(item);
              }}
              role="presentation"
            >{item.key}</span>

            {/* 命中次数 */}
            <EasyToast trigger="hover" placement="top" overlay={`所选时间命中${item.count}次`}>
              <button>{item.count}</button>
            </EasyToast>
            {/* 是否有效 */}
            <EasyToast
              trigger="hover"
              placement="top"
              overlay={`过期时间:${(item.expire / item.timestamp === 5) ? '永不过期' : moment(item.expire).format('YYYY.MM.DD HH:mm')}`}
            >
              <button
                className={(item.expire > moment().valueOf()) ? '' : 'invalid'}
              >{(item.expire > moment().valueOf()) ? '有效' : '无效'}</button>
            </EasyToast>
            {/* 测试名单 */}
            {item.test ? <SvgIcon iconName="cup" /> : null}
            {/* 白名单 */}
            {item.key_in_whitelist ? <SvgIcon iconName="flag" /> : null}
          </div>
        )
      }, {
        title: '地理位置',
        dataIndex: 'geo_city',
        key: 'geo_city',
        width: 80
      }, {
        title: '触发规则',
        dataIndex: 'strategy_name',
        key: 'strategy_name',
        width: '15%'
      }, {
        title: '风险场景',
        dataIndex: 'scene_name',
        key: 'scene_name',
        width: 70,
        render: scene_name => _.get(_.find(scenes, { value: scene_name }), 'text')
      }, {
        title: '风险类型',
        dataIndex: 'decision',
        key: 'decision',
        width: 70,
        render: decision => _.get(_.find(decisions, { value: decision }), 'text')
      }, {
        title: '操作',
        width: 70,
        render: (key, item, index) => (
          <div>
            <EasyToast trigger="hover" placement="top" overlay="删除">
              <PopConfirm
                trigger="click"
                placement="top"
                overlay="确认删除这条信息吗?"
                onConfirm={(e, res) => (
                  res &&
                  this.props.onSubmit({
                    key: item.key,
                    fromtime: item.timestamp,
                    endtime: item.timestamp
                  }, ACTION_DELETE)
                )}
              >
                <i className="iconfont icon-delete" />
              </PopConfirm>
            </EasyToast>
            <EasyToast trigger="hover" placement="top" overlay="触发事件">
              <i className={`iconfont icon-${index === me.state.selectedIndex ? 'caretup' : 'caretdown'}`} />
            </EasyToast>
          </div>
        )
      }]
    };
  }

  componentDidUpdate(props) {
    const { timestamp, onReload, xxx, offset } = this.props;

    if (((timestamp !== props.timestamp) && (timestamp !== 0)) ||
      xxx !== props.xxx ||
      offset !== props.offset) {
      onReload();
    }
  }

  render() {
    const {
      count,
      items,
      limit,
      offset,
      onGetDetail,
      itemDetail
    } = this.props;

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
              onGetDetail(items[index].key, items[index].strategy_name);
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
        <div className="pagination-container">
          <Pagination
            className="ant-pagination"
            current={offset}
            pageSize={limit}
            total={count}
            onChange={value => this.props.onChange(value, 'offset')}
          />
        </div>
      </div>
    );
  }
}

export default ResultTable;
