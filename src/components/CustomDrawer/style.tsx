import {StyleSheet} from 'react-native';
import {colors} from 'styles/colors';
import {fonts} from 'styles/fonts';
import {sizes} from 'styles/sizes';

const getStyleObj = insets => {
  return StyleSheet.create({
    main: {
      flex: 1,
      backgroundColor: colors.purple,
      marginTop: insets.top,
      borderTopStartRadius: 32,
      overflow: 'hidden',
      zIndex: 1,
      elevation: 1,
    },
    contentContainerStyle: {
      backgroundColor: colors.purple,
    },
    userName: {
      color: colors.purple01,
      fontSize: sizes.h1,
      marginBottom: 5,
      textAlign: 'center',
      fontFamily: fonts.MontserratBold,
    },
    drawerContainer: {marginTop: sizes.lxx},
    footer: {
      padding: sizes.lxx,
      borderTopWidth: 1,
      borderTopColor: colors.purple01,
      marginHorizontal: 16,
      marginTop: 64,
    },
    logoutBTN: {paddingVertical: sizes.m},
    logoutT: {
      color: colors.purple01,
      fontSize: sizes.h3,
      fontFamily: fonts.MontserratRegular,
    },
  });
};

export default getStyleObj;
