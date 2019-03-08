import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Tooltip from 'material-ui/internal/Tooltip';

function getStyles(props, context) {
  const { tableRowColumn } = context.muiTheme;

  const styles = {
    root: {
      paddingLeft: tableRowColumn.spacing,
      paddingRight: tableRowColumn.spacing,
      height: tableRowColumn.height,
      textAlign: 'left',
      fontSize: 13,
      overflow: 'hidden',
      whiteSpace: 'nowrap',
      textOverflow: 'ellipsis'
    },
    tooltip: {
      boxSizing: 'border-box',
      marginTop: '10px',
      pointerEvents: 'none'
    }
  };

  if (React.Children.count(props.children) === 1 && !isNaN(props.children)) {
    styles.textAlign = 'right';
  }

  return styles;
}

class TableRowColumn extends Component {
  static propTypes = {
    children: PropTypes.node,
    /**
     * The css class name of the root element.
     */
    className: PropTypes.string,
    /**
     * @ignore
     * Number to identify the header row. This property
     * is automatically populated when used with TableHeader.
     */
    columnNumber: PropTypes.number,
    /**
     * @ignore
     * If true, this column responds to hover events.
     */
    hoverable: PropTypes.bool,
    /** @ignore */
    onClick: PropTypes.func,
    /** @ignore */
    onHover: PropTypes.func,
    /**
     * @ignore
     * Callback function for hover exit event.
     */
    onHoverExit: PropTypes.func,
    /** 0
     * Override the inline-styles o
     * f the root element.
     */
    style: PropTypes.oneOfType([PropTypes.object]),
    tooltipStyle: PropTypes.oneOfType([PropTypes.object]),
    /**
     * The string to supply to the tooltip. If not

     .     * string is supplied no tooltip will be shown.
     */
    tooltip: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number
    ])
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
    hovered: false,
    tHovered: false
  };

  onClick = (event) => {
    if (this.props.onClick) {
      this.props.onClick(event, this.props.columnNumber);
    }
  };

  onMouseEnter = (event) => {
    if (this.props.hoverable) {
      this.setState({ hovered: true });
      if (this.props.onHover) {
        this.props.onHover(event, this.props.columnNumber);
      }
    }
    if (this.props.tooltip !== undefined) {
      this.setState({ tHovered: true });
      // let tooltip = document.querySelector(".tooltip");
      // if (!tooltip) {
      //    let newTip = document.createElement("div");
      //    newTip.className = "tooltip";
      //    newTip.style.top = event.clientY + "px";
      //    newTip.style.left = event.clientX + "px";
      //    newTip.innerText = this.props.tooltip;
      //    document.querySelector("body").appendChild(newTip);
      // } else {
      //    tooltip.style.display = "block";
      //    tooltip.style.top = event.clientY + "px";
      //    tooltip.style.left = event.clientX + "px";
      //    tooltip.innerText = this.props.tooltip;
      // }
    }
  };

  onMouseLeave = (event) => {
    if (this.props.hoverable) {
      this.setState({ hovered: false });
      if (this.props.onHoverExit) {
        this.props.onHoverExit(event, this.props.columnNumber);
      }
    }
    if (this.props.tooltip !== undefined) {
      this.setState({ tHovered: false });
      // let tooltip = document.querySelector(".tooltip");
      // tooltip.style.display = "none";
    }
  };

  render() {
    const {
      children,
      className = '',
      tooltip,
      columnNumber, // eslint-disable-line no-unused-vars
      hoverable, // eslint-disable-line no-unused-vars
      onClick, // eslint-disable-line no-unused-vars
      onHover, // eslint-disable-line no-unused-vars
      onHoverExit,

      // eslint-disable-line no-unused-vars
      style,
      tooltipStyle,
      ...other
    } = this.props;

    const styles = getStyles(this.props, this.context);

    const handlers = {
      onClick: this.onClick,
      onMouseEnter: this.onMouseEnter,
      onMouseLeave: this.onMouseLeave
    };

    let tooltipNode;
    if (tooltip !== undefined) {
      tooltipNode = (
        <Tooltip
          label={tooltip}
          show={this.state.tHovered}
          style={Object.assign(styles.tooltip, tooltipStyle)}
        />
      );
    }

    return (
      <td
        className={`nebula-row-column ${className}`}
        {...handlers}
        {...other}
      >
        {tooltipNode}
        <div className="nebula-row-content">{children}</div>
      </td>
    );
  }
}

export default TableRowColumn;
