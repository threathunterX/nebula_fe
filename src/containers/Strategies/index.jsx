import React, { Component } from 'react';
import moment from 'moment';
import _ from 'lodash';

import HttpService from '../../components/HttpService';
import TabBar from '../../components/TabBar';
import BTable from '../../components/BTable';
import Notification from '../../components/Notification';
import Slider from '../../components/slider';
import PopConfirm from '../../components/PopConfirm';
import EasyToast from '../../components/EasyToast';
import DownLoadFile from '../../components/util/DownLoadFile';
import Dialog from '../../components/Dialog';
import TextField from '../../components/TextField';
// import FormSearchInput from '../../components/FormSearchInput';
import Select from '../../components/Select';
import Menu from '../../components/Menu';
import Toast from '../../components/Toast';
import Strategy from './Strategy';
import Terms from './Terms';
import ImportDialog from './ImportDialog';
import StrategyCharts from './StrategyCharts';
import {
  DEFAULT_STRATEGY,
  CATEGORY_VISITOR,
  CATEGORY_ACCOUNT,
  CATEGORY_TRANSACTION,
  CATEGORY_ORDER,
  CATEGORY_MARKETING,
  CATEGORY_OTHER
} from './constants';

import '../../components/Pagination/index.scss';
import './index.scss';

const API_EVENTS = 'nebula/events';
const API_VARIABLES = 'nebula/variables';
const API_TAGS = 'nebula/tags';
const API_STRATEGIES = 'nebula/strategies';
const API_EXPORT = 'nebula/strategy/export';

const ACTION_DEFAULT = 'ACTION_DEFAULT';
const ACTION_CREATE = 'ACTION_CREATE';
const ACTION_UPDATE = 'ACTION_UPDATE';
const ACTION_DELETE = 'ACTION_DELETE';
const ACTION_CHANGE_STATUS = 'ACTION_CHANGE_STATUS';

const STATUS_INEDIT = 'inedit';
const STATUS_TEST = 'test';
const STATUS_ONLINE = 'online';
const STATUS_OUTLINE = 'outline';

const KEY_ITEM = 'item';
const KEY_ACTION = 'action';

const notification = Notification.getNewInstance();

const STATUS_DICT = {
  [STATUS_INEDIT]: '编辑',
  [STATUS_TEST]: '测试',
  [STATUS_ONLINE]: '上线',
  [STATUS_OUTLINE]: '下线'
};
const getNextStatuses = (status) => {
  switch (status) {
    case STATUS_INEDIT:
      return [STATUS_TEST];
    case STATUS_TEST:
      return [STATUS_INEDIT, STATUS_ONLINE];
    case STATUS_ONLINE:
      return [STATUS_OUTLINE];
    case STATUS_OUTLINE:
      return [STATUS_INEDIT, STATUS_ONLINE];
    default:
      return null;
  }
};
const getPreviousStatuses = (status) => {
  switch (status) {
    case STATUS_INEDIT:
      return [STATUS_TEST, STATUS_OUTLINE];
    case STATUS_TEST:
      return [STATUS_INEDIT];
    case STATUS_ONLINE:
      return [STATUS_TEST, STATUS_OUTLINE];
    case STATUS_OUTLINE:
      return [STATUS_ONLINE];
    default:
      return null;
  }
};

class Strategies extends Component {

  // 获取筛选选项
  static getFilterList(items) {
    const filterList = {};
    items.forEach((item) => {
      if (item.tags.length === 0) {
        if (filterList['无标签']) {
          filterList['无标签'] += 1;
          return;
        }
        filterList['无标签'] = 1;
      }
      item.tags.forEach((tag) => {
        if (filterList[tag]) {
          filterList[tag] += 1;
          return;
        }
        filterList[tag] = 1;
      });
    });

    return filterList;
  }

  // 处理误差
  static dealTolerance(values, index) {
    const items = values;
    let lastIndex = index;
    let sum = 0;
    for (let i = 0; i < items.length; i += 1) {
      const v = items[i];
      // 矫正误差
      if (v.score < 0) {
        v.score = 0;
        items[lastIndex].temp = items[lastIndex].score;
      }
      v.score = parseInt(v.score, 10);
      sum += v.score;
      if (!(v.disabled || i === index)) {
        lastIndex = i;
      }
    }

    if (1000 - sum < 0) {
      while ((items[lastIndex].score + 1000) - sum < 0) {
        lastIndex -= 1;
      }
    }
    items[lastIndex].score += 1000 - sum;
    items[lastIndex].temp = items[lastIndex].score;
    return items;
  }

  // 导出策略
  static exportRule(exportList) {
    if (exportList.length <= 0) {
      return;
    }

    const params = _.map(exportList, item => ({ app: 'nebula', name: item.name }));
    // 导出
    HttpService.post({
      url: API_EXPORT,
      params,
      onSuccess: (data) => {
        if (data.status === 200) {
          DownLoadFile(`nebula/strategy/export/${data.download_path}`);
        } else {
          notification.error({ message: data.msg });
        }
      },
      onError: () => {
        notification.error({ message: '导出失败' });
      }
    });
  }

  static isEditable(status) {
    switch (status) {
      case STATUS_INEDIT: // 编辑
        return true;
      case STATUS_TEST: // 测试
      case STATUS_ONLINE: // 上线
      case STATUS_OUTLINE: // 下线
        return false;
      default:
        return false;
    }
  }

