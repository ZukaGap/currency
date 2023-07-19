import {Platform, StyleSheet} from 'react-native';
import {EdgeInsets} from 'react-native-safe-area-context';

const getStyleObj = (insets: EdgeInsets) => {
  return StyleSheet.create({
    safeAreaWrapper: {
      flex: 1,
      ...Platform.select({
        android: {paddingTop: insets.top, paddingBottom: insets.bottom},
        default: {},
      }),
    },
  });
};

export default getStyleObj;
