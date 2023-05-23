import React, {useEffect} from 'react';
import {Text, View} from 'react-native';
import {SafeAreaView, useSafeAreaInsets} from 'react-native-safe-area-context';
import {useRecoilState, useRecoilValue} from 'recoil';

import getPortalInfo from 'utils/websiteParsers/portalFuel';
import {sendPortalFuelInfoAtom, wissolFuelInfoAtom} from 'store/atom/getAtom';

import getStyleObj from './style';

const FuelInfoScreen: React.FC = () => {
  const insets = useSafeAreaInsets();
  const styles = getStyleObj(insets);
  const [portalInfo, setPortalInfo] = useRecoilState(sendPortalFuelInfoAtom);
  const {wissolPrices} = useRecoilValue(wissolFuelInfoAtom);

  useEffect(() => {
    getPortalFuelInfo();
  }, []);

  const getPortalFuelInfo = async () => {
    let res = await getPortalInfo();
    setPortalInfo(res);
  };

  console.log(portalInfo);

  return (
    <SafeAreaView style={styles.safeAreaWrapper}>
      <View>
        <Text>საწვავის ფასები</Text>
      </View>
    </SafeAreaView>
  );
};

export default FuelInfoScreen;
