import {Platform, StyleSheet} from 'react-native';
import {EdgeInsets} from 'react-native-safe-area-context';
import {horizontalScale, moderateScale, verticalScale} from 'utils/scalling';

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
    chartST: {
      marginVertical: 8,
      borderRadius: sizes.s,
    },
    infoCard: {
      backgroundColor: colors.purple03,
      borderRadius: moderateScale(sizes.s),
      paddingVertical: verticalScale(sizes.s),
      paddingHorizontal: horizontalScale(sizes.s),
      marginBottom: verticalScale(sizes.s),
    },
    label: {
      fontFamily: fonts.MontserratRegular,
      fontSize: moderateScale(sizes.h5),
      color: colors.purple00,
      transform: [{scaleX: 1}],
    },
    value: {
      fontFamily: fonts.MontserratRegular,
      fontSize: moderateScale(sizes.h6),
      color: colors.purple00,
      marginTop: verticalScale(sizes.xs),
    },
  });
};

export default getStyleObj;
