import React, {memo, useCallback, useMemo} from 'react';
import {
  ActivityIndicator,
  ListRenderItem,
  View,
  FlatList,
  Text,
} from 'react-native';
import {CurrenciesType} from 'config/Axios/getAPI';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useNavigation} from '@react-navigation/native';
import {useRecoilValue} from 'recoil';

import {currenciesAtom} from 'store/atom/getCurrencyAtom';

import getStyleObj from '../style';
import {colors} from 'styles/colors';
import getSymbolFromCurrency from 'currency-symbol-map';

interface ListType {
  code: string;
}

const List = ({code}: ListType) => {
  const insets = useSafeAreaInsets();
  const styles = getStyleObj(insets);
  const {push} = useNavigation();
  const {data} = useRecoilValue(currenciesAtom);

  const memorizedData = useMemo(
    () => [
      ...data?.BOG?.filter(item => item?.code === code),
      ...data?.TBC?.filter(item => item?.code === code),
      ...data?.Valuto?.filter(item => item?.code === code),
    ],
    [data, code],
  );

  const renderItem: ListRenderItem<CurrenciesType> = ({item}) => {
    return (
      <View style={styles.currencyItem}>
        {/* <DynamicFlag code={code} />  */}
        <Text
          style={
            styles.currencyHeaderT
          }>{`${item?.quantity} ${item?.code}`}</Text>
        <View style={styles.bodyView}>
          <View style={styles.symbolView}>
            <Text
              style={[
                styles.currencyLogo,
                {backgroundColor: item?.diff > 0 ? '#ff3a30' : '#4ddc65'},
              ]}>
              {getSymbolFromCurrency(item?.code)}
            </Text>
          </View>
          <View style={styles.wrapperItem}>
            <Text style={styles.listText}>{item?.bank} კურსი</Text>
            <View style={styles.currencyInfo}>
              <View style={styles.halfSize}>
                <Text style={styles.smallText}>ყიდვა</Text>
                <Text style={styles.rateText} numberOfLines={1}>
                  {item?.buyRate?.toFixed(4)}
                </Text>
              </View>
              <View style={styles.halfSize}>
                <Text style={styles.smallText}>გაყიდვა</Text>
                <Text style={styles.rateText} numberOfLines={1}>
                  {item?.sellRate?.toFixed(4)}
                </Text>
              </View>
            </View>
          </View>
        </View>
      </View>
    );
  };
  const keyExtractor = useCallback((item: CurrenciesType) => item?.name, []);

  if (memorizedData?.length === 0) {
    return;
  }

  return (
    <View style={styles.wrapper}>
      <FlatList
        style={styles.flatList}
        data={memorizedData}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        showsVerticalScrollIndicator={false}
        bounces={false}
        scrollEventThrottle={8}
        contentContainerStyle={styles.bottomPad}
        ListEmptyComponent={() => (
          <View>
            <ActivityIndicator size={'large'} color={colors.purple03} />
          </View>
        )}
      />
    </View>
  );
};

export default memo(List);
