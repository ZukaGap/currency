import React, {useCallback, useRef} from 'react';
import {ActivityIndicator, ListRenderItem, View, Animated} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useRecoilValue} from 'recoil';
import {useNavigation} from '@react-navigation/native';
import {FlashList, FlashListProps} from '@shopify/flash-list';

import {currenciesAtom} from 'store/atom/getAtom';
import {CurrencyBullet, Header, DrawerWrapper} from 'components';
import {CurrenciesType} from 'config/Axios/getAPI';

import getStyleObj from './style';
import {colors} from 'styles/colors';

const HomeScreen: React.FC = () => {
  const insets = useSafeAreaInsets();
  const styles = getStyleObj(insets);
  const drawerRef = useRef(null);
  const {navigate} = useNavigation();
  const viewConfig = useRef({viewAreaCoveragePercentThreshold: 50}).current;

  const {data} = useRecoilValue(currenciesAtom);

  const keyExtractor = useCallback((item: CurrenciesType) => item?.name, []);

  const renderItem = ({item}: {item: CurrenciesType}) => {
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
    <DrawerWrapper ref={drawerRef}>
      <View style={styles.header}>
        <Header
          onPress={() => {
            drawerRef?.current.openDrawer();
          }}
        />
      </View>
      <View style={styles.safeAreaWrapper}>
        <FlashList
          data={data}
          renderItem={renderItem}
          estimatedItemSize={70}
          keyExtractor={keyExtractor}
          showsVerticalScrollIndicator={false}
          bounces={false}
          scrollEventThrottle={16}
          viewabilityConfig={viewConfig}
          ListEmptyComponent={() => (
            <View>
              <ActivityIndicator size={'large'} color={colors.purple03} />
            </View>
          )}
        />
      </View>
    </DrawerWrapper>
  );
};

export default HomeScreen;
