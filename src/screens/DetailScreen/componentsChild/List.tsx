import React, {useCallback} from 'react';
import {CurrenciesType} from 'config/Axios/getAPI';
import {ActivityIndicator, ListRenderItem, View, FlatList} from 'react-native';
import {useRecoilValue} from 'recoil';

import {currenciesAtom} from 'store/atom/getAtom';
import {colors} from 'styles/colors';
import {CurrencyBullet} from 'components';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useNavigation} from '@react-navigation/native';

export const List = () => {
  const insets = useSafeAreaInsets();
  const {push} = useNavigation();
  const {data} = useRecoilValue(currenciesAtom);
  const renderItem: ListRenderItem<CurrenciesType> = ({item}) => {
    return (
      <CurrencyBullet
        {...item}
        customStyle={{backgroundColor: colors.purple03}}
        customTitle={{color: colors.white}}
        onPress={() => push('detailScreen', item)}
      />
    );
  };
  const keyExtractor = useCallback((item: CurrenciesType) => item?.name, []);

  return (
    <FlatList
      style={{
        paddingTop: 8,
        backgroundColor: colors.purple03,
        borderTopEndRadius: 32,
        borderTopStartRadius: 32,
      }}
      data={data}
      renderItem={renderItem}
      keyExtractor={keyExtractor}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{
        paddingBottom: insets.bottom,
      }}
      bounces={false}
      scrollEventThrottle={16}
      ListEmptyComponent={() => (
        <View>
          <ActivityIndicator size={'large'} color={colors.purple03} />
        </View>
      )}
    />
  );
};
