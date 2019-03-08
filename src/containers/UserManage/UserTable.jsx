import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import md5 from 'md5';
import _ from 'lodash';

import Selector from '../../components/Selector';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn
} from '../../components/Table';
import Switch from '../../components/Switch';
import FormSearchInput from '../../components/FormSearchInput';
import Confirm from './Confirm';
import RightTree from './RightTree';

import {
  ACTION,
  ACTION_DEFAULT,
  ACTION_CREATE_USER,
  ACTION_UPDATE_USER
} from './constants';

const FORM = 'form';
const FORM_NAME = 'form.name';
const FORM_PASSWORD = 'form.password';
const FORM_GROUP_ID = 'form.group_id';

class UserTable extends Component {
  static propTypes = {
    accessGroup: PropTypes.oneOfType([PropTypes.array]).isRequired,
    dataList: PropTypes.oneOfType([PropTypes.array]).isRequired,
    groups: PropTypes.oneOfType([PropTypes.array]).isRequired,
    form: PropTypes.oneOfType([PropTypes.object]).isRequired,
    onChange: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
    action: PropTypes.string.isRequired,
    keyword: PropTypes.string.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {
      showPwd: false
    };
  }

  // 获取规则管理
  getGroupTree() {
    const {
      accessGroup
    } = this.props;

    const groupTree = [];
    accessGroup.forEach((item) => {
      groupTree.push({
        type: 'label',
        key: `g_${item.id}`,
        text: item.name
      });
    });

    return groupTree;
  }

  handleChange(value, key) {
    this.props.onChange(value, key);
  }

  handleSubmit(value, key) {
    this.props.onSubmit(value, key);
  }

