import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import Snackbar from 'material-ui/Snackbar';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

import './index.scss';

class Notification extends Component {
  static propTypes = {
    message: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    duration: PropTypes.number
  };
  static defaultProps = {
    children: null,
    duration: 0
  };

  static childContextTypes = {
    muiTheme: PropTypes.object
  };

  static getNewInstance() {
    function notice(properties, type) {
      const props = properties || {};
      const div = document.createElement('div');
      document.body.appendChild(div);
      ReactDOM.render(<Notification {...props} type={type} />, div);
    }

    return {
      success(props) {
        notice(props, 'success');
      },
      error(props) {
        notice(props, 'error');
      },
      warning(props) {
        notice(props, 'warning');
      },
      info(props) {
        notice(props, 'info');
      }
    };
  }

  constructor(props) {
    super(props);
    this.state = {
      muiTheme: getMuiTheme(),
      open: true,
      message: '',
      duration: 3000
    };
    this.render = this.render.bind(this);
  }

  getChildContext() {
    return {
      muiTheme: getMuiTheme()
    };
  }

  handleClose = () => {
    this.setState({
      open: false
    });
  };

  render() {
    const {
      message,
      duration,
      type
    } = this.props;

    const hideDuration = duration || this.state.duration;
    const className = `wd-notification notification-${type}`;
    return (
      <Snackbar
        open={this.state.open}
        message={message}
        action="x"
        autoHideDuration={hideDuration}
        onActionTouchTap={this.handleClose}
        className={className}
      />
    );
  }
}

export default Notification;
