import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import CheckBox from '../CheckBox';

import './index.scss';

class BTable extends Component {
  static propTypes = {
    data: PropTypes.oneOfType([PropTypes.array]),
    columns: PropTypes.oneOfType([PropTypes.array]),
    bind: PropTypes.func,
    onRowExpand: PropTypes.func,
    expandedRow: PropTypes.func,
    onRowClick: PropTypes.func,
    onLoadMore: PropTypes.func,
    rowSelection: PropTypes.oneOfType([PropTypes.object]),
    hoverable: PropTypes.bool,
    fixedHeader: PropTypes.bool,
    totalDataLength: PropTypes.number,
    className: PropTypes.string,
    updateType: PropTypes.string,
    bodyHeight: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
  };
  static defaultProps = {
    data: [],
    columns: undefined,
    className: '',
    updateType: 'dataUpdate',
    bodyHeight: undefined,
    bind: undefined,
    onRowExpand: undefined,
    expandedRow: undefined,
    onLoadMore: undefined,
    onRowClick: undefined,
    rowSelection: undefined,
    totalDataLength: 0,
    hoverable: true,
    fixedHeader: false
  };

  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      allChecked: false,
      checkArray: [],
      expandRowIndex: -1,
      sorterStatus: {
        key: undefined,
        ascending: false
      },
      selectedFilter: {
        filterItems: []
      },
      showFilter: false
    };
  }

  componentDidMount() {
    const {
      bind
    } = this.props;

    if (bind) {
      const tableApi = {
        hideExpendRow: this.hideExpendRow.bind(this),
        clearCheck: this.clearCheck.bind(this)
      };
      bind(tableApi);
    }

    function setFilter(e) {
      const filter = document.querySelector('.b-table-header-column .filter-container .show-filter');
      if (filter && this.state.showFilter) {
        if (e.target.className.indexOf('iconfont icon-filter filter') >= 0 ||
          e.target.className.indexOf('cell-title-text') >= 0 ||
          e.target.className.indexOf('filter-item') >= 0) {
          return;
        }
        this.setState({
          showFilter: false
        });
      }
    }

    document.body.removeEventListener('click', setFilter.bind(this));
    document.body.addEventListener('click', setFilter.bind(this));
  }

  shouldComponentUpdate(props, state) {
    return (
      this.props.updateType === 'all' ||
      JSON.stringify(this.props) !== JSON.stringify(props) ||
      JSON.stringify(this.state) !== JSON.stringify(state)
    );
  }

  componentWillUpdate(props) {
    if (JSON.stringify(this.props.data) !== JSON.stringify(props.data)) {
      this.clearCheck();
    }
  }

  // 鼠标进入
  onMouseEnter(e) {
    if (!this.props.hoverable) {
      return;
    }

    e.currentTarget.className += ' hovered';
  }

  // 鼠标离开
  onMouseLeave(e) {
    if (!this.props.hoverable) {
      return;
    }

    const cls = e.currentTarget.className;
    const start = cls.indexOf('hovered');
    if (start >= 0) {
      e.currentTarget.className = cls.substr(0, start - 1) + cls.substr(start + 7, cls.length - 1);
    }
  }

  // 点击行
  onRowClick(i, item) {
    const {
      expandedRow,
      onRowExpand,
      onRowClick
    } = this.props;
    const {
      expandRowIndex
    } = this.state;

    if (onRowClick) {
      onRowClick(item, i);
    }

    if (!expandedRow) {
      return;
    }
    let index = -1;
    if (expandRowIndex !== i) {
      index = i;
    }

    if (onRowExpand) {
      onRowExpand(i, expandRowIndex !== i);
    }
    this.setState({
      expandRowIndex: index
    });
  }

  // 全选
  onSelectAll() {
    const {
      allChecked,
      checkArray
    } = this.state;
    const {
      data,
      rowSelection
    } = this.props;

    // 选中内容
    const selectedRows = [];
    // 点击全选
    data.forEach((item, index) => {
      // 如果没有被禁用则勾选
      if (!(rowSelection.getCheckboxProps && rowSelection.getCheckboxProps(item).disabled)) {
        checkArray[index] = !allChecked;
      }
      if (checkArray[index]) {
        selectedRows.push(item);
      }
    });

    // 全选回调
    if (rowSelection.onSelectAll) {
      rowSelection.onSelectAll(!allChecked, selectedRows);
    }
    if (rowSelection.onChange) {
      rowSelection.onChange(selectedRows);
    }

    this.setState({
      checkArray,
      allChecked: !allChecked
    });
  }

  // 选择
  onSelect(e, index) {
    e.stopPropagation();
    const {
      checkArray
    } = this.state;
    const {
      data,
      rowSelection
    } = this.props;

    checkArray[index] = !checkArray[index];

    let allChecked = true;
    // 选中内容
    const selectedRows = [];
    // 判断是否全选
    data.forEach((item, i) => {
      // 如果有项目没有被禁用并且没有被勾选，则不是全选
      if (!checkArray[i] &&
        !(rowSelection.getCheckboxProps && rowSelection.getCheckboxProps(item).disabled)) {
        allChecked = false;
      }
      if (checkArray[i]) {
        selectedRows.push(item);
      }
    });
    // 选中回调
    if (rowSelection.onSelect) {
      rowSelection.onSelect(data[index], checkArray[index], selectedRows);
    }
    if (rowSelection.onChange) {
      rowSelection.onChange(selectedRows);
    }

    this.setState({
      checkArray,
      allChecked
    });
  }

  // 过滤
  setFilter(itemTemp, filterItem) {
    let {
      selectedFilter,
      showFilter
    } = this.state;

    const item = itemTemp;
    let {
      filterItems
    } = selectedFilter;

    if (item.filterType === 'check') {
      // 多选
      if (_.find(filterItems, { value: filterItem.value })) {
        _.remove(filterItems, { value: filterItem.value });
      } else {
        filterItems.push(filterItem);
      }
    } else {
      // 单选
      showFilter = false;
      if (_.find(filterItems, { value: filterItem.value })) {
        filterItems = [];
      } else {
        filterItems = [filterItem];
      }
    }

    selectedFilter = {
      onFilter: item.onFilter,
      filterItems
    };

    // 回调
    if (item.onSelectFilter) {
      item.onSelectFilter(filterItem, filterItems);
    }

    this.setState({
      selectedFilter,
      showFilter
    });
  }

  // 获取子项深度，格式化表头数据
  getChildrenDeep(children, colTemp, d) {
    let maxDeep = 1;
    const index = d || 1;
    const col = colTemp;

    children.forEach((item) => {
      let deep = 1;

      if (item.children) {
        deep = this.getChildrenDeep(item.children, col, index + 1);
        deep += 1;
      }
      if (deep > maxDeep) {
        maxDeep = deep;
      }
      if (col[index - 1]) {
        col[index - 1].push(item);
      } else {
        col[index - 1] = [item];
      }
    });
    return maxDeep;
  }

  // 排序
  setOrder(item, ascending) {
    const sorterStatus = _.cloneDeep(this.state.sorterStatus);
    // 点击已排序的选项
    if (sorterStatus.ascending === ascending && item.key === sorterStatus.key) {
      sorterStatus.key = undefined;
      this.setState({
        sorterStatus
      });
      return;
    }
    sorterStatus.key = item.key;
    sorterStatus.ascending = ascending;
    sorterStatus.sortFn = item.sorter;
    sorterStatus.timestamp = new Date().getTime();
    this.setState({
      sorterStatus
    });
  }

  // 获取数据的直接标题
  getRowTitle(columns, rowTitle) {
    columns.forEach((item) => {
      if (item.children) {
        // 有子元素则添加子元素
        this.getRowTitle(item.children, rowTitle);
      } else {
        rowTitle.push(item);
      }
    });
  }

  // 表格排版
  getColGroup(rowTitle) {
    const {
      rowSelection
    } = this.props;

    return (
      <colgroup>
        {
          rowSelection ? (
            <col style={{ width: '30px', minWidth: '30px', maxWidth: '30px' }} />
          ) : null
        }
        {
          _.map(rowTitle, (item, index) => (
            <col
              key={index}
              style={{ width: item.width, minWidth: item.width, maxWidth: item.width }}
            />
          ))
        }
      </colgroup>
    );
  }

  // 根据排序和过滤器帅选表格数据
  setTableData(data) {
    const {
      selectedFilter,
      sorterStatus
    } = this.state;
    let tableData = data;

    // 排序
    if (sorterStatus.key !== undefined) {
      // 排序
      tableData.sort(sorterStatus.sortFn);
      // 降序则翻转数组
      if (!sorterStatus.ascending) {
        tableData.reverse();
      }
    }

    // 过滤
    if (selectedFilter.onFilter) {
      tableData =
        _.filter(tableData, item => selectedFilter.onFilter(item, selectedFilter.filterItems));
    }

    return tableData;
  }

  hideExpendRow() {
    this.setState({ expandRowIndex: -1 });
  }

  // 创建表格
  createTableBody(rowTitle, data) {
    const {
      rowSelection,
      expandedRow,
      onLoadMore,
      totalDataLength
    } = this.props;

    const {
      checkArray,
      expandRowIndex,
      loading
    } = this.state;

    const totalCol = rowTitle.length + (rowSelection ? 1 : 0);

    return (
      <tbody>
        {
          _.map(data, (item, index) => {
            let rowSpan = 1;
            const hasChildren = !!item.dataChildren;
            // 有子项，计算首行rowspan
            if (hasChildren) {
              rowSpan = item.dataChildren.length;
            }
            let showRow = [(
              <tr
                key={index}
                className={`b-table-body-row ${checkArray[index] ? 'selected' : ''}`}
                onMouseEnter={(e) => {
                  this.onMouseEnter(e);
                }}
                onMouseLeave={(e) => {
                  this.onMouseLeave(e);
                }}
                onClick={() => {
                  this.onRowClick(index, item);
                }}
              >
                {
                  rowSelection ? (
                    <td rowSpan={rowSpan} className="b-table-body-column check-box-column">
                      <CheckBox
                        {
                          ...(
                            rowSelection.getCheckboxProps ?
                              rowSelection.getCheckboxProps(item) :
                              []
                          )
                        }
                        checked={checkArray[index]}
                        onClick={(e) => {
                          this.onSelect(e, index);
                        }}
                      />
                    </td>
                  ) : null
                }
                {
                  _.map(rowTitle, (title, key) => {
                    let itemTemp = item;
                    if (title.type === 'child') {
                      itemTemp = item.dataChildren[0];
                    }
                    let content = itemTemp[title.dataIndex];
                    if (title.render) {
                      content = title.render(itemTemp[title.dataIndex], item, index, 0);
                    }

                    return (
                      <td
                        key={key}
                        rowSpan={title.type === 'child' ? 1 : rowSpan}
                        className={`b-table-body-column${title.type === 'split' ? ' cell-split' : ''}`}
                      >
                        <div className="cell-content">
                          {content}
                        </div>
                      </td>
                    );
                  })
                }
              </tr>
            )];

            // 有子项，添加子项数据
            if (hasChildren) {
              showRow = showRow.concat(
                _.map(item.dataChildren, (child, childIndex) => {
                  if (childIndex === 0) {
                    return null;
                  }
                  return (
                    <tr
                      key={`${index}_${childIndex}`}
                      className={`b-table-body-row children-cell ${checkArray[index] ? 'selected' : ''}`}
                      onMouseEnter={(e) => {
                        this.onMouseEnter(e);
                      }}
                      onMouseLeave={(e) => {
                        this.onMouseLeave(e);
                      }}
                      onClick={() => {
                        this.onRowClick(index, childIndex);
                      }}
                    >
                      {
                        _.map(rowTitle, (title, key) => {
                          if (title.type === 'child') {
                            let content = child[title.dataIndex];
                            if (title.render) {
                              content =
                                title.render(child[title.dataIndex], item, index, childIndex);
                            }
                            return (
                              <td key={key} className="b-table-body-column">
                                <div className="cell-content">
                                  {content}
                                </div>
                              </td>
                            );
                          }

                          return null;
                        })
                      }
                    </tr>
                  );
                })
              );
            }

            // 展开
            if (expandRowIndex === index) {
              let colSpan = rowTitle.length;
              // 有选择框则再加一列
              if (rowSelection) {
                colSpan += 1;
              }
              const expandTr = (
                <tr>
                  <td colSpan={colSpan}>
                    {expandedRow(item)}
                  </td>
                </tr>
              );
              showRow.push(expandTr);
            }
            return showRow;
          })
        }
        {
          onLoadMore && data.length < totalDataLength ? (
            <tr className="b-table-body-row load-more-row">
              <td colSpan={totalCol} className="b-table-body-column">
                <div
                  className="load-more"
                  onClick={() => {
                    this.setState({
                      loading: true
                    });
                    onLoadMore(() => {
                      this.setState({
                        loading: false
                      });
                    });
                  }}
                  role="presentation"
                >
                  {
                    loading ? '正在加载...' : '加载更多'
                  }
                </div>
              </td>
            </tr>
          ) : null
        }
      </tbody>
    );
  }

  // 创建表头
  createTableHeader(rows) {
    const {
      rowSelection
    } = this.props;

    const {
      allChecked,
      sorterStatus,
      selectedFilter,
      showFilter
    } = this.state;

    return (
      <thead>
        {
          _.map(rows, (row, key) => (
            <tr key={key}>
              {
                rowSelection && key === 0 ? (
                  <th
                    className="b-table-header-column check-box-column"
                    rowSpan={rows.length > 1 ? rows.length : undefined}
                  >
                    <CheckBox
                      checked={allChecked}
                      onClick={() => {
                        this.onSelectAll();
                      }}
                    />
                  </th>
                ) : null
              }
              {
                _.map(row, (rowItem, index) => {
                  const item = rowItem;
                  const rowSpan = item.children ? undefined : rows.length - key;
                  const colSpan = item.children ? item.children.length : undefined;
                  return (
                    <th
                      className={`b-table-header-column ${colSpan ? 'header-title' : ''} ${item.key && item.key === sorterStatus.key && !sorterStatus.ascending ? 'head-active' : ''}`}
                      key={index}
                      rowSpan={rowSpan}
                      colSpan={colSpan}
                    >
                      <div className="cell-content">
                        <span
                          className="cell-title-text"
                          onClick={() => {
                            if (item.filters) {
                              this.setState({ showFilter: !showFilter });
                            }
                          }}
                          role="presentation"
                        >{typeof item.title === 'function' ? item.title() : item.title}</span>
                        {
                          item.filters ?
                            (
                              <span className="filter-container">
                                <i
                                  className={`iconfont icon-filter filter${showFilter ? ' show-filter' : ''}`}
                                  onClick={() => {
                                    if (item.filters) {
                                      this.setState({ showFilter: !showFilter });
                                    }
                                  }}
                                  role="presentation"
                                />
                                <div
                                  className="filter-item-container"
                                  style={{ display: showFilter ? '' : 'none' }}
                                >
                                  {_.map(item.filters, (filterItem, i) => (
                                    <div
                                      key={i}
                                      className={`filter-item ${_.find(selectedFilter.filterItems, { value: filterItem.value }) ? 'active' : ''}`}
                                      onClick={() => {
                                        this.setFilter(item, filterItem);
                                      }}
                                      role="presentation"
                                    >
                                      {filterItem.text}
                                      {
                                        item.filterType === 'check' ? (
                                          <i className="iconfont icon-check" />
                                        ) : null
                                      }
                                    </div>
                                  ))}
                                </div>
                              </span>
                            ) : null
                        }
                        {
                          item.sorter ? (
                            <div className="sorter-container">
                              <a className="handle-up">
                                <i
                                  className={`iconfont icon-caretup ${item.key && item.key === sorterStatus.key && sorterStatus.ascending ? 'active' : ''}`}
                                  onClick={() => {
                                    this.setOrder(item, true);
                                  }}
                                  role="presentation"
                                />
                              </a>
                              <a className="handle-down">
                                <i
                                  className={`iconfont icon-caretdown ${item.key && item.key === sorterStatus.key && !sorterStatus.ascending ? 'active' : ''}`}
                                  onClick={() => {
                                    this.setOrder(item, false);
                                  }}
                                  role="presentation"
                                />
                              </a>
                            </div>
                          ) : null
                        }
                      </div>
                    </th>
                  );
                })
              }
            </tr>
          ))
        }
      </thead>
    );
  }

  // 清空选中
  clearCheck() {
    const {
      rowSelection
    } = this.props;

    if (this.state.checkArray.length === 0) {
      return;
    }

    if (rowSelection && rowSelection.onChange) {
      rowSelection.onChange([]);
    }

    this.setState({
      checkArray: [],
      allChecked: false
    });
  }

  render() {
    const {
      className,
      data,
      fixedHeader,
      columns,
      bodyHeight
    } = this.props;

    let outerHeader;
    let innerHeader;

    // 格式化表头数据
    const headerRows = [];

    const deep = this.getChildrenDeep(columns, headerRows);
    // 创建表头
    const tHead = this.createTableHeader(headerRows, deep);
    // 表格主体
    const rowTitle = [];
    let tableData = _.cloneDeep(data);
    // 筛选排序表格数据
    tableData = this.setTableData(tableData);

    this.getRowTitle(columns, rowTitle);
    const body = this.createTableBody(rowTitle, tableData);

    // 表格排版
    const colGroup = this.getColGroup(rowTitle);

    // 固定表头
    if (fixedHeader) {
      outerHeader = (
        <div className="header-table-container">
          <table className="header-table">
            {colGroup}
            {tHead}
          </table>
        </div>
      );
    } else {
      innerHeader = tHead;
    }

    return (
      <div className={`b-table ${className} ${headerRows.length > 1 ? 'table-separate' : ''}`}>
        {outerHeader}
        <div className="body-table-container" style={bodyHeight === undefined ? {} : { height: bodyHeight }}>
          <table>
            {colGroup}
            {innerHeader}
            {body}
          </table>
        </div>
      </div>
    );
  }
}

export default BTable;
