import React from 'react';
import renderer from 'react-test-renderer';

// Note: import explicitly to use the types shiped with jest.
// import {it} from '@jest/globals';

import App from '../src/App';

describe('Integration Test', () => {
  it('renders correctly', () => {
    const tree = renderer.create(<App />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
