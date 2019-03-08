import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import _ from 'lodash';

import {
  ACTION,
  ACTION_DEFAULT,
  ACTION_CREATE_GROUP,
  ACTION_UPDATE_GROUP,
  STRATEGIES
} from './constants';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn
} from '../../components/Table';
import Switch from '../../components/Switch';
import TextField from '../../components/TextField';
import Confirm from './Confirm';
import RightTree from './RightTree';

const FORM = 'form';
const FORM_NAME = 'form.name';
const FORM_DESCRIPTION = 'form.description';
const FORM_PRIVILEGES = 'form.privileges';

class GroupTable extends Component {
  static propTypes = {
    accessGroup: PropTypes.oneOfType([PropTypes.array]).isRequired,
    dataList: PropTypes.oneOfType([PropTypes.array]).isRequired,
    form: PropTypes.oneOfType([PropTypes.object]).isRequired,
    onChange: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
    action: PropTypes.string.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {
      nameError: false
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

  // 检查名字是否错误
  checkName(name) {
    if (name === '' || name === undefined) {
      this.setState({
        nameError: true
      });
      return false;
    }
    this.setState({
      nameError: false
    });
    return true;
  }

  // 确认提交
  submitForm(form, action) {
    if (this.checkName(form.name)) {
      this.handleSubmit(form, action);
    }
  }

  // 修改权限
  rightChange(values) {
    const privileges = _.map(_.filter(values, item => item.checked), item => item.key);

    // 判断策略管理权限是否开通
    if (privileges.indexOf(STRATEGIES) < 0) {
      // 未开通策略管理权限，清除规则管理权限
      _.remove(privileges, item => item.indexOf('g_') >= 0);
    }

    this.handleChange(_.join(privileges, ','), FORM_PRIVILEGES);
  }

  render() {
    const {
      action,
      form,
      dataList
    } = this.props;

    const {
      nameError
    } = this.state;

    const timestamp = new Date().getTime();

    // 规则管理
    const groupTree = this.getGroupTree();

    return (
      <div className="group-manage-table">
        <h2>
          <a
            onClick={() => {
              this.handleChange(ACTION_CREATE_GROUP, ACTION);
              this.handleChange({}, FORM);
            }}
            role="presentation"
          >创建用户组</a>
        </h2>

        <div className="items-warpper">
          <Table bodyClass="manage-list-body" fixedHeader>
            <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
              <TableRow>
                <TableHeaderColumn tooltip="用户组名称" className="group-name">用户组名称</TableHeaderColumn>
                <TableHeaderColumn tooltip="创建人" className="creator">创建人</TableHeaderColumn>
                <TableHeaderColumn tooltip="创建时间" className="create-time">创建时间</TableHeaderColumn>
                <TableHeaderColumn tooltip="用户数" className="user-num">用户数</TableHeaderColumn>
                <TableHeaderColumn tooltip="备注" className="remarks">备注</TableHeaderColumn>
                <TableHeaderColumn tooltip="操作" className="operate">操作</TableHeaderColumn>
              </TableRow>
            </TableHeader>
            <TableBody deselectOnClickaway={false} displayRowCheckbox={false} showRowHover>
              {
                _.map(dataList, (item, index) => (
                  <TableRow key={index}>
                    <TableRowColumn tooltip={item.name} className="group-name">
                      {/* 用户组名 */}
                      {item.name}
                    </TableRowColumn>
                    <TableRowColumn tooltip={item.creator} className="creator">
                      {/* 创建人 */}
                      {item.creator}
                    </TableRowColumn>
                    <TableRowColumn
                      tooltip={moment(Number(item.create_time)).format('YYYY/MM/DD HH:mm:ss')}
                      className="create-time"
                    >
                      {/* 创建时间 */}
                      {moment(Number(item.create_time)).format('YYYY/MM/DD HH:mm:ss')}
                    </TableRowColumn>
                    <TableRowColumn tooltip={item.users_count} className="user-num">
                      {/* 用户数 */}
                      {item.users_count}
                    </TableRowColumn>
                    <TableRowColumn tooltip={item.description} className="remarks">
                      {/* 备注 */}
                      {item.description}
                    </TableRowColumn>
                    <TableRowColumn className="operate">
                      <button
                        className="edit"
                        disabled={item.id === 1 || item.id === 2}
                        onClick={() => {
                          this.handleChange(ACTION_UPDATE_GROUP, ACTION);
                          this.handleChange(_.cloneDeep(item), FORM);
                        }}
                      >
                        编辑
                      </button>
                      <Switch
                        type="tableItem"
                        defaultChecked={item.is_active === 1}
                        checkedChildren={'启用'}
                        unCheckedChildren={'禁用'}
                        disabled={item.id === 1 || item.id === 2}
                        onChange={(value) => {
                          this.handleSubmit(
                            Object.assign(item, { is_active: value }),
                            ACTION_UPDATE_GROUP
                          );
                        }}
                      />
                    </TableRowColumn>
                  </TableRow>
                ))
              }
            </TableBody>
          </Table>
        </div>
        <Confirm
          visible={_.includes([ACTION_CREATE_GROUP, ACTION_UPDATE_GROUP], action)}
          action={action}
          onCancel={() => {
            this.handleChange(ACTION_DEFAULT, ACTION);
            this.handleChange({}, FORM);
          }}
          onSubmit={() => {
            this.submitForm(form, action);
          }}
        >
          <div className="wd-manage-info">
            <TextField
              key={timestamp + 1}
              inputClass="normal-input"
              className="input-margin"
              type="text"
              defaultValue={_.get(this.props, FORM_NAME)}
              placeholder="请输入用户组名称"
              onBlur={(e) => {
                this.checkName(e.target.value);
                this.handleChange(e.target.value, FORM_NAME);
              }}
              isError={nameError}
              errorText="*请填写用户组名"
            />
            <input
              key={timestamp + 2}
              type="text"
              placeholder="请输入备注内容"
              className="normal-input input-margin"
              defaultValue={_.get(this.props, FORM_DESCRIPTION)}
              onBlur={(e) => {
                this.handleChange(e.target.value, FORM_DESCRIPTION);
              }}
            />

            <div className="privileges">
              <span className="label">权限</span>
              <RightTree
                className="right-tree"
                privileges={_.get(this.props, FORM_PRIVILEGES)}
                groupTree={groupTree}
                onChange={(values) => {
                  this.rightChange(values);
                }}
              />
            </div>
          </div>
        </Confirm>
      </div>
    );
  }
}

export default GroupTable;
