import React, { Component } from 'react';
import LabelPicker from '../../../../components/LabelPicker';

class LabelPickerContainer extends Component {

  constructor(props) {
    super(props);

    const labelList = ['label1', 'label2', 'label3', 'label4', 'label5', 'label6', 'label7', 'label8'];

    this.state = {
      labelList,
      selectedLabels1: ['label2', 'label4', 'label7'],
      selectedLabels2: ['label2', 'label4', 'label7']
    };
  }

  render() {
    const {
      labelList,
      selectedLabels1,
      selectedLabels2
    } = this.state;

    return (
      <div className="component-container">
        <h2>LabelPicker 选择标签组件</h2>

        <div className="component-part">
          <div className="component-card">

            <div className="demo-container">

              <LabelPicker
                style={{ width: '300px' }}
                items={labelList}
                selectedLabels={selectedLabels1}
                onChange={(values) => {
                  console.log(values);
                  this.setState({ selectedLabels1: values });
                }}
              />

            </div>
            <div className="demo-describe">
              <div className="demo-title">基本</div>
              最简单的用法。
            </div>
            <div className="demo-code">
              {'import LabelPicker from "../../../../components/LabelPicker";'} <br />
              {'let labelList=["label1", "label2", "label3", "label4", "label5", "label6","label7", "label8"];'}<br />
              {'let selectedLabels=["label2", "label4", "label7"];'}<br />
              {'this.state = {labelList};'}<br />
              <br />
              {'let {labelList, selectedLabels}=this.state;'} <br />
              {'<LabelPicker style={{width: "300px"}} items={labelList} selectedLabels={selectedLabels1}'} <br />
              &emsp;&emsp;&emsp;&emsp;{'onChange={values=>{console.log(values);this.setState({selectedLabels1:values})}}/>'}
              <br />
              <br />

            </div>
          </div>

        </div>


        <div className="component-part">

          <div className="component-card">

            <div className="demo-container">

              <LabelPicker style={{ width: '300px' }} items={labelList} selectedLabels={selectedLabels2} readOnly />

            </div>
            <div className="demo-describe">
              <div className="demo-title">只读属性</div>
              <span className="key-word">readOnly</span>属性为true时，组件只读，并只展示选中的标签。
            </div>
            <div className="demo-code">
              {'import LabelPicker from "../../../../components/LabelPicker";'} <br />
              {'let labelList=["label1", "label2", "label3", "label4", "label5", "label6","label7", "label8"];'}<br />
              {'let selectedLabels=["label2", "label4", "label7"];'}<br />
              {'this.state = {labelList};'}<br />
              <br />
              {'let {labelList, selectedLabels}=this.state;'} <br />
              {'<LabelPicker style={{width: "300px"}} items={labelList} selectedLabels={selectedLabels} readOnly={true}/>'}
              <br />
              <br />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default LabelPickerContainer;
