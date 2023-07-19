import {StyleSheet} from 'react-native';
import {colors} from '../../styles/colors';

const getStyleObj = () => {
  return StyleSheet.create({
    mainContainer: {
      height: 60,
      padding: 8,
      borderRadius: 8,
      borderWidth: 0.5,
      borderColor: colors.grey,
      margin: 8,
      flexDirection: 'row',
      //overflow: 'hidden',
      //shadow
      // elevation: 4,
      backgroundColor: colors.white,
      // shadowColor: 'black',
      // shadowOpacity: 0.15,
      // shadowOffset: {width: 0, height: 2},
      // shadowRadius: 8,
      // overflow: Platform.OS === 'android' ? 'hidden' : 'visible',
    },
    flagContainer: {
      marginHorizontal: 4,
      //height: 'auto',
      width: 30,
      //backgroundColor: "red",
      alignItems: 'center',
      justifyContent: 'center',
      //borderRadius: 16,
      overflow: 'hidden',
    },
    diffContainer: {
      //flex: 1,
      alignItems: 'flex-end',
      justifyContent: 'center',
      marginHorizontal: 4,
    },
    infoContainer: {
      flex: 1,
      justifyContent: 'center',
    },
    rateText: {
      textAlign: 'center',
      color: colors.black,
    },
  });
};

export default getStyleObj;