  render() {
    const {
      action,
      keyword,
      form,
      groups,
      onChange
    } = this.props;

    let {
      dataList
    } = this.props;

    const {
      showPwd
    } = this.state;

    dataList = _.filter(dataList, item => (
      item.name.indexOf(keyword) > -1 ||
      item.group_name.indexOf(keyword) > -1
    ));

    const timestamp = moment().valueOf();

    const selectedGroup = _.find(groups, { value: _.get(this.props, FORM_GROUP_ID) });

    return (
      <div className="user-manage-table">
        <h2>
          <FormSearchInput
            className="manage-search"
            placeholder="搜索用户名／用户组"
            placeholderWidth={125}
            keyword={keyword}
            onChange={value => onChange(value, 'keyword')}
          />

          <a
            onClick={() => {
              this.handleChange(ACTION_CREATE_USER, ACTION);
              this.handleChange({}, FORM);
            }}
            role="presentation"
          >创建用户</a>
        </h2>

        <div className="items-warpper">
          <Table bodyClass="manage-list-body" fixedHeader>
            <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
              <TableRow>
                <TableHeaderColumn tooltip="用户名" className="user-name">用户名</TableHeaderColumn>
                <TableHeaderColumn tooltip="用户组" className="group-name">用户组</TableHeaderColumn>
                <TableHeaderColumn tooltip="创建时间" className="create-time">创建时间</TableHeaderColumn>
                <TableHeaderColumn tooltip="创建人" className="creator">创建人</TableHeaderColumn>
                <TableHeaderColumn tooltip="状态" className="status">状态</TableHeaderColumn>
                <TableHeaderColumn tooltip="最近登录时间" className="last-login-time">最近登录时间</TableHeaderColumn>
                <TableHeaderColumn tooltip="操作" className="operate">操作</TableHeaderColumn>
              </TableRow>
            </TableHeader>
            <TableBody deselectOnClickaway={false} displayRowCheckbox={false} showRowHover>
              {
                _.map(dataList, (item, index) => {
                  if (item.name.indexOf(keyword) < 0 && item.group_name.indexOf(keyword) < 0) {
                    return '';
                  }
                  return (
                    <TableRow key={index}>
                      <TableRowColumn tooltip={item.name} className="user-name">
                        {/* 用户名 */}
                        {item.name}
                      </TableRowColumn>
                      <TableRowColumn tooltip={item.group_name} className="group-name">
                        {/* 用户组 */}
                        {item.group_name}
                      </TableRowColumn>
                      <TableRowColumn
                        tooltip={moment(Number(item.create_time)).format('YYYY/MM/DD HH:mm:ss')}
                        className="create-time"
                      >
                        {/* 创建时间 */}
                        {moment(Number(item.create_time)).format('YYYY/MM/DD HH:mm:ss')}
                      </TableRowColumn>
                      <TableRowColumn tooltip={item.creator} className="creator">
                        {/* 创建人 */}
                        {item.creator}
                      </TableRowColumn>
                      <TableRowColumn tooltip={item.is_active} className="status">
                        {/* 状态 */}
                        {item.is_active}
                      </TableRowColumn>
                      <TableRowColumn
                        tooltip={item.last_login ? moment(Number(item.last_login)).format('YYYY/MM/DD HH:mm:ss') : '-'}
                        className="last-login"
                      >
                        {/* 最后登录时间 */}
                        {item.last_login ? moment(Number(item.last_login)).format('YYYY/MM/DD HH:mm:ss') : '-'}
                      </TableRowColumn>
                      <TableRowColumn className="operate">
                        <button
                          className="edit"
                          disabled={item.group_id === 1}
                          onClick={() => {
                            this.handleChange(ACTION_UPDATE_USER, ACTION);
                            this.handleChange(_.cloneDeep(item), FORM);
                          }}
                        >编辑
                        </button>
                        <Switch
                          type="tableItem"
                          defaultChecked={item.is_active === 1}
                          checkedChildren={'启用'}
                          unCheckedChildren={'禁用'}
                          disabled={item.group_id === 1}
                          onChange={(value) => {
                            this.handleSubmit(
                              Object.assign(item, { is_active: value }),
                              ACTION_UPDATE_USER
                            );
                          }}
                        />
                      </TableRowColumn>
                    </TableRow>
                  );
                })
              }
            </TableBody>
          </Table>
        </div>
        <Confirm
          visible={_.includes([ACTION_CREATE_USER, ACTION_UPDATE_USER], action)}
          action={action}
          onCancel={() => {
            this.handleChange(ACTION_DEFAULT, ACTION);
            this.handleChange({}, FORM);
          }}
          onSubmit={() => {
            this.handleSubmit(form, action);
          }}
        >
          <div className="wd-manage-info">
            <input
              type="text"
              placeholder="请输入用户名"
              className="normal-input input-margin"
              defaultValue={_.get(this.props, FORM_NAME)}
              onBlur={(e) => {
                this.handleChange(e.target.value, FORM_NAME);
              }}
            />

            <div className="pwd-input">
              <input
                type={showPwd ? 'text' : 'password'}
                placeholder="请输入9位密码"
                className="normal-input input-margin"
                value={_.get(this.props, FORM_PASSWORD) || ''}
                onChange={(e) => {
                  this.handleChange(e.target.value, FORM_PASSWORD);
                }}
              />
              <i
                className={`iconfont icon-eyeo ${showPwd ? 'active' : ''}`}
                onClick={() => {
                  this.setState({ showPwd: !showPwd });
                }}
                role="presentation"
              />
              <a
                onClick={() => {
                  this.handleChange(md5(Math.random()).substr(0, 9), FORM_PASSWORD);
                }}
                role="presentation"
              >随机生成</a>
            </div>
            <Selector
              key={timestamp}
              value={selectedGroup}
              selectorType="list"
              className="group-selector"
              dataList={groups}
              onChange={({ value }) => {
                this.handleChange(value, FORM_GROUP_ID);
              }}
            />

            <div style={{ display: selectedGroup ? '' : 'none' }} className="privileges">
              <span className="label">权限预览</span>
              <RightTree
                disabled
                className="right-tree"
                privileges={selectedGroup ? selectedGroup.privileges : ''}
                groupTree={this.getGroupTree()}
              />
            </div>
          </div>
        </Confirm>
      </div>
    );
  }
}

export default UserTable;
