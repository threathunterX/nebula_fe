import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';

export default function TableBodyScroll(TableBody) {
  return class  extends React.Component {
    render() {
      return (
        <TableBody onScroll={() => {
          console.log('test')
        }} />
      );
    }
  }
}
