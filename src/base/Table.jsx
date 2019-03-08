import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import './Table/index.scss';

class Table extends React.Component {
  render() {
    const { className, columns, records } = this.props;
    const fields = _.keys(columns);

    return (
      <table className={className} >
        {/*<colgroup>
         {
         _.map(fields, (field, index) => (<col key={index} className={field} />))
         }
         </colgroup>
         <thead>
         <tr>
         {
         _.map(fields, (field, index) =>
         (<th key={index} >{field}</th>)
         )
         }
         </tr>
         </thead>*/}
        <tbody>
        {
          _.map(records, (record, index) => (
            <tr key={index} >
              {
                _.map(columns, (Adapter, field) => (
                  <td key={field} >
                    <Adapter value={record[field]} />
                  </td>
                ))
              }
            </tr>
          ))
        }
        </tbody>
      </table>
    );
  }
}

export default Table;

