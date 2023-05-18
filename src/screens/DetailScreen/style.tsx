import {Platform, StyleSheet} from 'react-native';
import {EdgeInsets} from 'react-native-safe-area-context';
import {colors} from 'styles/colors';
import {fonts} from 'styles/fonts';
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
    subTitle: {
      fontSize: sizes.h5,
      fontFamily: fonts.MontserratSemiBold,
      color: colors.black,
      marginLeft: sizes.m,
      marginTop: sizes.lx,
      marginBottom: sizes.s,
    },
    chartST: {
      marginVertical: 8,
      borderRadius: sizes.s,
    },
  });
};

export default getStyleObj;
