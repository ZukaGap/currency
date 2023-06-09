import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {CardStyleInterpolators} from '@react-navigation/stack';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import HomeScreen from 'screens/HomeScreen';
import CalculatorScreen from 'screens/CalculatorScreen';
import FuelInfoScreen from 'screens/FuelInfoScreen';

import {colors} from 'styles/colors';
import {DetailScreen} from 'screens/DetailScreen';

const {Navigator, Screen} = createNativeStackNavigator();

const Routes: React.FC = () => {
  return (
    <NavigationContainer>
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
    </NavigationContainer>
  );
};

export default Routes;
