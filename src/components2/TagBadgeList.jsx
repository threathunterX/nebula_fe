import React from 'react';
import PropTypes from 'prop-types';
import TagBadge from './TagBadge';

const TagBadgeList = ({ value }) => (
  <ul>
    {
      _.map(value, (count, text) => (
        <li key={text} >
          <TagBadge text={text} count={count} />
        </li>
      ))
    }
  </ul>
);

export default TagBadgeList;
