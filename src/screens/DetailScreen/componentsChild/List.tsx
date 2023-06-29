import React, {memo, useCallback} from 'react';
import {CurrenciesType} from 'config/Axios/getAPI';
import {ActivityIndicator, ListRenderItem, View, FlatList} from 'react-native';
import {useRecoilValue} from 'recoil';

import {currenciesAtom} from 'store/atom/getCurrencyAtom';
import {colors} from 'styles/colors';
import {CurrencyBullet} from 'components';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useNavigation} from '@react-navigation/native';

import getStyleObj from '../style';

const List = () => {
  const insets = useSafeAreaInsets();
  const styles = getStyleObj(insets);
  const {push} = useNavigation();
  const {data} = useRecoilValue(currenciesAtom);
  const renderItem: ListRenderItem<CurrenciesType> = ({item}) => {
    return (
      <CurrencyBullet
        {...item}
        customStyle={styles.customStyle}
        customTitle={styles.customTitle}
        onPress={() => push('detailScreen', item)}
      />
    );
  };
  const keyExtractor = useCallback((item: CurrenciesType) => item?.name, []);

  return (
    <View style={styles.wrapper}>
      <FlatList
        style={styles.flatList}
        data={data?.NBG}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        showsVerticalScrollIndicator={false}
        bounces={false}
        scrollEventThrottle={16}
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
