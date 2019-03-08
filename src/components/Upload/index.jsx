import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Upload extends Component {
  static propTypes = {
    children: PropTypes.node,
    onDragOver: PropTypes.func,
    onDragLeave: PropTypes.func,
    onUpload: PropTypes.func,
    disabled: PropTypes.bool
  };
  static defaultProps = {
    children: null,
    onDragOver: undefined,
    onDragLeave: undefined,
    onUpload: undefined,
    disabled: false
  };

  // 触发input点击事件
  static getFile(e) {
    e.currentTarget.children[0].click();
  }

  onDragOver(e) {
    e.preventDefault();

    if (this.props.onDragOver) {
      this.props.onDragOver(e);
    }
  }

  onDragLeave(e) {
    e.preventDefault();

    if (this.props.onDragLeave) {
      this.props.onDragLeave(e);
    }
  }

  render() {
    const {
      disabled,
      onUpload,
      children,
      ...other
    } = this.props;

    return (

      <div
        {...other}
        onDrop={(e) => {
          e.preventDefault();
          onUpload(e.dataTransfer.files);
        }}
        onDragOver={(e) => {
          this.onDragOver(e);
        }}
        onDragLeave={(e) => {
          this.onDragLeave(e);
        }}
        onClick={e => Upload.getFile(e)}
        role="presentation"
      >
        <input
          type="file"
          style={{ display: 'none' }}
          disabled={disabled}
          onClick={(e) => {
            e.stopPropagation();
          }}
          onChange={(e) => {
            onUpload(e.target.files);
          }}
        />
        {children}
      </div>

    );
  }
}

export default Upload;

