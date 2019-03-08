import React, { Component } from 'react';
import SvgIcon from '../../../../components/SvgIcon';

class SvgIconContainer extends Component {

  constructor(props) {
    super(props);
    this.state = {
      selectIndex: 0,
      tabList: [{
        iconName: 'visitor',
        iconClass: 'visitor-icon',
        tabText: '访客风险'
      }, {
        iconClass: 'icon-tablet',
        tabText: '帐号风险'
      }, {
        iconClass: 'icon-creditcard',
        tabText: '支付风险',
        disabled: true
      }]
    };
  }

  componentDidMount() {
  }

  render() {
    return (
      <div className="component-container">
        <h2>SvgIcon svg图标</h2>

        <div className="component-full">
          <div className="component-card">

            <div className="demo-container">

              <SvgIcon iconName="cup" style={{ marginRight: '20px' }} />
              <SvgIcon iconName="visitor" style={{ marginRight: '20px' }} />
              <SvgIcon iconName="flag" style={{ marginRight: '20px' }} />
              <SvgIcon iconName="tag" style={{ marginRight: '20px' }} />
              <SvgIcon iconName="sidebar" />

            </div>
            <div className="demo-describe">
              <div className="demo-title">基本</div>
              svg图标目前有五种，通过<span className="key-word">iconName</span>设置，分别为cup、visitor、flag、tag、sidebar。
            </div>
            <div className="demo-code">

              {'import SvgIcon from "../../../../components/SvgIcon";'} <br />
              {'<SvgIcon iconName="cup" style={{marginRight: "20px"}}/>'} <br />
              {'<SvgIcon iconName="visitor" style={{marginRight: "20px"}}/>'} <br />
              {'<SvgIcon iconName="flag" style={{marginRight: "20px"}}/>'} <br />
              {'<SvgIcon iconName="tag" style={{marginRight: "20px"}}/>'} <br />
              {'<SvgIcon iconName="sidebar"/>'} <br />

            </div>
          </div>

        </div>

      </div>
    );
  }
}

export default SvgIconContainer;
