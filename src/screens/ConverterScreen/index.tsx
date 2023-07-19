/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {Pressable, View, Text} from 'react-native';

import {Swap} from 'assets/SVG';

import {useSafeAreaInsets} from 'react-native-safe-area-context';

import SafeAreaView from 'react-native-safe-area-view';

import getStyleObj from './style';

//

import {Dropdown} from 'react-native-element-dropdown';
import {colors} from '../../styles/colors';
import {TextInput} from 'react-native-gesture-handler';

const data = [
  {label: 'Item 1', value: '1'},
  {label: 'Item 2', value: '2'},
  {label: 'Item 3', value: '3'},
  {label: 'Item 4', value: '4'},
  {label: 'Item 5', value: '5'},
  {label: 'Item 6', value: '6'},
  {label: 'Item 7', value: '7'},
  {label: 'Item 8', value: '8'},
];

const ConverterScreen: React.FC = () => {
  const insets = useSafeAreaInsets();
  const styles = getStyleObj(insets);

  const [value, setValue] = useState<any | null>(null);
  const [isFromFocus, setIsFromFocus] = useState(false);
  const [isToFocus, setIsToFocus] = useState(false);
  const [isInputFocused, setInputFocused] = useState(false);

  function swapPressHandler() {
    console.log('swap button pressed');
  }

  function calculatePressHandler() {
    console.log('calculate button pressed');
  }

  return (
    <SafeAreaView style={styles.safeAreaWrapper}>
      <View style={styles.container}>
        <Dropdown
          style={[styles.dropdown, isFromFocus && {borderColor: colors.purple}]}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          inputSearchStyle={styles.inputSearchStyle}
          data={data}
          search
          maxHeight={300}
          labelField="label"
          valueField="value"
          placeholder={!isFromFocus ? 'Convert from' : '...'}
          searchPlaceholder="Search..."
          value={value}
          onFocus={() => setIsFromFocus(true)}
          onBlur={() => setIsFromFocus(false)}
          onChange={item => {
            setValue(item.value);
            setIsFromFocus(false);
          }}
          //backgroundColor="blue"
        />
        <Pressable
          style={({pressed}) => [
            styles.swapButton,
            {opacity: pressed ? 0.5 : 1},
          ]}
          onPress={swapPressHandler}>
          <Swap width={30} height={30} fill={colors.purple} />
        </Pressable>
        <Dropdown
          style={[styles.dropdown, isToFocus && {borderColor: colors.purple}]}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          inputSearchStyle={styles.inputSearchStyle}
          data={data}
          search
          maxHeight={300}
          labelField="label"
          valueField="value"
          placeholder={!isToFocus ? 'Convert to' : '...'}
          searchPlaceholder="Search..."
          value={value}
          onFocus={() => setIsToFocus(true)}
          onBlur={() => setIsToFocus(false)}
          onChange={item => {
            setValue(item.value);
            setIsToFocus(false);
          }}
        />
      </View>
      {}
      <View
        style={[
          styles.inputContainer,
          isInputFocused && {borderColor: colors.purple},
        ]}>
        <View style={styles.textInputContainer}>
          <TextInput
            keyboardType="numeric"
            placeholder="Input amount..."
            placeholderTextColor={colors.grey}
            onFocus={() => {
              setInputFocused(true);
            }}
            onBlur={() => {
              setInputFocused(false);
            }}
            //style={{backgroundColor: 'yellow'}}
          />
        </View>
        <View style={styles.currenciesContainer}>
          <Text style={{color: colors.grey}}>USD to GEL</Text>
        </View>
        <Pressable
          style={({pressed}) => [
            styles.calculateButton,
            {opacity: pressed ? 0.5 : 1},
          ]}
          onPress={calculatePressHandler}>
          <Text style={{color: colors.white, fontWeight: 'bold'}}>
            CALCULATE
          </Text>
        </Pressable>
      </View>
      {}
      <View style={styles.convertedComponent}>
        <Text style={{marginBottom: 10, fontSize: 18, color: colors.black}}>
          70 US Dollars =
        </Text>
        <Text
          style={{
            marginBottom: 10,
            fontSize: 26,
            fontWeight: 'bold',
            color: colors.black,
          }}>
          204.22 Georgian Lari
        </Text>
        <Text style={{marginBottom: 10, fontSize: 12, color: colors.black}}>
          1 USD = 2.61 GEL
        </Text>
        <Text style={{fontSize: 12, color: colors.black}}>
          1 GEL = 0.3821 USD
        </Text>
      </View>
    </SafeAreaView>
  );
};

export default ConverterScreen;
