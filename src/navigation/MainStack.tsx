import React from 'react';
import {CardStyleInterpolators} from '@react-navigation/stack';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import HomeScreen from 'screens/HomeScreen';
import CalculatorScreen from 'screens/CalculatorScreen';
import FuelInfoScreen from 'screens/FuelInfoScreen';
import {DetailScreen} from 'screens/DetailScreen';

import {colors} from 'styles/colors';

const {Navigator, Screen} = createNativeStackNavigator();

const MainStack: React.FC = () => {
  return (
    <Navigator
      screenOptions={() => ({
        gestureEnabled: true,
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        headerShown: true,
        headerTransparent: true,
        headerBackTitleVisible: false,
        headerStyle: {},
        headerTitleStyle: {
          fontSize: 16,
        },
        headerBackButtonMenuEnabled: false,
      })}
      initialRouteName={'homeScreen'}>
      <Screen
        name="homeScreen"
        component={HomeScreen}
        options={{
          headerShown: false,
        }}
      />
      <Screen
        name="detailScreen"
        component={DetailScreen}
        options={{
          headerShown: true,
          title: '',
          headerTitleAlign: 'center',
          headerTitleStyle: {color: colors.purple},
        }}
      />
      <Screen
        name="calculatorScreen"
        component={CalculatorScreen}
        options={{
          headerShown: true,
          title: 'Convert',
          headerTitleAlign: 'center',
          headerTitleStyle: {color: colors.purple},
        }}
      />
      <Screen
        name="fuelInfoScreen"
        component={FuelInfoScreen}
        options={{
          headerShown: true,
          title: '',
          headerTitleAlign: 'center',
          headerTitleStyle: {color: colors.purple},
        }}
      />
    </Navigator>
  );
};

export default MainStack;
