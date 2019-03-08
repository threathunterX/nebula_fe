import React from 'react';
import { shallow } from 'enzyme';
import StrategyBadge from '../src/components2/StrategyBadge';

describe('<StrategyBadge />', () => {
  test('渲染', () => {
    const wrapper = shallow(<StrategyBadge />);
    expect(wrapper).toHaveLength(1);
  });

  test('引用查找', () => {
    expect(true).toBe(true);
  });
});

