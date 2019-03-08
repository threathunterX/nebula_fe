import React, { Component } from 'react';
import LabelInput from '../../../../components/LabelInput';

class LabelInputContainer extends Component {

  constructor(props) {
    super(props);

    this.state = {
      isError: false,
      labelList1: [],
      labelList2: ['label1', 'label2', 'label3'],
      labelList3: ['label1', 'label2', 'label3']
    };
  }

  checkError(labelList) {
    for (let i = 0; i < labelList.length; i += 1) {
      const item = labelList[i];
      if (item.length > 7) {
        this.setState({
          labelList,
          isError: true
        });
        return;
      }
    }

    this.setState({
      labelList,
      isError: false
    });
  }

  render() {
    const {
      isError,
      labelList1,
      labelList2,
      labelList3
      } = this.state;

    return (
      <div className="component-container">
        <h2>LabelInput 输入标签组件</h2>

        <div className="component-part">
          <div className="component-card">

            <div className="demo-container">

              <LabelInput
                className="label-list"
                labelList={labelList1}
                labelClass="label-item"
                onChange={(param) => { console.log(param); }}
                placeholder="输入后回车以添加标签"
              />

            </div>
            <div className="demo-describe">
              <div className="demo-title">基本</div>
              最简单的用法。
            </div>
            <div className="demo-code">
              {'import LabelInput from "../../../../components/LabelInput";'} <br />
              {'let labelList = [];'}<br />
              {'this.state = {labelList};'}<br />
              <br />
              {'let {labelList}=this.state;'} <br />
              {'<LabelInput className="label-list" labelList={labelList} labelClass="label-item"'} <br />
              &emsp;&emsp;&emsp;&emsp;{'onChange={(param)=>{console.log(param);}} placeholder="输入后回车以添加标签"/>'} <br />
              <br />

            </div>
          </div>

          <div className="component-card">

            <div className="demo-container">

              <LabelInput className="label-list" labelList={labelList3} labelClass="label-item" disabled />

            </div>
            <div className="demo-describe">
              <div className="demo-title">组件禁用</div>
              <span className="key-word">disabled</span>属性为true时，组件禁用。
            </div>
            <div className="demo-code">
              {'import LabelInput from "../../../../components/LabelInput";'} <br />
              {'let labelList = ["label1", "label2", "label3"];'}<br />
              {'this.state = {labelList};'}<br />
              <br />
              {'let {labelList}=this.state;'} <br />
              {'LabelInput className="label-list" labelList={labelList3} labelClass="label-item" disabled={true}/>'} <br />
              <br />

            </div>
          </div>
        </div>


        <div className="component-part">

          <div className="component-card">

            <div className="demo-container">

              <LabelInput
                className="label-list"
                labelList={labelList2}
                labelClass="label-item"
                onChange={(labelList) => { this.checkError(labelList); }}
                isError={isError}
                errorText="输入内容已超过7个字"
                placeholder="输入内容不超过7个字"
              />

            </div>
            <div className="demo-describe">
              <div className="demo-title">检验内容</div>
              <span className="key-word">isError</span>为true时表示内容有误，<span className="key-word">errorText</span>为错误提示。
            </div>
            <div className="demo-code">

              {'import LabelInput from "../../../../components/LabelInput";'} <br />
              {'let labelList = ["label1", "label2", "label3"];'}<br />
              {'let isError = false;'}<br />
              {'this.state = {labelList, isError};'}<br />
              {'function checkError(labelList) {'} <br />
              {'for(let item of labelList.values()) {'} <br />
              {'if(item.length > 7) {'} <br />
              {'this.setState({labelList,isError:true});'} <br />
              {'return ;'} <br />
              {'}'} <br />
              {'}'} <br />
              {'this.setState({labelList, isError:false});'} <br />
              {'}'} <br />
              <br />
              {'let {labelList, isError}=this.state;'} <br />
              {'<LabelInput className="label-list" labelList={labelList} labelClass="label-item"'} <br />
              &emsp;&emsp;&emsp;&emsp;{'onChange={(labelList)=>{this.checkError(labelList);}} isError={isError}'} <br />
              &emsp;&emsp;&emsp;&emsp;{'errorText="输入内容已超过7个字" placeholder="输入内容不超过7个字"/>'} <br />
              <br />

            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default LabelInputContainer;
