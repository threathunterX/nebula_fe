import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { HashRouter, Route, Switch, Redirect } from 'react-router-dom';
import { withRouter } from 'react-router';

import Master from '../components/Master';
import Home from './Home';
import Account from './Home/Account';
import Crawler from './Home/Crawler';
import ChangePwd from './ChangePwd';
import Risks from './Risks';
import Strategies from './Strategies';
import Setting from './Alerts/setting';
import Login from './Login';
import Analysis from './Analysis';
import SystemConfig from './SystemConfig';
import Alerts from './Alerts';
import Report from './Alerts/Report';
import UserManage from './UserManage';
import Monitor from './GodEye';
import Logs from './Logs';
import LogsAnalysis from './LogsAnalysis';
import ComponentHelp from './ComponentHelp';
import Relations from './Relations';

const AnalysisContainer = () => (
  <Switch>
    <Route path="/analysis/user/clickStream/:key" component={Analysis.UserClickAnalysis} />
    <Route path="/analysis/user/:key" component={Analysis.UserAnalysis} />
    <Route path="/analysis/user" component={Analysis.UserOverview} />
    <Route path="/analysis/ip/clickStream/:key" component={Analysis.IPClickAnalysis} />
    <Route path="/analysis/ip/:key" component={Analysis.IPAnalysis} />
    <Route path="/analysis/ip" component={Analysis.IPOverview} />
    <Route path="/analysis/did/clickStream/:key" component={Analysis.DIDClickAnalysis} />
    <Route path="/analysis/did/:key" component={Analysis.DIDAnalysis} />
    <Route path="/analysis/did" component={Analysis.DIDOverview} />
    <Route path="/analysis/page/:key" component={Analysis.PageAnalyze} />
    <Route path="/analysis/page" component={Analysis.PageAnalyze} />
    <Route path="/analysis/profiles" component={Analysis.Profile} />
    <Route exact path="/analysis">
      <Redirect to="/analysis/user" />
    </Route>
  </Switch>
);
const StrategiesContainer = () => (
  <Switch>
    <Route path="/strategie/user" component={Strategies} />
    <Route path="/strategie/setting" component={Setting} />
    <Route exact path="/strategie">
      <Redirect to="/strategie/user" />
    </Route>
  </Switch>
);
const HomeContainer = () => (
  <Switch>
    <Route path="/home/dashboard" component={Home} />
    <Route path="/home/account" component={Account} />
    <Route path="/home/crawler" component={Crawler} />
    <Route exact path="/home">
      <Redirect to="/home/dashboard" />
    </Route>
  </Switch>
);


@withRouter
class Root extends Component {
  static propTypes = {
    location: PropTypes.oneOfType([PropTypes.object]).isRequired
  };

  render() {
    const { location } = this.props;

    return (
      <div style={{ width: '100%', height: '100%' }}>
        <Switch>
          <Route path="/alerts/report" component={Report} />
          <Route path="/login" component={Login} />
          <Route path="/monitor" component={Monitor} />
          <Route path="/ComponentHelp" component={ComponentHelp} />
          <Route
            exact
            render={() => (
              location.pathname !== '/' ? (
                <Master>
                  <Route path="/analysis" component={AnalysisContainer} />
                  <Route path="/home" component={HomeContainer} />
                  <Route path="/changePwd" component={ChangePwd} />
                  <Route path="/risks" component={Risks} />
                  <Route path="/strategie" component={StrategiesContainer} />
                  <Route path="/setting" component={Setting} />
                  <Route path="/systemConfig" component={SystemConfig} />
                  <Route path="/alerts" component={Alerts} />
                  <Route path="/logs" component={Logs} />
                  <Route path="/logAnalysis" component={LogsAnalysis} />
                  <Route path="/userManage" component={UserManage} />
                  <Route path="/relations" component={Relations} />
                </Master>
              ) : <Redirect to="/home/dashboard" />
            )}
          />
        </Switch>
      </div>
    );
  }
}

export default () => (
  <HashRouter>
    <Root />
  </HashRouter>
);
