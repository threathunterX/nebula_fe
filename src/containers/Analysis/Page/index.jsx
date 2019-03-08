import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import moment from 'moment';
import _ from 'lodash';
import { Base64 } from 'js-base64';
import URI from 'urijs';

import PageAnalysisDetail from './PageAnalysisDetail';
import PageDetailTable from './PageDetailTable';
import Input from '../../../components/Input';
import FolderContainer from '../../../components/FolderContainer';
// import LabelEditTool from '../../../components/LabelEditTool';
import HttpService, {
  STATS_SLOT_QUERY,
  STATS_SLOT_MERGE_QUERY,
  STATS_OFFLINE_SERIAL
} from '../../../components/HttpService';
import FetchSlotData, { slotMap, FillDefaultTimeLine } from '../../../components/HttpService/FetchSlotData';
import Dialog from '../../../components/Dialog';
import Notification from '../../../components/Notification';

import './index.scss';

const notification = Notification.getNewInstance();
const KEY_PAGE = 'page';

const pageLimit = 10;

@withRouter
class PageAnalyze extends Component {
  static propTypes = {
    match: PropTypes.oneOfType([PropTypes.object]).isRequired
  };

  // 根据url分隔路径
  static getUrlArray(url) {
    const urlObj = new URI(url);
    const protocol = urlObj.protocol();
    const hostArray = [];
    // 是否有http或者https前缀
    if (protocol) {
      const host = `${urlObj.protocol()}://${urlObj.host()}`;
      hostArray.push(host);
    }
    const path = urlObj.path();

    return hostArray.concat(path.split('/'));
  }

  constructor(props) {
    super(props);

    this.state = {
      keyword: '',
      // editKeyword: '',
      start: 0,
      title: [],
      folderList: [],
      currentTime: moment().valueOf(),
      showTable: false,
      pageDetailData: null,
      // edittting: false,
      key_type: 'IP',
      tableData: {
        IP: [],
        DID: [],
        USER: []
      },
      pageDataList: [],
      total: 0,
      requestData: [],
      riskRequestData: []
    };
  }

  componentDidMount() {
    const { match: { params } } = this.props;

    if (params.key) {
      this.openFolder(decodeURIComponent(params.key));
    } else {
      // 趋势统计
      this.getChildNode();
    }
  }

  // 模糊搜索page
  onPageSearch() {
    this.state.pageDataList = [];
    this.state.start = 0;
    this.searchPages();
  }

  // 获取子节点
  getChildNode(nodeParams, callback) {
    let {
      folderList,
      title
    } = this.state;

    const params = {};
    if (nodeParams) {
      const {
        colNum, index, folder
      } = nodeParams;
      title[colNum] = folder.name;
      title = title.slice(0, colNum + 1);
      folderList = folderList.slice(0, colNum + 1);
      folderList[colNum].forEach((item, i) => {
        _.set(item, 'selected', i === index);
      });

      params.uri = Base64.encode(title.join('/'));
    }

    this.getChildNodeData(params, title, folderList, callback);
  }

  // 获取子节点数据
  getChildNodeData(params, title, folderList, callback) {
    HttpService.get({
      url: 'page_analysis/parent_uri',
      params,
      onSuccess: (res) => {
        const {
          status,
          result,
          message
        } = res;

        if (status === 200) {
          let folders = [];
          result.forEach((item) => {
            folders.push({
              name: _.last(item.uri.split('/')),
              hasChild: !item.is_leaf,
              size: item.cnt,
              selected: false,
              tag: 'tagtag',
              addTag: ''
            });
          });
          folders = _.sortBy(folders, ['hasChild', 'size']).reverse();

          folderList.push(folders);

          this.setState({
            folderList,
            title,
            pageDetailData: null
          }, () => {
            // 滚动到最右
            const container = document.querySelector('.directory-body');
            container.scrollLeft = container.scrollWidth;
          });

          if (callback) {
            callback();
          }
        } else {
          notification.error({ msg: message });
        }
      }
    });
  }

