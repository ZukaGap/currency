import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {
  ActivityIndicator,
  Text,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useRecoilState, useRecoilValue} from 'recoil';
import {Portal} from 'react-native-portalize';
import {Modalize} from 'react-native-modalize';

import getPortalInfo from 'utils/websiteParsers/portalFuel';
import {
  sendGulfFuelInfoAtom,
  sendPortalFuelInfoAtom,
  sendRompetrolFuelInfoAtom,
  socarFuelInfoAtom,
  wissolFuelInfoAtom,
} from 'store/atom/getAtom';
import {DrawerWrapper, FuelCompanyBullet, FuelPriceBullet} from 'components';
import {FuelBulletType} from 'components/FuelPriceBullet';
import getRompetrolInfo from 'utils/websiteParsers/rompetrolParser';
import {
  horizontalScale,
  moderateScale,
  verticalScale,
} from 'replacers/scalling';
import {
  sortToHigh,
  sortToHighByBrands,
  sortToLow,
  sortToLowByBrands,
} from 'utils/sort';

import getStyleObj from './style';
import {Drawer, Filter} from 'assets/SVG';
import {sizes} from 'styles/sizes';
import {colors} from 'styles/colors';
import getGulfInfo from 'utils/websiteParsers/gulfFuelParser';
import {FlashList} from '@shopify/flash-list';

interface FilterType {
  name: string;
  key: string;
}

const filterType: FilterType[] = [
  {
    name: 'ფასი ზრდადი',
    key: 'low-price',
  },
  {
    name: 'ფასი კლებადი',
    key: 'high-price',
  },
  {
    name: 'ბრენდები + ზრდადი',
    key: 'brand-low-price',
  },
  {
    name: 'ბრენდები + კლებადი',
    key: 'brand-high-price',
  },
];

