import React from 'react';
import {Text, View} from 'react-native';

import getStyleObj from './style';
import {CurrenciesType} from 'config/Axios/getAPI';

const CurrencyBullet: React.FC<CurrenciesType> = ({
  name,
  code,
  rateFormated,
  diffFormated,
  diff,
  quantity,
}) => {
  const styles = getStyleObj();
  console.log(diff);

  return (
    <View style={[styles.bulletContainer, styles.row]}>
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
    </View>
  );
};

export default CurrencyBullet;
