import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';

import {CurrenciesType} from 'config/Axios/getAPI';
import {DynamicFlag} from 'primitives';

import getStyleObj from './style';

const CurrencyBullet: React.FC<CurrenciesType & {onPress?: () => void}> = ({
  name,
  code,
  rateFormated,
  diffFormated,
  diff,
  quantity,
  onPress = () => {},
}) => {
  const styles = getStyleObj();

  return (
    <TouchableOpacity
      activeOpacity={0.75}
      style={[styles.bulletContainer, styles.row]}
      onPress={onPress}>
      <DynamicFlag code={code} />
      <View style={[styles.col, {flex: 1}]}>
        <Text numberOfLines={1} style={styles.title}>
          {quantity} {name}
        </Text>
        <Text style={styles.title}>{code}</Text>
      </View>
      <View style={[styles.col]}>
        <Text style={styles.title}>{rateFormated}</Text>
        <Text style={[styles.title, diff <= 0 ? styles.green : styles.red]}>
          {diffFormated}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default CurrencyBullet;
