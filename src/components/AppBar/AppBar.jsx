import React, { Component } from 'react';
import PropTypes from 'prop-types';
import BCharts from 'BChart';
import _ from 'lodash';
import IconButton from 'material-ui/IconButton';
import Paper from 'material-ui/Paper';
import propTypes from 'material-ui/utils/propTypes';
import Cookies from 'js-cookie';
import {
  version
} from 'app.config';

import Switch from '../Switch';
import * as RedqService from '../../services/RedqService';
import HttpService from '../../components/HttpService';
import SvgIcon from '../../components/SvgIcon';
import './index.scss';
import EasyToast from '../EasyToast';
import Dialog from '../Dialog';
import BTable from '../BTable';
import TableExpendData from '../../containers/Alerts/TableExpendData2';

import Notification from '../Notification';
import PopConfirm from '../PopConfirm';

const API_ALERTS = 'nebula/events';
const API_SUPERVISOR ='/nebula/supervisor'
const appID = 'Strategie';
const httpRequestParam = {
  appID,
  module: 2
};

const notification = Notification.getNewInstance();

const API_SYSTEM_PERFORMANCE = 'system/performance/digest';

const username = Cookies.get('username');

export function getStyles(props, context) {
  const {
    appBar,
    button: {
      iconButtonSize
    },
    zIndex
  } = context.muiTheme;

  const flatButtonSize = 36;

  const styles = {
    root: {
      position: 'relative',
      zIndex: zIndex.appBar,
      width: '100%',
      display: 'flex',
      backgroundColor: appBar.color,
      paddingLeft: appBar.padding,
      paddingRight: appBar.padding
    },
    title: {
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      margin: 0,
      paddingTop: 0,
      letterSpacing: 0,
      fontSize: 24,
      fontWeight: appBar.titleFontWeight,
      color: appBar.textColor,
      height: '42px',
      lineHeight: '42px'
    },
    mainElement: {
      boxFlex: 1,
      flex: '1'
    },
    iconButtonStyle: {
      // marginTop: (appBar.height - iconButtonSize) / 2,
      // marginRight: 8,
      // marginLeft: -16,
      margin: 0,
      padding: 0,
      width: '42px',
      height: '42px'
    },
    iconButtonIconStyle: {
      fill: appBar.textColor,
      color: appBar.textColor
    },
    flatButton: {
      color: appBar.textColor,
      marginTop: ((iconButtonSize - flatButtonSize) / 2) + 1
    }
  };

  return styles;
}

class AppBar extends Component {
  static muiName = 'AppBar';

  static propTypes = {
    /**
     * Can be used to render a tab inside an app bar for instance.
     */
    children: PropTypes.node,
    /**
     * Applied to the app bar's root element.
     */
    className: PropTypes.string,
    /**
     * The classname of the icon on the left of the app bar.
     * If you are using a stylesheet for your icons,
     *  enter the class name for the icon to be used here.
     */
    iconClassNameLeft: PropTypes.string,
    /**
     * Similiar to the iconClassNameLeft prop except that
     * it applies to the icon displayed on the right of the app bar.
     */
    iconClassNameRight: PropTypes.string,
    /**
     * The custom element to be displayed on the left side of the
     * app bar such as an SvgIcon.
     */
    iconElementLeft: PropTypes.element,
    /**
     * Similiar to the iconElementLeft prop except
     * that this element is displayed on the right of the app bar.
     */
    iconElementRight: PropTypes.element,
    /**
     * Override the inline-styles of the element displayed on the left side of the app bar.
     */
    iconStyleLeft: PropTypes.oneOfType([PropTypes.object]),
    /**
     * Override the inline-styles of the element displayed on the right side of the app bar.
     */
    iconStyleRight: PropTypes.oneOfType([PropTypes.object]),
    /**
     * Callback function for when the left icon is selected via a touch tap.
     *
     * @param {object} event TouchTap event targeting the left `IconButton`.
     */
    onLeftIconButtonTouchTap: PropTypes.func,
    /**
     * Callback function for when the right icon is selected via a touch tap.
     *
     * @param {object} event TouchTap event targeting the right `IconButton`.
     */
    onRightIconButtonTouchTap: PropTypes.func,
    /**
     * Callback function for when the title text is selected via a touch tap.
     *
     * @param {object} event TouchTap event targeting the `title` node.
     */
    onTitleTouchTap: PropTypes.func,
    /**
     * Determines whether or not to display the Menu icon next to the title.
     * Setting this prop to false will hide the icon.
     */
    showMenuIconButton: PropTypes.bool,
    /**
     * Override the inline-styles of the root element.
     */
    style: PropTypes.oneOfType([PropTypes.object]),
    /**
     * The title to display on the app bar.
     */
    title: PropTypes.node,
    /**
     * Override the inline-styles of the app bar's title element.
     */
    titleStyle: PropTypes.oneOfType([PropTypes.object]),
    /**
     * The zDepth of the component.
     * The shadow of the app bar is also dependent on this property.
     */
    zDepth: propTypes.zDepth
  };

