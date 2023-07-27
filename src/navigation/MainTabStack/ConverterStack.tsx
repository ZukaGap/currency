import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import ConverterScreen from 'screens/ConverterScreen';

const {Navigator, Screen} = createNativeStackNavigator();

const ConverterStack: React.FC = () => (
  <Navigator
    screenOptions={{
      headerShown: false,
    }}
    initialRouteName="converterScreen">
    <Screen name="converterScreen" component={ConverterScreen} />
  </Navigator>
);

export default ConverterStack;
