import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';

import getStyleObj from './style';
import {Calculator, Diagram, Drawer} from 'assets/SVG';
import {sizes} from 'styles/sizes';
import {colors} from 'styles/colors';

interface HomeScreenProps {
  onPress?: () => void;
}

const HomeScreen: React.FC<HomeScreenProps> = ({onPress = () => {}}) => {
  const styles = getStyleObj();
  const {navigate} = useNavigation();

  return (
    <View style={styles.headerWrapper}>
      <View style={styles.row}>
        <View style={styles.titleContainer}>
          <TouchableOpacity onPress={onPress}>
            <Drawer width={sizes.is} height={sizes.is} fill={colors.purple} />
          </TouchableOpacity>
          <Text style={styles.title}>
            NBG <Text style={styles.lightTitle}>Rate</Text>
          </Text>
          <Diagram width={sizes.m} height={sizes.m} fill={colors.purple03} />
        </View>
        <View style={styles.row}>
          <TouchableOpacity
            activeOpacity={0.75}
            style={styles.mrR8}
            onPress={() => navigate('calculatorScreen')}>
            <Calculator
              width={sizes.im}
              height={sizes.im}
              fill={colors.purple}
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default HomeScreen;
