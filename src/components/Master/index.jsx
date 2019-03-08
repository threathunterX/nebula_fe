import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import Title from 'react-title-component';
import spacing from 'material-ui/styles/spacing';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import { darkWhite, lightWhite, grey900 } from 'material-ui/styles/colors';
import withWidth, { MEDIUM, LARGE } from 'material-ui/utils/withWidth';
import injectTapEventPlugin from 'react-tap-event-plugin';
import Cookies from 'js-cookie';

import AppBar from '../AppBar';
import Sidebar from '../Sidebar';
import License from '../License';
import HttpService from '../HttpService';
import Notification from '../Notification';
import navList from '../Sidebar/constants';
import {
  GOD_EYE
} from '../../containers/UserManage/constants';

import './index.scss';

const notification = Notification.getNewInstance();

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

@withRouter
class Master extends Component {
  static propTypes = {
    children: PropTypes.node,
    location: PropTypes.oneOfType([PropTypes.object]).isRequired,
    history: PropTypes.oneOfType([PropTypes.object]).isRequired,
    width: PropTypes.number.isRequired
  };
  static defaultProps = {
    children: null
  };

  static childContextTypes = {
    muiTheme: PropTypes.object
  };

  constructor(props) {
    super(props);

    const username = Cookies.get('username');

    this.state = {
      navDrawerOpen: true,
      username,
      privilegesList: []
    };
  }

  getChildContext() {
    return {
      muiTheme: this.state.muiTheme
    };
  }

  componentWillMount() {
    this.setState({
      muiTheme: getMuiTheme()
    });
  }

  componentDidMount() {
    this.getPrivileges();
  }

  componentWillReceiveProps(nextProps, nextContext) {
    const newMuiTheme = nextContext.muiTheme ? nextContext.muiTheme : this.state.muiTheme;
    this.setState({
      muiTheme: newMuiTheme
    });
  }

  componentDidUpdate() {
    const username = Cookies.get('username');
    if (username !== this.state.username) {
      this.state.username = username;
      this.getPrivileges();
    }
  }

  // 获取页面权限
  getPrivileges() {
    // 获取页面权限
    HttpService.get({
      url: 'auth/privileges',
      onSuccess: (data) => {
        if (data.status === 200) {
          const location = this.props.location.pathname;

          const privilegesList = data.values;

          // 默认跳转到总览
          navList.forEach((item) => {
            if (location.indexOf(item.router) === 0 && item.router !== '/home/dashboard') {
              if (privilegesList.indexOf(item.key) < 0) {
                this.props.history.push('/home/dashboard');
              }
            }
          });
          this.setState({ privilegesList });
        } else {
          notification.error({
            message: data.msg
          });
        }
      }
    });
  }

  getStyles() {
    const styles = {
      appBar: {
        position: 'absolute',
        // Needed to overlap the examples
        zIndex: 100,
        top: 0,
        backgroundColor: '#484F62',
        height: 42,
        paddingLeft: 4
      },
      root: {
        paddingTop: spacing.desktopKeylineIncrement,
        minHeight: 400
      },
      content: {
        margin: spacing.desktopGutter
      },
      contentWhenMedium: {
        margin: `${spacing.desktopGutter * 2}px ${spacing.desktopGutter * 3}px`
      },
      footer: {
        backgroundColor: grey900,
        textAlign: 'center'
      },
      a: {
        color: darkWhite
      },
      p: {
        margin: '0 auto',
        padding: 0,
        color: lightWhite,
        maxWidth: 356
      },
      browserstack: {
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'center',
        margin: '25px 15px 0',
        padding: 0,
        color: lightWhite,
        lineHeight: '25px',
        fontSize: 12
      },
      browserstackLogo: {
        margin: '0 3px'
      },
      iconButton: {
        color: darkWhite
      }
    };

    if (this.props.width === MEDIUM || this.props.width === LARGE) {
      styles.content = Object.assign(styles.content, styles.contentWhenMedium);
    }

    return styles;
  }

  sideMenuWidth = 200;

