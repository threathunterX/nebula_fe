import React from 'react';
import PropTypes from 'prop-types';

class Table extends React.Component {
  render() {
    const { tableHeader, tableBody } = this.props;

    return (
      <table>
        {tableHeader}
        {tableBody}
      </table>
    );
  }
}

export default Table;
