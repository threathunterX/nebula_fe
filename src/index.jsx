import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import Perf from 'react-addons-perf';

import PerfUtil from './components/util/Perf';
import Root from './containers/Root';
// import Raven from 'raven-js';
// import Perf from 'react-addons-perf';

import './index.scss';

// Raven.config('http://4d70edb761fd427a9e8bfc75cee17202@172.16.0.95:9000/12').install();

const render = (Component) => {
  PerfUtil.start('Root');
  ReactDOM.render(
    <AppContainer>
      <Component />
    </AppContainer>,
    document.getElementById('root')
  );
  console.log(`Root: cost__${PerfUtil.stop('Root')}ms`);
};
render(Root);
window.Perf = Perf;

// Hot Module Replacement API
if (module.hot) {
  module.hot.accept('./containers/Root', () => {
    render(Root);
  });
}
