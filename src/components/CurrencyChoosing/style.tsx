import {StyleSheet} from 'react-native';

const getStyleObj = () => {
  return StyleSheet.create({
    container: {
      backgroundColor: 'white',
      padding: 16,
      flexDirection: 'row',
    },
    dropdown: {
      flex: 1,
      height: 50,
      borderColor: 'gray',
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
      fontSize: 12,
    },
    selectedTextStyle: {
      fontSize: 12,
    },
    inputSearchStyle: {
      height: 40,
      fontSize: 12,
    },
  });
};

export default getStyleObj;