const FuelInfoScreen: React.FC = () => {
  const insets = useSafeAreaInsets();
  const {height} = useWindowDimensions();
  const drawerRef = useRef(null);
  const styles = getStyleObj(insets);
  const modalizeRef = useRef<Modalize>(null);
  const [portalInfo, setPortalInfo] = useRecoilState(sendPortalFuelInfoAtom);
  const [rompetrolInfo, setRompetrolInfo] = useRecoilState(
    sendRompetrolFuelInfoAtom,
  );
  const {socarPrices, isLoadingSocarInfo} = useRecoilValue(socarFuelInfoAtom);
  const [gulfInfo, setGulfInfo] = useRecoilState(sendGulfFuelInfoAtom);
  const [isLoadingPortalInfo, setIsLoadingPortalInfo] = useState(false);
  const [isLoadingRompetrolInfo, setIsLoadingRompetrolInfo] = useState(false);
  const [isLoadingGulflInfo, setIsLoadingGulfInfo] = useState(false);
  const {wissolPrices, isLoadingWissolInfo} =
    useRecoilValue(wissolFuelInfoAtom);
  const [sortType, setSortType] = useState<FilterType>(filterType[0]);
  const listData = useMemo<FuelBulletType[]>(() => {
    if (sortType?.key === 'low-price') {
      return sortToHigh([
        ...portalInfo,
        ...socarPrices,
        ...rompetrolInfo,
        ...wissolPrices,
        ...gulfInfo,
      ]);
    } else if (sortType?.key === 'high-price') {
      return sortToLow([
        ...portalInfo,
        ...socarPrices,
        ...rompetrolInfo,
        ...wissolPrices,
        ...gulfInfo,
      ]);
    } else if (sortType?.key === 'brand-low-price') {
      return sortToHighByBrands({
        portal: portalInfo,
        socar: socarPrices,
        rompetrol: rompetrolInfo,
        wissol: wissolPrices,
        gulf: gulfInfo,
      });
    } else if (sortType?.key === 'brand-high-price') {
      return sortToLowByBrands({
        portal: portalInfo,
        socar: socarPrices,
        rompetrol: rompetrolInfo,
        wissol: wissolPrices,
        gulf: gulfInfo,
      });
    }
    return [];
  }, [
    portalInfo,
    rompetrolInfo,
    wissolPrices,
    socarPrices,
    sortType,
    gulfInfo,
  ]);

  useEffect(() => {
    getPortalFuelInfo();
    getRompetrolFuelInfo();
    getGulfFuelInfo();
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

  const getGulfFuelInfo = async () => {
    try {
      setIsLoadingGulfInfo(true);
      let respGulf = await getGulfInfo();
      setGulfInfo(respGulf);
      setIsLoadingGulfInfo(false);
    } catch (err) {}
  };

  const keyExtractor = useCallback(
    (item: FuelBulletType) => item?.company + item?.name + item?.price,
    [],
  );

  const renderItem = useCallback(
    ({item}: {item: FuelBulletType}) => {
      if (
        sortType?.key === 'brand-low-price' ||
        sortType?.key === 'brand-high-price'
      ) {
        return <FuelCompanyBullet {...item} />;
      }
      return (
        <FuelPriceBullet
          {...item}
          customStyle={styles.customStyle}
          customTitle={styles.customTitle}
        />
      );
    },
    [sortType],
  );

  const viewConfig = useRef({viewAreaCoveragePercentThreshold: 50}).current;

  const onOpen = useCallback(() => {
    modalizeRef.current?.open();
  }, []);

  const onClose = useCallback(() => {
    modalizeRef.current?.close();
  }, []);

  const RenderSort = useCallback(() => {
    return filterType?.map(item => {
      return (
        <TouchableOpacity
          activeOpacity={0.75}
          onPress={() => {
            setSortType(item);
            onClose();
          }}>
          <Text
            style={{
              fontSize: moderateScale(sizes.h4),
              marginVertical: verticalScale(sizes.s),
              color: sortType?.key === item?.key ? colors.purple : colors.white,
            }}>
            {item?.name}
          </Text>
        </TouchableOpacity>
      );
    });
  }, [sortType]);

  const ListHeaderComponent = useCallback(
    () =>
      isLoadingSocarInfo ||
      isLoadingWissolInfo ||
      isLoadingPortalInfo ||
      isLoadingRompetrolInfo ||
      isLoadingGulflInfo ? (
        <View style={{marginBottom: sizes.s}}>
          <ActivityIndicator size={'large'} color={colors.purple03} />
        </View>
      ) : (
        <View />
      ),
    [
      isLoadingGulflInfo,
      isLoadingPortalInfo,
      isLoadingRompetrolInfo,
      isLoadingSocarInfo,
      isLoadingWissolInfo,
    ],
  );

  const ListEmptyComponent = useCallback(
    () =>
      !isLoadingSocarInfo ||
      !isLoadingWissolInfo ||
      !isLoadingPortalInfo ||
      !isLoadingRompetrolInfo ||
      !isLoadingGulflInfo ? (
        <View>
          <ActivityIndicator size={'large'} color={colors.purple03} />
        </View>
      ) : (
        <View />
      ),
    [
      isLoadingGulflInfo,
      isLoadingPortalInfo,
      isLoadingRompetrolInfo,
      isLoadingSocarInfo,
      isLoadingWissolInfo,
    ],
  );

  return (
    <DrawerWrapper ref={drawerRef}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => {
            drawerRef?.current.openDrawer();
          }}>
          <Drawer width={sizes.is} height={sizes.is} fill={colors.purple} />
        </TouchableOpacity>
        <Text style={styles.title}>{'საწვავის ფასები'}</Text>
        <TouchableOpacity onPress={onOpen}>
          <Filter width={sizes.is} height={sizes.is} fill={colors.purple} />
        </TouchableOpacity>
      </View>
      <FlashList
        data={listData}
        renderItem={renderItem}
        estimatedItemSize={70}
        keyExtractor={keyExtractor}
        showsVerticalScrollIndicator={false}
        bounces={false}
        style={{height: height}}
        contentContainerStyle={styles.bottomPad}
        scrollEventThrottle={16}
        viewabilityConfig={viewConfig}
        ListHeaderComponent={ListHeaderComponent}
        ListEmptyComponent={ListEmptyComponent}
      />

      <Portal>
        <Modalize
          ref={modalizeRef}
          handlePosition={'outside'}
          adjustToContentHeight={true}
          panGestureComponentEnabled={true}
          disableScrollIfPossible={true}
          modalStyle={{
            backgroundColor: colors.purple01,
          }}>
          <View
            style={{
              paddingTop: verticalScale(sizes.lx),
              paddingBottom: verticalScale(sizes.lxx + insets.bottom),
              paddingHorizontal: horizontalScale(sizes.lx),
            }}>
            <Text style={styles.sortT}>დალაგება</Text>
            {RenderSort()}
          </View>
        </Modalize>
      </Portal>
    </DrawerWrapper>
  );
};

export default FuelInfoScreen;
