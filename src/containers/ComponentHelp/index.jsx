import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import _ from 'lodash';
import URI from 'urijs';

import DatePickerContainer from './Components/DatePickerContainer/';
import DialogContainer from './Components/DialogContainer/';
import EasyToastContainer from './Components/EasyToastContainer/';
import ToastContainer from './Components/ToastContainer/';
import NewComponent from './Components/NewComponent/';
import LabelCreatorContainer from './Components/LabelCreatorContainer/';
import LabelInputContainer from './Components/LabelInputContainer/';
import LabelPickerContainer from './Components/LabelPickerContainer/';
import ListContainer from './Components/ListContainer/';
import PopConfirmContainer from './Components/PopConfirmContainer/';
import SelectContainer from './Components/SelectContainer/';
import SelectorContainer from './Components/SelectorContainer/';
import SliderContainer from './Components/SliderContainer/';
import SvgIconContainer from './Components/SvgIconContainer/';
import TabBarContainer from './Components/TabBarContainer/';

import './index.scss';

@withRouter
class ComponentHelp extends Component {
  static propTypes = {
    location: PropTypes.oneOfType([PropTypes.object]).isRequired,
    history: PropTypes.oneOfType([PropTypes.object]).isRequired
  };

  constructor(props) {
    super(props);

    const tabList = [{
      text: 'DatePicker 日历组件',
      render: (<DatePickerContainer />)
    }, {
      text: 'Dialog 对话框组件',
      render: (<DialogContainer />)
    }, {
      text: 'EasyToast 悬浮提示组件',
      render: (<EasyToastContainer />)
    }, {
      text: 'LabelCreator 创建标签组件',
      render: (<LabelCreatorContainer />)
    }, {
      text: 'LabelInput 输入标签组件',
      render: (<LabelInputContainer />)
    }, {
      text: 'LabelPicker 选择标签组件',
      render: (<LabelPickerContainer />)
    }, {
      text: 'List 列表组件',
      render: (<ListContainer />)
    }, {
      text: 'PopConfirm 弹出确认框组件',
      render: (<PopConfirmContainer />)
    }, {
      text: 'Select 输入选择框组件',
      render: (<SelectContainer />)
    }, {
      text: 'Selector 选择列表组件',
      render: (<SelectorContainer />)
    }, {
      text: 'slider 滑动条组件',
      render: (<SliderContainer />)
    }, {
      text: 'SvgIcon svg图标',
      render: (<SvgIconContainer />)
    }, {
      text: 'TabBar 页签组件',
      render: (<TabBarContainer />)
    }, {
      text: 'Toast 悬浮居中提示组件',
      render: (<ToastContainer />)
    }, {
      text: '新组件开发',
      render: (<NewComponent />)
    }];

    const defaultTab = _.get(URI(this.props.location.search).query(true), 'tab', 0);

    this.state = {
      // selectedTab
      selectedTab: tabList[defaultTab],
      // 页签列表
      tabList
    };
  }

  componentDidMount() {
  }

  // 选择组件
  selectTab(item, key) {
    this.setState({ selectedTab: item });

    this.props.history.push(`/ComponentHelp?tab=${key}`);
  }

  render() {
    const {
      tabList,
      selectedTab
    } = this.state;

    return (
      <div className="wb-component-help container">

        <h1 className="component-help-title">组件帮助</h1>

        <div className="main-container">

          <div className="side-menu">
            <h2 className="menu-title">组件菜单</h2>
            <ul>
              {
                _.map(tabList, (item, key) => (
                  <li
                    key={key}
                    className={item === selectedTab ? 'active' : ''}
                    onClick={() => {
                      this.selectTab(item, key);
                    }}
                    role="presentation"
                  >{item.text}</li>
                ))
              }
            </ul>
          </div>
          <div className="main-component">

            {selectedTab.render}
          </div>

        </div>

      </div>
    );
  }
}

export default ComponentHelp;
