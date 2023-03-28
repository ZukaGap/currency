import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import HomeStack from './HomeStack';
import HistoryStack from './HistoryStack';
import SettingsStack from './SettingsStack';

import {Home, Setting, Swap} from 'assets/SVG';
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
        name="historyStack"
        component={HistoryStack}
        options={{
          tabBarLabel: 'History',
          unmountOnBlur: true,
          headerShown: false,
          tabBarIcon: ({color, size}) => <Swap width={size} fill={color} />,
        }}
      />
      <Screen
        name="settingsStack"
        component={SettingsStack}
        options={{
          tabBarLabel: 'Settings',
          unmountOnBlur: true,
          headerShown: false,
          tabBarIcon: ({color, size}) => <Setting width={size} fill={color} />,
        }}
      />
    </Navigator>
  );
}
