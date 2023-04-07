import {StyleSheet} from 'react-native';
import {fonts} from '../../styles/fonts';
import {sizes} from '../../styles/sizes';
import {colors} from '../../styles/colors';

const getStyleObj = () => {
  return StyleSheet.create({
    headerWrapper: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    title: {
      fontFamily: fonts.MontserratBold,
      fontSize: sizes.h1,
      color: colors.purple,
    },
    lightTitle: {
      fontFamily: fonts.MontserratSemiBold,
      fontSize: sizes.h1,
      color: colors.purple03,
    },
  });
};

export default getStyleObj;
