import React, {useCallback, useEffect, useRef, useState} from 'react';
import {
  Animated,
  Easing,
  InputAccessoryView,
  Keyboard,
  Platform,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {SafeAreaView, useSafeAreaInsets} from 'react-native-safe-area-context';
import {Modalize, useModalize} from 'react-native-modalize';
import {Portal} from 'react-native-portalize';
import {useRecoilState, useRecoilValue} from 'recoil';
import {useNavigation} from '@react-navigation/native';
import getSymbolFromCurrency from 'currency-symbol-map';

import {
  currencyCodesAtom,
  receiveCurrencyAtom,
  sendCurrencyAtom,
} from 'store/atom/getAtom';
import {CurrencyCodesType, fetchConvertedCurrency} from 'config/Axios/getAPI';

import getStyleObj from './style';
import {Back, Down, Swap} from 'assets/SVG';
import {sizes} from 'styles/sizes';
import {colors} from 'styles/colors';

interface RenderItemType {
  item: CurrencyCodesType;
  index: number;
}

interface CurrencyInputType {
  value: string;
  step: 'changed' | 'converted';
}

const CalculatorScreen: React.FC = () => {
  const inputAccessoryViewID = 'uniqueID-keyboardClose#Done';
  const insets = useSafeAreaInsets();
  const styles = getStyleObj(insets);
  const {ref, open, close} = useModalize();
  const {setOptions, goBack} = useNavigation();
  const [openedTab, setOpenedTab] = useState('');

  const {data} = useRecoilValue(currencyCodesAtom);

  const [sendCurrency, setSendCurrency] = useRecoilState(sendCurrencyAtom);
  const [receiveCurrency, setReceiveCurrency] =
    useRecoilState(receiveCurrencyAtom);
  const rotateValueRef = useRef(new Animated.Value(0)).current;
  const rotate = rotateValueRef.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '180deg'],
  });
  const [sendValue, setSendValue] = useState<CurrencyInputType>({
    value: '',
    step: 'converted',
  });
  const [receiveValue, setReceiveValue] = useState<CurrencyInputType>({
    value: '',
    step: 'converted',
  });

  useEffect(() => {
    setSendValue({value: '', step: 'converted'});
    setReceiveValue({value: '', step: 'converted'});
  }, [sendCurrency, receiveCurrency]);

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

  const renderItem = ({item}: RenderItemType) => (
    <TouchableOpacity
      style={styles.sheetButton}
      onPress={() => handleModalItemPress(item)}>
      <Text style={styles.sheetButtonText}>
        {getSymbolFromCurrency(item?.code)} - {item?.name}
      </Text>
    </TouchableOpacity>
  );

  const handleModalItemPress = useCallback(
    (value: CurrencyCodesType) => {
      if (openedTab === 'send') {
        setSendCurrency(value);
      } else {
        setReceiveCurrency(value);
      }
      close();
      setOpenedTab('');
    },
    [close, openedTab],
  );

  const sheetOpenHandle = useCallback(
    (event: string) => {
      setOpenedTab(event);
      open();
    },
    [open],
  );

  useEffect(() => {
    let handler: ReturnType<typeof setTimeout>;

    if (sendValue?.step === 'changed') {
      handler = setTimeout(() => {
        fetchConvertedCurrency(
          sendCurrency?.code,
          receiveCurrency?.code,
          sendValue?.value,
          value => {
            setReceiveValue({value, step: 'converted'});
          },
        );
        setSendValue({value: sendValue?.value, step: 'converted'});
      }, 300);
    } else if (receiveValue?.step === 'changed') {
      handler = setTimeout(() => {
        fetchConvertedCurrency(
          receiveCurrency?.code,
          sendCurrency?.code,
          receiveValue?.value,
          value => {
            setSendValue({value, step: 'converted'});
          },
        );
        setReceiveValue({value: receiveValue?.value, step: 'converted'});
      }, 300);
    }

    return () => {
      clearTimeout(handler);
    };
  }, [sendValue, receiveValue]);

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
              value={sendValue.value}
              onChangeText={value => setSendValue({value, step: 'changed'})}
            />
            <TouchableOpacity
              onPress={() => sheetOpenHandle('send')}
              style={styles.dropDown}>
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
            <Swap width={sizes.im} height={sizes.im} fill={colors.black} />
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
              value={receiveValue.value}
              onChangeText={value => setReceiveValue({value, step: 'changed'})}
            />
            <TouchableOpacity
              onPress={() => sheetOpenHandle('receive')}
              style={styles.dropDown}>
              <Text style={styles.currencyName} numberOfLines={1}>
                {receiveCurrency.name}
              </Text>
              <Down width={sizes.m} height={sizes.m} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
      {Platform.OS === 'ios' && (
        <InputAccessoryView nativeID={inputAccessoryViewID}>
          <TouchableOpacity onPress={() => Keyboard.dismiss()}>
            <Text style={styles.doneBTN}>Done</Text>
          </TouchableOpacity>
        </InputAccessoryView>
      )}
      <Portal>
        <Modalize
          ref={ref}
          handlePosition={'outside'}
          disableScrollIfPossible={false}
          flatListProps={{
            data: data,
            renderItem: renderItem,
            keyExtractor: item => item.heading,
            showsVerticalScrollIndicator: false,
          }}
        />
      </Portal>
    </SafeAreaView>
  );
};

export default CalculatorScreen;
