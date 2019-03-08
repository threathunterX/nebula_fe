import { connect } from 'react-refetch';
import moment from 'moment';
import URI from 'urijs';
import { API_BASE } from 'app.config';

const fetchIncidents = connect(({ keyword, timestamp }) => {
  const uri = moment(timestamp).startOf('hour').isSame(moment().startOf('hour'))
    ? new URI(`${API_BASE}platform/risks/realtime`)
      .search({ keyword })
    : new URI(`${API_BASE}platform/risks/history`)
      .search({
        keyword,
        start_time: moment(timestamp).startOf('hour').valueOf(),
        end_time: timestamp
      });

  return { incidents: String(uri) };
});

export default fetchIncidents;
