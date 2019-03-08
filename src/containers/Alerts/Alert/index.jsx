import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

import Dialog from '../../../components/Dialog';
import Editor from '../Editor';
import Reader from '../Reader';
import {
  FORM_EXPIRE
} from '../constants';

const TITLE_EDITOR = '添加名单';
const TITLE_READER = '确认添加';

class Alert extends Component {
  static propTypes = {
    visible: PropTypes.bool.isRequired,
    onSubmit: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {
      title: TITLE_EDITOR,
      form: {
        strategy_name: 'manual',
        variable_values: []
      }
    };
  }

  handleAction() {
    const { title, form } = this.state;

    switch (title) {
      case TITLE_EDITOR:
        form.timestamp = moment().valueOf();
        this.setState({
          title: TITLE_READER
        });
        break;
      case TITLE_READER:
        if (Number(form[FORM_EXPIRE]) === -1) {
          form[FORM_EXPIRE] = form.timestamp * 5;
        } else {
          form[FORM_EXPIRE] = form.timestamp + (form[FORM_EXPIRE] * 1000);
        }
        this.props.onSubmit(form);
        this.setState({
          title: TITLE_EDITOR,
          form: {
            strategy_name: 'manual',
            variable_values: []
          }
        });
        break;
      default:
    }
  }

  handleCancel() {
    this.handleClose();
  }

  handleClose() {
    this.props.onSubmit(null);
    this.setState({
      title: TITLE_EDITOR,
      form: {}
    });
  }

  handleChange(value, key) {
    const { form } = this.state;
    this.setState({
      form: Object.assign(form, { [key]: value })
    });
  }

  render() {
    const { title, form } = this.state;
    const { visible } = this.props;

    const buttons = [{
      text: '确认',
      onClick: (e) => {
        this.handleAction(e);
      }
    }, {
      text: '取消',
      cls: 'cancel-btn',
      onClick: (e) => {
        this.handleCancel(e);
      }
    }];

    return (
      <Dialog
        visible={visible}
        buttons={buttons}
        onClose={() => this.handleClose()}
        title={title}
      >
        {
          (() => {
            switch (title) {
              case TITLE_EDITOR:
                return (
                  <Editor
                    form={form}
                    onChange={(value, key) => this.handleChange(value, key)}
                  />
                );
              case TITLE_READER:
                return <Reader form={form} />;
              default:
                return null;
            }
          })()
        }
      </Dialog>
    );
  }
}

export default Alert;
