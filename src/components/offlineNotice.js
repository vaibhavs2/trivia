/**
 * @flow strict-local
 */
import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

export default function OfflineNotice() {
  return (
    <View style={styles.conatiner}>
      <Text style={{color: 'red'}}>You don't have Internet connection </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  conatiner: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
});
