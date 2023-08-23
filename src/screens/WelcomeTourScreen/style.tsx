import {Dimensions, Platform, StyleSheet} from 'react-native';
import {colors} from 'styles/colors';
import {fonts} from 'styles/fonts';
import {sizes} from 'styles/sizes';

const BANNER_HEIGHT = height * 0.4629;

const {width, height} = Dimensions.get('window');

const getStyleObj = ({insets}) => {
  return StyleSheet.create({
    safeAreaWrapper: {
      flex: 1,
      backgroundColor: colors.purple01,
      ...Platform.select({
        android: {paddingTop: insets.top},
        default: {},
      }),
      justifyContent: 'flex-start',
      alignItems: 'flex-start',
    },
    logoWrapper: {
      marginHorizontal: 16,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      width: width - 32,
    },
    container: {
      // flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    itemContainer: {
      flex: 1,
      justifyContent: 'flex-start',
      alignItems: 'center',
    },
    image: {
      flex: 0.5,
      justifyContent: 'center',
    },
    linearGradient: {
      justifyContent: 'center',
      alignItems: 'center',
      width,
      height: BANNER_HEIGHT,
    },
    dot: {
      height: 5,
      borderRadius: 5,
      backgroundColor: colors.green,
      marginHorizontal: 8,
    },
    pg: {
      alignSelf: 'center',
      position: 'absolute',
      top: BANNER_HEIGHT - 9,
    },
    row: {flexDirection: 'row'},
    info: {
      width,
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 80,
      paddingHorizontal: 16,
    },
    text: {
      fontWeight: '400',
      fontsize: sizes.h1,
      color: '#919EAB',
      paddingHorizontal: 32,
      textAlign: 'center',
      marginTop: 17,
      fontFamily: fonts.MontserratRegular,
    },
    center: {
      flexDirection: 'column',
      justifyContent: 'flex-start',
      alignItems: 'center',
    },
    title: {
      fontFamily: fonts.MontserratMedium,
      color: colors.purple,
      fontSize: sizes.h2,
      textAlign: 'center',
    },
    description: {
      fontFamily: fonts.MontserratRegular,
      color: colors.purple,
      fontSize: sizes.h4,
      textAlign: 'center',
      marginTop: 38,
    },
    buttonWrapper: {
      marginTop: height * 0.1925,
      alignItems: 'center',
      justifyContent: 'center',
    },
    mainContainer: {
      marginTop: 16,
      flex: 1,
    },
    banner: {
      width: width - 16,
      height: height / 3,
      justifyContent: 'center',
      alignItems: 'center',
    },
    nextButtonWrapper: {
      width: '100%',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingHorizontal: 34,
      ...Platform.select({
        android: {
          marginBottom: 32,
        },
      }),
    },
    nextButton: {
      position: 'absolute',
    },
    centerWrapper: {
      justifyContent: 'center',
      alignItems: 'center',
    },
    indicator: {
      height: 2.5,
      width: 10,
      backgroundColor: colors.purple,
      marginHorizontal: 3,
      borderRadius: 2,
    },
    skip: {
      color: colors.white,
      letterSpacing: 2,
      textTransform: 'uppercase',
      fontFamily: fonts.MontserratRegular,
    },
  });
};

export default getStyleObj;
