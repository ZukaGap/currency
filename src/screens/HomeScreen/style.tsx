import {Dimensions, Platform, StyleSheet} from 'react-native';
import {EdgeInsets} from 'react-native-safe-area-context';
import {colors} from 'styles/colors';
import {fonts} from 'styles/fonts';
import {sizes} from 'styles/sizes';

const {width, height} = Dimensions.get('window');

const getStyleObj = (insets: EdgeInsets) => {
  return StyleSheet.create({
    safeAreaWrapper: {
      flex: 1,
      backgroundColor: '#ffffff',
      paddingHorizontal: 16,
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
      backgroundColor: 'rgba(255,255,255,0.9)',
      justifyContent: 'center',
      width: width,
    },
  });
};

export default getStyleObj;
