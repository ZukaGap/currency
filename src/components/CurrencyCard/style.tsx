import {StyleSheet, Platform} from 'react-native';

const getStyleObj = () => {
  return StyleSheet.create({
    mainContainer: {
      height: 60,
      padding: 8,
      borderRadius: 8,
      //borderWidth: 1,
      margin: 8,
      flexDirection: 'row',
      //overflow: 'hidden',
      //shadow
      elevation: 4,
      backgroundColor: 'white',
      shadowColor: 'black',
      shadowOpacity: 0.25,
      shadowOffset: {width: 0, height: 2},
      shadowRadius: 8,
      overflow: Platform.OS === 'android' ? 'hidden' : 'visible',
    },
    flagContainer: {
      height: '100%',
      width: 40,
      //backgroundColor: "red",
      alignItems: 'center',
      justifyContent: 'center',
    },
    diffContainer: {
      flex: 1,
      alignItems: 'flex-end',
      justifyContent: 'center',
    },
    infoContainer: {
      flex: 1,
      justifyContent: 'center',
    },
    rateText: {
      textAlign: 'center',
    },
  });
};

export default getStyleObj;
