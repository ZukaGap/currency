import {Dimensions, StyleSheet} from 'react-native';
import {
  horizontalScale,
  moderateScale,
  verticalScale,
} from 'replacers/scalling';

import {colors} from 'styles/colors';
import {fonts} from 'styles/fonts';
import {sizes} from 'styles/sizes';

const {width, height} = Dimensions.get('screen');

const getStyleObj = ({}) => {
  return StyleSheet.create({
    container: {
      width: width,
      height: height,
      backgroundColor: 'transparent',
    },
    drawerWrapper: {
      backgroundColor: colors.purple03,
      position: 'absolute',
      top: 0,
      left: 0,
      width: width,
      height: height,
    },
    root: {
      backgroundColor: colors.purple01,
      width: width,
      height: height,
    },
    drawerContent: {
      marginTop: verticalScale(44),
      width: '40%',
      justifyContent: 'center',
    },
    screensWrapper: {
      marginTop: verticalScale(44),
      marginLeft: horizontalScale(sizes.lx),
    },
    screensTitle: {
      textAlign: 'left',
      fontSize: moderateScale(sizes.h4),
      color: colors.purple,
    },
    screenBTN: {
      paddingVertical: verticalScale(sizes.m),
      paddingHorizontal: horizontalScale(sizes.lx),
      borderRadius: moderateScale(sizes.s),
    },
    screenBTNActive: {
      backgroundColor: colors.purple,
    },
    screensTitleActive: {
      color: colors.purple01,
    },
    name: {
      marginVertical: 16,
      marginHorizontal: 16,
      color: colors.purple00,
      fontSize: sizes.h1,
      letterSpacing: 3,
      fontFamily: fonts.MontserratRegular,
    },
  });
};

export default getStyleObj;
