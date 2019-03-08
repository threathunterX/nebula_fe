import React, { Component } from 'react';
import TabBar from '../../../../components/TabBar';

class TabBarContainer extends Component {

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
    const {
      tabList,
      selectIndex
    } = this.state;

    return (
      <div className="component-container">
        <h2>TabBar 页签组件</h2>

        <div className="component-full">
          <div className="component-card">

            <div className="demo-container">

              <TabBar
                tabList={tabList}
                selectIndex={selectIndex}
                onSelect={(e, item) => {
                  this.setState({ selectIndex: item.tabIndex });
                }}
              />

            </div>
            <div className="demo-describe">
              <div className="demo-title">用法</div>
              页签属性中存在<span className="key-word">iconName</span>时，使用SvgIcon图标，<span className="key-word">iconClass</span>为图标的class，
              <span className="key-word">disabled</span>表示该页签是否禁用。
            </div>
            <div className="demo-code">
              {'import TabBar from "../../../../components/TabBar";'} <br />
              {'let {selectIndex}=this.state'} <br />
              {'let tabList=[{'} <br />
              {'iconName: "visitor",'} <br />
              {'iconClass: "visitor-icon",'} <br />
              {'tabText: "访客风险"'} <br />
              {'}, {'} <br />
              {'iconClass: "icon-tablet",'} <br />
              {'tabText: "帐号风险"'} <br />
              {'}, {'} <br />
              {'iconClass: "icon-creditcard",'} <br />
              {'tabText: "支付风险",'} <br />
              {'disabled: true'} <br />
              {'}];'} <br />
              {'<TabBar tabList={tabList} selectIndex={selectIndex} onSelect={(e, item)=>{this.setState({selectIndex: item.tabIndex})}}/>'}
              <br />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default TabBarContainer;
