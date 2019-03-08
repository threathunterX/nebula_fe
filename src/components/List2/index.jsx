import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';

import './index.scss';

class List2 extends PureComponent {
  static propTypes = {
    onChange: PropTypes.func,
    className: PropTypes.string,
    items: PropTypes.oneOfType([PropTypes.object]),
    style: PropTypes.oneOfType([PropTypes.object])
  };
  static defaultProps = {
    className: '',
    items: undefined,
    onChange: undefined,
    style: undefined
  };

  render() {
    const { className, items, onChange, style } = this.props;

    return (
      <ul className={`list clearfix ${className}`} style={style}>
        {
          _.map(items, (data, key) => {
            const {
              disabled,
              value = key
            } = data;
            const display_name = data.display_name || key;
            const title = data.remark || key;

            return disabled ? (
              <li key={key} className="item item-disabled">
                <a
                  className="toggle"
                  title={title}
                  role="presentation"
                >{display_name}</a>
              </li>
            ) : (
              <li key={key} className="item">
                <a
                  className="toggle"
                  title={title}
                  onClick={() => onChange(value)}
                  role="presentation"
                >{display_name}</a>
              </li>
            );
          })
        }
      </ul>
    );
  }
}

export default List2;
