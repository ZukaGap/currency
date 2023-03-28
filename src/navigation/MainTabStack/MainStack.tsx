import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import HomeStack from './HomeStack';
import HistoryStack from './HistoryStack';
import SettingsStack from './SettingsStack';

const {Navigator, Screen} = createBottomTabNavigator();

export default function MainStack() {
  return (
    <Navigator
      // tabBar={props => <TabBar {...props} />}
      initialRouteName="homeStack">
      <Screen
        name="homeStack"
        component={HomeStack}
        options={{
          tabBarLabel: 'Home',
          unmountOnBlur: true,
          headerShown: false,
        }}
      />
      <Screen
        name="historyStack"
        component={HistoryStack}
        options={{
          tabBarLabel: 'History',
          unmountOnBlur: true,
          headerShown: false,
        }}
      />
      <Screen
        name="settingsStack"
        component={SettingsStack}
        options={{
          tabBarLabel: 'Settings',
          unmountOnBlur: true,
          headerShown: false,
        }}
      />
    </Navigator>
  );
}
