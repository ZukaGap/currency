import {Platform, StyleSheet} from 'react-native';
import {EdgeInsets} from 'react-native-safe-area-context';
import {colors} from 'styles/colors';

const getStyleObj = (insets: EdgeInsets) => {
  return StyleSheet.create({
    safeAreaWrapper: {
      flex: 1,
      backgroundColor: '#ffffff',
      paddingHorizontal: 16,
      ...Platform.select({
        android: {paddingTop: insets.top, paddingBottom: insets.bottom},
        default: {},
      }),
    },
    title: {
      fontSize: 16,
      textAlign: 'center',
      color: colors.purple,
      flex: 1,
    },
    header: {
      flexDirection: 'row',
      justifyContent: 'flex-start',
      alignItems: 'center',
      marginHorizontal: 24,
      marginBottom: 16,
    },
    settingBody: {
      marginHorizontal: 16,
    },
  });
};

export default getStyleObj;
