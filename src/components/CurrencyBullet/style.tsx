import {StyleSheet} from 'react-native';
import {fonts} from 'styles/fonts';
import {sizes} from 'styles/sizes';
import {colors} from 'styles/colors';

const getStyleObj = () => {
  return StyleSheet.create({
    bulletContainer: {
      marginBottom: 8,
      backgroundColor: colors.grey00,
      borderRadius: sizes.m,
      paddingHorizontal: sizes.m,
      paddingVertical: sizes.xs,
    },
    title: {
      fontFamily: fonts.MontserratRegular,
      fontSize: sizes.h6,
      color: colors.black,
    },
    lightTitle: {
      fontFamily: fonts.MontserratSemiBold,
      fontSize: sizes.h1,
      color: colors.purple03,
    },
    col: {
      flexDirection: 'column',
      justifyContent: 'center',
      marginLeft: sizes.s,
    },
    row: {
      flexDirection: 'row',
    },
    end: {
      alignItems: 'flex-end',
    },
    green: {
      color: colors.Green500,
    },
    red: {
      color: colors.Red600,
    },
  });
};

export default getStyleObj;
