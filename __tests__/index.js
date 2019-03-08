import React from 'react';
import { shallow } from 'enzyme';
import Home from '../src/containers/Home';

describe('<Home />', () => {
  test('true', () => {
    const wrapper = shallow(<Home />);

    expect(true).toBeTruthy();

    // expect(wrapper.contains(<div>xxx</div>)).toBeTruthy();
  });
});
