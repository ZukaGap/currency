import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {
  ActivityIndicator,
  FlatList,
  ListRenderItem,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from 'react-native';
import {SafeAreaView, useSafeAreaInsets} from 'react-native-safe-area-context';
import {useRecoilState, useRecoilValue} from 'recoil';
import {useNavigation} from '@react-navigation/native';

import getPortalInfo from 'utils/websiteParsers/portalFuel';
import {
  sendPortalFuelInfoAtom,
  sendRompetrolFuelInfoAtom,
  socarFuelInfoAtom,
  wissolFuelInfoAtom,
} from 'store/atom/getAtom';

import getStyleObj from './style';
import {Back} from 'assets/SVG';
import {sizes} from 'styles/sizes';
import {colors} from 'styles/colors';
import {FuelPriceBullet} from 'components';
import {FuelBulletType} from 'components/FuelPriceBullet';
import getRompetrolInfo from 'utils/websiteParsers/rompetrolParser';

const FuelInfoScreen: React.FC = () => {
  const insets = useSafeAreaInsets();
  const {goBack, setOptions} = useNavigation();
  const {height} = useWindowDimensions();
  const styles = getStyleObj(insets);
  const [portalInfo, setPortalInfo] = useRecoilState(sendPortalFuelInfoAtom);
  const [rompetrolInfo, setRompetrolInfo] = useRecoilState(
    sendRompetrolFuelInfoAtom,
  );
  const [isLoadingPortalInfo, setIsLoadingPortalInfo] = useState(false);
  const [isLoadingRompetrolInfo, setIsLoadingRompetrolInfo] = useState(false);
  const {wissolPrices, isLoadingWissolInfo} =
    useRecoilValue(wissolFuelInfoAtom);
  const {socarPrices, isLoadingSocarInfo} = useRecoilValue(socarFuelInfoAtom);
  const listData = useMemo<FuelBulletType[]>(() => {
    if (
      !isLoadingSocarInfo &&
      !isLoadingWissolInfo &&
      !isLoadingPortalInfo &&
      !isLoadingRompetrolInfo
    ) {
      return [
        ...portalInfo,
        ...rompetrolInfo,
        ...wissolPrices,
        ...socarPrices,
      ]?.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
    } else {
      return [];
    }
  }, [
    isLoadingSocarInfo,
    isLoadingWissolInfo,
    isLoadingPortalInfo,
    isLoadingRompetrolInfo,
    portalInfo,
    rompetrolInfo,
    wissolPrices,
    socarPrices,
  ]);

  useEffect(() => {
    getPortalFuelInfo();
    getRompetrolFuelInfo();
  }, []);

  const getPortalFuelInfo = async () => {
    try {
      setIsLoadingPortalInfo(true);
      let respPortal = await getPortalInfo();
      setPortalInfo(respPortal);
      setIsLoadingPortalInfo(false);
    } catch (err) {}
  };

  const getRompetrolFuelInfo = async () => {
    try {
      setIsLoadingRompetrolInfo(true);
      let respRompetrol = await getRompetrolInfo();
      setRompetrolInfo(respRompetrol);
      setIsLoadingRompetrolInfo(false);
    } catch (err) {}
  };

  useEffect(() => {
    setOptions({
      title: 'საწვავის ფასები',
      headerLeft: () => (
        <TouchableOpacity
          onPress={() => {
            goBack();
          }}>
          <Back width={sizes.is} height={sizes.is} fill={colors.purple03} />
        </TouchableOpacity>
      ),
    });
  }, []);

  const keyExtractor = useCallback(
    (item: FuelBulletType) => item?.name + item?.price,
    [],
  );

  const renderItem: ListRenderItem<FuelBulletType> = ({item}) => {
    return <FuelPriceBullet {...item} />;
  };

  const viewConfig = useRef({viewAreaCoveragePercentThreshold: 50}).current;

  return (
    <SafeAreaView style={styles.safeAreaWrapper}>
      <FlatList
        data={listData}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        showsVerticalScrollIndicator={false}
        bounces={false}
        style={{height: height}}
        scrollEventThrottle={16}
        viewabilityConfig={viewConfig}
        ListEmptyComponent={() => (
          <View>
            <ActivityIndicator size={'large'} color={colors.purple03} />
          </View>
        )}
      />
    </SafeAreaView>
  );
};

export default FuelInfoScreen;
