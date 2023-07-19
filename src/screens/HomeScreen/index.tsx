/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import React, {useEffect, useState} from 'react';
import {ActivityIndicator} from 'react-native';


import { useSafeAreaInsets} from 'react-native-safe-area-context';

import SafeAreaView from 'react-native-safe-area-view';


import axios from 'axios';

import getStyleObj from './style';
import { ScrollView } from 'react-native-gesture-handler';
import CurrencyCard from '../../components/CurrencyCard';
import { colors } from '../../styles/colors';

const HomeScreen: React.FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [fetchedData, setFetchedData] = useState<any[]>([]);

  const apiUrl =
  'https://nbg.gov.ge/gw/api/ct/monetarypolicy/currencies/en/json';

  const insets = useSafeAreaInsets();
  const styles = getStyleObj(insets);

  useEffect(()=>{
    setIsLoading(true);
    axios.get(apiUrl)
    .then(function (response) {
      setFetchedData(response.data);
      setIsLoading(false);
    })
    .catch(function (error) {
      console.log(error);
    });
  }, []);

  return (
    <SafeAreaView style={[styles.safeAreaWrapper]}>
      {isLoading ? (
        <ActivityIndicator style={{ flex: 1 }} size="large" color={colors.purple} />
      ) : (
        <ScrollView>
          {fetchedData[0].currencies.map((currency: any) => <CurrencyCard code={currency.code} quantity={currency.quantity} rate={currency.rate} diff={currency.diff}/>)}
        </ScrollView>
      )}
    </SafeAreaView>
  );
};

export default HomeScreen;
