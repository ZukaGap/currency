import React from 'react';
import {View, Text} from 'react-native';
import {SafeAreaView, useSafeAreaInsets} from 'react-native-safe-area-context';
import {useRecoilValue} from 'recoil';

import {currenciesAtom} from '../../store/atom/getAtom';

import getStyleObj from './style';

const HomeScreen: React.FC = () => {
  const insets = useSafeAreaInsets();
  const styles = getStyleObj(insets);

  const {data, isLoading, error} = useRecoilValue(currenciesAtom);
  console.log(data);
  console.log(isLoading);
  console.log(error);

  return (
    <SafeAreaView style={styles.safeAreaWrapper}>
      <View>
        <Text>Home</Text>
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;