  // page详情
  getPageDetail(pageDetailData) {
    const {
      // edittting,
      // editKeyword,
      currentTime,
      key_type,
      tableData,
      requestData,
      riskRequestData
    } = this.state;

    const header = (
      <header className="page-analysis-detail-header">
        <h4>
          {_.get(pageDetailData, 'colNum') ? '/' : ''}
          {_.get(pageDetailData, 'folder.name')}
        </h4>
        {
          /*
           <div className="tags-container">
           <span className="tag-item">
           {folder.tag}
           </span>
           <LabelEditTool
           className="add-tag"
           editKeyword={editKeyword}
           editting={edittting}
           onChange={v => this.setState({ editKeyword: v })}
           onLabelClick={() => this.editLabel(editKeyword)}
           onSubmit={(v) => {
           const folderListTemp = folderList;
           folderListTemp[colNum][i].addTag = v;

           this.setState({
           folderList: folderListTemp,
           edittting: false
           });
           }}
           onBlur={() => {
           this.setState({
           edittting: false
           });
           }}
           editText={folder.addTag ? '修改' : '添加'}
           >
           {
           folder.addTag ? folder.addTag : [
           <i key="0" className="iconfont icon-plus" />,
           '人工标签'
           ]
           }
           </LabelEditTool>
           </div>
           */
        }
      </header>
    );

    const body = (
      <PageAnalysisDetail
        currentTime={currentTime}
        key_type={key_type}
        tableData={tableData[key_type]}
        requestData={requestData}
        riskRequestData={riskRequestData}
        handleChange={(keys, values) => this.handleChange(keys, values)}
        onChartClick={(time) => {
          const {
            title,
            folderList,
            pageDetailData: pageDetailDataTemp
          } = this.state;

          const stateObj = {
            key_type: 'IP',
            folderList,
            title,
            currentTime: moment(time).endOf('hour').valueOf(),
            pageDetailData: pageDetailDataTemp
          };
          // 获取最后一根柱子的详细数据
          this.getDetailTableData(time, title.join('/'), stateObj);
        }}
      />
    );

    if (_.get(pageDetailData, 'type') === 'path') {
      return {
        header,
        body
      };
    }

    return (
      <div className="page-analysis-detail-container">
        {header}
        {body}
      </div>
    );
  }

  // 获取page详情请求
  getDetailData(nodeParams, params, title, folderList) {
    const {
      colNum, index, folder, type
    } = nodeParams;

    const {
      start_time: from_time,
      end_time
    } = params;
    const var_list = [
      slotMap.PAGE_DYNAMIC_COUNT,
      slotMap.PAGE_INCIDENT_COUNT
    ];

    const url = title.join('/');

    // 请求数据
    FetchSlotData({
      url: STATS_OFFLINE_SERIAL,
      loadingIn: '#requestRiskChart',
      params: {
        key_type: KEY_PAGE,
        var_list,
        key: url,
        from_time,
        end_time
      },
      onSuccess: (result) => {
        const value = FillDefaultTimeLine(result.values, from_time, end_time, var_list);

        const stateObj = {
          currentTime: moment(end_time).endOf('hour').valueOf(),
          folderList,
          title,
          pageDetailData: {
            folderList,
            colNum,
            index,
            folder,
            type
          }
        };
        // 图表数据
        const requestData = [];
        const riskRequestData = [];
        value.forEach((item) => {
          // 请求数
          requestData.push({
            x: item.time_frame,
            y: _.get(item[slotMap.PAGE_DYNAMIC_COUNT], 'value')
          });
          // 风险请求数
          riskRequestData.push({
            x: item.time_frame,
            y: _.get(item[slotMap.PAGE_INCIDENT_COUNT], 'value')
          });

          stateObj.requestData = requestData;
          stateObj.riskRequestData = riskRequestData;
        });

        // 获取最后一根柱子的详细数据
        this.getDetailTableData(moment(end_time).startOf('hour').valueOf(), url, stateObj);
      }
    });
  }

