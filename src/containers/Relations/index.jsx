import React, { Component } from 'react';
import BChart from 'BChart';
import _ from 'lodash';

import CheckBox from '../../components/CheckBox';
import Selector from '../../components/Selector';
import Input from '../../components/Input';
import Dialog from '../../components/Dialog';

import './index.scss';

const colors = {
  User: '#16FBB6',
  IP: '#22C3F7',
  DID: '#164BFB'
};

const warningLine = 8;

class Relations extends Component {

  constructor(props) {
    super(props);

    const typeList = [];
    Object.keys(colors).forEach((key) => {
      typeList.push({
        text: key,
        value: key
      });
    });

    this.state = {
      data: [],
      filterData: [],
      selectedItem: null,
      curRelations: [],
      allTypes: [],
      uncheckedTypeNode: [],
      uncheckedRelations: [],
      selectedRelations: [],
      hideType: [],
      hideNode: [],
      showNode: true,
      showRelation: true,
      relationsChart: {},
      selectRoot: {
        type: typeList[0].value
      },
      typeList,
      keyword: '',
      visible: false,
      resetNode: false,
      resetRelation: false
    };
  }

  nodeLevelChart() {
    const data = [];
    const maxValue = _.get(_.maxBy(this.state.data, 'value'), 'value');
    const each = maxValue / 10;

    for (let i = 1; i < 11; i += 1) {
      const curItems = _.filter(this.state.data, o => (
        (i === 1 && o.value === 0) ||
        (o.value > (i - 1) * each && o.value <= i * each)
      ));
      data.push({
        x: i,
        y: curItems.length,
        value: curItems
      });
    }
    // 初始化对象
    const barChart = new BChart('#nodeLevel');
    barChart
    // 基本配置
      .setConfig({
        name: 'node',
        type: 'bar',
        data
      })
      // x轴配置
      .setXAxis({
        gridLine: false,
        show: false,
        border: false
      })
      // Y轴配置
      .setYAxis({
        gridLine: false,
        show: false,
        border: false
      })
      .setFixedPadding({
        top: 0,
        bottom: 0
      })
      .setHoverText(params => `${Math.round((params.y / this.state.data.length) * 100)}%`)// 鼠标悬浮显示数据信息
      .setChartProperty({
        type: 'dataZoom',
        start: 0,
        width: 0,
        onChange: (items) => {
          const relationItemsMap = _.map(items.data, o => o.value);

          let relationItems = [];
          relationItemsMap.forEach((o) => {
            relationItems = relationItems.concat(o);
          });
          const ids = _.map(relationItems, o => o.id);

          this.state.filterData = relationItems;
          this.state.relationsChart
            .setShowFilter({
              ids,
              relations: this.state.relations
            });

          this.setState({
            filterData: relationItems,
            ids,
            resetNode: true
          });
        }
      })
      // 构建图表
      .build();

    this.setState({
      ids: undefined,
      resetNode: false
    });
  }

  relationLevelChart() {
    const data = [];
    const targetsMap = _.map(this.state.data, o => o.target);
    let targets = [];
    targetsMap.forEach((item) => {
      targets = targets.concat(item);
    });

    const maxValue = _.get(_.maxBy(targets, 'relation'), 'relation');
    const each = maxValue / 10;

    for (let i = 1; i < 11; i += 1) {
      const curItems = _.filter(targets, o => (
        (i === 1 && o.relation === 0) ||
        (o.relation > (i - 1) * each && o.relation <= i * each)
      ));
      data.push({
        x: i,
        y: curItems.length,
        value: curItems
      });
    }
    // 初始化对象
    const barChart = new BChart('#relationLevel');
    barChart
    // 基本配置
      .setConfig({
        name: 'relation',
        type: 'bar',
        data
      })
      // x轴配置
      .setXAxis({
        gridLine: false,
        show: false,
        border: false
      })
      // Y轴配置
      .setYAxis({
        gridLine: false,
        show: false,
        border: false
      })
      .setFixedPadding({
        top: 0,
        bottom: 0
      })
      .setHoverText(params => `${Math.round((params.y / targets.length) * 100)}%`)// 鼠标悬浮显示数据信息
      .setChartProperty({
        type: 'dataZoom',
        start: 0,
        width: 0,
        onChange: (items) => {
          const relationItemsMap = _.map(items.data, o => o.value);

          let relationItems = [];
          relationItemsMap.forEach((o) => {
            relationItems = relationItems.concat(o);
          });
          const relations = _.map(relationItems, o => o.relation);

          this.state.relationsChart
            .setShowFilter({
              ids: this.state.ids,
              relations
            });
          this.setState({
            relations,
            resetRelation: true
          });
        }
      })
      // 构建图表
      .build();

    this.setState({
      relations: undefined,
      resetRelation: false
    });
  }

