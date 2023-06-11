import {StyleSheet} from 'react-native';
import {moderateScale} from 'replacers/scalling';
import {colors} from 'styles/colors';
import {fonts} from 'styles/fonts';

import {sizes} from 'styles/sizes';
import {generateBoxShadowStyle} from 'utils/generateBoxShadow';

const getStyleObj = ({}) => {
  return StyleSheet.create({
    mainContainer: {
      flexDirection: 'row',
      backgroundColor: colors.purple03,
      borderRadius: moderateScale(sizes.s),
      width: '100%',
      padding: moderateScale(sizes.xs),
      ...generateBoxShadowStyle(
        0,
        2,
        colors.Purple600,
        0.17,
        2.54,
        3,
        '#7e3af22B',
      ),
    },
    activeButton: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      padding: moderateScale(sizes.s),
      backgroundColor: colors.white,
      borderRadius: moderateScale(sizes.m),
      ...generateBoxShadowStyle(0, 0, colors.purple03, 0.16, 4, 4, '#919EAB29'),
    },
    inactiveButton: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      padding: moderateScale(sizes.s),
    },
    activeText: {
      fontSize: moderateScale(sizes.h4),
      textAlign: 'center',
      fontFamily: fonts.MontserratRegular,
      color: colors.purple,
    },
    inactiveText: {
      fontSize: moderateScale(sizes.h4),
      textAlign: 'center',
      fontFamily: fonts.MontserratRegular,
      color: colors.white,
    },
    focus: {
      position: 'absolute',
      top: moderateScale(sizes.xs),
      backgroundColor: colors.purple00,
      borderRadius: moderateScale(sizes.s),
    },
  });
};

export default getStyleObj;
