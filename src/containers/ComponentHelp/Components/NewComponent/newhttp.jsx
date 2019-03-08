import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { connect, PromiseState } from 'react-refetch';
import { API_BASE } from 'app.config';

@connect(() => ({
  promise: param => ({
    fetch: {
      url: `${API_BASE}nebula/strategies`,
      method: 'POST',
      body: JSON.stringify({ param }),
      then: foo => ({
        value: {
          text: 'aaa',
          value: foo
        }
      })
    }
  })
}))
class Newhttp extends Component {
  static propTypes = {
    promise: PropTypes.func.isRequired,
    fetch: PropTypes.instanceOf(PromiseState).isRequired
  };

  componentWillMount() {
    this.props.promise(10);
  }

  render() {
    console.log(this.props.fetch);
    return null;
  }
}
const httpDom = document.createElement('div');

export const http = {
  get: () => {
    ReactDOM.render(
      <Newhttp />,
      httpDom
    );
  }
};