  // 删除多余节点
  removeItems() {
    const targetItems = _.filter(this.state.data, item => item.target.length > 0);
    let targets = [{
      id: 0
    }];
    targetItems.forEach((item) => {
      targets = targets.concat(item.target);
    });

    const items = _.remove(this.state.data, item => !_.find(targets, o => (o.id === item.id)));

    if (items.length > 0) {
      this.removeItems();
    }
  }

  // 显示关系图
  showRelationChart(selectRoot) {
    const data = [];
    for (let i = 0; i < 8; i += 1) {
      let type = this.state.selectRoot.type;
      let text = this.state.selectRoot.value;
      let color = colors[type];
      if (i === 0) {
        color = '#FFF';
      } else {
        text = Math.random();
        switch (i % 3) {
          case 0:
            type = 'User';
            color = colors[type];
            break;
          case 1:
            type = 'IP';
            color = colors[type];
            break;
          case 2:
            type = 'DID';
            color = colors[type];
            break;
          default:
        }
      }

      data.push({
        // id
        id: i,
        // 关联节点
        target: [],
        // 节点类型
        type,
        // 节点文字
        text,
        // 节点级别
        value: parseInt(Math.random() * 10, 10),
        // 颜色根据节点类型自动生成
        color,
        // 报警值
        warningValue: Math.random() * 10
      });
    }

    data[0].target = [{
      id: 1,
      relation: Math.random() * 5,
      relationType: 'type1'
    }, {
      id: 2,
      relation: Math.random() * 5,
      relationType: 'type2'
    }, {
      id: 3,
      relation: Math.random() * 5,
      relationType: 'type3'
    }, {
      id: 4,
      relation: Math.random() * 5,
      relationType: 'type4'
    }, {
      id: 5,
      relation: Math.random() * 5,
      relationType: 'type1'
    }, {
      id: 6,
      relation: Math.random() * 5,
      relationType: 'type2'
    }, {
      id: 7,
      relation: Math.random() * 5,
      relationType: 'type3'
    }];

    this.setState({
      selectRoot,
      data,
      filterData: data
    }, () => {
      this.state.relationsChart = new BChart('#relations');
      this.state.relationsChart
        .setConfig({
          type: 'relation',
          distance: 40,
          data,
          warningLine,
          // pinch: true,
          onDbClick: (param) => {
            const {
              index,
              value
            } = param;

            const idMax = _.last(this.state.data).id;
            const ids = [];

            if (value.target.length === 0) {
              for (let i = 1; i < 9; i += 1) {
                let type = 'User';
                let color = colors[type];
                switch (i % 3) {
                  case 0:
                    type = 'User';
                    color = colors[type];
                    break;
                  case 1:
                    type = 'IP';
                    color = colors[type];
                    break;
                  case 2:
                    type = 'DID';
                    color = colors[type];
                    break;
                  default:
                }
                this.state.data.push({
                  id: idMax + i,
                  target: [],
                  text: Math.random(),
                  value: parseInt(Math.random() * 10, 10),
                  type,
                  color,
                  warningValue: Math.random() * 10
                });
                ids.push({
                  id: idMax + i,
                  relation: Math.random() * 5,
                  relationType: `type${i % 4}`
                });
              }

              this.state.data[index].target = ids;
            } else if (index !== 0) {
              this.state.data[index].target = [];

              this.removeItems();
            }
            this.state.relationsChart.setRelationUnselected();

            this.state.relationsChart
              .setConfig({
                data: this.state.data
              })
              .relationMapRedraw();

            this.nodeLevelChart();
            this.relationLevelChart();
            this.setState({
              filterData: this.state.data
            });
          },
          selectPoint: (param, selectedRelationsOrg) => {
            // 取消选择
            if (!param) {
              this.state.relationsChart.relationFilter = {
                type: [],
                relationType: []
              };

              this.setState({
                selectedItem: param,
                hideType: [],
                hideNode: [],
                uncheckedRelations: [],
                uncheckedTypeNode: []
              });
              return;
            }
            const ids = _.map(this.state.filterData, o => o.id);

            const selectedRelations = _.filter(selectedRelationsOrg, o => ids.indexOf(o.id) >= 0);

            // 选中元素
            const selectedItem = param.value;

            // 筛选关联节点
            const curRelations = _.countBy(selectedRelations, 'type');

            // 筛选关联关系
            const allTypes = _.countBy(selectedRelations, 'relationType');

            this.setState({
              selectedItem,
              curRelations,
              allTypes,
              selectedRelations
            });
          }
        })
        .setHoverText(d => `${d.type}: ${d.text}`)
        .build();

      this.nodeLevelChart();
      this.relationLevelChart();
    });
  }