  static defaultProps = {
    showMenuIconButton: true,
    title: '',
    zDepth: 1,
    children: null,
    className: '',
    iconClassNameLeft: '',
    iconClassNameRight: '',
    iconElementLeft: null,
    iconElementRight: null,
    iconStyleLeft: undefined,
    iconStyleRight: undefined,
    onLeftIconButtonTouchTap: undefined,
    onRightIconButtonTouchTap: undefined,
    onTitleTouchTap: undefined,
    style: undefined,
    titleStyle: undefined
  };

  static contextTypes = {
    muiTheme: PropTypes.object.isRequired
  };

  static getCpuChart(data) {
    console.log(data);
    // 初始化图表对象
    const cpuChart = new BCharts('#cpuChart');
    cpuChart
      .setConfig({
        name: 'cpu',
        type: 'line',
        lineType: 'area',
        interpolate: 'monotone',
        showPoint: false,
        gradient: {
          type: 'horizontal',
          color: ['#7CDCCE', '#22C3F7']
        },
        data
      })
      // x轴配置
      .setXAxis({
        gridLine: false,
        show: false,
        border: false
      })
      // Y轴配置
      .setYAxis({
        gridLine: false,
        show: false,
        border: false,
        maxValue: 100
      })
      .setHoverText(param => `${param.y}%`, { posFree: true })
      // 构建图表
      .build();
  }

  static getMemChart(data) {
    // 初始化图表对象
    const memChart = new BCharts('#memChart');
    memChart
    // 基本配置
      .setConfig({
        name: 'mem',
        type: 'line',
        lineType: 'area',
        interpolate: 'monotone',
        showPoint: false,
        gradient: {
          type: 'horizontal',
          color: ['#7CDCCE', '#22C3F7']
        },
        data
      })
      // x轴配置
      .setXAxis({
        gridLine: false,
        show: false,
        border: false
      })
      // Y轴配置
      .setYAxis({
        gridLine: false,
        show: false,
        border: false,
        maxValue: 100
      })
      .setHoverText(param => `${param.y}%`, { posFree: true })
      // 构建图表
      .build();
  }

  constructor(props) {
    super(props);
    // const me = this;
    this.state = {
      redqStatus: RedqService.getRedqStatus(),
      disk: 0,
      cloneVisible: false,
      cloneVisible2: false,
      tailfMsg: '',
      columns: [
        {
          title: 'State',
          render: (key, item, index) => (
            <div className={item.state ==0 ?  'status_control red' : 'status_control'} >{item.statename}</div>
          ),
          width: 100
        }, {
          title: 'Description',
          dataIndex: 'description',
          key: 'description',
          width: 250
        }, {
          title: 'Name',
          dataIndex: 'name',
          key: 'name',
          width: 250
        }, {
          title: 'Action',
          width: 300,
          render: (key, item, index) => (
            <div><span className="start_stop" onClick={() => {this.start('start', item)}}>Start</span><span className="start_stop" style={{ margin: '0 20px' }} onClick={() => {this.start('stop', item)}}>Stop</span><span className="start_stop" onClick={() => {this.tailf(item)}}>Tail-f</span></div>
          )
        }],
      items: [],
      selectedIndex: -1
    };
    this.render = this.render.bind(this);
  }

  componentDidMount() {
    // 注释掉cpu 请求
    this.fetchSystemPerformance();
    // this.fetchAlerts();
  }

  setValue(name, value) {
    const state = this.state;
    state[name] = value;
    if (name === 'redqStatus') {
      RedqService.setRedqStatus(value);
    }
    this.setState(
      state
    );
  }