  // 获取表格数据
  getDetailTableData(timestamp, url, stateObj) {
    HttpService.post({
      url: STATS_SLOT_QUERY,
      loadingIn: '.page-analysis-detail .table-container',
      params: {
        keys: [url],
        timestamp,
        dimension: KEY_PAGE,
        variables: [
          slotMap.PAGE_IP_DYNAMIC_100_COUNT,
          slotMap.PAGE_UID_DYNAMIC_100_COUNT,
          slotMap.PAGE_DID_DYNAMIC_100_COUNT
        ]
      },
      onSuccess: (result) => {
        const {
          status,
          message,
          values
        } = result;

        if (status === 200) {
          const res = _.get(values, url);
          const dataList = {
            [slotMap.PAGE_IP_DYNAMIC_100_COUNT]: [],
            [slotMap.PAGE_UID_DYNAMIC_100_COUNT]: [],
            [slotMap.PAGE_DID_DYNAMIC_100_COUNT]: []
          };

          _.map(res, (value, key) => {
            _.get(value, 'value', []).forEach((item) => {
              dataList[key].push({
                name: item.key,
                count: item.value
              });
            });
          });

          // 更新state
          const tableData = {
            IP: dataList[slotMap.PAGE_IP_DYNAMIC_100_COUNT],
            DID: dataList[slotMap.PAGE_DID_DYNAMIC_100_COUNT],
            USER: dataList[slotMap.PAGE_UID_DYNAMIC_100_COUNT]
          };
          const stateObjTemp = Object.assign({ tableData }, stateObj);
          if (tableData.IP.length > 0) {
            this.getGeoPosition(stateObjTemp);
          } else {
            this.setState(stateObjTemp);
          }
        } else {
          notification.error({ msg: message });
        }
      }
    });
  }

  // 查询地址
  getGeoPosition(stateObjTemp) {
    const stateObj = stateObjTemp;
    const ipList = [];
    const ipObjList = _.get(stateObj, 'tableData.IP');
    _.map(ipObjList, (item) => {
      ipList.push(item.name);
    });

    HttpService.get({
      url: 'platform/stats/geo',
      params: {
        ip: ipList
      },
      onSuccess: (results) => {
        // 获取ip对应地址
        const ipGeo = _.get(results, 'values.ip', {});
        const ipData = _.map(ipObjList, (ipObj) => {
          const ip = ipObj;
          ip.city = ipGeo[ip.name][2];
          return ip;
        });

        _.set(stateObj, 'tableData.IP', ipData);

        this.setState(stateObj);
      }
    });
  }

  // 搜索page table处理
  searchPages(callback) {
    const {
      start,
      keyword
    } = this.state;

    HttpService.get({
      url: 'page_analysis/search',
      params: {
        keyword: Base64.encode(keyword),
        start: start * pageLimit
      },
      onSuccess: (res) => {
        const {
          status,
          total,
          result
        } = res;

        if (status === 200) {
          const uriList = _.map(result, o => o.uri);

          if (uriList.length > 0) {
            this.pageTableColData(uriList, total, result, callback);
          } else {
            notification.info({ message: '未搜索到结果' });

            this.setState({
              pageDataList: [],
              showTable: true,
              total: 0,
              start: 0
            });
          }
        }
      }
    });
  }

