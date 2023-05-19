import React from 'react';
import {Text, View} from 'react-native';
import {SafeAreaView, useSafeAreaInsets} from 'react-native-safe-area-context';

import getStyleObj from './style';

const FuelInfoScreen: React.FC = () => {
  const insets = useSafeAreaInsets();
  const styles = getStyleObj(insets);

  return (
    <SafeAreaView style={styles.safeAreaWrapper}>
      <View>
        <Text>საწვავის ფასები</Text>
      </View>
    </SafeAreaView>
  );
};

export default FuelInfoScreen;
