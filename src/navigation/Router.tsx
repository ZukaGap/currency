import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {CardStyleInterpolators} from '@react-navigation/stack';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import HomeScreen from 'screens/HomeScreen';
import CalculatorScreen from 'screens/CalculatorScreen';
import FuelInfoScreen from 'screens/FuelInfoScreen';
import DetailScreen from 'screens/DetailScreen';
import SettingsScreen from 'screens/SettingsScreen';
import WelcomeTourScreen from 'screens/WelcomeTourScreen';

import {colors} from 'styles/colors';
import {getFromStorage} from 'utils/asyncStorage';
import {INTRODUCTION_PASSED} from 'constants/storage';

const {Navigator, Screen} = createNativeStackNavigator();

const Routes: React.FC = () => {
  const [isPassed, setIsPassed] = useState(true);
  const isIntroductonPassed = useCallback(async () => {
    const resp = await getFromStorage(INTRODUCTION_PASSED);
    setIsPassed(resp === 'true' ? true : false);
  }, []);

  useEffect(() => {
    isIntroductonPassed();
  }, []);

  useEffect(() => {
    console.log(isPassed);
  }, [isPassed]);

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
        })}>
        {!isPassed && (
          <Screen
            name="welcomeTourScreen"
            component={WelcomeTourScreen}
            options={{
              headerShown: false,
            }}
          />
        )}
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
            // presentation: 'formSheet',
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
            headerShown: false,
            title: '',
            headerTitleAlign: 'center',
            headerTitleStyle: {color: colors.purple},
          }}
        />
        <Screen
          name="settingsScreen"
          component={SettingsScreen}
          options={{
            headerShown: false,
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
