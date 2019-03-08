import React from 'react';
import { compose } from 'recompose';
import HOCTableColumn from '../../base/Table/HOCTableColumn';
import HOCIncidentTable from '../HOCIncidentTable';
import Table from '../../base/Table';
import DefaultAdapter from '../../base/Table/DefaultAdapter';
import fetchIncidents from '../fetchIncidents';
import RiskScoreDecorator from './RiskScoreDecorator';
import '../../base/Table/index.scss';
import '../../base/Table/sticky-table.scss';
import {
  FIELD_RISK_SCORE,
  FIELD_START_TIME,
  FIELD_IP,
  FIELD_USERS_COUNT,
  FIELD_MOST_VISITED,
  FIELD_HIT_TAGS,
  FIELD_STRATEGIES
} from '../../constants/incidents';
import StickyTableHeader from '../../base/Table/StickyTableHeader';
import TableHeader from '../../base/Table/TableHeader';
import titles from '../../i18n/incidents';

export default compose(
  HOCTableColumn(FIELD_RISK_SCORE, DefaultAdapter),
  HOCTableColumn(FIELD_START_TIME, DefaultAdapter),
  HOCTableColumn(FIELD_IP, DefaultAdapter),
  HOCTableColumn(FIELD_USERS_COUNT, DefaultAdapter),
  HOCTableColumn(FIELD_MOST_VISITED, DefaultAdapter),
  HOCTableColumn(FIELD_HIT_TAGS, DefaultAdapter),
  HOCTableColumn(FIELD_STRATEGIES, DefaultAdapter),
  StickyTableHeader(titles)
)(Table);
