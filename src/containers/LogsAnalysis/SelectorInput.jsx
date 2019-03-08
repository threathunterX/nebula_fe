import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';

import Selector from '../../components/Selector';

import './index.scss';

class SelectorInput extends PureComponent {
  static propTypes = {
    orgLogList: PropTypes.oneOfType([PropTypes.array]).isRequired,
    item: PropTypes.oneOfType([PropTypes.object]).isRequired,
    onSelect: PropTypes.func.isRequired,
    onChange: PropTypes.func.isRequired,
    selected: PropTypes.oneOfType([PropTypes.object])
  };
  static defaultProps = {
    selected: {}
  };

  render() {
    const {
      orgLogList,
      item,
      selected
    } = this.props;

    const logList = _.cloneDeep(orgLogList);

    return (
      <div className="log-analysis-selector-input">
        <Selector
          selectorType="list"
          dataList={logList}
          value={selected}
          onChange={value => this.props.onSelect(value)}
        />
        <span>.</span>
        <input
          value={item.op_string.extract_context}
          onChange={(e) => {
            this.props.onChange(e);
          }}
          type="text"
          placeholder="请输入变量名"
        />
      </div>
    );
  }
}

export default SelectorInput;
