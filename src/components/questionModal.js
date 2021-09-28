/**
 * @flow strict-local
 */
import React, {useEffect, useState} from 'react';
import {
  View,
  SafeAreaView,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Keyboard,
  ActivityIndicator,
} from 'react-native';
import Modal from 'react-native-modal';
import ReactNativeHapticFeedback from 'react-native-haptic-feedback';

import {getNextQuestion} from '../service/api';
import {OfflineNotice} from './';
import {isAnswerCorrect} from '../utils/questionUtils';

type Props = {
  appOnline: boolean,
  visible: boolean,
  switchModal: () => void,
};
type Answer = {
  answer: string,
  status: 'correct' | 'incorrect' | '',
};

export default function QuestionModal(props: Props) {
  const [getQuestions, setQuestions] = useState({});
  const [getAnswer, setAnswer] = useState<Answer>({answer: '', status: ''});

  const nextQuestion = () => {
    getNextQuestion()
      .then(response => {
        if (!response[0].question) {
          response.question =
            'Error occured! please write anything in input and click for the next question';
        }
        setQuestions(response[0]);
        setAnswer({answer: '', status: ''});
      })
      .catch(error => {
        alert(error);
      });
  };

  useEffect(() => {
    nextQuestion();
  }, []);

  const hapticFeedBack = () => {
    ReactNativeHapticFeedback.trigger('impactLight', {
      enableVibrateFallback: true,
      ignoreAndroidSystemSettings: true,
    });
  };

  const submitAnswer = () => {
    Keyboard.dismiss();
    if (!getAnswer.answer) return;

    let response: boolean = isAnswerCorrect(
      getAnswer.answer,
      getQuestions.answer,
    );
    if (response) setAnswer({...getAnswer, status: 'correct'});
    else {
      hapticFeedBack();
      setAnswer({...getAnswer, status: 'incorrect'});
    }
  };

  const switchToNext = () => {
    props.switchModal();
    nextQuestion();
  };

  return (
    <Modal
      isVisible={props.visible}
      animationIn="slideInRight"
      animationOut="slideOutLeft"
      backdropColor="white"
      onBackdropPress={Keyboard.dismiss}>
      <SafeAreaView style={styles.container}>
        {!props.appOnline && <OfflineNotice />}
        <ActivityIndicator
          size="small"
          color="#0000ff"
          animating={!!!getQuestions?.question}
        />
        <Text style={styles.title}>
          <Text style={{fontWeight: 'bold'}}>Title: </Text>
          {getQuestions?.category?.title}
        </Text>
        <Text style={{fontWeight: 'bold', fontSize: 16}}>Question:</Text>
        <Text style={styles.question}>{getQuestions.question}</Text>
        <TextInput
          style={styles.input}
          multiline
          placeholder="Write your answer here"
          onChangeText={value => {
            setAnswer({status: '', answer: value});
          }}
        />
        {getAnswer.status ? (
          getAnswer.status === 'correct' ? (
            <Text style={styles.correctText}>You got it right</Text>
          ) : (
            <Text style={styles.incorrectText}>This is incorrect answer</Text>
          )
        ) : null}
        {getAnswer.status !== 'correct' && (
          <Button
            onPress={submitAnswer}
            title={getAnswer.status === 'incorrect' ? 'Re-attempt' : 'Submit'}
            color="#f194ff"
          />
        )}
        <View style={{height: 12}} />
        {!!getAnswer.status && (
          <Button onPress={switchToNext} title="Next Question" color="green" />
        )}
      </SafeAreaView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {flex: 1, marginVertical: 50},
  title: {
    fontSize: 16,
    marginBottom: 12,
  },
  question: {
    fontSize: 16,
    height: 120,
  },
  correctText: {
    color: 'green',
    textAlign: 'center',
  },
  incorrectText: {
    color: 'red',
    textAlign: 'center',
  },
  input: {
    marginVertical: 20,
    borderBottomWidth: 1,
    textAlign: 'left',
  },
});
