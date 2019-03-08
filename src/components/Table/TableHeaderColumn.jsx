import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Tooltip from 'material-ui/internal/Tooltip';

function getStyles() {
  return {
    tooltip: {
      boxSizing: 'border-box',
      marginTop: '15px',
      pointerEvents: 'none'
    }
  };
}

class TableHeaderColumn extends Component {

  static propTypes = {
    children: PropTypes.node,
    /**
     * The css class name of the root element.
     */
    className: PropTypes.string,
    /**
     * Number to identify the header row. This property
     * is automatically populated when used with TableHeader.
     */
    columnNumber: PropTypes.number,
    /**
     * @ignore
     * Not used here but we need to remove it from the root element.
     */
    hoverable: PropTypes.bool,
    /** @ignore */
    onClick: PropTypes.func,
    /**
     * @ignore
     * Not used here but we need to remove it from the root element.
     */
    onHover: PropTypes.func,
    /**
     * @ignore
     * Not used here but we need to remove it from the root element.
     */
    onHoverExit: PropTypes.func,
    /**
     * Override the inline-styles of the root element.
     */
    style: PropTypes.oneOfType([PropTypes.object]),
    /**
     * The string to supply to the tooltip. If not
     * string is supplied no tooltip will be shown.
     */
    tooltip: PropTypes.string,
    /**
     * Additional styling that can be applied to the tooltip.
     */
    tooltipStyle: PropTypes.oneOfType([PropTypes.object])
  };
  static defaultProps = {
    children: null,
    className: '',
    columnNumber: undefined,
    onClick: undefined,
    onHover: undefined,
    onHoverExit: undefined,
    style: undefined,
    tooltipStyle: undefined,
    tooltip: undefined,
    hoverable: false
  };

  static contextTypes = {
    muiTheme: PropTypes.object.isRequired
  };

  state = {
    hovered: false
  };

  onMouseEnter = () => {
    if (this.props.tooltip !== undefined) {
      this.setState({ hovered: true });
    }
  };

  onMouseLeave = () => {
    if (this.props.tooltip !== undefined) {
      this.setState({ hovered: false });
      // let tooltip = document.querySelector(".tooltip");
      // tooltip.style.display = "none";
    }
  };

  onClick = (event) => {
    if (this.props.onClick) {
      this.props.onClick(event, this.props.columnNumber);
    }
  };

  render() {
    const {
      children,
      className = '',
      columnNumber, // eslint-disable-line no-unused-vars
      hoverable, // eslint-disable-line no-unused-vars
      onClick, // eslint-disable-line no-unused-vars
      onHover, // eslint-disable-line no-unused-vars
      onHoverExit, // eslint-disable-line no-unused-vars
      style,
      tooltip,
      tooltipStyle,
      ...other
    } = this.props;

    const styles = getStyles();

    const handlers = {
      onMouseEnter: this.onMouseEnter,
      onMouseLeave: this.onMouseLeave,
      onClick: this.onClick
    };

    let tooltipNode;

    if (tooltip !== undefined) {
      tooltipNode = (
        <Tooltip
          label={tooltip}
          show={this.state.hovered}
          style={Object.assign(styles.tooltip, tooltipStyle)}
        />
      );
    }

    return (
      <th
        className={`nebula-table-header-column ${className}`}
        {...handlers}
        {...other}
      >
        {tooltipNode}
        <div style={{ overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}>{children}</div>
      </th>
    );
  }
}

export default TableHeaderColumn;
