import React, { Component } from 'react';
import HttpService from '../HttpService';

import './index.scss';

const API_LICENCE = 'system/license';

export default class License extends Component {

  static addResizeListener() {
    window.addEventListener('resize', () => {
      const license = document.querySelector('.license');
      if (window.innerHeight < 600) {
        license.style.display = 'none';
      } else {
        license.style.display = '';
      }
    });
  }
  constructor(props) {
    super(props);
    this.state = {
      version: '试用版本',
      expire: 0
    };
    this.render = this.render.bind(this);
  }

  componentDidMount() {
    this.fetchLicense();
    License.addResizeListener();
  }

  fetchLicense() {
    HttpService.get({
      url: API_LICENCE,
      params: {},
      onSuccess: (data) => {
        this.setState(data.result);
      }
    });
  }

  render() {
    const {
      version,
      expire
    } = this.state;

    return (
      <div className="license">
        <p className="label">
          <i className="iconfont icon-infocircleo" />
        </p>
        <div className="info">
          <div>{version}(剩余 {expire} 天)</div>
        </div>
      </div>
    );
  }
}
