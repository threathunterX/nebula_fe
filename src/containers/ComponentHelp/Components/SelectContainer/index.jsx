import React, { Component } from 'react';
import Select from '../../../../components/Select';

class SelectContainer extends Component {

  constructor(props) {
    super(props);
    this.state = {
      list: [{
        text: 'item1',
        value: '1'
      }, {
        text: 'item2',
        value: '2'
      }, {
        text: 'item3',
        value: '3'
      }, {
        text: 'item4',
        value: '4'
      }]
    };
  }

  componentDidMount() {
  }

  render() {
    const {
      list
      } = this.state;

    return (
      <div className="component-container">
        <h2>Select 输入选择框组件</h2>

        <div className="component-part">
          <div className="component-card">

            <div className="demo-container">

              <Select dataList={list} placeholder="请选择" onChange={(value) => { console.log(value); }} />

            </div>
            <div className="demo-describe">
              <div className="demo-title">基本</div>
              最简单的用法。<span className="key-word">type</span>不设置默认为单选。
            </div>
            <div className="demo-code">
              {'import Select from "../../../../components/Select";'} <br />
              {'let list=[{text: "item1",value: "1"}, {text: "item2",value: "2"}, {text: "item3",value: "3"}, {text: "item4",value: "4"}];'} <br />
              {'<Select dataList={list} placeholder="请选择" onChange={value=>{console.log(value)}}/>'} <br />

            </div>
          </div>

          <div className="component-card">

            <div className="demo-container">

              <Select dataList={list} defaultValue={list[1]} placeholder="请选择" onChange={(value) => { console.log(value); }} />

            </div>
            <div className="demo-describe">
              <div className="demo-title">默认值</div>
              单选时<span className="key-word">defaultValue</span>为默认选中值。
            </div>
            <div className="demo-code">
              {'import Select from "../../../../components/Select";'} <br />
              {'let list=[{text: "item1",value: "1"}, {text: "item2",value: "2"}, {text: "item3",value: "3"}, {text: "item4",value: "4"}];'} <br />
              {'<Select dataList={list} defaultValue={list[1]} placeholder="请选择" onChange={value=>{console.log(value)}}/>'} <br />

            </div>
          </div>

        </div>


        <div className="component-part">

          <div className="component-card">

            <div className="demo-container">

              <Select dataList={list} type="multiple" placeholder="请选择" onChange={(value) => { console.log(value); }} />

            </div>
            <div className="demo-describe">
              <div className="demo-title">多选</div>
              <span className="key-word">type</span>为multiple时为多选框。
            </div>
            <div className="demo-code">
              {'import Select from "../../../../components/Select";'} <br />
              {'let list=[{text: "item1",value: "1"}, {text: "item2",value: "2"}, {text: "item3",value: "3"}, {text: "item4",value: "4"}];'} <br />
              {'<Select dataList={list} type="multiple" placeholder="请选择" onChange={value=>{console.log(value)}}/>'} <br />

            </div>
          </div>

          <div className="component-card">

            <div className="demo-container">

              <Select dataList={list} type="multiple" defaultValue={[list[1], list[2]]} placeholder="请选择" onChange={(value) => { console.log(value); }} />

            </div>
            <div className="demo-describe">
              <div className="demo-title">默认值</div>
              多选时<span className="key-word">value</span>为默认选中值。
            </div>
            <div className="demo-code">
              {'import Select from "../../../../components/Select";'} <br />
              {'let list=[{text: "item1",value: "1"}, {text: "item2",value: "2"}, {text: "item3",value: "3"}, {text: "item4",value: "4"}];'} <br />
              {'<Select dataList={list} type="multiple" defaultValue={[list[1], list[2]]} placeholder="请选择" onChange={value=>{console.log(value)}}/>'} <br />

            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default SelectContainer;
