import {Platform, StyleSheet} from 'react-native';
import {EdgeInsets} from 'react-native-safe-area-context';
import {moderateScale, verticalScale} from 'replacers/scalling';
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
    bottomPad: {paddingBottom: 100},
    title: {
      fontSize: 16,
      textAlign: 'center',
      color: colors.purple,
    },
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginHorizontal: 24,
      marginBottom: 16,
    },
    sortT: {
      textAlign: 'center',
      marginBottom: verticalScale(sizes.m),
      fontSize: moderateScale(sizes.h4),
      color: colors.purple,
    },
  });
};

export default getStyleObj;
