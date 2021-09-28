/**
 * @flow strict-local
 */
import React from 'react';
import renderer from 'react-test-renderer';

import {OfflineNotice} from '../';

test('Offline-Notice renders correctly', () => {
  const tree = renderer.create(<OfflineNotice />).toJSON();
  expect(tree).toMatchSnapshot();
});
