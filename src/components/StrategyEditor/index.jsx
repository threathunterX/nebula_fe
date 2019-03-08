import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';

import EditorContent from './StrategyEditor';

import './index.scss';


class StrategyEditor extends Component {
  static propTypes = {
    config: PropTypes.oneOfType([PropTypes.object]),
    item: PropTypes.oneOfType([PropTypes.object]),
    dataList: PropTypes.oneOfType([PropTypes.object]),
    tags: PropTypes.oneOfType([PropTypes.array]),
    event: PropTypes.oneOfType([PropTypes.array]),
    events: PropTypes.oneOfType([PropTypes.array]),
    name: PropTypes.oneOfType([PropTypes.array]),
    onChange: PropTypes.func,
    onChange2: PropTypes.func,
    onCancel: PropTypes.func,
    onClick: PropTypes.func,
    className: PropTypes.string,
    children: PropTypes.node,
    readOnly: PropTypes.bool,
    disabled: PropTypes.bool
  };
  static defaultProps = {
    dataList: undefined,
    tags: undefined,
    event: undefined,
    events: undefined,
    item: undefined,
    config: undefined,
    onChange: undefined,
    onChange2: undefined,
    onCancel: undefined,
    onClick: undefined,
    children: null,
    name: undefined,
    className: '',
    readOnly: false,
    disabled: false
  };

  // 隐藏选择框
  static hidemask(e) {
    const mask = document.querySelector('#strategyEditor');

    if (e === undefined || e.target.id === 'strategyEditor') {
      mask.style.opacity = 0;
      setTimeout(() => {
        mask.remove();
      }, 500);
    }
  }

  // 点击选择框
  onClick(e) {
    if (this.props.disabled) {
      return;
    }

    let ele = document.querySelector('#strategyEditor');

    if (!ele) {
      const container = document.createElement('div');
      container.id = 'strategyEditor';
      container.className = 'strategy-editor-mask';
      // container.onclick = StrategyEditor.hidemask;
      ele = document.querySelector('body').appendChild(container);
      setTimeout(() => {
        ele.style.opacity = 1;
      }, 0);
    } else {
      ele.style.display = 'block';
      setTimeout(() => {
        ele.style.opacity = 1;
      }, 0);
    }

    ReactDOM.render(this.getEditor(e.currentTarget), ele);

    if (this.props.onClick) {
      this.props.onClick(e);
    }
  }

  onCancel(e) {
    if (this.props.onCancel) {
      this.props.onCancel(e);
    }

    StrategyEditor.hidemask();
  }

  // 获取列表
  getEditor(posEle) {
    const ele = posEle.getBoundingClientRect();

    const { item, tags, config, events, name, event, readOnly, dataList } = this.props;

    return (
      <EditorContent
        readOnly={readOnly}
        name={name}
        dataList={dataList}
        item={item}
        tags={tags}
        config={config}
        events={events}
        event={event}
        elePos={ele}
        style={{ top, left: ele.left }}
        onChange={value => this.handleChange(value)}
        onChange2={value => this.handleChange2(value)}
        onCancel={e => this.onCancel(e)}
      />
    );
  }

  handleChange(value) {
    if (this.props.onChange) {
      this.props.onChange(value);
    }

    StrategyEditor.hidemask();
  }

  handleChange2(value) {
    if (this.props.onChange2) {
      this.props.onChange2(value);
    }

    StrategyEditor.hidemask();
  }

  render() {
    const {
      className,
      children,
      disabled
    } = this.props;

    // const message = _.get(config, 'error.ERROR_REQUIRED');

    return (
      <span
        className={`strategy-editor ${className} ${disabled ? 'disabled' : ''}`}
        onClick={e => this.onClick(e)}
        role="presentation"
      >
        {children}
      </span>
    );
  }
}

export default StrategyEditor;