  fetchSystemPerformance() {
    HttpService.get({
      url: API_SYSTEM_PERFORMANCE,
      params: {},
      onSuccess: (data) => {
        const cpus = _.map(data.cpu, item => ({ x: 0, y: item }));

        const memories = _.map(data.memory, item => ({ x: 0, y: item }));

        // 点击数 四天内有数据为0  写入Tracker
        if (window.threathunterTracker) {
          // 报警线 cpu: 80%  内存：80%  硬盘：50%
          const cpuOver = _.last(data.cpu) > 80;
          const memoryOver = _.last(data.memory) > 80;
          const spaceOver = _.last(data.space) > 50;

          const status = [];
          // cpu
          if (cpuOver) {
            status.push('cpu');
          }
          // memory
          if (memoryOver) {
            status.push('memory');
          }
          // space
          if (spaceOver) {
            status.push('space');
          }
          if (status.length > 0) {
            window.threathunterTracker.setData({
              version,
              username,
              appID: 'DashBoard',
              module: 11,
              level: 2,
              message: status.join('_')
            });
          }
        }

        AppBar.getCpuChart(cpus);
        AppBar.getMemChart(memories);

        this.setState({
          disk: data.space
        });
      }
    });
  }

  handleTouchTapLeftIconButton = (event) => {
    if (this.props.onLeftIconButtonTouchTap) {
      this.props.onLeftIconButtonTouchTap(event);
    }
  };

  handleTouchTapRightIconButton = (event) => {
    if (this.props.onRightIconButtonTouchTap) {
      this.props.onRightIconButtonTouchTap(event);
    }
  };

  handleTitleTouchTap = (event) => {
    if (this.props.onTitleTouchTap) {
      this.props.onTitleTouchTap(event);
    }
  };
  show = () => {
    this.fetchSUPERVISOR();
    const _this = this;
    this.state.timer = setInterval(() => {
      _this.fetchSUPERVISOR();
    },1000)
    this.setState({
      cloneVisible: true
    });
  };
  tailf = (item) => {
    // alert(msg);
    HttpService.get({
      url: API_SUPERVISOR,
      params: { process_name: `${item.group}:${item.name}`, info: 'stdout_log' },
      onSuccess: (data) => {
        if (data.status_code == 200) {
          this.setState({ tailfMsg: data.result[0], cloneVisible2: true });
        }
      },
      onError: () => {
        notification.error('服务异常，请重试。');
      }
    });
  };
  start = (msg, item) => {
    if (item.statename == 'RUNNING' && msg == 'start') {
      return;
    }
    if (item.statename == 'STOPPED' && msg == 'stop') {
      return;
    }
    HttpService.put({
      url: API_SUPERVISOR,
      params: { process_name: `${item.group}:${item.name}`, status: msg },
      onSuccess: (data) => {
        // console.log(data);
      },
      onError: () => {
        notification.error('服务异常，请重试。');
      }
    });
  }

