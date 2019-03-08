import  "babel-polyfill";
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { API_BASE } from 'app.config';
import Cookies from 'js-cookie';

import http from '../../http';

import './index.scss';

const KEY_USERNAME = 'username';
const KEY_PASSWORD = 'password';
const API_AUTH_LOGIN = `${API_BASE}auth/login`;
const logoImg = require('./logo.svg');
const threathunterImg = require('./threathunter.svg');
const bottomImg = require('./bottom.png');

class Login extends Component {

  static contextTypes = {
    router: PropTypes.object.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      error: false,
      message: ''
    };
  }

  handleChange(event) {
    const { target } = event;

    this.setState({
      [target.name]: target.value
    });
  }

  handleSubmit(e) {
    e.preventDefault();

    this.setState({
      loading: true,
      error: false,
      message: ''
    });

    http.post(
      API_AUTH_LOGIN,
      _.pick(this.state, [KEY_USERNAME, KEY_PASSWORD])
    )
      .then((data) => {
        if (!data.auth) {
          throw new Error(data.msg);
        }

        Cookies.set('username', this.state[KEY_USERNAME]);

        location.href = '/';

        // self.context.router.push('/');
      })
      .catch((error) => {
        this.setState({
          loading: false,
          error: true,
          message: error.message
        });
      });
  }

  render() {
    let error;
    if (this.state.error) {
      error = (
        <div className="wb-error">
          <i className="iconfont icon-infocircleo" />
          {this.state.message}
        </div>
      );
    }

    return (
      <div className="wb-login">
        <div>
          <figure>
            <img width="120px" src={logoImg} alt="logo" />
            <figcaption>
              {/* <img src={threathunterImg} alt="threathunter" /> */}
            </figcaption>
          </figure>
          <form onSubmit={e => this.handleSubmit(e)}>
            <div>
              <i className="iconfont icon-user" />
              <input
                type="text"
                name={`${KEY_USERNAME}`}
                onChange={e => this.handleChange(e)}
                placeholder="Username"
              />
            </div>
            <div>
              <i className="iconfont icon-lock" />
              <input
                type="password"
                name={`${KEY_PASSWORD}`}
                onChange={e => this.handleChange(e)}
                placeholder="Password"
              />
            </div>
            {error}
            <div className="button-container">
              <input disabled={this.state.loading} type="submit" value="登录" />
            </div>
          </form>
        </div>
        <img src={bottomImg} alt="bottom" width="100%" />
      </div>
    );
  }
}

export default Login;
