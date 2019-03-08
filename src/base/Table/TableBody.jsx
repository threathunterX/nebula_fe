import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';

class TableBody extends React.Component {
  render() {
    const { fields, records } = this.props;

    return (
      <tbody>
      {
        _.map(records, (record, index) => (
          <tr key={index} >
            {
              _.map(fields, (field) => (
                <td key={field} >{record[field]}</td>
              ))
            }
          </tr>
        ))
      }
      </tbody>
    );
  }
}

export default TableBody;
