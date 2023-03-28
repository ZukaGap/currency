import React from 'react';
import {View, Text} from 'react-native';
import {SafeAreaView, useSafeAreaInsets} from 'react-native-safe-area-context';

import getStyleObj from './style';

const SettingsScreen: React.FC = () => {
  const insets = useSafeAreaInsets();
  const styles = getStyleObj(insets);

  return (
    <SafeAreaView style={styles.safeAreaWrapper}>
      <View>
        <Text>Settings</Text>
      </View>
    </SafeAreaView>
  );
};

export default SettingsScreen;
