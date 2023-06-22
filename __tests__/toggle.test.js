import React from 'react';
import renderer from 'react-test-renderer';

import {Toggle} from '../src/components';

describe('Toggle Button Test', () => {
  it('renders correctly', () => {
    const tree = renderer.create(<Toggle />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
