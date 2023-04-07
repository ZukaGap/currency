import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';

import getStyleObj from './style';
import {Dots} from 'assets/SVG';
import {sizes} from 'styles/sizes';
import {colors} from 'styles/colors';

const HomeScreen: React.FC = () => {
  const styles = getStyleObj();

  return (
    <View style={styles.headerWrapper}>
      <Text style={styles.title}>
        NBG <Text style={styles.lightTitle}>Rate</Text>
      </Text>
      <TouchableOpacity activeOpacity={0.75}>
        <Dots width={sizes.il} height={sizes.il} fill={colors.purple03} />
      </TouchableOpacity>
    </View>
  );
};

export default HomeScreen;
