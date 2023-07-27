import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import HomeScreen from 'screens/HomeScreen';
import ConverterScreen from 'screens/ConverterScreen';

import {Home, Swap} from 'assets/SVG';
import {colors} from 'styles/colors';

const {Navigator, Screen} = createBottomTabNavigator();

const Routes: React.FC = () => {
  return (
    <NavigationContainer>
      <Navigator
        screenOptions={{
          tabBarActiveTintColor: colors.active,
          tabBarInactiveTintColor: colors.purple02,
          unmountOnBlur: true,
          freezeOnBlur: true,
          tabBarShowLabel: false,
        }}
        initialRouteName="homeScreen">
        <Screen
          name="homeScreen"
          component={HomeScreen}
          options={{
            //tabBarLabel: 'Home',
            unmountOnBlur: true,
            headerShown: false,
            tabBarIcon: ({color, size}) => <Home width={size} fill={color} />,
          }}
        />
        <Screen
          name="converterScreen"
          component={ConverterScreen}
          options={{
            //tabBarLabel: 'Converter',
            unmountOnBlur: true,
            headerShown: false,
            tabBarIcon: ({color, size}) => <Swap width={size} fill={color} />,
          }}
        />
      </Navigator>
    </NavigationContainer>
  );
};

export default Routes;