  // 显示帮助信息
  showHelpInfo() {
    // 根节点信息
    const nodes = document.querySelectorAll('#relations .relation-point-container circle');
    const rootNodePos = nodes[0].getClientRects()[0];

    // 可拓展节点信息
    const pointIndex = _.findIndex(this.state.data, o => o.target.length === 0);
    const normalNodePos = nodes[pointIndex].getClientRects()[0];
    // 判断根节点与拓展节点位置
    let pos = 'left';
    let left = normalNodePos.left;
    if (normalNodePos.left > rootNodePos.left) {
      pos = 'right';
      left = normalNodePos.left + normalNodePos.width;
    }

    this.setState({
      showHelp: true,
      rootPos: {
        top: rootNodePos.top,
        left: rootNodePos.left + (rootNodePos.width / 2)
      },
      nodePos: {
        top: normalNodePos.top + (normalNodePos.height / 2),
        left
      },
      relativePos: pos
    });
  }

  render() {
    const {
      selectedItem,
      curRelations,
      allTypes,
      showNode,
      showRelation,
      uncheckedTypeNode,
      uncheckedRelations,
      selectedRelations,
      hideType,
      hideNode,
      relationsChart,
      data,
      selectRoot,
      typeList,
      keyword,
      visible,
      resetRelation,
      resetNode,
      showHelp,
      rootPos,
      nodePos,
      relativePos
    } = this.state;

    return selectRoot.value ? (
      <div className="wd-relations container">
        <div
          id="relations"
          className="relations-container"
          onClick={(e) => {
            if (e.target.nodeName !== 'circle' && e.target.nodeName !== 'line') {
              relationsChart.setRelationUnselected();
            }
          }}
          role="presentation"
        />
        <div
          className="main-board"
          onClick={() => {
            relationsChart.setRelationUnselected();
          }}
          role="presentation"
        >
          <div className="btn-container">
            <button
              className="main-btn middle-btn"
              onClick={() => this.setState({ visible: true })}
            >切换根节点
            </button>
            <i
              className="iconfont icon-questioncircleo help-icon"
              onMouseEnter={() => this.showHelpInfo()}
              onMouseOut={() => this.setState({ showHelp: false })}
            />
          </div>
          <div className="root-node">
            <h3>根节点</h3>
            <p title={data[0].text}>{data[0].type}: {data[0].text}</p>
          </div>
          <div className="legend">
            {
              _.map(colors, (color, key) => (
                <div className="legend-container" key={key}>
                  <i className="legend-icon" style={{ backgroundColor: color }} />
                  <span className="type-text">{key}</span>
                  <span className="count-text">{_.filter(data, { type: key }).length}</span>
                </div>
              ))
            }
            <div className="legend-container">
              <i className="legend-icon warning" />
              <span className="type-text">存在风险</span>
              <span className="count-text">{_.filter(data, o => o.warningValue >= warningLine).length}</span>
            </div>
          </div>
          <div className="chart-container">
            <h3>
              节点级别
              <span
                style={{ display: resetNode ? '' : 'none' }}
                onClick={() => {
                  this.nodeLevelChart();
                  this.state.relationsChart
                    .setShowFilter({
                      relations: this.state.relations
                    });
                  this.setState({
                    ids: undefined,
                    filterData: this.state.data
                  });
                }}
                role="presentation"
              >reset</span>
            </h3>
            <div id="nodeLevel" className="bar-chart" />
            <div className="chart-footer">
              <span>min</span>
              <span>max</span>
            </div>
          </div>
          <div className="chart-container">
            <h3>
              关系级别
              <span
                style={{ display: resetRelation ? '' : 'none' }}
                onClick={() => {
                  this.relationLevelChart();
                  this.state.relationsChart
                    .setShowFilter({
                      ids: this.state.ids
                    });
                  this.setState({
                    relations: undefined
                  });
                }}
                role="presentation"
              >reset</span>
            </h3>
            <div id="relationLevel" className="bar-chart" />
            <div className="chart-footer">
              <span>min</span>
              <span>max</span>
            </div>
          </div>
        </div>
        {
          selectedItem ? (
            <div className="selected-board">
              <header>
                <h3>选中节点</h3>
                <div className="selected-node-info">
                  <span>{selectedItem.type}: {selectedItem.text}</span>
                  <i className="iconfont icon-download" />
                </div>
              </header>
              <ul className="relations-body">
                <li>
                  <div
                    className="title"
                    onClick={() => this.setState({ showNode: !showNode })}
                    role="presentation"
                  >
                    <i className="iconfont icon-sharealt" />
                    <span>关联节点</span>
                    <i className={`iconfont icon-caret${showNode ? 'up' : 'down'}`} />
                  </div>
                  {
                    showNode ? (
                      <ul className="relations-ul">
                        {
                          _.map(curRelations, (count, type) => (
                            <li key={type}>
                              <CheckBox
                                checked={uncheckedTypeNode.indexOf(type) < 0}
                                onClick={() => {
                                  if (uncheckedTypeNode.indexOf(type) < 0) {
                                    uncheckedTypeNode.push(type);
                                  } else {
                                    _.remove(uncheckedTypeNode, o => o === type);
                                  }

                                  // 筛选过滤
                                  relationsChart
                                    .setRelationFilter({
                                      type: uncheckedTypeNode,
                                      relationType: uncheckedRelations
                                    });

                                  this.setState({
                                    uncheckedTypeNode
                                  });
                                }}
                              />
                              <span className="relation-type">{type}</span>
                              <span className="relation-count">{count}</span>
                            </li>
                          ))
                        }
                      </ul>
                    ) : null
                  }
                </li>
                <li>
                  <div
                    className="title"
                    onClick={() => this.setState({ showRelation: !showRelation })}
                    role="presentation"
                  >
                    <i className="iconfont icon-sharealt" />
                    <span>关联关系</span>
                    <i className={`iconfont icon-caret${showRelation ? 'up' : 'down'}`} />
                  </div>
                  {
                    showRelation ? (
                      <ul className="relations-ul">
                        {
                          _.map(allTypes, (count, relationType) => (
                            <li key={relationType}>
                              <CheckBox
                                checked={uncheckedRelations.indexOf(relationType) < 0}
                                onClick={() => {
                                  if (uncheckedRelations.indexOf(relationType) < 0) {
                                    uncheckedRelations.push(relationType);
                                  } else {
                                    _.remove(uncheckedRelations, o => o === relationType);
                                  }

                                  // 筛选过滤
                                  relationsChart
                                    .setRelationFilter({
                                      type: uncheckedTypeNode,
                                      relationType: uncheckedRelations
                                    });

                                  this.setState({
                                    uncheckedRelations
                                  });
                                }}
                              />
                              <span className="relation-type">{relationType}</span>
                              <span className="relation-count">{count}</span>
                            </li>
                          ))
                        }
                      </ul>
                    ) : null
                  }
                </li>
                {
                  _.map(curRelations, (count, type) => (
                    uncheckedTypeNode.indexOf(type) < 0 ? (
                      <li key={type}>
                        <div
                          className="title"
                          onClick={() => {
                            hideType[type] = !hideType[type];
                            this.setState({ hideType });
                          }}
                          role="presentation"
                        >
                          <i className="node-icon" style={{ backgroundColor: colors[type] }} />
                          <span>{type} 节点</span>
                          <i className={`iconfont icon-caret${hideType[type] ? 'down' : 'up'}`} />
                        </div>
                        {
                          !hideType[type] ? (
                            <ul className="nodes-ul">
                              {
                                _.map(allTypes, (countTypes, relationType) => {
                                  const curItems =
                                    _.filter(selectedRelations, { type, relationType });
                                  return (curItems.length > 0 &&
                                  uncheckedRelations.indexOf(relationType) < 0) ? (
                                    <li key={relationType}>
                                      <div
                                        className="title"
                                        onClick={() => {
                                          hideNode[`${type}_${relationType}`] = !hideNode[`${type}_${relationType}`];
                                          this.setState({ hideNode });
                                        }}
                                        role="presentation"
                                      >
                                        <span>{relationType}</span>
                                        <i
                                          className={`iconfont icon-caret${hideNode[`${type}_${relationType}`] ? 'down' : 'up'}`}
                                        />
                                      </div>
                                      {
                                        !hideNode[`${type}_${relationType}`] ? (
                                          <ul>
                                            {
                                              _.map(curItems, (item, key) => (
                                                <li
                                                  key={key}
                                                  className={`relation-node ${item.warningValue >= warningLine ? 'warning' : ''}`}
                                                >{item.text}</li>
                                              ))
                                            }
                                          </ul>
                                        ) : null
                                      }
                                    </li>
                                  ) : null;
                                })
                              }
                            </ul>
                          ) : null
                        }
                      </li>
                    ) : null
                  ))
                }
              </ul>
            </div>
          ) : null
        }

        <Dialog
          className="wd-relation-search-dialog"
          visible={visible}
          style={{ width: '950px' }}
          destroy
          onClose={() => this.setState({ visible: false })}
        >
          <div className="wd-relation-search">
            <div className="search-input-container">
              <Selector
                dataList={typeList}
                value={_.find(typeList, { value: selectRoot.type })}
                onChange={(param) => {
                  selectRoot.type = param.value;
                  this.setState({
                    selectRoot
                  });
                }}
              />
              <Input
                className="relation-search-input"
                value={keyword}
                placeholder={`请输入${selectRoot.type}`}
                onKeyDown={(e) => {
                  if (e.target.value && e.keyCode === 13) {
                    selectRoot.value = e.target.value;
                    this.showRelationChart(selectRoot);
                    this.setState({
                      visible: false,
                      selectedItem: null
                    });
                  }
                }}
                onChange={(value) => {
                  this.setState({
                    keyword: value
                  });
                }}
              />
            </div>

            <p>搜索一个您关注的风险值作为种子节点</p>
          </div>
        </Dialog>

        {
          showHelp ? (
            <div className="help-text">
              <div className="help-info root-help" style={rootPos}>
                <span>根节点</span>
                <i className="arrow-icon" />
              </div>
              <div className={`help-info node-help node-${relativePos}`} style={nodePos}>
                <span>鼠标单击“查看详情”，双击“展开”或“收起”下一层节点。</span>
                <i className="arrow-icon" />
              </div>
            </div>
          ) : null
        }
      </div>
    ) : (
      <div className="wd-relations container">
        <div className="wd-relation-search">
          <h1>关系图</h1>
          <div className="search-input-container">
            <Selector
              dataList={typeList}
              value={_.find(typeList, { value: selectRoot.type })}
              onChange={(param) => {
                selectRoot.type = param.value;
                this.setState({
                  selectRoot
                });
              }}
            />
            <Input
              className="relation-search-input"
              value={keyword}
              placeholder={`请输入${selectRoot.type}`}
              onKeyDown={(e) => {
                if (e.target.value && e.keyCode === 13) {
                  selectRoot.value = e.target.value;
                  this.showRelationChart(selectRoot);
                }
              }}
              onChange={(value) => {
                this.setState({
                  keyword: value
                });
              }}
            />
          </div>

          <p>搜索一个您关注的风险值作为种子节点</p>
        </div>
      </div>
    );
  }
}

export default Relations;
