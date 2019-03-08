import React, { Component } from 'react';
import Slider from '../../../../components/slider';

class SliderContainer extends Component {

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
      }],
      sliderValue1: 80,
      sliderValue2: 80,
      sliderValue3: 80,
      sliderValue4: 80
    };
  }

  componentDidMount() {
  }

  render() {
    const {
      sliderValue1,
      sliderValue2,
      sliderValue3
      } = this.state;

    return (
      <div className="component-container">
        <h2>slider 滑动条组件</h2>

        <div className="component-part">
          <div className="component-card">

            <div className="demo-container">

              <Slider
                max={1000}
                value={sliderValue1}
                onChange={(value) => { this.setState({ sliderValue1: value }); }}
                onAfterChange={(value) => { this.setState({ sliderValue1: value }); }}
              />

            </div>
            <div className="demo-describe">
              <div className="demo-title">基本</div>
              最简单的用法。
            </div>
            <div className="demo-code">
              {'import Slider from "../../../../components/slider";'} <br />
              {'let {sliderValue=80}=this.state'}
              <br />
              {'<Slider max={1000} value={sliderValue}'} <br />
              &emsp;&emsp;&emsp;&emsp;{'onChange={value=>{this.setState({sliderValue: value});}}'} <br />
              &emsp;&emsp;&emsp;&emsp;{'onAfterChange={value=>{this.setState({sliderValue: value})}}/>'} <br />

            </div>
          </div>

          <div className="component-card">

            <div className="demo-container">

              <Slider
                max={1000}
                value={sliderValue3}
                scale
                marks={[100, 200, 300, 400, 500, 600, 700, 800, 900]}
                onChange={(value) => { this.setState({ sliderValue3: value }); }}
                onAfterChange={(value) => { this.setState({ sliderValue3: value }); }}
              />

            </div>
            <div className="demo-describe">
              <div className="demo-title">刻度比例缩放</div>
              <span className="key-word">scale</span>为true时，滑动条刻度按固定比例缩放。
            </div>
            <div className="demo-code">

              {'import Slider from "../../../../components/slider";'} <br />
              {'let {sliderValue=80}=this.state'}
              <br />
              {'<Slider max={1000} value={sliderValue} scale={true}'} <br />
              &emsp;&emsp;&emsp;&emsp;{'marks={[100,200,300,400,500,600,700,800,900]}'} <br />
              &emsp;&emsp;&emsp;&emsp;{'onChange={value=>{this.setState({sliderValue: value});}}'} <br />
              &emsp;&emsp;&emsp;&emsp;{'onAfterChange={value=>{this.setState({sliderValue: value})}}/>'} <br />

            </div>
          </div>
        </div>

        <div className="component-part">

          <div className="component-card">

            <div className="demo-container">

              <Slider
                max={1000}
                marks={[100, 200, 300, 400, 500, 600, 700, 800, 900]}
                value={sliderValue2}
                onChange={(value) => { this.setState({ sliderValue2: value }); }}
                onAfterChange={(value) => { this.setState({ sliderValue2: value }); }}
              />

            </div>

            <div className="demo-describe">
              <div className="demo-title">刻度</div>
              <span className="key-word">marks</span>表示设置刻度值。
            </div>

            <div className="demo-code">

              {'import Slider from "../../../../components/slider";'} <br />
              {'let {sliderValue=80}=this.state'}
              <br />
              {'<Slider max={1000} marks={[100,200,300,400,500,600,700,800,900]} value={sliderValue}'} <br />
              &emsp;&emsp;&emsp;&emsp;{'onChange={value=>{this.setState({sliderValue: value});}}'} <br />
              &emsp;&emsp;&emsp;&emsp;{'onAfterChange={value=>{this.setState({sliderValue: value})}}/>'} <br />

            </div>
          </div>

        </div>
      </div>
    );
  }
}

export default SliderContainer;