  pageTableColData(uriList, total, talbleData, callback) {
    const variables = [
      slotMap.PAGE_INCIDENT_COUNT,
      slotMap.PAGE_DYNAMIC_IP,
      slotMap.PAGE_IP_DYNAMIC_100_COUNT,
      slotMap.PAGE_DYNAMIC_USER,
      slotMap.PAGE_UID_DYNAMIC_100_COUNT,
      slotMap.PAGE_DYNAMIC_DID,
      slotMap.PAGE_DID_DYNAMIC_100_COUNT
    ];
    const start = moment().startOf('day').valueOf();
    const end = moment().startOf('hour').valueOf();

    HttpService.post({
      url: STATS_SLOT_MERGE_QUERY,
      params: {
        keys: uriList,
        variables,
        timerange: [start, end],
        dimension: KEY_PAGE
      },
      onSuccess: (result) => {
        const {
          status,
          message,
          values
        } = result;

        if (status === 200) {
          let {
            pageDataList
          } = this.state;

          const r = _.map(talbleData, (o) => {
            const url = o.uri;
            const urlData = _.get(values, url);

            // 取top3ip相关数据
            const top100Ips = _.get(urlData, slotMap.PAGE_IP_DYNAMIC_100_COUNT);
            const top3IpClick = _.get(top100Ips, '0.value', 0) + _.get(top100Ips, '1.value', 0) + _.get(top100Ips, '2.value', 0);
            const top3IpClickPercent = o.cnt ? `${(top3IpClick / o.cnt).toFixed(2) * 100}%` : '0%';

            // 取top3user相关数据
            const top100Users = _.get(urlData, slotMap.PAGE_UID_DYNAMIC_100_COUNT);
            const top3UserClick = _.get(top100Users, '0.value', 0) + _.get(top100Users, '1.value', 0) + _.get(top100Users, '2.value', 0);
            const top3UserClickPercent = o.cnt ? `${(top3UserClick / o.cnt).toFixed(2) * 100}%` : '0%';

            // 取top3did相关数据
            const top100Dids = _.get(urlData, slotMap.PAGE_DID_DYNAMIC_100_COUNT);
            const top3DidClick = _.get(top100Dids, '0.value', 0) + _.get(top100Dids, '1.value', 0) + _.get(top100Dids, '2.value', 0);
            const top3DidClickPercent = o.cnt ? `${(top3DidClick / o.cnt).toFixed(2) * 100}%` : '0%';

            return Object.assign({
              incidentCount: _.get(urlData, slotMap.PAGE_INCIDENT_COUNT),
              ipCount: _.get(urlData, slotMap.PAGE_DYNAMIC_IP),
              top3IpClick,
              top3IpClickPercent,
              userCount: _.get(urlData, slotMap.PAGE_DYNAMIC_USER),
              top3UserClick,
              top3UserClickPercent,
              didCount: _.get(urlData, slotMap.PAGE_DYNAMIC_DID),
              top3DidClick,
              top3DidClickPercent
            }, o);
          });

          if (!callback) {
            pageDataList = r;
          } else {
            pageDataList = pageDataList.concat(r);
          }

          this.setState({
            showTable: true,
            total,
            pageDataList,
            start: this.state.start + 1
          });
        } else {
          notification.error({ msg: message });
        }

        if (callback) {
          callback();
        }
      }
    });
  }

  handleChange(keys, values) {
    const obj = {};
    keys.forEach((key, index) => {
      obj[key] = values[index];
    });
    this.setState(obj);
  }

  // 编辑
  editLabel(editKeyword) {
    this.setState({
      edittting: true,
      editKeyword
    });
  }

  // 展示节点详情
  showChildNode(nodeParams) {
    let {
      folderList,
      title
    } = this.state;

    const {
      colNum, index, folder
    } = nodeParams;

    const params = {};

    // 点开folder
    title[colNum] = folder.name;
    title = title.slice(0, colNum + 1);
    folderList = folderList.slice(0, colNum + 1);

    folderList[colNum].forEach((item, i) => {
      _.set(item, 'selected', i === index);
    });

    const curTime = moment().valueOf();
    params.start_time = moment(curTime).subtract(3, 'days').valueOf();
    params.end_time = curTime;

    this.toPageDetail(nodeParams, params, title, folderList);
  }

  // 打开对话框
  openDialog(urlArray) {
    const nodeParams = {
      colNum: 0,
      index: 0,
      folder: {
        name: urlArray.join('/')
      },
      type: 'path'
    };

    const curTime = moment().valueOf();
    const params = {
      start_time: moment(curTime).subtract(3, 'days').valueOf(),
      end_time: curTime
    };

    this.toPageDetail(nodeParams, params, urlArray, this.state.folderList);
  }