  handleTouchTapLeftIconButton = () => {
    // 处理侧边栏菜单
    if (document.querySelector('.wrapper .sidebar').style.width === '50px') {
      this.showInfo();
    } else {
      this.hideInfo();
    }
    // 延迟重置窗口大小，以刷新图表
    setTimeout(() => {
      const e = document.createEvent('Event');
      e.initEvent('resize', true, true);
      window.dispatchEvent(e);
    }, 600);
    this.setState({
      navDrawerOpen: !this.state.navDrawerOpen
    });
  };

  // 侧边栏变窄，隐藏部分信息
  hideInfo = () => {
    // 侧边栏
    const sideBar = document.querySelector('.wrapper .sidebar');
    sideBar.style.width = '50px';
    document.querySelector('.wrapper-content').style.width = 'calc(100% - 50px)';

    // 标题列表
    const navItem = sideBar.querySelectorAll('.nav-item');
    navItem.forEach((v, i) => {
      const nav = navItem[i];
      nav.style.paddingLeft = '18px';
      nav.querySelector('.nav-icon').style.marginRight = 0;
      nav.querySelector('span').style.display = 'none';
    });

    // 头像
    const avatar = sideBar.querySelector('.avatar');
    avatar.className = 'avatar-narrow';

    // logo
    const logoImg = sideBar.querySelector('.logo-img');
    logoImg.style.left = '10px';
    const logoText = sideBar.querySelector('.logo-text');
    logoText.style.display = 'none';
    const figcaption = sideBar.querySelector('figcaption');
    figcaption.style.visibility = 'hidden';
  };
  // 侧边栏变款，显示部分信息
  showInfo = () => {
    const sideBar = document.querySelector('.wrapper .sidebar');
    sideBar.style.width = `${this.sideMenuWidth}px`;
    document.querySelector('.wrapper-content').style.width = `calc(100% - ${this.sideMenuWidth}px)`;

    // 头像
    const avatar = sideBar.querySelector('.avatar-narrow');
    avatar.className = 'avatar';

    // logo
    const logoImg = sideBar.querySelector('.logo-img');
    logoImg.style.left = '';
    setTimeout(() => {
      const logoText = sideBar.querySelector('.logo-text');
      logoText.style.display = '';
      const figcaption = sideBar.querySelector('figcaption');
      figcaption.style.visibility = '';

      // 标题列表
      const navItem = sideBar.querySelectorAll('.nav-item');
      navItem.forEach((v, i) => {
        const nav = navItem[i];
        nav.style.paddingLeft = '';
        nav.querySelector('.nav-icon').style.marginRight = '';
        nav.querySelector('span').style.display = '';
      });
    }, 300);
  };

  handleChangeRequestNavDrawer = (open) => {
    this.setState({
      navDrawerOpen: open
    });
  };

  handleChangeList = (event, value) => {
    this.props.history.push(value);
  };

  render() {
    const {
      children
    } = this.props;

    const styles = this.getStyles();

    const showMenuIconButton = true;

    const {
      privilegesList
    } = this.state;

    // 监控大屏
    let title = '';
    if (privilegesList.indexOf(GOD_EYE) >= 0) {
      title = (
        <div
          className="god-eye-switch"
          onClick={() => {
            window.open('/#/monitor');
          }}
          role="presentation"
        >
          <i className="iconfont icon-iconfontdesktop" />
          <span>监控大屏</span>
        </div>
      );
    }

    return (
      <div className="wrapper">
        <Title render="TH-Nebula" />
        <Sidebar
          style={{ width: `${this.sideMenuWidth}px` }}
          privilegesList={privilegesList}
          onChangeList={this.handleChangeList}
        >
          <License />
        </Sidebar>

        <div className="wrapper-content">
          <AppBar
            onLeftIconButtonTouchTap={this.handleTouchTapLeftIconButton}
            zDepth={0}
            style={styles.appBar}
            title={title}
            showMenuIconButton={showMenuIconButton}
          />
          <div className="wrapper-content-body">
            {children}
            <footer className="copyright-footer">
              <span>Copyright</span>
              &nbsp;©&nbsp;2017-2018&nbsp;深圳永安在线科技有限公司&nbsp;
              <a href="https://www.threathunter.cn/" target="_blank" rel="noopener noreferrer">threathunter.cn</a>
            </footer>
          </div>
        </div>
      </div>
    );
  }
}

export default withWidth()(Master);
