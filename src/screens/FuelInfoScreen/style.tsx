import {Platform, StyleSheet} from 'react-native';
import {EdgeInsets} from 'react-native-safe-area-context';
import {colors} from 'styles/colors';
import {sizes} from 'styles/sizes';
import {generateBoxShadowStyle} from 'utils/generateBoxShadow';

const getStyleObj = (insets: EdgeInsets) => {
  return StyleSheet.create({
    safeAreaWrapper: {
      flex: 1,
      backgroundColor: colors.purple01,
      // paddingHorizontal: 16,
      ...Platform.select({
        android: {
          paddingTop: sizes.m * 6,
          paddingBottom: insets.bottom,
        },
        ios: {paddingTop: insets.top + sizes.m},
        default: {},
      }),
    },
    customStyle: {
      marginHorizontal: 16,
      backgroundColor: colors.purple01,
      borderWidth: 1,
      borderColor: colors.purple01,
      ...generateBoxShadowStyle(
        0,
        3,
        colors.Purple600,
        0.17,
        3.05,
        4,
        '#7e3af22B',
      ),
    },
    customTitle: {color: colors.white},
  });
};

export default getStyleObj;
