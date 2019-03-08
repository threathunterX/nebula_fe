import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';

class TableHeader extends React.Component {
  render() {
    const { titles } = this.props;

    return (
      <thead>
      <tr>
        {
          _.map(titles, (name, field) => (<th key={field} >{name}</th>))
        }
      </tr>
      </thead>
    );
  }
}

export default TableHeader;
