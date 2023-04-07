import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import HomeStack from './HomeStack';
import ConverterStack from './ConverterStack';
// import SettingsStack from './SettingsStack';

import {Home, Swap} from 'assets/SVG';
import {colors} from '../../styles/colors';

const {Navigator, Screen} = createBottomTabNavigator();

export default function MainStack() {
  return (
    <Navigator
      // tabBar={props => <TabBar {...props} />}
      screenOptions={{
        tabBarActiveTintColor: colors.active,
        tabBarInactiveTintColor: colors.purple02,
        unmountOnBlur: true,
        freezeOnBlur: true,
      }}
      initialRouteName="homeStack">
      <Screen
        name="homeStack"
        component={HomeStack}
        options={{
          tabBarLabel: 'Home',
          unmountOnBlur: true,
          headerShown: false,
          tabBarIcon: ({color, size}) => <Home width={size} fill={color} />,
        }}
      />
      <Screen
        name="converterStack"
        component={ConverterStack}
        options={{
          tabBarLabel: 'Converter',
          unmountOnBlur: true,
          headerShown: false,
          tabBarIcon: ({color, size}) => <Swap width={size} fill={color} />,
        }}
      />
      {/* <Screen
        name="settingsStack"
        component={SettingsStack}
        options={{
          tabBarLabel: 'Settings',
          unmountOnBlur: true,
          headerShown: false,
          tabBarIcon: ({color, size}) => <Setting width={size} fill={color} />,
        }}
      /> */}
    </Navigator>
  );
}
