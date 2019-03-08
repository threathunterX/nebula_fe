import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';

export default function HOCTableBody(...components) {
  return (Table) => class extends React.Component {
    render() {
      const { records } = this.props;

      const component = (
        <tbody>
        {
          _.map(records, (record, index) => (
            <tr key={index} >
              {
                _.map(components, (Component, index) => (
                  <td key={index} >
                    <Component record={record} />
                  </td>
                ))
              }
            </tr>
          ))
        }
        </tbody>
      );

      return (
        <Table {...this.props} tableBody={component} />
      );
    }
  }
}
