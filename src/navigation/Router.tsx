import * as React from 'react';
import {
  createDrawerNavigator,
  DrawerNavigationOptions,
} from '@react-navigation/drawer';
import {NavigationContainer} from '@react-navigation/native';

import MainStack from './MainStack';
import CartScreen from 'screens/CartScreen';
import FavoritesScreen from 'screens/FavoritesScreen';
import {sizes} from 'styles/sizes';
import CustomDrawer from 'components/CustomDrawer';
import {colors} from 'styles/colors';
import {Platform} from 'react-native';

const Drawer = createDrawerNavigator();

const Routes: React.FC = () => {
  return (
    <NavigationContainer>
      <Drawer.Navigator
        drawerContent={props => <CustomDrawer {...props} />}
        screenOptions={() => ({
          headerShown: false,
          drawerActiveBackgroundColor: colors.purple03,
          drawerInactiveBackgroundColor: colors.transparent,
          drawerActiveTintColor: colors.purple,
          drawerInactiveTintColor: colors.purple01,
          drawerHideStatusBarOnOpen: false,
          overlayColor: colors.transparent,
          drawerStyle: {
            backgroundColor: colors.purple01,
            // width: '60%',
          },
          sceneContainerStyle: {
            backgroundColor: colors.purple01,
          },
          drawerItemStyle: {
            borderRadius: 12,
          },
          drawerType: 'slide',
          drawerContentStyles: {
            backgroundColor: colors.transparent,
          },
        })}
        initialRouteName="Start">
        <Drawer.Screen name="Start" component={MainStack} />
        <Drawer.Screen name="Cart" component={CartScreen} />
        <Drawer.Screen name="Favorites" component={FavoritesScreen} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
};

export default Routes;
