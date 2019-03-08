import React from 'react';
import PropTypes from 'prop-types';

//1. 提供滚动布局
class StickyTable extends React.Component {
  render() {
    const { thead, tbody } = this.props;

    return (
      <table>
        {thead}
        {tbody}
      </table>
    );
  }
}

export default StickyTable;
