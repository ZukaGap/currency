import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';

import getStyleObj from './style';
import {Burger, Calculator, Diagram, Fuel} from 'assets/SVG';
import {sizes} from 'styles/sizes';
import {colors} from 'styles/colors';

const HomeScreen: React.FC = () => {
  const styles = getStyleObj();
  const {navigate, openDrawer} = useNavigation();

  return (
    <View style={styles.headerWrapper}>
      <View style={styles.row}>
        <View style={styles.titleContainer}>
          <TouchableOpacity
            style={styles.drawerBTN}
            activeOpacity={0.75}
            onPress={() => {
              openDrawer();
            }}>
            <Burger width={sizes.im} height={sizes.im} fill={colors.purple} />
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
          <TouchableOpacity
            activeOpacity={0.75}
            onPress={() => navigate('fuelInfoScreen')}>
            <Fuel width={sizes.il} height={sizes.im} fill={colors.purple03} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default HomeScreen;
