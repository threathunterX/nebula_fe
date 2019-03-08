import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './index.scss';

class Table extends Component {
  static propTypes = {
    /**
     * Set to true to indicate that all rows should be selected.
     */
    allRowsSelected: PropTypes.bool,
    /**
     * Children passed to table.
     */
    children: PropTypes.node,
    /**
     * If true, the footer will appear fixed below the table.
     * The default value is true.
     */
    fixedFooter: PropTypes.bool,
    /**
     * If true, the header will appear fixed above the table.
     * The default value is true.
     */
    fixedHeader: PropTypes.bool,
    /**
     * If true, multiple table rows can be selected.
     * CTRL/CMD+Click and SHIFT+Click are valid actions.
     * The default value is false.
     */
    multiSelectable: PropTypes.bool,
    /**
     * Called when a row cell is clicked.
     * rowNumber is the row number and columnId is
     * the column number or the column key.
     */
    onCellClick: PropTypes.func,
    /**
     * Called when a table cell is hovered.
     * rowNumber is the row number of the hovered row
     * and columnId is the column number or the column key of the cell.
     */
    onCellHover: PropTypes.func,
    /**
     * Called when a table cell is no longer hovered.
     * rowNumber is the row number of the row and columnId
     * is the column number or the column key of the cell.
     */
    onCellHoverExit: PropTypes.func,
    /**
     * Called when a table row is hovered.
     * rowNumber is the row number of the hovered row.
     */
    onRowHover: PropTypes.func,
    /**
     * Called when a table row is no longer hovered.
     * rowNumber is the row number of the row that is no longer hovered.
     */
    onRowHoverExit: PropTypes.func,
    /**
     * Called when a row is selected.
     * selectedRows is an array of all row selections.
     * IF all rows have been selected, the string "all"
     * will be returned instead to indicate that all rows have been selected.
     */
    onRowSelection: PropTypes.func,
    /**
     * If true, table rows can be selected.
     * If multiple row selection is desired, enable multiSelectable.
     * The default value is true.
     */
    selectable: PropTypes.bool,
    className: PropTypes.string,
    bodyClass: PropTypes.string
  };

  static defaultProps = {
    children: null,
    allRowsSelected: false,
    fixedFooter: true,
    fixedHeader: true,
    multiSelectable: false,
    selectable: true,
    onCellClick: undefined,
    onCellHover: undefined,
    onCellHoverExit: undefined,
    onRowHover: undefined,
    onRowHoverExit: undefined,
    onRowSelection: undefined,
    className: '',
    bodyClass: ''
  };

  state = {
    allRowsSelected: false
  };

  componentWillMount() {
    if (this.props.allRowsSelected) {
      this.setState({ allRowsSelected: true });
    }
  }

  onCellClick = (rowNumber, columnNumber, event) => {
    if (this.props.onCellClick) this.props.onCellClick(rowNumber, columnNumber, event);
  };

  onCellHover = (rowNumber, columnNumber, event) => {
    if (this.props.onCellHover) this.props.onCellHover(rowNumber, columnNumber, event);
  };

  onCellHoverExit = (rowNumber, columnNumber, event) => {
    if (this.props.onCellHoverExit) this.props.onCellHoverExit(rowNumber, columnNumber, event);
  };

  onRowHover = (rowNumber) => {
    if (this.props.onRowHover) this.props.onRowHover(rowNumber);
  };

  onRowHoverExit = (rowNumber) => {
    if (this.props.onRowHoverExit) this.props.onRowHoverExit(rowNumber);
  };

  onRowSelection = (selectedRows) => {
    if (this.state.allRowsSelected) this.setState({ allRowsSelected: false });
    if (this.props.onRowSelection) this.props.onRowSelection(selectedRows);
  };

  onSelectAll = () => {
    if (this.props.onRowSelection) {
      if (!this.state.allRowsSelected) {
        this.props.onRowSelection('all');
      } else {
        this.props.onRowSelection('none');
      }
    }

    this.setState({ allRowsSelected: !this.state.allRowsSelected });
  };

  createTableBody(base) {
    return React.cloneElement(
      base,
      {
        allRowsSelected: this.state.allRowsSelected,
        multiSelectable: this.props.multiSelectable,
        onCellClick: this.onCellClick,
        onCellHover: this.onCellHover,
        onCellHoverExit: this.onCellHoverExit,
        onRowHover: this.onRowHover,
        onRowHoverExit: this.onRowHoverExit,
        onRowSelection: this.onRowSelection,
        selectable: this.props.selectable
      }
    );
  }

  createTableHeader(base) {
    return React.cloneElement(
      base,
      {
        enableSelectAll: (
          base.props.enableSelectAll &&
          this.props.selectable &&
          this.props.multiSelectable
        ),
        onSelectAll: this.onSelectAll,
        selectAllSelected: this.state.allRowsSelected
      }
    );
  }

  isScrollbarVisible() {
    const tableDivHeight = this.refs.tableDiv.clientHeight;
    const tableBodyHeight = this.refs.tableBody.clientHeight;

    return tableBodyHeight > tableDivHeight;
  }

  render() {
    const {
      children,
      fixedFooter,
      fixedHeader,
      className,
      bodyClass
    } = this.props;

    let tHead;
    let tFoot;
    let tBody;

    React.Children.forEach(children, (child) => {
      if (!React.isValidElement(child)) return;

      const { muiName } = child.type;
      if (muiName === 'TableBody') {
        tBody = this.createTableBody(child);
      } else if (muiName === 'TableHeader') {
        tHead = this.createTableHeader(child);
      } else if (muiName === 'TableFooter') {
        tFoot = child;
      }
    });

    // If we could not find a table-header and a table-body, do not attempt to display anything.
    if (!tBody && !tHead) return null;

    let headerTable;
    let footerTable;
    let inlineHeader;
    let inlineFooter;

    if (fixedHeader) {
      headerTable = (
        <div className="nebula-header-table">
          <table className="nebula-table">
            {tHead}
          </table>
        </div>
      );
    } else {
      inlineHeader = tHead;
    }

    if (tFoot !== undefined) {
      if (fixedFooter) {
        footerTable = (
          <div>
            <table className="nebula-table">
              {tFoot}
            </table>
          </div>
        );
      } else {
        inlineFooter = tFoot;
      }
    }

    return (
      <div className={`nebula-table-wrapper ${className === undefined ? '' : className}`}>
        {headerTable}
        <div className={`nebula-body-table ${bodyClass === undefined ? '' : bodyClass}`} ref="tableDiv">
          <table className="nebula-table" ref="tableBody">
            {inlineHeader}
            {inlineFooter}
            {tBody}
          </table>
        </div>
        {footerTable}
      </div>
    );
  }
}

export default Table;
