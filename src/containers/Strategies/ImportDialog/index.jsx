import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';

import Dialog from '../../../components/Dialog';
import Upload from '../../../components/Upload';
import UploadService from '../../../components/Upload/UploadService';
import Toast from '../../../components/Toast';
import Group from './Group';

import './index.scss';

const API_STRATEGY_IMPORT = 'nebula/strategy/import';

const ACTION_DEFAULT = 'ACTION_DEFAULT';
const ACTION_STRATEGY_IMPORT = 'ACTION_STRATEGY_IMPORT';
const ACTION_STRATEGY_SAVE = 'ACTION_STRATEGY_SAVE';

class ImportDialog extends Component {
  static propTypes = {
    visible: PropTypes.bool,
    onChange: PropTypes.func
  };

  static defaultProps = {
    onChange: undefined,
    visible: undefined
  };

  constructor(props) {
    super(props);
    this.state = {
      action: ACTION_DEFAULT,
      files: null,
      groups: null,
      result: null,
      error: false,
      dragOver: false,
      message: ''
    };
  }

  // 点击取消或者关闭
  onCancel() {
    const { action } = this.state;
    switch (action) {
      case ACTION_DEFAULT:
        this.props.onChange(false);
        break;
      case ACTION_STRATEGY_IMPORT:
        this.handleChange(true, 'confirming');
        break;
      default:
    }
  }

  handleCancel() {
    this.setState({
      action: ACTION_DEFAULT,
      files: null,
      groups: null,
      result: null,
      confirming: false
    });
    this.props.onChange(false);
  }

  handleSubmit(value, key) {
    const form = new FormData();
    form.append('file', value[0]);

    switch (key) {
      case ACTION_STRATEGY_IMPORT:
        UploadService({
          url: API_STRATEGY_IMPORT,
          params: form,
          onSuccess: (result) => {
            const { status, msg, values } = result;

            switch (status) {
              case -1:
                this.setState({
                  error: true,
                  message: msg
                });
                break;
              case 200:
                this.setState({
                  action: ACTION_STRATEGY_IMPORT,
                  files: value,
                  groups: values
                });
                break;
              default:
            }
          },
          onError: () => {
            this.setState({
              error: true,
              message: '导入失败。'
            });
          }
        });
        break;
      case ACTION_STRATEGY_SAVE:
        UploadService({
          url: `${API_STRATEGY_IMPORT}?try_import=false`,
          params: form,
          onSuccess: (result) => {
            const { values } = result;
            this.props.onChange(false);
            this.setState({
              action: ACTION_DEFAULT,
              files: null,
              groups: null,
              result: values
            });
          },
          onError: () => {
            this.setState({
              error: true,
              message: '保存失败。'
            });
          }
        });

        break;
      default:
    }
  }

  handleChange(value, key) {
    this.setState({
      [key]: value
    });
  }

  render() {
    const { visible } = this.props;
    const { files, groups, result, confirming, error, message } = this.state;
    const available_count = _.get(groups, 'success_add.length', 0) + _.get(groups, 'success_modify.length', 0);
    const unavailable_count = _.get(groups, 'fail_permission.length', 0) + _.get(groups, 'fail_error.length', 0);
    const total_count = available_count + unavailable_count;

    const buttons = [{
      text: '保存',
      cls: `default-btn${available_count ? '' : ' disabled'}`,
      onClick: () => {
        if (available_count) {
          this.handleSubmit(files, ACTION_STRATEGY_SAVE);
        }
      }
    }, {
      text: '取消',
      cls: 'cancel-btn',
      onClick: () => {
        this.onCancel();
      }
    }];

    return (
      <div>
        <Dialog
          className="strategies-import-dialog clearfix"
          visible={visible}
          destroy
          title={() => (
            <span>导入策略{total_count ? <small>（{available_count}/{total_count}）</small> : null}</span>
          )}
          buttons={buttons}
          onClose={() => {
            this.onCancel();
          }}
        >
          <div className="clearfix">
            <section className="readout">
              <ul>
                {
                  _.map(groups, (items, key) => (
                    <li key={key} className="strategies-import-group">
                      <Group id={key} items={items} />
                    </li>
                  ))
                }
              </ul>
            </section>
            {
              (() => {
                const disabled = !!files;
                const {
                  dragOver
                } = this.state;
                return (
                  <Upload
                    disabled={disabled}
                    className={`readin${disabled ? ' disabled' : ''}${dragOver ? ' drag-over' : ''}`}
                    onDragOver={() => {
                      this.setState({ dragOver: true });
                    }}
                    onDragLeave={() => {
                      this.setState({ dragOver: false });
                    }}
                    onUpload={(fileItems) => {
                      this.handleSubmit(fileItems, ACTION_STRATEGY_IMPORT);
                      this.setState({ dragOver: false });
                    }}
                  >
                    <i className="iconfont" />

                    <p>点击或拖拽文件进行导入,</p>

                    <p>只支持单个导入</p>
                  </Upload>
                );
              })()
            }
          </div>
        </Dialog>
        <Dialog
          className="strategies-import-result"
          duration={4500}
          visible={!_.isNull(result)}
          destroy
          title="导入完成"
          onClose={() => {
            this.handleChange(null, 'result');
          }}
        >
          <section className="success clearfix">
            <i className="iconfont icon-checkcircle" />

            <p
              className="summary"
            >{`${_.get(result, 'success_add.length') + _.get(result, 'success_modify.length')}个策略成功导入。`}</p>
          </section>
          <section className="error clearfix">
            <i className="iconfont icon-crosscircle" />

            <p
              className="summary"
            >{`${_.get(result, 'fail_permission.length') + _.get(result, 'fail_error.length')}个策略导入失败。`}</p>
            <ul className="details clearfix">
              {
                _.map(
                  _.concat(_.get(result, 'fail_permission', []), _.get(result, 'fail_error', [])),
                  (name, key) => (<li key={key}>{name}</li>)
                )
              }
            </ul>
          </section>
        </Dialog>
        <Toast
          visible={confirming}
          type="confirm"
          onClose={() => {
            this.setState({ confirming: false });
          }}
          onConfirm={res => (res ? this.handleCancel() : this.setState({ confirming: false }))}
          title="确认取消"
          duration={0}
        >
          导入的策略还未保存,确认放弃么?
        </Toast>
        <Toast
          visible={error}
          onClose={() => {
            this.setState({ error: false });
          }}
        >
          {message}
        </Toast>
      </div>
    );
  }
}

export default ImportDialog;
