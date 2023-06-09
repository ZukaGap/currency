/* eslint-disable max-len */
import React from 'react';
import {View, StyleSheet, Text, TouchableWithoutFeedback} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {Canvas, Path} from '@shopify/react-native-skia';
import {Back} from 'assets/SVG';

const styles = StyleSheet.create({
  container: {
    padding: 16,
    height: 96,
    justifyContent: 'center',
  },
  title: {
    fontFamily: 'Helvetica',
    fontSize: 20,
    color: 'white',
    textAlign: 'center',
  },
});

export const Header = () => {
  const {goBack} = useNavigation();
  return (
    <View style={styles.container}>
      <View style={[StyleSheet.absoluteFill, {justifyContent: 'center'}]}>
        <Text style={styles.title}>Etherum</Text>
      </View>
      <TouchableWithoutFeedback onPress={goBack}>
        <View
          style={{
            width: 48,
            height: 48,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Back width={36} height={36} />
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
};
