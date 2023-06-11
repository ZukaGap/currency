import React, {useCallback, useRef} from 'react';
import {ActivityIndicator, ListRenderItem, View, Animated} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useRecoilValue} from 'recoil';
import {useNavigation} from '@react-navigation/native';
import {
  useCollapsibleSubHeader,
  CollapsibleSubHeaderAnimator,
} from 'react-navigation-collapsible';

import {currenciesAtom} from 'store/atom/getAtom';
import {CurrencyBullet, Header} from 'components';
import {CurrenciesType} from 'config/Axios/getAPI';

import getStyleObj from './style';
import {colors} from 'styles/colors';

const HomeScreen: React.FC = () => {
  const insets = useSafeAreaInsets();
  const styles = getStyleObj(insets);
  const {navigate} = useNavigation();
  const viewConfig = useRef({viewAreaCoveragePercentThreshold: 50}).current;

  const {data} = useRecoilValue(currenciesAtom);

  const {onScroll, containerPaddingTop, scrollIndicatorInsetTop, translateY} =
    useCollapsibleSubHeader();

  const keyExtractor = useCallback((item: CurrenciesType) => item?.name, []);

  const renderItem: ListRenderItem<CurrenciesType> = ({item}) => {
    return (
      <CurrencyBullet
        {...item}
        customStyle={styles.customStyle}
        customTitle={styles.customTitle}
        onPress={() => navigate('detailScreen', item)}
      />
    );
  };

  return (
    <View style={styles.safeAreaWrapper}>
      <Animated.FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingTop: containerPaddingTop,
          paddingBottom: insets.bottom,
        }}
        scrollIndicatorInsets={{top: scrollIndicatorInsetTop}}
        bounces={false}
        scrollEventThrottle={16}
        viewabilityConfig={viewConfig}
        onScroll={onScroll}
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
