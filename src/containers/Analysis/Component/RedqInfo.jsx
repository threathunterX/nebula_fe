import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';

import * as RedqService from '../../../services/RedqService';
import * as RegExpression from '../../../regexp';
import AnalyzeCard from '../Component/AnalyzeCard';

const EventEmitter = RedqService.getEventEmitterInstance();

export default class RedqInfo extends Component {

  static propTypes = {
    keyType: PropTypes.string,
    keyValue: PropTypes.string,
    location: PropTypes.string
  };
  static defaultProps = {
    keyType: '',
    keyValue: '',
    location: ''
  };

  constructor(props) {
    super(props);

    const {
      keyType,
      keyValue
    } = this.props;

    this.state = {
      score: 0,
      keyType,
      keyValue,
      status: RedqService.getRedqStatus(),
      location: '.',
      alert: null
    };
    this.render = this.render.bind(this);
    this.addRedqListener();
  }

  componentDidMount() {
    this.fetchRedqInformation();
  }

  componentWillReceiveProps(nextProps) {
    const { keyValue, keyType } = nextProps;
    this.setState({
      keyValue,
      keyType
    });
  }

  componentDidUpdate(prevProps, prevState) {
    if (!_.eq(this.state.keyValue, prevState.keyValue)) {
      this.fetchRedqInformation();
    }
  }

  getRedqInfo() {
    const {
      keyValue,
      keyType
    } = this.state;
    if (!keyValue) return;
    const isIP = (keyType === 'ip' && keyValue.match(RegExpression.IP) !== null);
    const isMobile = (keyType === 'mobile' && keyValue.match(RegExpression.MOBILE) !== null);
    if (isIP || isMobile) {
      RedqService.getRedqInfo(keyType, keyValue, '.location-card, .point-card')
        .then((data) => {
          this.setState(data);
        });
    } else {
      this.setState({
        //alert: 'RED.Q服务未能提供情报'
      });
    }
  }

  addRedqListener() {
    EventEmitter.on(RedqService.EVENT_REDQ_STATUS_CHANGED, (value) => {
      this.setState({ status: value });
      if (value) {
        this.getRedqInfo();
      }
    });
  }

  fetchRedqInformation() {
    if (this.state.status) {
      this.getRedqInfo();
    }
  }

  render() {
    const {
      status,
      keyType,
      keyValue,
      score,
      tags,
      alert
    } = this.state;

    let { location } = this.state;

    if (this.props.location) {
      location = this.props.location;
    }

    return (
      <AnalyzeCard
        status={status}
        loc={location}
        locationTitle={keyValue}
        riskPoint={score}
        tags={tags}
        alert={alert}
        keyType={keyType}
      />
    );
  }
}
