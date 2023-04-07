import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {CardStyleInterpolators} from '@react-navigation/stack';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import HomeScreen from '../screens/HomeScreen';

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
      </Navigator>
    </NavigationContainer>
  );
};

export default Routes;
