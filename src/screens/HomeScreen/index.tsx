import React, {useCallback, useEffect, useRef} from 'react';
import {ActivityIndicator, View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useRecoilState, useRecoilValue} from 'recoil';
import {useNavigation} from '@react-navigation/native';
import {FlashList} from '@shopify/flash-list';

import {currenciesAtom} from 'store/atom/getCurrencyAtom';
import {CurrencyBullet, Header, DrawerWrapper} from 'components';
import {CurrenciesType} from 'config/Axios/getAPI';
import {getSavedLanguageAtom} from 'store/atom/getSettingsInfoAtom';
import {getFromStorage} from 'utils/asyncStorage';
import {USER_LANGUAGE} from 'constants/storage';

import getStyleObj from './style';
import {colors} from 'styles/colors';

const HomeScreen: React.FC = () => {
  const insets = useSafeAreaInsets();
  const styles = getStyleObj(insets);
  const drawerRef = useRef(null);
  const {navigate} = useNavigation();
  const viewConfig = useRef({viewAreaCoveragePercentThreshold: 50}).current;
  const [savedLanguage, setSavedLanguage] =
    useRecoilState(getSavedLanguageAtom);
  const getLanguage = useCallback(async () => {
    const language = await getFromStorage(USER_LANGUAGE);
    setSavedLanguage({language});
  }, []);

  useEffect(() => {
    getLanguage();
  }, []);

  const {data} = useRecoilValue(currenciesAtom);

  const keyExtractor = useCallback(
    (item: CurrenciesType) => `item_${item?.code}`,
    [],
  );

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
          data={data?.NBG}
          renderItem={renderItem}
          estimatedItemSize={70}
          keyExtractor={keyExtractor}
          showsVerticalScrollIndicator={false}
          bounces={false}
          scrollEventThrottle={16}
          viewabilityConfig={viewConfig}
          contentContainerStyle={styles.bottomPad}
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
