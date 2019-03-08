import React, { Component } from 'react';
// import _ from 'lodash';
// import {
//   BarChart,
//   LineChart,
//   PieChart
// } from 'rc-bchart';

class NewComponent extends Component {
  constructor(props) {
    super(props);
    const data = [];

    for (let i = 0; i < 20; i += 1) {
      data.push({
        x: i,
        y: Math.random() * 100
      });
    }

    const pieData = [{
      color: '#333',
      value: 0,
      text: '高危'
    }, {
      color: '#333',
      value: 0,
      text: '中危'
    }, {
      color: '#333',
      value: 0,
      text: '可疑'
    }, {
      color: '#EF0D33',
      value: 0,
      text: '低危'
    }];

    this.state = {
      xAxis: [{
        markCount: 7,
        // markType: 'all',
        // gridLine: false,
        // type: 'value',
        // flip: true,
        // position: 'top',
        // textPos: 'left',
        // border: false,
        format: x => `${x}s`
      }],
      yAxis: [{
        markType: 'all',
        // type: 'category',
        // flip: true,
        // position: 'right',
        // gridLine: false
        // textPos: 'inside',
        // border: false
        format: x => `${x}K`
      }],
      xAxis1: [{
        markCount: 7,
        // markType: 'all',
        // gridLine: false,
        // type: 'value',
        // flip: true,
        // position: 'top',
        // textPos: 'left',
        // border: false,
        // boundaryGap: false,
        format: x => `${x}s`
      }],
      yAxis1: [{
        markType: 'all',
        // type: 'category',
        // flip: true,
        // position: 'right',
        // gridLine: false
        // textPos: 'inside',
        // border: false
        format: x => `${x}K`
      }],
      config: [{
        name: 'bar',
        data,
        dataAll: data
      }],
      pieData
    };
  }

  render() {
    // const {
    //   xAxis,
    //   yAxis,
    //   xAxis1,
    //   yAxis1,
    //   config,
    //   pieData
    // } = this.state;

    return (
      <div className="component-container">
        <h2>新组件开发</h2>
        {/* <div>
          <div style={{ height: '200px' }}>
            <BarChart
              xAxis={xAxis}
              yAxis={yAxis}
              config={config}
              showHoverCursor
              hoverText={item => `${item.x}__${item.y}`}
              hoverTitle={index => `title_${index}`}
            />
          </div>
          <div style={{ height: '200px', marginTop: '10px' }}>
            <LineChart
              xAxis={xAxis1}
              yAxis={yAxis1}
              config={config}
              showHoverCursor
              hoverText={item => `${item.x}__${item.y}`}
              hoverTitle={index => `title_${index}`}
            />
          </div>
          <div style={{ height: '200px', marginTop: '10px' }}>
            <PieChart
              data={pieData}
              pinch
              // hoverText={item => `${item.x}__${item.y}`}
            />
          </div>
        </div> */}
      </div>
    );
  }
}

export default NewComponent;