  // 获取“监控列表”
  fetchSUPERVISOR() {
    HttpService.get({
      url: API_SUPERVISOR,
      params: { info: 'process_info' },
      onSuccess: (data) => {
        if (data.status_code == 200) {
          this.setState({ items: data.result });
        }
      },
      onError: () => {
        notification.error('服务异常，请重试。');
      }
    });
  }
  render() {
    const {
      title,
      titleStyle,
      iconStyleLeft,
      iconStyleRight,
      onTitleTouchTap, // eslint-disable-line no-unused-vars
      showMenuIconButton,
      iconElementLeft,
      iconElementRight,
      iconClassNameLeft,
      iconClassNameRight,
      onLeftIconButtonTouchTap, // eslint-disable-line no-unused-vars
      onRightIconButtonTouchTap,
      className,
      style,
      zDepth,
      children,
      ...other
    } = this.props;

    const { prepareStyles } = this.context.muiTheme;
    const styles = getStyles(this.props, this.context);

    let menuElementLeft;
    let menuElementRight;

    // If the title is a string, wrap in an h1 tag.
    // If not, wrap in a div tag.
    const titleComponent = typeof title === 'string' || title instanceof String ? 'h1' : 'div';

    const titleElement = React.createElement(titleComponent, {
      onTouchTap: this.handleTitleTouchTap,
      style: prepareStyles(Object.assign(styles.title, styles.mainElement, titleStyle))
    }, title);

    const iconLeftStyle = Object.assign({}, styles.iconButtonStyle, iconStyleLeft);

    if (showMenuIconButton) {
      let iconElementLeftNode = iconElementLeft;

      if (iconElementLeft) {
        if (iconElementLeft.type.muiName === 'IconButton') {
          const iconElemLeftChildren = iconElementLeft.props.children;
          const iconButtonIconStyle = !(
            iconElemLeftChildren &&
            iconElemLeftChildren.props &&
            iconElemLeftChildren.props.color
          ) ? styles.iconButtonIconStyle : null;

          iconElementLeftNode = React.cloneElement(iconElementLeft, {
            iconStyle: Object.assign({}, iconButtonIconStyle, iconElementLeft.props.iconStyle)
          });
        }

        menuElementLeft = (
          <div style={prepareStyles(iconLeftStyle)}>
            {iconElementLeftNode}
          </div>
        )
        ;
      } else {
        menuElementLeft = (
          <SvgIcon
            className="sidebar-icon"
            iconName="sidebar"
            viewBox="0 0 17 15"
            onClick={this.handleTouchTapLeftIconButton}
          />
        );
      }
    }

    const iconRightStyle = Object.assign({}, styles.iconButtonStyle, {
      marginRight: -16,
      marginLeft: 'auto'
    }, iconStyleRight);

    if (iconElementRight) {
      let iconElementRightNode = iconElementRight;

      switch (iconElementRight.type.muiName) {
        case 'IconMenu':
        case 'IconButton': {
          const iconElemRightChildren = iconElementRight.props.children;
          const iconButtonIconStyle = !(
            iconElemRightChildren &&
            iconElemRightChildren.props &&
            iconElemRightChildren.props.color
          ) ? styles.iconButtonIconStyle : null;

          iconElementRightNode = React.cloneElement(iconElementRight, {
            iconStyle: Object.assign({}, iconButtonIconStyle, iconElementRight.props.iconStyle)
          });
          break;
        }

        case 'FlatButton':
          iconElementRightNode = React.cloneElement(iconElementRight, {
            style: Object.assign({}, styles.flatButton, iconElementRight.props.style)
          });
          break;

        default:
      }

      menuElementRight = (
        <div
          style={prepareStyles(iconRightStyle)}
        >
          {iconElementRightNode}
        </div>
      )
      ;
    } else if (iconClassNameRight) {
      menuElementRight = (
        <IconButton
          style={iconRightStyle}
          iconStyle={styles.iconButtonIconStyle}
          iconClassName={iconClassNameRight}
          onTouchTap={this.handleTouchTapRightIconButton}
        />
      )
      ;
    }
    const spaceStyle = {
      width: `${100 - this.state.disk}%`
    };
    return (
      <Paper
        {...other}
        rounded={false}
        className={className}
        style={Object.assign({}, styles.root, style)}
        zDepth={zDepth}
      >
        {menuElementLeft}
        {titleElement}
        {menuElementRight}
        <span />

        <div className="app-title-bar">
          <span style={{ cursor: 'pointer' }} onClick={this.show}>
            <i className="iconfont icon-jiankong" style={{ fontSize: '17px' }} />
            <span style={{ margin: '0 40px 0 8px' }} >系统监控</span>
          </span>
          <span>CPU</span>

          <div id="cpuChart" className="mini-chart" />
          <span>内存</span>

          <div id="memChart" className="mini-chart" />
          <div className="hard-disk-container">
            <span>硬盘</span>

            <div className="hard-disk">
              <div className="active" style={spaceStyle} />
            </div>
            <div className="disk-percent">{`${this.state.disk}%`}</div>
          </div>
          {/* <span className="redq">RED.Q服务</span> */}
          {/* <Switch */}
          {/* className="switch" */}
          {/* defaultValue={this.state.redqStatus} */}
          {/* checked={this.state.redqStatus} */}
          {/* onChange={(value) => { */}
          {/* this.setValue('redqStatus', value); */}
          {/* }} */}
          {/* /> */}
        </div>
        <Dialog
          visible={this.state.cloneVisible}
          className="strategy-clone-dialog"
          style={{ width: '800px' }}
          destroy
          title="运行监控"
          onClose={() => {
            if (this.state.timer != null) {
              clearInterval(this.state.timer);
            }
            this.setState({ cloneVisible: false });
          }}
        >
          <BTable
            className="risk-table"
            data={this.state.items}
            columns={this.state.columns}
            fixedHeader
            bodyHeight="calc(100% -41px)"
            onRowExpand={(index) => {
              if (index === this.state.selectedIndex) {
                this.setState({
                  selectedIndex: -1
                });
                return;
              }
              this.setState({
                selectedIndex: index
              });
            }}
          />
        </Dialog>
        <Dialog
          visible={this.state.cloneVisible2}
          className="strategy-clone-dialog"
          style={{ width: '700px' }}
          destroy
          title="日志"
          onClose={() => {
            this.setState({ cloneVisible2: false });
          }}
        >
          <div className="log" style={{ height: '300px' } }>
            <code className="log_code">{this.state.tailfMsg ? this.state.tailfMsg : '暂无日志信息'}</code>
          </div>
        </Dialog>
        {children}
      </Paper>
    );
  }
}

export default AppBar;
