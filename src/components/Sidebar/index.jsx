import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { withRouter } from 'react-router';
import Cookies from 'js-cookie';

import Drawer from '../Drawer';
import Avatar from '../Avatar';
import SvgIcon from '../SvgIcon';
import IconMenu from '../IconMenu';
import MenuItem from '../MenuItem';
import navList from './constants';

import {
  USER_MANAGE
} from '../../containers/UserManage/constants';

import './index.scss';

const logoImg = require('../../containers/Login/logo.svg');
const nebulaImg = require('../../resources/imgs/nebula.png');

@withRouter
class Sidebar extends Component {
  static propTypes = {
    location: PropTypes.oneOfType([PropTypes.object]).isRequired,
    privilegesList: PropTypes.oneOfType([PropTypes.array]).isRequired,
    onChangeList: PropTypes.func.isRequired,
    children: PropTypes.node.isRequired
  };

  componentDidUpdate() {
    const sideBar = document.querySelector('.wrapper .sidebar');
    const children = document.querySelector('.children-container');

    if (sideBar.style.width === '50px') {
      children.style.display = 'none';
    } else {
      children.style.display = 'block';
    }
  }

  changeRouter(e, item) {
    e.stopPropagation();

    this.setState({});

    if (this.props.onChangeList) {
      this.props.onChangeList(e, item.router);
    }
  }

  render() {
    const location = this.props.location.pathname;

    const {
      children,
      privilegesList
    } = this.props;

    const userName = Cookies.get('username');
    return (
      <Drawer
        className="sidebar"
        docked
        open
        containerStyle={{
          backgroundColor: '#1B1F2A',
          width: '100%',
          paddingBottom: '20px',
          overflow: 'visible'
        }}
      >
        <div className="logo">
          <img className="logo-img" src={logoImg} alt="logo" />
          <img className="logo-text" src={nebulaImg} alt="nebula" />
        </div>
        <figure>
          <Avatar />
          <figcaption>
            {userName}
            <IconMenu
              useLayerForClickAway
              style={{ verticalAlign: 'middle' }}
              iconButtonElement={<i className="iconfont icon-caretdown admin-menu" />}
              anchorOrigin={{ horizontal: 'left', vertical: 'top' }}
              targetOrigin={{ horizontal: 'left', vertical: 'top' }}
            >
              <MenuItem
                onClick={(e) => {
                  this.changeRouter(e, { router: '/changePwd' });
                }}
                primaryText="修改密码"
              />
              {
                privilegesList.indexOf(USER_MANAGE) >= 0 ? (
                  <MenuItem
                    onClick={(e) => {
                      this.changeRouter(e, { router: '/userManage' });
                    }}
                    primaryText="用户管理"
                  />) :
                  ''
              }
              <MenuItem
                onClick={() => {
                  window.location.href = '/auth/logout';
                }}
                primaryText="退出"
              />
            </IconMenu>
          </figcaption>
        </figure>

        <ul className="nav-list">
          {_.map(navList, (item, index) => (
              privilegesList.indexOf(item.key) >= 0 ? (
                <li
                  key={index}
                  className={`nav-item ${location.indexOf(item.router) === 0 ? 'active' : ''} ${item.child ? 'has-child' : ''}`}
                  onClick={(e) => {
                    this.changeRouter(e, item);
                  }}
                  role="presentation"
                >
                  {
                    location.indexOf(item.router) === 0 ? (<div className="active-bar" />) : ''
                  }
                  {
                    item.svgIcon ?
                      (<SvgIcon
                        className={`nav-icon ${item.iconClass ? item.iconClass : ''}`}
                        iconName={item.svgIcon}
                      />) :
                      (<i className={`iconfont nav-icon ${item.iconClass ? item.iconClass : ''}`} />)
                  }

                  <span>{item.text}</span>
                  {
                    item.child ?
                      (
                        <div className="nav-child">
                          {_.map(item.child, (child, i) => (
                            <div
                              key={i}
                              onClick={(e) => {
                                this.changeRouter(e, { router: item.router + child.router });
                              }}
                              className={location.indexOf(item.router + child.router) === 0 ? 'active' : ''}
                              role="presentation"
                            >{child.text}</div>
                          ))}
                        </div>
                      ) :
                      ''
                  }
                </li>
              ) : ''
            )
          )}
        </ul>
        <div className="children-container">
          {children}
        </div>
      </Drawer>
    );
  }
}

export default Sidebar;
