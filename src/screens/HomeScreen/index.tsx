import React, {useCallback} from 'react';
import {ActivityIndicator, Animated, View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useRecoilValue} from 'recoil';
import {useNavigation} from '@react-navigation/native';
import {
  useCollapsibleSubHeader,
  CollapsibleSubHeaderAnimator,
} from 'react-navigation-collapsible';

import {currenciesAtom} from '../../store/atom/getAtom';
import {CurrencyBullet, Header} from '../../components';
import {CurrenciesType} from 'config/Axios/getAPI';

import getStyleObj from './style';
import {colors} from 'styles/colors';

const HomeScreen: React.FC = () => {
  const insets = useSafeAreaInsets();
  const styles = getStyleObj(insets);
  const {navigate} = useNavigation();

  const {data} = useRecoilValue(currenciesAtom);

  const {onScroll, containerPaddingTop, scrollIndicatorInsetTop, translateY} =
    useCollapsibleSubHeader();

  const renderItem = useCallback(
    ({item}: {item: CurrenciesType; index: number}) => {
      return (
        <CurrencyBullet
          {...item}
          onPress={() => {
            navigate('detailScreen', item);
          }}
        />
      );
    },
    [navigate],
  );

  return (
    <View style={styles.safeAreaWrapper}>
      <Animated.FlatList
        data={data}
        onScroll={onScroll}
        renderItem={renderItem}
        style={{paddingHorizontal: 16}}
        contentContainerStyle={{paddingTop: containerPaddingTop}}
        scrollIndicatorInsets={{top: scrollIndicatorInsetTop}}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={() => (
          <View>
            <ActivityIndicator size={'large'} color={colors.purple03} />
          </View>
        )}
      />
      <CollapsibleSubHeaderAnimator translateY={translateY}>
        <View style={styles.header}>
          <Header />
        </View>
      </CollapsibleSubHeaderAnimator>
    </View>
  );
};

export default HomeScreen;
