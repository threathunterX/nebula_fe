import React, { Component } from 'react';
import Selector from '../../../../components/Selector';

class SelectorContainer extends Component {

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
        <h2>Selector 选择列表组件</h2>

        <div className="component-part">
          <div className="component-card">

            <div className="demo-container">

              <Selector dataList={list} onChange={(value) => { console.log(value); }} />

            </div>
            <div className="demo-describe">
              <div className="demo-title">基本</div>
              最简单的用法。<span className="key-word">type</span>不设置默认为普通下拉框列表。
            </div>
            <div className="demo-code">
              {'import Selector from "../../../../components/Selector";'} <br />
              {'let list=[{text: "item1",value: "1"}, {text: "item2",value: "2"}, {text: "item3",value: "3"}, {text: "item4",value: "4"}];'}
              <br />
              {'<Selector dataList={list} onChange={(value)=>{console.log(value);}}/>'} <br />

            </div>
          </div>

          <div className="component-card">

            <div className="demo-container">

              <Selector disabled dataList={list} value={list[1]} />

            </div>
            <div className="demo-describe">
              <div className="demo-title">禁用</div>
              <span className="key-word">disabled</span>为true时禁用。
            </div>
            <div className="demo-code">

              {'import Selector from "../../../../components/Selector";'} <br />
              {'let list=[{text: "item1",value: "1"}, {text: "item2",value: "2"}, {text: "item3",value: "3"}, {text: "item4",value: "4"}];'} <br />
              {'<Selector disabled={true} dataList={list} value={list[1]}/>'} <br />

            </div>
          </div>
        </div>

        <div className="component-part">

          <div className="component-card">

            <div className="demo-container">

              <Selector
                dataList={list}
                value={list[1]}
                onChange={(value) => { console.log(value); }}
              />
            </div>

            <div className="demo-describe">
              <div className="demo-title">默认值</div>
              <span className="key-word">value</span>设置默认值。
            </div>

            <div className="demo-code">

              {'import Selector from "../../../../components/Selector";'} <br />
              {'let list=[{text: "item1",value: "1"}, {text: "item2",value: "2"}, {text: "item3",value: "3"}, {text: "item4",value: "4"}];'}
              <br />
              {'<Selector dataList={list} value={list[1]} onChange={(value)=>{console.log(value);}}/>'} <br />

            </div>
          </div>

          <div className="component-card">

            <div className="demo-container">

              <Selector
                selectorType="custom"
                defaultText="选择内容"
                placeholder="请选择"
                overlay={selectorApi => (
                  <div style={{ padding: '20px' }}>
                    <p>自定义内容</p>
                    <div onClick={() => selectorApi.onClose()} role="presentation">关闭</div>
                  </div>
                        )}
              />
            </div>

            <div className="demo-describe">
              <div className="demo-title">自定义选择框</div>
              <span className="key-word">defaultText</span>为输入框内显示内容，<span className="key-word">overlay</span>为返回自定义内容的函数，
                  函数传参有<span className="key-word">selectorApi</span>，<span className="key-word">selectorApi</span>中有onClose方法关闭下拉框。
            </div>

            <div className="demo-code">

              {'import Select from "../../../../components/Select";'} <br />
              {'<Selector selectorType="custom" defaultText="选择内容" placeholder="请选择"'}<br />
              &emsp;&emsp;&emsp;&emsp;&emsp;{'overlay={(selectorApi)=>('}<br />
              &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;{'<div style={{padding: "20px"}}>'}<br />
              &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;{'<p>自定义内容</p>'}<br />
              &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;{'<div onClick={()=>{selectorApi.onClose()}}>关闭</div>'}<br />
              &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;{'</div>'}<br />
              &emsp;&emsp;&emsp;&emsp;&emsp;{')}/>'}<br />

            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default SelectorContainer;
