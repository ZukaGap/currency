import React, {useCallback, useEffect} from 'react';
import {ActivityIndicator, Text, View} from 'react-native';
import {SafeAreaView, useSafeAreaInsets} from 'react-native-safe-area-context';
import {useRecoilValue} from 'recoil';
import {useNavigation, useRoute} from '@react-navigation/native';

import {currenciesAtom} from '../../store/atom/getAtom';
import {CurrenciesType} from 'config/Axios/getAPI';

import getStyleObj from './style';

const DetailScreen: React.FC = () => {
  const insets = useSafeAreaInsets();
  const styles = getStyleObj(insets);
  const {params} = useRoute();
  const {
    code,
    quantity,
    rateFormated,
    diffFormated,
    rate,
    name,
    diff,
    date,
    validFromDate,
  }: CurrenciesType = params || {};

  return (
    <SafeAreaView style={styles.safeAreaWrapper}>
      <Text>{name}</Text>
    </SafeAreaView>
  );
};

export default DetailScreen;
