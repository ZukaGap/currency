import React, {useCallback, useEffect, useRef, useState} from 'react';
import {
  Animated,
  Easing,
  InputAccessoryView,
  Keyboard,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {SafeAreaView, useSafeAreaInsets} from 'react-native-safe-area-context';
import {Modalize, useModalize} from 'react-native-modalize';
import {Portal} from 'react-native-portalize';
import {useRecoilValue} from 'recoil';
import {useNavigation} from '@react-navigation/native';

import {currencyCodesAtom} from 'store/atom/getAtom';

import getStyleObj from './style';
import {Back, Down, Swap} from 'assets/SVG';
import {sizes} from 'styles/sizes';
import {colors} from 'styles/colors';

const CalculatorScreen: React.FC = () => {
  const inputAccessoryViewID = 'uniqueID-keyboardClose#Done';
  const insets = useSafeAreaInsets();
  const styles = getStyleObj(insets);
  const {ref, open} = useModalize();
  const {setOptions, goBack} = useNavigation();

  const {data} = useRecoilValue(currencyCodesAtom);

  const [sendCurrency, setSendCurrency] = useState({
    code: 'GEL',
    name: 'ლარი',
  });
  const [receiveCurrency, setReceiveCurrency] = useState({
    code: 'USD',
    name: 'აშშ დოლარი',
  });
  const rotateValueRef = useRef(new Animated.Value(0)).current;
  const rotate = rotateValueRef.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '180deg'],
  });

  useEffect(() => {
    setOptions({
      headerLeft: () => (
        <TouchableOpacity
          onPress={() => {
            goBack();
          }}>
          <Back width={sizes.is} height={sizes.is} fill={colors.purple03} />
        </TouchableOpacity>
      ),
    });
  }, []);

  const handleSwapCurrency = useCallback(() => {
    const changedValue = sendCurrency;
    setSendCurrency(receiveCurrency);
    setReceiveCurrency(changedValue);
    Animated.timing(rotateValueRef, {
      toValue: 1,
      duration: 400,
      easing: Easing.linear,
      useNativeDriver: true,
    }).start(() => {
      rotateValueRef.setValue(0);
    });
  }, [receiveCurrency, sendCurrency]);

  return (
    <SafeAreaView style={styles.safeAreaWrapper}>
      <View style={styles.center}>
        <View style={styles.send}>
          <Text style={styles.title}>Send</Text>
          <View style={styles.inputView}>
            <TextInput
              style={styles.input}
              numberOfLines={1}
              keyboardType={'numeric'}
              inputAccessoryViewID={inputAccessoryViewID}
            />
            <TouchableOpacity onPress={() => open()} style={styles.dropDown}>
              <Text style={styles.currencyName} numberOfLines={1}>
                {sendCurrency.name}
              </Text>
              <Down width={sizes.m} height={sizes.m} />
            </TouchableOpacity>
          </View>
        </View>
        <TouchableOpacity
          style={styles.swap}
          activeOpacity={0.75}
          onPress={handleSwapCurrency}>
          <View style={[styles.swapFirst]} />
          <Animated.View style={{transform: [{rotate}]}}>
            <Swap width={sizes.im} height={sizes.im} />
          </Animated.View>
        </TouchableOpacity>
        <View style={styles.receive}>
          <Text style={styles.title}>Receive</Text>
          <View style={styles.inputView}>
            <TextInput
              style={styles.input}
              numberOfLines={1}
              keyboardType={'numeric'}
              inputAccessoryViewID={inputAccessoryViewID}
            />
            <TouchableOpacity onPress={() => open()} style={styles.dropDown}>
              <Text style={styles.currencyName} numberOfLines={1}>
                {receiveCurrency.name}
              </Text>
              <Down width={sizes.m} height={sizes.m} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <InputAccessoryView nativeID={inputAccessoryViewID}>
        <TouchableOpacity onPress={() => Keyboard.dismiss()}>
          <Text style={styles.doneBTN}>Done</Text>
        </TouchableOpacity>
      </InputAccessoryView>
      <Portal>
        <Modalize
          ref={ref}
          scrollViewProps={{showsVerticalScrollIndicator: false}}
          handlePosition={'outside'}
          disableScrollIfPossible={false}
          // withOverlay={false}
          adjustToContentHeight
          // withHandle={false}
          withReactModal>
          <View>
            <Text>awd</Text>
          </View>
        </Modalize>
      </Portal>
    </SafeAreaView>
  );
};

export default CalculatorScreen;
