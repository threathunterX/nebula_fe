import React from 'react';
import PropTypes from 'prop-types';
import { PromiseState } from 'react-refetch';
import _ from 'lodash';
import translations from '../i18n/incidents';

export default function HOCIncidentTable(Table) {
  return class extends React.Component {
    render() {
      return (
        <Table {...this.props}/>
      );
    }
  }
}
