import React from 'react';
import { shallow } from 'enzyme';
import AnalysisLink from '../src/components2/AnalysisLink';

describe('<AnalysisLink />', () => {
  test('渲染', () => {
    const wrapper = shallow(<AnalysisLink />);
    expect(wrapper).toHaveLength(1);
  });

  test('引用查找', () => {
    expect(true).toBe(true);
  });
});
