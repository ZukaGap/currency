import React, {useCallback} from 'react';
import {Text, View} from 'react-native';
import {SafeAreaView, useSafeAreaInsets} from 'react-native-safe-area-context';
import {useRecoilValue} from 'recoil';
import {FlashList} from '@shopify/flash-list';

import {currenciesAtom} from '../../store/atom/getAtom';
import {CurrencyBullet, Header} from '../../components';
import {CurrenciesType} from 'config/Axios/getAPI';

import getStyleObj from './style';

const HomeScreen: React.FC = () => {
  const insets = useSafeAreaInsets();
  const styles = getStyleObj(insets);

  const {data, isLoading, error} = useRecoilValue(currenciesAtom);

  const renderItem = useCallback(
    ({item, index}: {item: CurrenciesType; index: number}) => {
      return <CurrencyBullet {...item} />;
    },
    [],
  );

  return (
    <SafeAreaView style={styles.safeAreaWrapper}>
      <Header />
      <Text style={styles.subTitle}>Today's Rates</Text>
      <FlashList
        data={data}
        renderItem={renderItem}
        estimatedItemSize={70}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
};

export default HomeScreen;
