import React from 'react';
import PropTypes from 'prop-types';

const HOCAnalysisLink = (Link) => (
  class extends React.Component {
    render() {
      const { keyword } = this.props;

      return (
        <Link>{keyword}</Link>
      );
    }
  }
);

export default HOCAnalysisLink;
