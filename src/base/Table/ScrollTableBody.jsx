import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';

const LINE_HEIGHT = 30;
const PAGE_SIZE = 10;

export default function ScrollTableBody(Table) {
  return class  extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        index: 0
      };
      this.handleScroll = this.handleScroll.bind(this);
    }

    handleScroll() {
      const { scrollHeight, scrollTop, clientHeight } = this.component;
      const { index } = this.state;
      const { records } = this.props;

      // 滚动到底部
      if (scrollHeight - scrollTop === clientHeight
        && index + PAGE_SIZE < records.length - 1) {
        this.setState({ index: index + 1 })
      }
      // 滚动到顶部
      else if (scrollTop == 0
        && index > 0) {
        this.setState({ index: index - 1 })
      }
    }

    componentDidUpdate(props, state) {
      const { index } = state;
      if (index) {
        this.component.scrollTop = LINE_HEIGHT;
      }
    }

    render() {
      const { records, ...others } = this.props;
      const { index } = this.state;

      return (
        <div
          className="table-body-scroll"
          ref={(component) => {
            this.component = component;
          }}
          onScroll={this.handleScroll}
        >
          <Table
            records={_.slice(records, index, index + PAGE_SIZE + (index ? 2 : 1))} {...others}/>
        </div>
      );
    }
  }
}
