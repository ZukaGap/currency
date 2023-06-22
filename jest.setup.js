/* eslint-disable no-undef */
import mockRNDeviceInfo from 'react-native-device-info/jest/react-native-device-info-mock';
// import mockSafeAreaContext from 'react-native-safe-area-context/jest/mock';
import 'react-native-gesture-handler/jestSetup';
// import {RecoilRoot} from 'recoil';
// import {renderHook} from '@testing-library/react-hooks';
import '@react-navigation/native';
// import axios from 'axios';
import 'react-native-gesture-handler/jestSetup';

const mockedNavigation = jest.fn();
jest.mock('@react-navigation/native', () => {
  return {
    useNavigation: () => ({
      navigate: mockedNavigation,
    }),
  };
});
jest.mock('react-native-device-info', () => mockRNDeviceInfo);
jest.mock('@react-native-async-storage/async-storage', () =>
  require('@react-native-async-storage/async-storage/jest/async-storage-mock'),
);
// jest.mock('react-native-safe-area-context', () => mockSafeAreaContext);

jest.mock('react-native-gesture-handler', () => {
  const {NativeViewGestureHandler} = jest.requireActual(
    'react-native-gesture-handler',
  );

  return {
    ...NativeViewGestureHandler,
    Directions: {},
  };
});

// global.renderRecoilHook = callback => {
//   const {result} = renderHook(callback, {wrapper: RecoilRoot});
//   return result.current;
// };

jest.mock('@react-navigation/stack', () => ({
  createStackNavigator: jest.fn().mockReturnValue({
    Navigator: jest.fn().mockReturnValue(null),
    Screen: jest.fn().mockReturnValue(null),
  }),
}));

jest.mock('@react-navigation/native-stack', () => ({
  createNativeStackNavigator: jest.fn().mockReturnValue({
    Navigator: jest.fn().mockReturnValue(null),
    Screen: jest.fn().mockReturnValue(null),
  }),
}));

// jest.mock('axios');

// // Define the default mock implementation for Axios
// axios.create.mockReturnValue({
//   get: jest.fn(() => Promise.resolve({data: {}})),
//   post: jest.fn(() => Promise.resolve({data: {}})),
//   // Add more methods as needed for your tests
// });

jest.mock('react-native-graph', () => ({
  // Mock the specific methods or components you need
  // For example:
  LineGraph: 'LineGraph',
  createLineGraph: jest.fn(),
}));

jest.mock('react-native-gesture-handler', () => {
  const View = require('react-native/Libraries/Components/View/View');
  return {
    Swipeable: View,
    DrawerLayout: View,
    State: {},
    ScrollView: View,
    Slider: View,
    Switch: View,
    TextInput: View,
    ToolbarAndroid: View,
    ViewPagerAndroid: View,
    DrawerLayoutAndroid: View,
    WebView: View,
    NativeViewGestureHandler: View,
    TapGestureHandler: View,
    FlingGestureHandler: View,
    ForceTouchGestureHandler: View,
    LongPressGestureHandler: View,
    PanGestureHandler: View,
    PinchGestureHandler: View,
    RotationGestureHandler: View,
    /* Buttons */
    RawButton: View,
    BaseButton: View,
    RectButton: View,
    BorderlessButton: View,
    /* Other */
    FlatList: View,
    gestureHandlerRootHOC: jest.fn(component => component),
    GestureHandlerRootView: View,
    Directions: {},
  };
});

jest.mock('react-native-reanimated', () =>
  require('react-native-reanimated/mock'),
);
