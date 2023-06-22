import {StyleSheet} from 'react-native';

const getStyleObj = () => {
  return StyleSheet.create({
    row: {
      flexDirection: 'row',
      alignItems: 'center',
      marginVertical: 5,
    },
    spacer: {
      flexGrow: 1,
    },
    toggleText: {
      fontSize: 18,
      fontWeight: '600',
    },
    segmentedControl: {
      marginLeft: 10,
      width: 140,
    },
  });
};

export default getStyleObj;
