import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import HistoryScreen from '../../screens/HistoryScreen';

const {Navigator, Screen} = createNativeStackNavigator();

const HistoryStack: React.FC = () => (
  <Navigator
    screenOptions={{
      headerShown: false,
    }}
    initialRouteName="historyScreen">
    <Screen name="historyScreen" component={HistoryScreen} />
  </Navigator>
);

export default HistoryStack;
