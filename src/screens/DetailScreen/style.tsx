import {Platform, StyleSheet} from 'react-native';
import {EdgeInsets} from 'react-native-safe-area-context';
import {
  horizontalScale,
  moderateScale,
  verticalScale,
} from 'replacers/scalling';

import {colors} from 'styles/colors';
import {fonts} from 'styles/fonts';
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
    value: {
      fontFamily: fonts.MontserratRegular,
      fontSize: moderateScale(sizes.h6),
      color: colors.purple00,
      marginTop: verticalScale(sizes.xs),
    },
    rate: {
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
    },
    rateValue: {
      fontFamily: fonts.MontserratRegular,
      fontSize: moderateScale(sizes.il),
      color: colors.white,
    },
    rateDifference: {
      fontFamily: fonts.MontserratRegular,
      fontSize: moderateScale(sizes.is),
      color: colors.purple03,
    },
    graph: {
      alignSelf: 'center',
      width: '90%',
      aspectRatio: 1.2,
      marginVertical: 20,
      transform: [{scaleX: -1}],
    },
    labelContainer: {
      justifyContent: 'center',
      alignItems: 'center',
      paddingVertical: 40,
    },
    valueLabel: {
      fontFamily: fonts.MontserratRegular,
      fontSize: moderateScale(sizes.h1),
      color: colors.purple,
      transform: [{scaleX: 1}],
    },
    dateLabel: {
      fontFamily: fonts.MontserratRegular,
      fontSize: moderateScale(sizes.h1),
      color: colors.purple,
      transform: [{scaleX: 1}],
      marginTop: 4,
    },
    bottomPad: {paddingBottom: 600},
    wrapper: {
      borderTopEndRadius: 32,
      borderTopStartRadius: 32,
      ...generateBoxShadowStyle(
        0,
        -3,
        colors.Purple600,
        0.3,
        3.05,
        4,
        '#7e3af24D',
      ),
      overflow: 'hidden',
    },
    flatList: {
      paddingTop: 8,
      backgroundColor: colors.purple03,
      borderTopEndRadius: 32,
      borderTopStartRadius: 32,
    },
    customStyle: {backgroundColor: colors.transparent},
    customTitle: {color: colors.white},
  });
};

export default getStyleObj;
