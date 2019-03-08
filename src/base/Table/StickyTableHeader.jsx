import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';

export default function StickyTableHeader(Table) {
  return class  extends Table {
    render() {
      const { props } = super.render();
      const { children } = props;
      const colgroup = _.find(children, { type: 'colgroup' });
      const { className } = this.props;

      return (
        <div className={`${className} sticky-table`} >
          {
            _.map(_.without(children, colgroup), (element, index) => {
              const { type } = element;

              return (
                <div key={index} className={type} >
                  <table >{colgroup}{element}</table>
                </div>
              );
            })
          }
        </div>
      );
    }
  }
}
