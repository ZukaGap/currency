import {Platform, StyleSheet} from 'react-native';
import {EdgeInsets} from 'react-native-safe-area-context';
import {colors} from 'styles/colors';
import {sizes} from 'styles/sizes';

const getStyleObj = (insets: EdgeInsets) => {
  return StyleSheet.create({
    safeAreaWrapper: {
      flex: 1,
      backgroundColor: colors.white,
      paddingHorizontal: 16,
      ...Platform.select({
        android: {
          paddingTop: sizes.m * 6,
          paddingBottom: insets.bottom,
        },
        ios: {paddingTop: insets.top + sizes.m},
        default: {},
      }),
    },
  });
};

export default getStyleObj;
