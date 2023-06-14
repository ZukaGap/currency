import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {SafeAreaView, useSafeAreaInsets} from 'react-native-safe-area-context';
import {useNavigation} from '@react-navigation/native';

import {DrawerSceneWrapper} from 'components';

import getStyleObj from './style';
import {Burger} from 'assets/SVG';
import {sizes} from 'styles/sizes';
import {colors} from 'styles/colors';

const FavoritesScreen: React.FC = () => {
  const insets = useSafeAreaInsets();
  const styles = getStyleObj(insets);
  const {openDrawer} = useNavigation();

  return (
    <DrawerSceneWrapper>
      <SafeAreaView style={styles.safeAreaWrapper}>
        <View style={styles.wrapper}>
          <TouchableOpacity
            style={styles.drawerBTN}
            activeOpacity={0.75}
            onPress={() => {
              openDrawer();
            }}>
            <Burger width={sizes.im} height={sizes.im} fill={colors.purple} />
          </TouchableOpacity>
          <Text>FAVORITES</Text>
        </View>
      </SafeAreaView>
    </DrawerSceneWrapper>
  );
};

export default FavoritesScreen;