  // 设置page详情初始数据
  toPageDetail(nodeParams, params, title, folderList) {
    const {
      colNum, index, folder, type
    } = nodeParams;

    // 刷出详情容器
    this.setState({
      folderList,
      title,
      pageDetailData: {
        folderList,
        colNum,
        index,
        folder,
        type
      },
      tableData: {
        IP: [],
        DID: [],
        USER: []
      },
      requestData: [],
      riskRequestData: []
    }, () => {
      // 滚动到最右
      const container = document.querySelector('.directory-body');
      if (container) {
        container.scrollLeft = container.scrollWidth;
      }

      this.getDetailData(nodeParams, params, title, folderList);
    });
  }

  // 查看原路径
  openFolder(url) {
    const urlArray = PageAnalyze.getUrlArray(url);

    // 关闭表格
    this.setState({
      showTable: false,
      keyword: '',
      folderList: [],
      title: []
    }, () => {
      // 初始路径
      this.getChildNode(null, () => {
        this.folderRecursion(urlArray[0], urlArray, 0);
      });
    });
  }

  // 递归查询
  folderRecursion(path, urlArray, colNum) {
    const {
      folderList,
      title
    } = this.state;

    const index = _.findIndex(folderList[colNum], o => o.name === path);

    // 找不到path
    if (index < 0) {
      return;
    }
    const folder = folderList[colNum][index];

    // 如果下一层是节点
    if (title.length === urlArray.length - 1) {
      this.state.key_type = 'IP';
      this.showChildNode({
        colNum,
        index,
        folder,
        type: 'node'
      });
      return;
    }

    this.getChildNode({
      colNum,
      index,
      folder
    }, () => {
      this.folderRecursion(urlArray[colNum + 1], urlArray, colNum + 1);
    });
  }

  render() {
    const {
      folderList,
      keyword,
      total,
      showTable,
      pageDataList,
      title,
      pageDetailData
    } = this.state;

    const pageDetail = pageDetailData ? this.getPageDetail(pageDetailData) : null;

    return (
      <div className="wd-page-analysis container">
        <h1>
          <span>PAGE风险分析</span>
        </h1>
        <div className="page-search">
          <Input
            className="page-search-input"
            placeholder="请输入url"
            value={keyword}
            onChange={(v) => {
              this.setState({
                keyword: v
              });
            }}
            onSubmit={() => {
              this.onPageSearch();
            }}
          />
          {
            showTable ? (
              <i
                className="iconfont icon-crosscircle"
                onClick={() => {
                  this.setState({
                    showTable: false,
                    keyword: ''
                  });
                }}
                role="presentation"
              />
            ) : (
              <i
                className="iconfont icon-search"
                onClick={() => {
                  this.onPageSearch();
                }}
                role="presentation"
              />
            )
          }
        </div>
        <div className="page-container">
          {
            showTable ? (
              <PageDetailTable
                total={total}
                pageDataList={pageDataList}
                selectPage={(url) => {
                  const urlArray = PageAnalyze.getUrlArray(url);
                  this.openDialog(urlArray);
                }}
                onLoadMore={callback => this.searchPages(callback)}
                openFolder={url => this.openFolder(url)}
              />
            ) : (
              <FolderContainer
                title={title.join('/')}
                folderList={folderList}
                getChildNode={(params) => {
                  this.getChildNode(params);
                }}
                showChildNode={(params) => {
                  this.state.key_type = 'IP';
                  this.showChildNode(params);
                }}
              >
                {_.get(pageDetailData, 'type') === 'node' ? pageDetail : null}
              </FolderContainer>
            )
          }
        </div>
        <Dialog
          className="page-analysis-detail-dialog"
          onClose={() => {
            this.setState({
              pageDetailData: null
            });
          }}
          visible={_.get(pageDetailData, 'type') === 'path'}
          title={() => pageDetail && pageDetail.header}
        >
          {pageDetail && pageDetail.body}
        </Dialog>
      </div>
    );
  }
}

export default PageAnalyze;

