import {Platform, StyleSheet} from 'react-native';
import {EdgeInsets} from 'react-native-safe-area-context';
import {colors} from '../../styles/colors';

const getStyleObj = (insets: EdgeInsets) => {
  return StyleSheet.create({
    safeAreaWrapper: {
      flex: 1,
      //backgroundColor: '#ffffff',
      //paddingHorizontal: 16,
      ...Platform.select({
        android: {paddingTop: insets.top, paddingBottom: insets.bottom},
        default: {},
      }),
    },
    container: {
      //backgroundColor: 'white',
      padding: 8,
      flexDirection: 'row',
    },
    dropdown: {
      flex: 1,
      height: 50,
      borderColor: colors.grey,
      backgroundColor: colors.white,
      borderWidth: 0.5,
      borderRadius: 8,
      paddingHorizontal: 8,
    },
    swapButton: {
      marginHorizontal: 12,
      alignItems: 'center',
      justifyContent: 'center',
      height: 'auto',
      width: 'auto',
      transform: [{rotate: '-90deg'}],
    },
    placeholderStyle: {
      color: colors.grey,
      fontSize: 12,
    },
    selectedTextStyle: {
      fontSize: 12,
    },
    inputSearchStyle: {
      height: 40,
      fontSize: 12,
    },

    //

    inputContainer: {
      flexDirection: 'row',
      marginHorizontal: 8,
      height: 50,
      backgroundColor: colors.white,
      borderColor: colors.grey,
      borderWidth: 0.5,
      borderRadius: 8,
      paddingLeft: 8,
      overflow: 'hidden',
      //justifyContent: 'center',
    },
    textInputContainer: {
      flex: 1,
      justifyContent: 'center',
      //backgroundColor: 'red',
    },
    calculateButton: {
      alignItems: 'center',
      justifyContent: 'center',
      height: '100%',
      width: '30%',
      backgroundColor: colors.purple,
    },
    currenciesContainer: {
      marginHorizontal: 8,
      alignItems: 'center',
      justifyContent: 'center',
    },
    convertedComponent: {
      //color: colors.red,
      marginTop: 8,
      padding: 8,
    },
  });
};

export default getStyleObj;
