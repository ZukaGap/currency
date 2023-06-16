import {StyleSheet} from 'react-native';
import {fonts} from '../../styles/fonts';
import {sizes} from '../../styles/sizes';
import {colors} from '../../styles/colors';

const getStyleObj = () => {
  return StyleSheet.create({
    headerWrapper: {marginBottom: 8},
    row: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    col: {
      flexDirection: 'column',
      justifyContent: 'space-between',
      // alignItems: 'center',
    },
    title: {
      fontFamily: fonts.MontserratBold,
      fontSize: sizes.h1,
      color: colors.purple,
      marginRight: sizes.xxs,
      marginLeft: sizes.s,
    },
    lightTitle: {
      fontFamily: fonts.MontserratSemiBold,
      fontSize: sizes.h1,
      color: colors.purple03,
    },
    mrR8: {
      marginRight: sizes.s,
    },
    titleContainer: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
    },
  });
};

export default getStyleObj;
