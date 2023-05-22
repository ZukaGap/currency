import React, {useEffect} from 'react';
import {Text, View} from 'react-native';
import {SafeAreaView, useSafeAreaInsets} from 'react-native-safe-area-context';
import {useRecoilState} from 'recoil';

import getPortalInfo from 'utils/websiteParsers/portalFuel';
import {sendPortalFuelInfoAtom} from 'store/atom/getAtom';

import getStyleObj from './style';

const FuelInfoScreen: React.FC = () => {
  const insets = useSafeAreaInsets();
  const styles = getStyleObj(insets);
  const [portalInfo, setPortalInfo] = useRecoilState(sendPortalFuelInfoAtom);

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
