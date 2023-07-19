/* eslint-disable react/react-in-jsx-scope */
import {useState} from 'react';

import {View, Pressable} from 'react-native';

import {Dropdown} from 'react-native-element-dropdown';
import {colors} from '../../styles/colors';

import getStyleObj from './style';

import {Swap} from '../../assets/SVG';

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

function CurrencyChoosing() {
  const styles = getStyleObj();

  const [value, setValue] = useState<any | null>(null);
  const [isFromFocus, setIsFromFocus] = useState(false);
  const [isToFocus, setIsToFocus] = useState(false);

  function swapPressHandler() {
    console.log('swap button pressed');
  }

  return (
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
      />
      <Pressable
        style={({pressed}) => [styles.swapButton, {opacity: pressed ? 0.5 : 1}]}
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
  );
}

export default CurrencyChoosing;
