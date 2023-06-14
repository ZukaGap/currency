import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

import getStyleObj from './style';

const CustomDrawer = props => {
  const insets = useSafeAreaInsets();
  const styles = getStyleObj(insets);

  return (
    <View style={[styles.main]}>
      <DrawerContentScrollView
        {...props}
        contentContainerStyle={styles.contentContainerStyle}>
        <Text style={styles.userName}>Beka</Text>
        <DrawerItemList {...props} />
        <View style={styles.footer}>
          <TouchableOpacity onPress={() => {}} style={styles.logoutBTN}>
            <Text style={styles.logoutT}>Sign Out</Text>
          </TouchableOpacity>
        </View>
      </DrawerContentScrollView>
    </View>
  );
};

export default CustomDrawer;