  constructor(props) {
    super(props);

    const timestamp = moment().valueOf();
    const tabList = [{
      iconName: 'visitor',
      iconClass: 'visitor-icon',
      tabText: '访客风险',
      key: CATEGORY_VISITOR,
      mainTitle: '点击数',
      redTitle: '风险点击数'
    }, {
      iconClass: 'icon-tablet',
      tabText: '帐号风险',
      key: CATEGORY_ACCOUNT,
      mainTitle: '用户数',
      redTitle: '风险用户数'
    }, {
      iconClass: 'icon-creditcard',
      tabText: '支付风险',
      key: CATEGORY_TRANSACTION,
      mainTitle: ['支付金额', '支付笔数'],
      redTitle: ['风险支付金额', '风险支付笔数'],
      headTab: ['金额', '笔数'],
      selectIndex: 1
    }, {
      iconClass: 'icon-shoppingcart',
      tabText: '订单风险',
      key: CATEGORY_ORDER,
      mainTitle: '订单数',
      redTitle: '风险订单数'
    }, {
      iconClass: 'icon-tagso',
      tabText: '营销风险',
      key: CATEGORY_MARKETING,
      mainTitle: '营销事件数',
      redTitle: '风险营销事件数'
    }, {
      iconClass: 'icon-pluscircleo',
      tabText: '其他风险',
      key: CATEGORY_OTHER,
      disabled: true
    }];

    const sceneList = [];
    tabList.forEach((scene) => {
      if (scene.disabled) {
        return;
      }
      sceneList.push({
        text: scene.tabText,
        value: scene.key
      });
    });

    const scene = sceneList[0];

    const menuList = [];
    Object.keys(STATUS_DICT).forEach((key) => {
      menuList.push({
        text: STATUS_DICT[key],
        value: key
      });
    });

    this.state = {
      timestamp,
      top: {
        [CATEGORY_VISITOR]: [],
        [CATEGORY_ACCOUNT]: [],
        [CATEGORY_TRANSACTION]: [],
        [CATEGORY_ORDER]: [],
        [CATEGORY_MARKETING]: [],
        [CATEGORY_OTHER]: []
      },
      tableApi: {},
      selectIndex: 0,
      action: ACTION_DEFAULT,
      items: [],
      item: _.cloneDeep(DEFAULT_STRATEGY),
      events: [],
      variables: [],
      weights: [],
      tags: [],
      showFilter: true,
      filterList: {},
      selectedFilter: [],
      editWeight: -1,
      selectedRows: [],
      tabList,
      sceneList,
      scene,
      importing: false,
      cloneVisible: false,
      cloneName: '',
      cloneItem: {},
      isError: false,
      errorText: '',
      keyword: '',
      menuList,
      toastVisible: false,
      toastMsg: '',
      tableFilter: []
    };
  }

  componentDidMount() {
    this.fetchEvents();
    this.fetchVariables();
    this.fetchStrategies();
    this.fetchTags();
  }

  onTabSelect(selectIndex) {
    if (selectIndex === this.state.selectIndex) {
      return;
    }

    const items = this.getItems(this.state.itemAll, selectIndex);
    const filterList = Strategies.getFilterList(items);
    const weights = _.map(items, (item) => {
      const { name, score, isLock } = item;

      return { name, score, temp: score, disabled: isLock };
    });

    const {
      tableApi
    } = this.state;
    // 清空选中
    tableApi.clearCheck();
    // 收起展开项
    tableApi.hideExpendRow();

    this.setState({
      selectIndex,
      weights,
      items,
      action: ACTION_DEFAULT,
      item: _.cloneDeep(DEFAULT_STRATEGY),
      filterList,
      scene: this.state.sceneList[selectIndex],
      // 清空筛选
      selectedFilter: []
    });
  }

  // 修改权重百分比
  onWeightSubmit(value, index) {
    if (value >= 0 && value <= 100) {
      this.handleWeightChange(value * 10, index);
    }

    this.setState({ editWeight: -1 });
  }

  // 选择tab栏
  onSelectTab(index) {
    const {
      tabList,
      selectIndex
    } = this.state;

    tabList[selectIndex].selectIndex = index;

    this.setState({ tabList });
  }

