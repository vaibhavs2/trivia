/**
 * @flow strict-local
 */

/** 
    If user inputs answer in sencences then simply string match would not
    appropriate to confirm result.So, here a assumption has been taken for
    such situation
 */
export function isAnswerCorrect(inputAnswer: string, realAnswer: string) {
  let input = inputAnswer.toLowerCase().trim();
  let answer = realAnswer.toLowerCase().trim();
  //if single word answer and there is more chances that
  // user will input larger string than the actual one
  // word answer.
  if (input.includes(answer)) return true;
  /** works when for example- the answer is `thousands` and user
   * input is `thousand`.
   *Checking both cases as we are not certain about situation
   * where @var inputAnswer is the subset of @var realAnswer and viceverca.
   */
  if (answer.includes(input)) return true;

  /**
   * if answer is in sentance and did't pass the above check cases
   * we have to check on each words.
   * Again with assumption, if user input is 10 words and let say
   * @var realAnswer is of 7 word then sort the sentance based on
   * length of the words and then try matching them.
   * answer will mostly depend on largest word and that would be the quite right approach
   * according to me.
   */

  answer = answer.split(' ').sort(function (a, b) {
    return b.length - a.length;
  });
  answer = [...new Set(answer)];

  input = input.split(' ').sort(function (a, b) {
    return b.length - a.length;
  });
  input = [...new Set(input)];

  let found = answer.filter(element => input.includes(element));

  if (found.length >= answer.length / 2) {
    return true;
  }

  return false;
}
