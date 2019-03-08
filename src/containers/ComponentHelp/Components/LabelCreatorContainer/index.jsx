import React, { Component } from 'react';
import LabelCreator from '../../../../components/LabelCreator';

class LabelCreatorContainer extends Component {

  constructor(props) {
    super(props);

    const tags = ['label1', 'label2', 'label3', 'label4'];
    this.state = {
      tags,
      selectedLabel: ['label1', 'label3'],
      selectedLabelDisabled: ['label1', 'label3']
    };
  }

  render() {
    const {
      selectedLabel,
      tags,
      selectedLabelDisabled
    } = this.state;

    return (
      <div className="component-container">
        <h2>LabelCreator 创建标签组件</h2>

        <div className="component-part">
          <div className="component-card">

            <div className="demo-container">

              <LabelCreator
                className="black-list-item"
                labelList={tags}
                selectedLabel={selectedLabel}
                onChange={(values) => {
                  console.log(values);
                  this.setState({ selectedLabel: values });
                }}
                onSelect={(values) => {
                  console.log(values);
                  this.setState({ selectedLabel: values });
                }}
              />
            </div>
            <div className="demo-describe">
              <div className="demo-title">基本</div>
              最简单的用法。
            </div>
            <div className="demo-code">
              {'import LabelCreator from "../../../../components/LabelCreator";'} <br />
              {'let tab = ["label1", "label2", "label3", "label4"];'}<br />
              {'this.state = {tab, selectedLabel:["label1", "label3"]};'}<br />
              <br />
              {'let {tags, selectedLabel}=this.state;'} <br />
              {'<LabelCreator className="black-list-item" labelList={tags} selectedLabel={selectedLabel}'} <br />
              &emsp;&emsp;&emsp;&emsp;{'onChange={values=>{console.log(values);this.setState({selectedLabel: values})}}'}
              <br />
              &emsp;&emsp;&emsp;&emsp;{'onSelect={values=>{console.log(values);this.setState({selectedLabel: values})}}'}
              <br />
              <br />

            </div>
          </div>

        </div>


        <div className="component-part">

          <div className="component-card">

            <div className="demo-container">

              <LabelCreator
                className="black-list-item"
                labelList={tags}
                selectedLabel={selectedLabelDisabled}
                disabled
              />

            </div>
            <div className="demo-describe">
              <div className="demo-title">组件禁用</div>
              <span className="key-word">disabled</span>为true时禁用。
            </div>
            <div className="demo-code">

              {'import LabelCreator from "../../../../components/LabelCreator";'} <br />
              {'let tab = ["label1", "label2", "label3", "label4"];'}<br />
              {'let selectedLabel = ["label1", "label3"];'}<br />
              {'<LabelCreator className="black-list-item" labelList={tags} selectedLabel={selectedLabel} disabled={true}/>'}
              <br />

            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default LabelCreatorContainer;
