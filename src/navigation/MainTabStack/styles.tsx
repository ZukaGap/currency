import {Dimensions, StyleSheet} from 'react-native';

const {width} = Dimensions.get('window');

const styles = StyleSheet.create({
  tabContainer: {
    backgroundColor: 'transparent',
    position: 'absolute',
    bottom: 0,
    width: width,
    alignItems: 'center',
  },
  tabWrapper: {
    height: 65,
    width: width - 40,
    justifyContent: 'space-between',
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginBottom: 15,
    borderRadius: 50,
    shadowColor: 'rgba(0, 0, 0, 0.15)',
    shadowOffset: {
      width: 0,
      height: 15,
    },
    shadowOpacity: 2,
    shadowRadius: 15,
    elevation: 8,
  },
  tabImg: {
    height: 80,
    width: width - 40,
  },
  tabIconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  transparent: {
    backgroundColor: 'transparent',
  },
  shadow: {
    shadowColor: 'rgba(210, 216, 237, 1)',
    shadowOffset: {
      width: 0,
      height: 15,
    },
    shadowOpacity: 2,
    shadowRadius: 10,
    elevation: 8,
  },
  shadow2: {
    shadowColor: 'rgba(210, 216, 237, 1)',
    shadowOffset: {
      width: 0,
      height: 15,
    },
    shadowOpacity: 1,
    shadowRadius: 10,
    elevation: 8,
  },
});

export default styles;
