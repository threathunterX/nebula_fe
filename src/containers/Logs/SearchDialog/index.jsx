import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import Dialog from '../../../components/Dialog';
import SearchForm from '../SearchForm';
import './index.scss';

class SearchDialog extends PureComponent {
  static propTypes = {
    onSubmit: PropTypes.func.isRequired,
    onReset: PropTypes.func.isRequired,
    onChange: PropTypes.func.isRequired,
    timestamp: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
    form: PropTypes.oneOfType([PropTypes.object]),
    className: PropTypes.string,
    title: PropTypes.string,
    error: PropTypes.oneOfType([PropTypes.object]),
    events: PropTypes.oneOfType([PropTypes.array]),
    visible: PropTypes.bool
  };
  static defaultProps = {
    events: undefined,
    form: undefined,
    error: undefined,
    className: '',
    title: '添加日志查询',
    visible: false
  };

  render() {
    const {
      visible,
      onSubmit,
      onReset,
      form,
      events,
      onChange,
      className,
      timestamp,
      title,
      error
    } = this.props;

    const buttons = [{
      text: '查询',
      onClick: () => {
        onSubmit();
      }
    }, {
      text: '取消',
      cls: 'cancel-btn',
      onClick: () => {
        onReset();
      }
    }];

    return (
      <Dialog
        className={className}
        visible={visible}
        title={title}
        buttons={buttons}
        onClose={onReset}
      >
        <SearchForm
          key={timestamp}
          events={events}
          error={error}
          form={form}
          onChange={onChange}
        />
      </Dialog>
    );
  }
}

export default SearchDialog;
