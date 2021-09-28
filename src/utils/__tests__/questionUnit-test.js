/**
 * @flow strict-local
 */
import {isAnswerCorrect} from '../questionUtils';

describe('Check Input-Answer', () => {
  let inputString = 'I am a boy';
  let answerString = 'A boy I am';

  test('function returning valid value on null arguments', () => {
    let response = isAnswerCorrect('', '');
    expect(response).toBeBoolean();
  });
  test('function returning valid value on valid argument', () => {
    let response = isAnswerCorrect(inputString, answerString);
    expect(response).toBeBoolean();
  });
  test('is correct when inputs are suffled between user-input and answer', () => {
    let response = isAnswerCorrect(inputString, answerString);
    expect(response).toBeTrue();
  });

  test('is correct when inputs are different by plurals', () => {
    inputString = 'boys';
    answerString = 'boy';

    let response = isAnswerCorrect(inputString, answerString);
    expect(response).toBeTrue();
  });

  test('is correct when inputs are somewhat same sentances', () => {
    inputString = 'have not heard about Jest';
    answerString = 'For all those who have not heard about Jest';

    let response = isAnswerCorrect(inputString, answerString);
    expect(response).toBeTrue();
  });

  test('is correct when inputs are different sentances', () => {
    inputString = 'We used Jest because of the following reasons';
    answerString = 'For all those who have not heard about Jest';

    let response = isAnswerCorrect(inputString, answerString);
    expect(response).toBeFalse();
  });
});
