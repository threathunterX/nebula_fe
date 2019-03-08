import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import List2 from '../List2';

import './index.scss';

const filters = [
  { title: '实时', regex: /__rt$/ },
  { title: 'profile', regex: /__profile$/ }
];

class VariableList extends PureComponent {
  static propTypes = {
    items: PropTypes.oneOfType([PropTypes.object]).isRequired,
    onChange: PropTypes.func
  };
  static defaultProps = {
    onChange: undefined
  };

  render() {
    const { items } = this.props;

    return (
      <ul className="list variables clearfix">
        {
          _.map(filters, (filter) => {
            const { title, regex } = filter;

            return (
              <li key={title} className="item">
                <h5>{title}</h5>
                <List2
                  items={_.pickBy(items, (item, key) => regex.test(key))}
                  onChange={value => this.props.onChange(value)}
                />
              </li>
            );
          })
        }
      </ul>
    );
  }
}

export default VariableList;
