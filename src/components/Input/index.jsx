import React from 'react';
import PropTypes from 'prop-types';

class Input extends React.Component {
  static propTypes = {
    onChange: PropTypes.func.isRequired,
    value: PropTypes.string.isRequired,
    onSubmit: PropTypes.func,
    onKeyDown: PropTypes.func
  };
  static defaultProps = {
    onSubmit: undefined,
    onKeyDown: undefined
  };

  handleChange(e) {
    if (this.props.onChange) {
      this.props.onChange(e.target.value);
    }
  }

  render() {
    const {
      value,
      onChange,
      onSubmit,
      onKeyDown,
      ...others
    } = this.props;

    return (
      <input
        {...others}
        value={value}
        onChange={e => this.handleChange(e)}
        onKeyDown={(e) => {
          if (onSubmit && e.keyCode === 13) {
            onSubmit(e.target.value);
          }
          if (onKeyDown) {
            onKeyDown(e);
          }
        }}
      />
    );
  }
}

export default Input;
