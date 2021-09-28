/**
 * @flow strict-local
 */
import React from 'react';
import renderer from 'react-test-renderer';

import QuestionScreen from '../questionScreen';

test('Question-Screen renders correctly', () => {
  let props = {appOnline: false, visible: true, switchModal: () => {}};

  const tree = renderer.create(<QuestionScreen />).toJSON();
  expect(tree).toMatchSnapshot();
});