  // 操作
  getStatusItem(record, items) {
    const { name } = record;
    const item = _.find(items, { name });

    return (
      <div className="status">
        <div
          className="button-group"
          onClick={(e) => {
            e.stopPropagation();
          }}
          role="presentation"
        >
          {
            _.map(
              [STATUS_INEDIT, STATUS_TEST, STATUS_ONLINE, STATUS_OUTLINE],
              (value, index) => {
                const btnText = STATUS_DICT[value];
                const active = (item.status === value);
                const disabled = !_.includes(getNextStatuses(item.status), value);

                if (active) {
                  return (
                    <button key={index} className="main-btn small-btn active">{btnText}</button>
                  );
                }

                if (disabled) {
                  const overlay = `只有在“${_.join(_.map(getPreviousStatuses(value), key => STATUS_DICT[key]), '/')}”情况下才可选择“${btnText}”`;

                  return (
                    <EasyToast key={index} trigger="hover" placement="top" overlay={overlay}>
                      <button className="main-btn small-btn disabled">{btnText}</button>
                    </EasyToast>
                  );
                }

                return (
                  <button
                    key={index}
                    className="main-btn small-btn"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      this.handleSubmit([{ name, newstatus: value }], ACTION_CHANGE_STATUS);
                    }}
                  >{btnText}</button>
                );
              }
            )
          }
        </div>
      </div>
    );
  }

  // 权重
  getWeightItem(record, weights) {
    const { name } = record;
    const index = _.findIndex(weights, { name });
    const weight = _.find(weights, { name });
    const ITEM = `[${index}]`;
    const DISABLED = `${ITEM}.disabled`;
    const SCORE = `${ITEM}.temp`;
    return (
      <div
        className="weight-container"
        onClick={(e) => {
          e.stopPropagation();
        }}
        role="presentation"
      >
        <i
          className={`iconfont ${weight.disabled ? 'icon-lock' : 'icon-unlock'}`}
          onClick={() => this.handleWeightChange2(!weight.disabled, DISABLED)}
          role="presentation"
        />
        <Slider
          className="weight-slider"
          max={1000}
          scale
          marks={[100, 200, 300, 400, 500, 600, 700, 800, 900]}
          onChange={value => this.handleWeightChange2(value, SCORE)}
          onAfterChange={value => this.handleWeightChange(value, index)}
          value={weight.temp}
          disabled={weight.disabled}
        />
        {
          this.state.editWeight === index ?
            (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  this.onWeightSubmit(e.target.weight.value, index);
                }}
              >
                <input
                  name="weight"
                  type="tel"
                  className="weight-input"
                  autoComplete="off"
                  defaultValue={(weight.score / 10).toFixed(1)}
                  onBlur={(e) => {
                    this.onWeightSubmit(e.target.value, index);
                  }}
                />
                <span>%</span>
              </form>
            ) : (<span
              className="weight-value"
              onClick={() => {
                this.setState({ editWeight: index });
              }}
              role="presentation"
            >{`${(weight.score / 10).toFixed(1)}%`}</span>
          )
        }
      </div>
    );
  }

  getItems(values, selectIndex) {
    const {
      tabList
    } = this.state;

    const items = [];
    values.forEach((item) => {
      if (item.category === tabList[selectIndex].key) {
        items.push(item);
      }
    });
    return items;
  }

  // 没数据时，提示信息
  getEmptyText(tableData) {
    const {
      items,
      itemAll
    } = this.state;
    // 加载失败，没数据
    if (itemAll === undefined) {
      return null;
    }
    // 加载失败，没数据
    if (itemAll === null) {
      return (
        <div className="empty-text">
          <i className="iconfont icon-crosscircleo" />
          <span>加载失败，请</span>
          <a
            onClick={() => this.fetchStrategies()}
            role="presentation"
          >重新加载</a>
        </div>
      );
    }
    if (items.length === 0) {
      return (
        <div className="empty-text">
          <i className="iconfont icon-crosscircleo" />
          <span>没有相关数据</span>
        </div>
      );
    }
    if (tableData.length === 0) {
      return (
        <div className="empty-text">
          <i className="iconfont icon-crosscircleo" />
          <span>没有符合条件的数据</span>
        </div>
      );
    }

    return null;
  }

  fetchVariables() {
    HttpService.get({
      url: API_VARIABLES,
      onSuccess: (data) => {
        const { status, values } = data;

        if (status === 0) {
          this.setState({ variables: values });
        }
      }
    });
  }

  fetchTags() {
    HttpService.get({
      url: API_TAGS,
      onSuccess: (data) => {
        const { status, values } = data;

        if (status === 0) {
          this.setState({ tags: _.map(values, item => item.name) });
        }
      }
    });
  }

  fetchStrategies() {
    HttpService.get({
      url: API_STRATEGIES,
      params: { app: 'nebula' },
      onSuccess: (data) => {
        const { status, values } = data;

        const {
          selectIndex
        } = this.state;

        if (status === 200) {
          if (values.length > 0) {
            const items = this.getItems(values, selectIndex);

            const filterList = Strategies.getFilterList(items);

            this.setState({
              items,
              weights: _.map(items, (item) => {
                const { name, score, isLock } = item;

                return { name, score, temp: score, disabled: isLock };
              }),
              itemAll: values,
              filterList
            });
          } else {
            this.setState({
              itemAll: []
            });
          }
        } else if (status !== 200) {
          this.setState({
            itemAll: null
          });
        }
      },
      onError: () => {
        this.setState({
          itemAll: null
        });
      }
    });
  }

  // 添加新策略
  addStrategy() {
    const item = _.cloneDeep(DEFAULT_STRATEGY);
    item.starteffect = moment().valueOf();
    item.endeffect = item.starteffect * 5;
    item.category = _.get(this.state.scene, 'value');
    this.setState({
      action: ACTION_CREATE,
      item
    });

    setTimeout(() => {
      document.querySelector('#mask').style.display = '';
    }, 0);
  }

  handleItemChange(key, value) {
    const { item } = this.state;

    this.setState({
      item: _.set(item, key, value)
    });
  }

  handleChange(value, key) {
    this.setState({ [key]: value });
  }

  handleSubmit(value, key, callback) {
    const {
      items
    } = this.state;

    switch (key) {
      case ACTION_CREATE:
      case ACTION_UPDATE: {
        // 检验输出选项
        const result = this.checkContent(value, items, key);

        if (!result) {
          return;
        }

        const params = _.cloneDeep(value);

        params[0].terms.forEach((item, index) => {
          _.set(params, `0.terms.${index}.left.config`, _.omit(_.get(params, `0.terms.${index}.left.config`), ['valid']));
        });

        HttpService.post({
          url: API_STRATEGIES,
          params,
          onSuccess: (data) => {
            const { status, msg } = data;
            if (status === 200) {
              this.hideMask();
              this.fetchStrategies();
              notification.success({ message: '保存成功' });
            } else {
              notification.error({ message: msg });
            }
          },
          onError: () => notification.error({ message: '保存失败' })
        });
        break;
      }
      case ACTION_DELETE: {
        const params = [];
        value.forEach((v) => {
          params.push({
            app: 'nebula',
            name: v.name
          });
        });
        // 发送请求
        HttpService.put({
          url: 'nebula/strategies/delete',
          params,
          onSuccess: (res) => {
            if (res.status === 0) {
              this.fetchStrategies();
            } else if (res.status === -1) {
              notification.error({ message: '删除失败' });
            } else {
              notification.error({ message: res.msg });
            }
          },
          onError: () => notification.error({ message: '删除失败' })
        });
        break;
      }
      case ACTION_CHANGE_STATUS: {
        const params = [];
        value.forEach((v) => {
          params.push(Object.assign({ app: 'nebula' }, v));
        });
        // 发送请求
        HttpService.post({
          url: 'nebula/strategies/changestatus/',
          params,
          onSuccess: (data) => {
            const { status, msg } = data;
            if (status === 0) {
              let itemsTemp;
              let item = this.state.item;
              let selectedRows;
              value.forEach((v) => {
                const { name, newstatus } = v;
                const index = _.findIndex(items, { name });
                itemsTemp = _.set(items, `[${index}].status`, newstatus);
                selectedRows = _.map(this.state.selectedRows, (o) => {
                  const row = o;
                  if (row.name === name) {
                    row.status = newstatus;
                  }
                  return row;
                });
                if (item.name === items[index].name) {
                  item = _.cloneDeep(items[index]);
                }
              });
              this.setState({
                items: itemsTemp,
                item,
                selectedRows
              });
              if (callback) {
                callback();
              }
            } else if (status === -1) {
              notification.error({ message: '更新状态失败' });
            } else {
              notification.error({ message: msg });
            }
          },
          onError: () => notification.error({ message: '更新状态失败' })
        });
        break;
      }
      default:
    }
  }

  // 检验
  checkContent(value, items, key) {
    let result = true;
    let error = false;

    error = _.isEmpty(_.get(value, '0.name'));
    result = result && !error;
    if (error) {
      this.handleItemChange('error.name.ERROR_REQUIRED', '*请填写策略名称。');
    }

    if (key === ACTION_CREATE) {
      error = !_.isEmpty(_.find(items, { name: _.get(value, '0.name') }));
      result = result && !error;
      if (error) {
        this.handleItemChange('error.name.ERROR_REQUIRED', '*该名称已被占用。');
      }
    }

    error = _.get(value, '0.starteffect') === 0;
    result = result && !error;
    if (error) {
      this.handleItemChange('error.starteffect.ERROR_REQUIRED', '');
    }

    error = _.get(value, '0.endeffect') === 0;
    result = result && !error;
    if (error) {
      this.handleItemChange('error.endeffect.ERROR_REQUIRED', '');
    }

    if (result) {
      _.set(value, '0', _.omit(_.get(value, '0'), 'error'));
    }

    _.forEach(_.get(value, '0.terms'),
      (term, index) => {
        error = _.isEmpty(_.get(term, 'left.type'));
        result = result && !error;
        if (error) {
          this.handleItemChange(`terms.${index}.error.event.ERROR_REQUIRED`, '');
        }

        if (!_.isEmpty(_.get(term, 'right'))) {
          error = _.isEmpty(_.get(term, 'op'));
          result = result && !error;
          if (error) {
            this.handleItemChange(`terms.${index}.error.op.ERROR_REQUIRED`, '');
          }

          error = _.isEmpty(_.get(term, 'right.config.value'));
          result = result && !error;
          if (error) {
            this.handleItemChange(`terms.${index}.error.value.ERROR_REQUIRED`, '');
          }
        }

        if (result) {
          _.set(value, `0.terms.${index}`, _.omit(_.get(value, `0.terms.${index}`), 'error'));
        }

        if (key === ACTION_CREATE) {
          error = !_.get(term, 'left.config.valid');
          result = result && !error;
          if (error) {
            this.handleItemChange(`terms.${index}.left.config.error.ERROR_REQUIRED`, '*不能为空');
          } else {
            _.set(value, `0.terms.${index}.left.config`, _.omit(_.get(value, `0.terms.${index}.left.config`), ['error']));
          }
        }
      }
    );

    return result;
  }

  handleWeightChange2(value, key) {
    const { weights } = this.state;
    this.setState({
      weights: _.set(weights, key, value)
    });
  }

  handleWeightChange(value, index) {
    let { weights } = this.state;
    const {
      items
    } = this.state;

    weights = this.recursiveReduce(weights, weights[index].score, index, value, true);
    weights = Strategies.dealTolerance(weights, index);

    this.setState({ weights });

    _.map(items, (item) => {
      const { name } = item;
      const weight = _.find(weights, { name });
      _.set(item, 'score', weight.score);
      _.set(item, 'isLock', weight.disabled);
    });

    this.handleSubmit(items, ACTION_UPDATE);
  }

  // 计算平均值
  recursiveReduce(dataTemp, orgWeight, index, paramTemp, isInit, overNumSum) {
    let param = paramTemp;
    let data = dataTemp;
    let count = 0;
    let total = 1000;
    // 统计未锁定滑块
    data.forEach((item, pos) => {
      if (!item.disabled && pos !== index &&
        ((param - orgWeight) < 0 || data[pos].score > 0)) {
        count += 1;
      } else if (item.disabled) {
        total -= data[pos].score;
      }
    });

    // 值溢出，误差0.1
    if (param - total > 0.1) {
      // 当前值设置为最大，其他置0
      param = total;
      data.forEach((item, i) => {
        if (item.disabled) {
          return;
        }
        if (index === i) {
          if (isInit) {
            data[i].score = param;
          }
        } else {
          data[i].score = 0;
        }
        data[i].temp = data[i].score;
      });
      return data;
    }

    let deduceAvg = (param - orgWeight) / count;
    // 如果有溢出值，则以溢出值的平均值分摊
    if (overNumSum) {
      deduceAvg = overNumSum / count;
    }

    // 重置溢出数值
    let overNum = 0;

    data.forEach((item, i) => {
      if (item.disabled) {
        return;
      }
      if (index === i) {
        if (isInit) {
          data[i].score = param;
        }
      } else if ((param - orgWeight < 0)) {
        // 当前滑块数值减少
        data[i].score -= deduceAvg;
      } else if (data[i].score > 0) {
        if (data[i].score - deduceAvg < 0) {
          // 溢出值
          overNum += deduceAvg - data[i].score;

          data[i].score = 0;
          data[i].temp = data[i].score;
          return;
        }
        data[i].score -= deduceAvg;
      }
      data[i].temp = data[i].score;
    });

    // 有溢出值则继续分摊
    if (overNum !== 0) {
      data = this.recursiveReduce(data, orgWeight, index, param, false, overNum);
    }
    return data;
  }

  // 隐藏对话框
  hideMask() {
    document.querySelector('#mask').style.display = 'none';

    const {
      tableApi
    } = this.state;

    if (tableApi.hideExpendRow) {
      tableApi.hideExpendRow();
    }
    this.setState({
      action: ACTION_DEFAULT,
      item: _.cloneDeep(DEFAULT_STRATEGY)
    });
  }

  // 修改筛选条件
  changeFilter(key) {
    let {
      selectedFilter
    } = this.state;

    if (selectedFilter.indexOf(key) >= 0) {
      // 点击选中的选项则取消选中
      selectedFilter = [];
    } else {
      selectedFilter = [key];
    }

    this.setState({
      selectedFilter,
      action: ACTION_DEFAULT
    });
  }

  fetchEvents() {
    HttpService.get({
      url: API_EVENTS,
      onSuccess: (data) => {
        const { status, values } = data;

        if (status === 0) {
          this.setState({ events: values });
        }
      }
    });
  }

  // 显示克隆策略对话框
  showClone(e, cloneItem) {
    e.stopPropagation();
    this.setState({
      cloneVisible: true,
      cloneItem
    });
  }

  // 修改权重
  lockChange(selectedRows, flag) {
    if (selectedRows.length <= 0) {
      return;
    }

    const {
      weights,
      items
    } = this.state;

    selectedRows.forEach((item) => {
      weights[_.findIndex(weights, o => o.name === item.name)].disabled = flag;
    });

    this.setState({
      weights
    });

    _.map(items, (item) => {
      const { name } = item;
      const weight = _.find(weights, { name });
      _.set(item, 'score', weight.score);
      _.set(item, 'isLock', weight.disabled);
    });

    this.handleSubmit(items, ACTION_UPDATE);
  }

  render() {
    const {
      action,
      item,
      events,
      variables,
      weights,
      keyword,
      tags,
      selectIndex,
      timestamp,
      tabList,
      showFilter,
      filterList,
      selectedFilter,
      importing,
      editWeight,
      selectedRows,
      cloneVisible,
      cloneItem,
      cloneName,
      isError,
      sceneList,
      scene,
      errorText,
      menuList,
      toastVisible,
      toastMsg,
      tableFilter
    } = this.state;

    const {
      items: itemsOrg
    } = this.state;

    // 根据关键词和过滤器过滤，筛选过滤
    const items = _.filter(itemsOrg, (value) => {
      // 关键词
      if (value.name.toLowerCase().indexOf(keyword.toLowerCase()) >= 0) {
        // 选择标签
        if (selectedFilter.length === 0 || value.tags.indexOf(selectedFilter[0]) >= 0
          || (selectedFilter[0] === '无标签' && value.tags.length === 0)) {
          // 表格过滤器
          if (tableFilter.length === 0 || tableFilter.indexOf(value.status) >= 0) {
            return true;
          }
        }
      }
      return false;
    });

    const cloneBtns = [{
      text: '确定',
      onClick: () => {
        if (cloneName === '') {
          this.setState({
            isError: true,
            errorText: '请填写策略名称。'
          });
          return;
        }
        // 如果重名
        if (!_.isEmpty(_.find(itemsOrg, { name: cloneName }))) {
          this.setState({
            isError: true,
            errorText: '该名称已被占用。'
          });
          return;
        }

        // 克隆策略
        this.setState({ isError: false });
        const params = [_.cloneDeep(cloneItem)];
        params[0].createtime = 0;
        params[0].modifytime = 0;
        params[0].name = cloneName;
        params[0].status = 'inedit';
        delete params[0].isLock;
        delete params[0].score;
        delete params[0].version;
        HttpService.post({
          url: API_STRATEGIES,
          params,
          onSuccess: (data) => {
            const { status, msg } = data;
            if (status === 200) {
              this.setState({ cloneVisible: false });
              this.fetchStrategies();
              notification.success({ message: '策略克隆成功' });
            } else {
              notification.error({ message: msg });
            }
          },
          onError: () => notification.error({ message: '策略克隆失败' })
        });
      }
    }, {
      text: '取消',
      cls: 'cancel-btn',
      onClick: () => {
        this.setState({ cloneVisible: false });
      }
    }];

    // 非管理员无score字段，权重组件不可见
    const weightVisible = (weights.length === 0 || weights[0].score !== undefined);
    // let weightVisible = false;

    // 获取表格数据
    const tableData = _.map(items, value => ({
      name: value.name,
      remark: value.remark,
      status: value.status
    }));

    // 获取表头
    const tableColumns = [{
      title: '名称',
      dataIndex: 'name',
      width: '30%',
      render: (text, record) => (
        <div className="name">
          <span className="text" title={text}>{text}</span>
          <EasyToast
            trigger="hover"
            placement="top"
            overlay="导出"
            align={{
              offset: ['0', '3']
            }}
          >
            <i
              className="iconfont icon-upload"
              onClick={(e) => {
                e.stopPropagation();
                Strategies.exportRule([record]);
              }}
              role="presentation"
            />
          </EasyToast>
          <PopConfirm
            trigger="click"
            placement="topRight"
            overlay="策略删除的操作是无法撤销的，如果您暂时不确认是否后面还需要该策略，我们建议您“下线”策略依然可以达到暂停的效果"
            onConfirm={(e, res) => (
              res ? this.handleSubmit([{ name: text }], ACTION_DELETE) : null
            )}
            align={{
              offset: ['25', '3']
            }}
          >
            <EasyToast
              trigger="hover"
              placement="top"
              overlay="删除"
              align={{
                offset: ['0', '3']
              }}
            >
              <i
                className="iconfont icon-delete operate-btn"
                onClick={(e) => {
                  e.stopPropagation();
                }}
                role="presentation"
              />
            </EasyToast>
          </PopConfirm>

          <EasyToast
            trigger="hover"
            placement="top"
            overlay="克隆"
            align={{
              offset: ['0', '3']
            }}
          >
            <i
              className="iconfont icon-copy operate-btn"
              onClick={(e) => {
                this.showClone(e, _.find(items, { name: text }));
              }}
              role="presentation"
            />
          </EasyToast>
        </div>
      )
    }, {
      title: '说明 ',
      dataIndex: 'remark',
      render: text => (<div className="remark-text" title={text}>{text || '-'}</div>)
    }, {
      title: '权重',
      width: '20%',
      key: 'weight',
      render: (text, record) => {
        setTimeout(() => {
          if (editWeight >= 0) {
            const weightInput = document.querySelector('.weight-input');
            if (weightInput) {
              document.querySelector('.weight-input').focus();
            }
          }
        }, 100);
        return this.getWeightItem(record, weights);
      }
    }, {
      title: '策略状态',
      key: 'status',
      width: 200,
      render: (text, record) => this.getStatusItem(record, items),
      filters: menuList,
      filterType: 'check',
      onSelectFilter: (filter, filters) => {
        this.setState({
          tableFilter: _.map(filters, o => o.value)
        });
      }
    }, {
      title: '操作',
      key: 'operate',
      width: 60,
      render: (text, record) => {
        const current = _.findIndex(items, { name: this.state.item ? this.state.item.name : null });
        const selected = current === _.findIndex(items, { name: record.name });
        const editable = Strategies.isEditable(_.find(items, { name: record.name }).status);
        return (
          <div className="operate">
            <EasyToast
              trigger="hover"
              placement="top"
              overlay={editable ? '编辑' : '查看'}
              align={{
                offset: ['0', '3']
              }}
            >
              <i className={`iconfont ${editable ? 'icon-edit' : 'icon-eyeo'} ${selected ? 'selected' : ''}`} />
            </EasyToast>
          </div>
        );
      }
    }];

    if (!weightVisible) {
      _.remove(tableColumns, column => column.key === 'weight');
    }

    const me = this;
    const rowSelection = {
      onChange(selectedRow) {
        me.setState({
          selectedRows: selectedRow
        });
      }
    };

    let creator;

    const getStrategy = disabled => (
      <div>
        <Strategy
          ref={(() => 'strategy')()}
          disabled={disabled}
          action={action}
          sceneList={sceneList}
          item={item}
          events={events}
          scene={scene}
          sceneChange={(sceneTemp) => {
            const {
              item: itemTemp
            } = this.state;
            itemTemp.category = sceneTemp.value;
            const index = _.findIndex(itemTemp.terms, o => _.get(o, 'left.subtype') === 'setblacklist');
            _.set(itemTemp, `terms.${index}.left.config.name`, sceneTemp.value);

            this.setState({
              scene: sceneTemp,
              item: itemTemp
            });
          }}
          onChange={(key, value) => this.handleItemChange(key, value)}
        />
        <Terms
          ref={(() => 'terms')()}
          scene={scene}
          disabled={disabled}
          action={action}
          key={timestamp}
          item={item}
          terms={item.terms}
          variables={variables}
          events={events}
          tags={tags}
          onChange={(key, value) => this.handleItemChange(key, value)}
        />
      </div>
    );

    switch (action) {
      case ACTION_DEFAULT:
        break;
      case ACTION_CREATE:
        creator = (
          <div id="strategy" className="strategy-detail-item mask-strategy">
            <header>
              <h2 className="title">添加新策略
                {/* <small>＊为必须填写。</small> */}
                <EasyToast
                  trigger="hover"
                  placement="bottomLeft"
                  overlay={(
                    <div>
                      <p>1.带“*”的输入框是必填项；</p>
                      <p>2.策略名称是全局唯一，保存后不可修改；</p>
                      <p>3.策略条款第一条为定义触发条件；</p>
                      <p>4.策略条款最后一条为定义输出报警方式。</p>
                    </div>
                  )}
                  align={{
                    offset: ['-30', '-5']
                  }}
                >
                  <i className="iconfont icon-questioncircleo" />
                </EasyToast>
              </h2>
              <i
                className="iconfont icon-cross close"
                onClick={() => this.hideMask()}
                role="presentation"
              />
            </header>
            {getStrategy(false)}
            <footer className="clause-footer">
              <button
                className="save"
                onClick={() => this.handleSubmit([item], ACTION_CREATE)}
              >
                保存
              </button>
              <button className="cancel" onClick={() => this.hideMask()}>取消</button>
            </footer>
          </div>
        );
        break;
      default:
    }

    return (
      <div className="wd-strategies container">
        <h1 className="strategy-title">
          <span>策略管理</span>
        </h1>
        <TabBar
          tabList={tabList}
          selectIndex={selectIndex}
          onSelect={(e, tabItem) => {
            this.onTabSelect(tabItem.tabIndex);
          }}
        />

        <StrategyCharts
          tabItem={tabList[selectIndex]}
          onSelectTab={(index) => {
            this.onSelectTab(index);
          }}
        />

        <div className="data-container">
          <h2>
            <span className="table-title">策略列表</span>
            {
              _.map(selectedFilter, (selectedItem, index) => (
                <div key={index} className="selected-filter-label">
                  <span>{selectedItem}</span>
                  <i
                    className="iconfont icon-cross"
                    onClick={() => {
                      this.setState({ selectedFilter: [] });
                    }}
                    role="presentation"
                  />
                </div>
              ))
            }
          </h2>
          <div className="menu-bar">
            <button
              className="main-btn middle-btn"
              onClick={() => this.addStrategy()}
            >
              <i className="iconfont icon-plus" />
              新建策略
            </button>
            <button
              className="ghost-btn middle-btn"
              onClick={() => {
                this.handleChange(true, 'importing');
              }}
            >
              <i className="iconfont icon-download" />
              导入策略
            </button>
            <Menu
              disabled={selectedRows.length === 0}
              className="change-status"
              dataList={menuList}
              menuText="更改状态"
              onSelect={(statusItem) => {
                const params = [];
                selectedRows.forEach((row) => {
                  if (_.includes(getNextStatuses(row.status), statusItem.value)) {
                    params.push({
                      name: row.name,
                      newstatus: statusItem.value
                    });
                  }
                });

                if (params.length === 0) {
                  notification.error({ message: `所选策略状态无法直接更改为"${statusItem.text}"` });
                  return;
                }

                this.handleSubmit(params, ACTION_CHANGE_STATUS, () => {
                  if (params.length !== selectedRows.length) {
                    notification.info({ message: `成功更改${params.length}条策略状态，系统已为您过滤掉无法直接进行更改的策略。` });
                  } else {
                    notification.success({ message: '更新状态成功' });
                  }
                });
              }}
            />
            <div className="actions">
              <EasyToast
                trigger="hover"
                placement="top"
                overlay="导出策略"
                align={{
                  offset: ['0', '3']
                }}
              >
                <i
                  className={`iconfont icon-btn icon-upload${selectedRows.length === 0 ? ' disabled-icon' : ''}`}
                  onClick={() => {
                    Strategies.exportRule(selectedRows);
                  }}
                  role="presentation"
                />
              </EasyToast>

              <EasyToast
                trigger="hover"
                placement="top"
                overlay="批量锁定"
                align={{
                  offset: ['0', '3']
                }}
              >
                <i
                  className={`iconfont icon-btn icon-lock${selectedRows.length === 0 ? ' disabled-icon' : ''}`}
                  onClick={() => {
                    this.lockChange(selectedRows, true);
                  }}
                  role="presentation"
                />
              </EasyToast>

              <EasyToast
                trigger="hover"
                placement="top"
                overlay="批量解锁"
                align={{
                  offset: ['0', '3']
                }}
              >
                <i
                  className={`iconfont icon-btn icon-unlock${selectedRows.length === 0 ? ' disabled-icon' : ''}`}
                  onClick={() => {
                    this.lockChange(selectedRows, false);
                  }}
                  role="presentation"
                />
              </EasyToast>
              <PopConfirm
                visible={this.state.delVisible}
                trigger="click"
                placement="top"
                overlay="策略删除的操作是无法撤销的，如果您暂时不确认是否后面还需要该策略，我们建议您“下线”策略依然可以达到暂停的效果"
                onVisibleChange={(visible) => {
                  if (selectedRows.length !== 0) {
                    this.setState({
                      delVisible: visible
                    });
                  }
                }}
                onConfirm={(e, res) => (
                  res ?
                    this.handleSubmit(_.map(selectedRows, o => ({ name: o.name })), ACTION_DELETE)
                    : null
                )}
                align={{
                  offset: ['0', '3']
                }}
              >
                <EasyToast
                  trigger="hover"
                  placement="top"
                  overlay="批量删除"
                  align={{
                    offset: ['0', '3']
                  }}
                >
                  <i
                    className={`iconfont icon-btn icon-delete${selectedRows.length === 0 ? ' disabled-icon' : ''}`}
                    role="presentation"
                  />
                </EasyToast>
              </PopConfirm>

              <ImportDialog
                visible={importing}
                onChange={(value) => {
                  this.fetchStrategies();
                  this.handleChange(value, 'importing');
                }}
              />
            </div>
            <div
              className="filter-btn"
              onClick={() => {
                this.setState({ showFilter: !showFilter });
              }}
              role="presentation"
            >
              <span>筛选标签</span>
              <i className={`iconfont ${showFilter ? 'icon-caretup' : 'icon-caretdown'}`} />
            </div>

            <Select
              className="strategy-search"
              dataList={keyword ? _.map(itemsOrg, o => ({ text: o.name, value: o.name })) : []}
              notFoundContent=""
              placeholder="搜索策略名称"
              value={{ text: keyword, value: keyword }}
              combobox
              filterOption={
                (inputValue, option) =>
                option.props.text.toLowerCase().indexOf(inputValue.toLowerCase()) >= 0
              }
              onChange={value => this.setState({ keyword: value })}
            />
          </div>
          <div style={{ display: showFilter ? 'block' : 'none' }} className="tags-container">
            {
              _.map(filterList, (value, key) => (
                <div key={key} className="filter-labels">
                  <div
                    className={`label-item ${key === selectedFilter[0] ? 'active' : ''}`}
                    onClick={() => {
                      this.changeFilter(key);
                    }}
                    role="presentation"
                  >
                    <span className="label-text">{key}</span>
                    <span className="label-count">{value}</span>
                  </div>
                </div>
              ))
            }
          </div>

          <div className="data-table">
            <BTable
              data={tableData}
              columns={tableColumns}
              rowSelection={rowSelection}
              fixedHeader
              updateType="all"
              onRowExpand={(index, expand) => {
                if (expand) {
                  this.setState({
                    [KEY_ITEM]: _.cloneDeep(items[index]),
                    [KEY_ACTION]: ACTION_DEFAULT
                  });
                } else {
                  this.handleChange(_.cloneDeep(_.find(items, { name: item.name })), 'item');
                  this.hideMask();
                }
              }}
              bind={(tableApi) => {
                this.state.tableApi = tableApi;
              }}
              expandedRow={() => {
                const disabled = !Strategies.isEditable(item.status);
                return (
                  <div className="strategy-detail-item">
                    {getStrategy(disabled)}
                    <footer className="clause-footer">
                      <button
                        disabled={disabled}
                        className="save"
                        onClick={() => this.handleSubmit([item], ACTION_UPDATE)}
                      >
                        保存
                      </button>
                      <button
                        className="cancel"
                        onClick={() => {
                          this.handleChange(_.cloneDeep(_.find(items, { name: item.name })), 'item');
                          this.hideMask();
                        }}
                      >
                        取消
                      </button>
                    </footer>
                    {
                      disabled ? (
                        <div className="disable-tip">
                          <i className="iconfont icon-exclamationcircle" />
                          策略在“编辑”状态下才可进行编辑保存。
                        </div>
                      ) : null
                    }
                  </div>
                );
              }}
            />
            {
              this.getEmptyText(tableData, itemsOrg)
            }
          </div>
        </div>
        <div id="mask" style={{ display: 'none' }} className="mask">
          {creator}
        </div>
        <Dialog
          visible={cloneVisible}
          className="strategy-clone-dialog"
          destroy
          title="克隆策略"
          buttons={cloneBtns}
          onClose={() => {
            this.setState({ cloneVisible: false });
          }}
        >
          <p>
            <span className="clone-title">
              克隆当前策略为
              <span className="clone-name"> {cloneItem.name} </span>
              ，请重新命名新的策略名称。
            </span>
          </p>
          <div className="rule-name-container">
            <span>策略名称</span>
            <TextField
              className="rule-name"
              type="text"
              placeholder="输入新建策略名称"
              onChange={(e) => {
                this.setState({ cloneName: e.target.value });
              }}
              isError={isError}
              errorText={errorText}
            />
          </div>
        </Dialog>
        <Toast visible={toastVisible} onClose={() => this.setState({ toastVisible: false })}>
          {toastMsg}
        </Toast>
      </div>
    );
  }
}

export default Strategies;
