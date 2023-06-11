import React, {useCallback} from 'react';
import {CurrenciesType} from 'config/Axios/getAPI';
import {
  ActivityIndicator,
  ListRenderItem,
  View,
  FlatList,
  StyleSheet,
} from 'react-native';
import {useRecoilValue} from 'recoil';

import {currenciesAtom} from 'store/atom/getAtom';
import {colors} from 'styles/colors';
import {CurrencyBullet} from 'components';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useNavigation} from '@react-navigation/native';
import {generateBoxShadowStyle} from 'utils/generateBoxShadow';

export const List = () => {
  const insets = useSafeAreaInsets();
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
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    borderTopEndRadius: 32,
    borderTopStartRadius: 32,
    ...generateBoxShadowStyle(
      0,
      -3,
      colors.Purple600,
      0.3,
      3.05,
      4,
      '#7e3af24D',
    ),
  },
  flatList: {
    paddingTop: 8,
    backgroundColor: colors.purple03,
    borderTopEndRadius: 32,
    borderTopStartRadius: 32,
  },
  customStyle: {backgroundColor: colors.transparent},
  customTitle: {color: colors.white},
});
