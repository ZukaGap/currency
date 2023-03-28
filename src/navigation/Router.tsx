import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {CardStyleInterpolators} from '@react-navigation/stack';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import MainStack from './MainTabStack/MainStack';

const {Navigator, Screen} = createNativeStackNavigator();

// const config = {
//   animation: 'spring',
//   config: {
//     stiffness: 1000,
//     damping: 500,
//     mass: 3,
//     overshootClamping: true,
//     restDisplacementThreshold: 0.01,
//     restSpeedThreshold: 0.01,
//   },
// };

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
          headerStyle: {
            // backgroundColor: colors.white,
          },
          // headerTintColor: colors.default,
          headerTitleStyle: {
            // fontFamily: fonts.MetropolisRegular,
            fontSize: 16,
          },
          headerBackButtonMenuEnabled: false,
        })}
        // options={{
        //   transitionSpec: {
        //     open: config,
        //     close: config,
        //   },
        // }}
        initialRouteName={'mainStack'}>
        <Screen
          name="mainStack"
          component={MainStack}
          options={{
            headerShown: false,
          }}
        />
      </Navigator>
    </NavigationContainer>
  );
};

export default Routes;
