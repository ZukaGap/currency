import {Platform, StyleSheet} from 'react-native';
import {EdgeInsets} from 'react-native-safe-area-context';
import {colors} from 'styles/colors';
import {fonts} from 'styles/fonts';
import {sizes} from 'styles/sizes';
import {moderateScale, verticalScale} from 'utils/scalling';

const getStyleObj = (insets: EdgeInsets) => {
  return StyleSheet.create({
    safeAreaWrapper: {
      flex: 1,
      backgroundColor: colors.grey00,
      paddingHorizontal: 16,
      ...Platform.select({
        android: {
          paddingTop: insets.top + sizes.m,
          paddingBottom: insets.bottom,
        },
        ios: {paddingTop: insets.top + sizes.m, paddingBottom: insets.bottom},
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
    send: {
      backgroundColor: colors.purple03,
      paddingHorizontal: sizes.lx,
      paddingVertical: sizes.lxx,
      borderTopLeftRadius: sizes.m,
      borderTopRightRadius: sizes.m,
    },
    receive: {
      backgroundColor: colors.green,
      paddingHorizontal: sizes.lx,
      paddingVertical: sizes.lxx,
      borderBottomLeftRadius: sizes.m,
      borderBottomRightRadius: sizes.m,
    },
    swap: {
      backgroundColor: colors.purple03,
      position: 'absolute',
      borderRadius: sizes.ilxx,
      padding: sizes.xs,
      overflow: 'hidden',
      alignSelf: 'center',
      zIndex: 100,
    },
    swapFirst: {
      position: 'absolute',
      backgroundColor: colors.green,
      height: sizes.im / 2 + sizes.xs,
      width: sizes.im + sizes.xs * 2,
    },
    center: {justifyContent: 'center'},
    inputView: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      width: '100%',
    },
    dropDown: {
      flexDirection: 'row',
      alignItems: 'center',
      maxWidth: '45%',
    },
    input: {
      alignSelf: 'stretch',
      padding: sizes.xs,
      borderBottomColor: colors.black,
      borderBottomWidth: 1,
      maxWidth: '45%',
      fontSize: sizes.h3,
    },
    currencyName: {
      marginRight: sizes.xs,
      fontFamily: fonts.MontserratMedium,
      fontSize: sizes.h5,
    },
    title: {
      fontFamily: fonts.MontserratRegular,
      fontSize: sizes.h3,
    },
    doneBTN: {
      color: colors.blue,
      paddingHorizontal: sizes.m,
      paddingVertical: sizes.s,
      fontSize: sizes.h4,
      fontFamily: fonts.MontserratRegular,
      textAlign: 'right',
    },
    sheetButton: {
      flexDirection: 'row',
      marginVertical: verticalScale(sizes.xs),
      padding: moderateScale(sizes.m),
    },
    sheetButtonText: {
      fontSize: moderateScale(sizes.h5),
      color: colors.black,
    },
  });
};

export default getStyleObj;
