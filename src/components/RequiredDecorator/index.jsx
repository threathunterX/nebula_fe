import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import './index.scss';

export const ERROR_REQUIRED = 'ERROR_REQUIRED';

const RequiredDecorator = Component =>
  class extends React.Component {
    static propTypes = {
      onError: PropTypes.func,
      onChange: PropTypes.func,
      error: PropTypes.oneOfType([PropTypes.object]),
      className: PropTypes.string
    };
    static defaultProps = {
      onError: undefined,
      onChange: undefined,
      children: null,
      className: '',
      error: {}
    };

    handleChange = (value) => {
      if (this.props.onChange) {
        this.props.onChange(value);
      }
    };

    handleCheck = (value) => {
      const result = !_.isEmpty(value);

      if (!result) {
        this.props.onError(value, ERROR_REQUIRED);
      }

      return result;
    };

    render() {
      const {
        className,
        error,
        ...others
      } = this.props;

      return (
        <Component
          className={className + (_.includes(_.keys(error), ERROR_REQUIRED) ? ' required-component-container' : '')}
          {...others}
          onChange={value => this.handleChange(value)}
        />
      );
    }
  };

export default RequiredDecorator;
