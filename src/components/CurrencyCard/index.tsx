/* eslint-disable react-native/no-inline-styles */
import {Text, View} from 'react-native';

import getStyleObj from './style';
import React from 'react';
import DynamicFlag from '../DynamicFlag';
import {colors} from '../../styles/colors';

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
      return colors.red;
    } else if (diff < 0) {
      return colors.green;
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
        {/* <Text style={styles.rateText}>{`${quantity} ${code} = ${rate.toFixed(
          2,
        )} GEL`}</Text> */}
        <Text style={styles.rateText}>
          <Text style={{fontWeight: 'bold'}}>{quantity} </Text>
          <Text>{code} </Text>
          <Text>= </Text>
          <Text style={{fontWeight: 'bold'}}>{rate.toFixed(2)} </Text>
          <Text>GEL</Text>
        </Text>
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
