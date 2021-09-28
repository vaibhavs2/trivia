/**
 * @flow strict-local
 */
import React from 'react';
import renderer from 'react-test-renderer';

import {QuestionModal} from '../';

describe('Question-Modal renders correctly', () => {
  test(' when app-offline, modal visible', () => {
    let props = {appOnline: false, visible: true, switchModal: () => {}};

    const tree = renderer.create(<QuestionModal {...props} />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('when app-online, modal visible', () => {
    let props = {appOnline: true, visible: true, switchModal: () => {}};

    const tree = renderer.create(<QuestionModal {...props} />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('when app-offline, modal invisible', () => {
    let props = {appOnline: false, visible: false, switchModal: () => {}};

    const tree = renderer.create(<QuestionModal {...props} />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('when app-online, modal invisible', () => {
    let props = {appOnline: true, visible: false, switchModal: () => {}};

    const tree = renderer.create(<QuestionModal {...props} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
