import {Platform, StyleSheet} from 'react-native';
import {EdgeInsets} from 'react-native-safe-area-context';
import {sizes} from 'styles/sizes';

const getStyleObj = (insets: EdgeInsets) => {
  return StyleSheet.create({
    safeAreaWrapper: {
      flex: 1,
      backgroundColor: '#ffffff',
      paddingHorizontal: 16,
      ...Platform.select({
        android: {paddingTop: insets.top, paddingBottom: insets.bottom},
        ios: {paddingTop: insets.top, paddingBottom: insets.bottom},
        default: {},
      }),
    },
    wrapper: {
      flexDirection: 'row',
      alignItems: 'center',
    },

    drawerBTN: {
      marginRight: sizes.s,
    },
  });
};

export default getStyleObj;
