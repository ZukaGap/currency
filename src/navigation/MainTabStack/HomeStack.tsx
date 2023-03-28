import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import HomeScreen from '../../screens/HomeScreen';

const {Navigator, Screen} = createNativeStackNavigator();

const HomeStack: React.FC = () => (
  <Navigator
    screenOptions={{
      headerShown: false,
    }}
    initialRouteName="homeScreen">
    <Screen name="homeScreen" component={HomeScreen} />
  </Navigator>
);

export default HomeStack;
