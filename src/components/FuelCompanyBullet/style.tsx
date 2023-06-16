import {StyleSheet} from 'react-native';
import {fonts} from 'styles/fonts';
import {sizes} from 'styles/sizes';
import {colors} from 'styles/colors';
import {generateBoxShadowStyle} from 'utils/generateBoxShadow';

const getStyleObj = () => {
  return StyleSheet.create({
    bulletContainer: {
      marginBottom: 8,
      borderRadius: sizes.m,
      paddingHorizontal: sizes.m,
      paddingVertical: sizes.xs,
      flex: 1,
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
      color: colors.green,
    },
    red: {
      color: colors.red,
    },
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      width: '100%',
    },
    title: {
      fontFamily: fonts.MontserratMedium,
      fontSize: sizes.h1,
      color: colors.white,
      textAlign: 'center',
      marginLeft: 16,
    },
    list: {
      marginVertical: 16,
      marginHorizontal: 16,
    },
    priceBullet: {
      marginVertical: 4,
      marginHorizontal: 8,
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    fuelName: {
      color: colors.white,
      fontFamily: fonts.MontserratRegular,
      fontSize: sizes.h4,
      alignSelf: 'flex-start',
    },
    price: {
      color: colors.white,
      fontFamily: fonts.MontserratRegular,
      fontSize: sizes.h4,
      alignSelf: 'flex-end',
    },
  });
};

export default getStyleObj;
