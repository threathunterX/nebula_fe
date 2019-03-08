import React from 'react';
import PropTypes from 'prop-types';
import SceneBadge from './SceneBadge';

const SceneBadgeList = ({ value }) => (
  <ul>
    {
      _.map(value, (items, id) => (
        <li key={id} >
          <SceneBadge id={id} count={0} />
        </li>
      ))
    }
  </ul>
);

export default SceneBadgeList;
