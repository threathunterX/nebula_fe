import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { findDOMNode } from 'react-dom';

import Input from '../Input';

import './index.scss';

class LabelEditTool extends Component {
  static propTypes = {
    editting: PropTypes.bool.isRequired,
    editText: PropTypes.string.isRequired,
    editKeyword: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
    onLabelClick: PropTypes.func.isRequired,
    children: PropTypes.node.isRequired,
    className: PropTypes.string
  };

  static defaultProps = {
    className: ''
  };

  constructor(props) {
    super(props);

    this.state = {
      editKeyword: ''
    };
  }

  componentDidUpdate() {
    // 趋势统计
    if (this.props.editting) {
      /* eslint react/no-find-dom-node: "off" */
      const editInput = findDOMNode(this.refs.editInput);
      editInput.focus();
    }
  }

  render() {
    const {
      editting,
      children,
      editText,
      editKeyword,
      onChange,
      onSubmit,
      onLabelClick,
      className,
      ...other
    } = this.props;

    return (
      <span className={`wd-label-edit-tool ${className}`}>
        {children}
        <div
          className="edit-tool"
          style={{ display: editting ? 'block' : '' }}
          onClick={() => onLabelClick()}
          role="presentation"
        >
          {
            editting ? (
              <Input
                ref="editInput"
                {...other}
                className="edit-input"
                value={editKeyword}
                onChange={v => onChange(v)}
                onSubmit={v => onSubmit(v)}
              />
            ) : [
              <i key="0" className="iconfont icon-edit" />,
              editText
            ]
          }
        </div>
      </span>
    );
  }
}

export default LabelEditTool;

