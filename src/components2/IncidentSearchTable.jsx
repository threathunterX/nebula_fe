import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withState, withHandlers } from 'recompose';
import fetchIncidents from './fetchIncidents';
import SearchInput from './SearchInput';
import IncidentTable from './IncidentTable';
import {
  FIELD_RISK_SCORE,
  FIELD_START_TIME,
  FIELD_IP,
  FIELD_USERS_COUNT,
  FIELD_MOST_VISITED,
  FIELD_HIT_TAGS,
  FIELD_STRATEGIES
} from '../constants/incidents';

@withState('keyword', 'setKeyword')
@withHandlers({
  onKeywordSubmit: ({ setKeyword }) => (keyword) => {
    setKeyword(keyword);
  }
})
@fetchIncidents
class IncidentSearchTable extends Component {
  static propTypes = {};

  render() {
    const { keyword, onKeywordSubmit, incidents } = this.props;

  //   fields={[
    //     FIELD_RISK_SCORE,
    //     FIELD_START_TIME,
    //     FIELD_IP,
    //     FIELD_USERS_COUNT,
    //     FIELD_MOST_VISITED,
    //     FIELD_HIT_TAGS,
    //     FIELD_STRATEGIES
    // ]}

    return (
      <div>
        <SearchInput onSubmit={onKeywordSubmit} />
        {
          incidents.fulfilled ? (
            <IncidentTable
              records={incidents.value.items}
            />
          ) : null
        }
      </div>
    )
  }
}

export default IncidentSearchTable;
