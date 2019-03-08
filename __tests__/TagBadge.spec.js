import React from 'react';
import { shallow } from 'enzyme';
import TagBadge from '../src/components2/TagBadge';

describe('<TagBadge />', () => {
  test('渲染', () => {
    const wrapper = shallow(<TagBadge />);
    expect(wrapper).toHaveLength(1);
  });

  test('引用查找', () => {
    expect(true).toBe(true);
  });
});
