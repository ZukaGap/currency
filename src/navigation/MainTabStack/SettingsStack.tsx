import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import SettingsScreen from '../../screens/SettingsScreen';

const {Navigator, Screen} = createNativeStackNavigator();

const SettingsStack: React.FC = () => (
  <Navigator
    screenOptions={{
      headerShown: false,
    }}
    initialRouteName="settingsScreen">
    <Screen name="settingsScreen" component={SettingsScreen} />
  </Navigator>
);

export default SettingsStack;
