/**
 * @flow strict-local
 */
import React, {useEffect, useState} from 'react';
import {SafeAreaView} from 'react-native';
import NetInfo from '@react-native-community/netinfo';

import {QuestionModal} from '../components';

export default function QuestionScreen() {
  const [isAppOnline, setAppOnline] = useState(true);
  const [getSwitchModal, setSwitchModal] = useState(true);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(netInfoState => {
      const {type: connectionType} = netInfoState;
      let isConnected =
        connectionType !== 'none' && connectionType !== 'unknown';
      if (isConnected) {
        setAppOnline(true);
      } else {
        setAppOnline(false);
      }
    });

    return unsubscribe;
  }, []);

  return (
    <SafeAreaView>
      <QuestionModal
        appOnline={isAppOnline}
        visible={getSwitchModal}
        switchModal={() => {
          setSwitchModal(!getSwitchModal);
        }}
      />
      <QuestionModal
        appOnline={isAppOnline}
        visible={!getSwitchModal}
        switchModal={() => {
          setSwitchModal(!getSwitchModal);
        }}
      />
    </SafeAreaView>
  );
}
