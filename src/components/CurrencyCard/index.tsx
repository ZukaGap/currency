import {Text, View} from 'react-native';

import getStyleObj from './style';
import React from 'react';
import DynamicFlag from '../DynamicFlag';

interface Props {
  code: string;
  quantity: number;
  rate: number;
  diff: number;
}

function CurrencyCard({code, quantity, rate, diff}: Props) {
  const styles = getStyleObj();

  const diffColor = () => {
    if (diff > 0) {
      return 'red';
    } else if (diff < 0) {
      return 'green';
    } else if (diff === 0) {
      return 'orange';
    }
  };

  const diffSymbol = () => {
    if (diff > 0) {
      return '▲';
    } else if (diff < 0) {
      return '▼';
    } else if (diff === 0) {
      return '=';
    }
  };

  return (
    <View style={styles.mainContainer}>
      <View style={styles.flagContainer}>
        <DynamicFlag code={code} />
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.rateText}>{`${quantity} ${code} = ${rate.toFixed(
          2,
        )} GEL`}</Text>
      </View>
      <View style={styles.diffContainer}>
        <Text style={{color: diffColor()}}>{`${diffSymbol()} ${Math.abs(
          diff,
        ).toFixed(4)}`}</Text>
      </View>
    </View>
  );
}
export default CurrencyCard;
