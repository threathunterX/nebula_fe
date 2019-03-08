import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';

class Table extends React.Component {
  constructor(props) {
    super(props);

    const records = _.range(100);

    this.state = {
      records,
      start: 0
    };
  }

  componentWillReceiveProps() {
    console.log('ppp');
    console.log(this.state.start);
  }

  componentDidUpdate(props, state) {
    const { start } = state;
    if (start) {
      this.xxx.scrollTop = 30;
    }
  }

  render() {

    console.log('render');

    return (
      <div
        style={{ height: 150, overflow: 'auto' }}
        ref={(e) => {
          this.xxx = e;
        }}
        onScroll={() => {
          const { scrollHeight, scrollTop, clientHeight } = this.xxx;
          const { start, records } = this.state;
          if (scrollHeight - scrollTop === clientHeight) {
            if (start + 1 + 6 <= records.length) {
              this.setState({
                start: start + 1
              })
            }
          }
          else if (scrollTop == 0) {
            console.log('top');
            if (start - 1 >= 0) {
              this.setState({
                start: start - 1
              })
            }
          }
        }}
      >
        <table>
          <tbody>
          {
            (() => {
              const { records, start } = this.state;
              return _.map(
                _.slice(records, start, start + (start ? 7 : 6)),
                (y) => (
                  <tr key={y} >
                    {
                      _.map(_.range(7), (x) => (
                        <td key={x} >{y * 7 + x}</td>
                      ))
                    }
                  </tr>
                ));
            })()
          }
          </tbody>
        </table>
      </div>
    );

    // return (
    //   <table>
    //     <tbody>
    //     {
    //       _.map(records, (record, index) => (
    //         <tr key={index} >
    //           <td>{index}.</td>
    //           {
    //             _.map(columns, (Adapter, field) => (
    //               <td key={field} >
    //                 <Adapter value={record[field]} />
    //               </td>
    //             ))
    //           }
    //         </tr>
    //       ))
    //     }
    //     </tbody>
    //   </table>
    // );
  }
}

export default Table;
