import React from 'react';
import { compose } from 'recompose';
import Table from '../../base/Table/Table';
import HOCTableHeader from '../../base/Table/HOCTableHeader';
import HOCTableBody from '../../base/Table/HOCTableBody';

export default compose(
  HOCTableHeader(
    () => (<div>URL</div>),
    () => (<div>数量</div>)
  ),
  HOCTableBody(
    ({ record }) => (<div>{record['value']}</div>),
    ({ record }) => (<div>{record['count']}</div>)
  )
)(Table);
