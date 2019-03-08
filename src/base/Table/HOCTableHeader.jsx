import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';

export default function HOCTableHeader(...components) {
  return (Table) => class extends React.Component {
    render() {
      const component = (
        <thead>
        <tr>
          {
            _.map(components, (Component, index) => (
              <th key={index} >
                <Component />
              </th>
            ))
          }
        </tr>
        </thead>
      );

      return (
        <Table {...this.props} tableHeader={component} />
      );
    }
  }
}
