import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';

const STRATEGY_GROUP_NAME_MAP = {
  success_add: '策略新建',
  success_modify: '策略替换',
  fail_permission: '禁止未授权的策略',
  fail_error: '系统错误'
};

class Group extends Component {
  static propTypes = {
    items: PropTypes.oneOfType([PropTypes.array]).isRequired,
    id: PropTypes.string.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {
      active: true
    };
  }

  render() {
    const { active } = this.state;
    const { items, id } = this.props;

    return (
      <div>
        <header className="clearfix">
          <i
            className={`iconfont icon-caret${active ? 'up' : 'down'}`}
            onClick={() => {
              this.setState({ active: !active });
            }}
            role="presentation"
          />
          <h3 className="title">{STRATEGY_GROUP_NAME_MAP[id]}</h3>
        </header>
        {
          active ? (
            <ul className="strategies-import-items clearfix">
              {
                _.map(items, (item, key) => (<li key={key} className="strategies-import-item">{item}</li>))
              }
            </ul>
          ) : null
        }
      </div>
    );
  }
}

export default Group;
