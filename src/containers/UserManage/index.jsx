import React, { Component } from 'react';
import _ from 'lodash';
import Cookies from 'js-cookie';

import Notification from '../../components/Notification';
import {
  ACTION_DEFAULT,
  ACTION_CREATE_GROUP,
  ACTION_UPDATE_GROUP,
  ACTION_CREATE_USER,
  ACTION_UPDATE_USER
} from './constants';
import GroupTable from './GroupTable';
import UserTable from './UserTable';
import TabBar from '../../components/TabBar';
import HttpService from '../../components/HttpService';

import './index.scss';

const notification = Notification.getNewInstance();

const API_USERS = 'auth/users';
const API_GROUPS = 'auth/groups';
const API_ACCESS_GROUP = 'auth/strategy_access';

class UserManage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      action: ACTION_DEFAULT,
      keyword: '',
      form: {},
      groups: [],
      accessGroup: [],
      users: [],
      selectIndex: 0,
      settingTabs: [
        {
          tabText: '用户组'
        },
        {
          tabText: '用户'
        }
      ]
    };
  }

  componentDidMount() {
    this.fetchUsers();
    this.fetchGroups();

    this.getAccessGroup();
  }

  // 可配置的用户组
  getAccessGroup() {
    HttpService.get({
      url: API_ACCESS_GROUP,
      onSuccess: (data) => {
        const { status, values } = data;

        if (status === 200) {
          this.setState({ accessGroup: values });
        }
      }
    });
  }

  // 获取用户列表
  fetchUsers() {
    HttpService.get({
      url: API_USERS,
      onSuccess: (data) => {
        const { status, values } = data;

        if (status === 200) {
          this.setState({ users: values });
        }
      }
    });
  }

  // 获取用户组列表
  fetchGroups() {
    HttpService.get({
      url: API_GROUPS,
      onSuccess: (data) => {
        const { status, values } = data;

        if (status === 200) {
          for (let i = 0; i < values.length; i += 1) {
            const item = values[i];
            item.privilegesList = item.privileges;
          }
          this.setState({ groups: values });
        }
      }
    });
  }

  handleSubmit(value, key) {
    let params;
    if (key === ACTION_CREATE_GROUP || key === ACTION_UPDATE_GROUP) {
      // 用户组权限，请求格式封装
      params = Object.assign({}, value, { creator: Cookies.get('user_id') });
      const privileges = params.privileges.split(',');
      params.privileges = _.filter(privileges, item => item.indexOf('g_') < 0);
      params.privilegesList = undefined;
      // 规则管理
      let strategy_access = _.filter(privileges, item => item.indexOf('g_') >= 0);
      strategy_access = _.map(strategy_access, item => item.substring(2, item.length));

      const blocked = _.filter(this.state.accessGroup, item => strategy_access.indexOf(`${item.id}`) < 0);
      params.blocked = _.map(blocked, item => item.id);
    }

    switch (key) {
      case ACTION_CREATE_GROUP:

        HttpService.post({
          url: API_GROUPS,
          params: [params],
          onSuccess: (data) => {
            const { status } = data;
            if (status === 200) {
              this.fetchGroups();
              this.getAccessGroup();
              this.setState({
                action: ACTION_DEFAULT,
                form: {}
              });
            } else {
              notification.error({ message: '创建失败' });
            }
          },
          onError: () => notification.error({ message: '创建失败' })
        });
        break;
      case ACTION_UPDATE_GROUP:

        params.is_active = params.is_active ? 1 : 0;
        HttpService.post({
          url: `${API_GROUPS}/${params.id}`,
          params,
          onSuccess: (data) => {
            const { status } = data;
            if (status === 200) {
              this.fetchGroups();
              this.getAccessGroup();
              this.setState({
                action: ACTION_DEFAULT,
                form: {}
              });
            } else {
              notification.error({ message: '保存失败' });
            }
          },
          onError: () => notification.error({ message: '保存失败' })
        });
        break;
      case ACTION_CREATE_USER:
        HttpService.post({
          url: API_USERS,
          params: [Object.assign(value, { creator: Cookies.get('user_id') })],
          onSuccess: (data) => {
            const { status } = data;
            if (status === 200) {
              this.fetchUsers();
              this.setState({
                action: ACTION_DEFAULT,
                form: {}
              });
            } else {
              notification.error({ message: '创建失败' });
            }
          },
          onError: () => notification.error({ message: '创建失败' })
        });
        break;
      case ACTION_UPDATE_USER:
        HttpService.post({
          url: `${API_USERS}/${value.id}`,
          params: {
            name: value.name,
            password: value.password,
            group_id: value.group_id,
            is_active: value.is_active ? 1 : 0
          },
          onSuccess: (data) => {
            const { status } = data;
            if (status === 200) {
              this.fetchUsers();
              this.setState({
                action: ACTION_DEFAULT,
                form: {}
              });
            } else {
              notification.error({ message: '保存失败' });
            }
          },
          onError: () => notification.error({ message: '保存失败' })
        });
        break;
      default:
    }
  }

  // 选择页签
  selectTab(item) {
    const selectIndex = item.tabIndex;

    this.setState({
      selectIndex
    });
  }

  render() {
    const {
      action,
      form,
      selectIndex,
      settingTabs,
      groups,
      users,
      keyword,
      accessGroup
    } = this.state;

    // 用户组权限处理
    for (let i = 0; i < groups.length; i += 1) {
      const item = groups[i];

      item.privileges = item.privilegesList.join(',');
      // 获取可用权限
      const access = _.filter(accessGroup, accessItem => item.blocked.indexOf(accessItem.id) < 0);

      const accessIdList = _.map(access, accessItem => `g_${accessItem.id}`);
      if (accessIdList.length > 0) {
        item.privileges += (`,${accessIdList.join(',')}`);
      }
    }

    return (
      <div className="wd-user-manage container">
        <TabBar
          tabList={settingTabs}
          selectIndex={selectIndex}
          onSelect={(e, item) => {
            this.selectTab(item);
          }}
        />
        {
          selectIndex === 0 ?
            <GroupTable
              action={action}
              form={form}
              dataList={groups}
              accessGroup={accessGroup}
              onChange={(value, key) => this.setState({ ..._.set(this.state, key, value) })}
              onSubmit={(value, key) => this.handleSubmit(value, key)}
            /> :
            <UserTable
              action={action}
              form={form}
              keyword={keyword}
              groups={_.map(groups,
                item => ({ text: item.name, value: item.id, privileges: item.privileges }))}
              accessGroup={accessGroup}
              dataList={users}
              onChange={(value, key) => this.setState({ ..._.set(this.state, key, value) })}
              onSubmit={(value, key) => this.handleSubmit(value, key)}
            />
        }
      </div>
    );
  }
}

export default UserManage;
