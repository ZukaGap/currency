import {Dimensions, Platform, StyleSheet} from 'react-native';
import {EdgeInsets} from 'react-native-safe-area-context';
import {colors} from 'styles/colors';
import {fonts} from 'styles/fonts';
import {sizes} from 'styles/sizes';
import {generateBoxShadowStyle} from 'utils/generateBoxShadow';

const {width, height} = Dimensions.get('window');

const getStyleObj = (insets: EdgeInsets) => {
  return StyleSheet.create({
    safeAreaWrapper: {
      flex: 1,
      backgroundColor: colors.purple01,
      // paddingHorizontal: 16,
      ...Platform.select({
        // ios: {paddingTop: insets.top, paddingBottom: insets.bottom},
        // android: {paddingTop: insets.top, paddingBottom: insets.bottom},
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
    header: {
      ...Platform.select({
        ios: {
          paddingTop: insets.top,
          paddingBottom: sizes.m,
        },
        android: {
          paddingVertical: sizes.m,
        },
      }),
      paddingHorizontal: sizes.m,
      backgroundColor: '#DFD5EBBF',
      justifyContent: 'center',
      width: width,
    },
    customStyle: {
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
    customTitle: {color: colors.white},
  });
};

export default getStyleObj;
