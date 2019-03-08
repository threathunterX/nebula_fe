import React from 'react';
import PropTypes from 'prop-types';

const App = props => (
  <div className="wrapper">
    {props.children}
  </div>
);

App.propTypes = {
  children: PropTypes.oneOfType([PropTypes.element]).isRequired
};

export default App;
