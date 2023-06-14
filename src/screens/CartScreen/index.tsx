import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useNavigation} from '@react-navigation/native';

import {DrawerSceneWrapper} from 'components';

import getStyleObj from './style';
import {Burger} from 'assets/SVG';
import {sizes} from 'styles/sizes';
import {colors} from 'styles/colors';

const SettingsScreen: React.FC = () => {
  const insets = useSafeAreaInsets();
  const styles = getStyleObj(insets);
  const {openDrawer} = useNavigation();

  return (
    <DrawerSceneWrapper>
      <View style={styles.safeAreaWrapper}>
        <View style={styles.wrapper}>
          <TouchableOpacity
            style={styles.drawerBTN}
            activeOpacity={0.75}
            onPress={() => {
              openDrawer();
            }}>
            <Burger width={sizes.im} height={sizes.im} fill={colors.purple} />
          </TouchableOpacity>
          <Text>CART</Text>
        </View>
      </View>
    </DrawerSceneWrapper>
  );
};

export default SettingsScreen;
