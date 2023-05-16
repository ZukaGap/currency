import React from 'react';
import {View} from 'react-native';
import FastImage from 'react-native-fast-image';

import getStyleObj from './style';
import {FlagsPNG} from 'assets/FlagsPNG';

const DynamicFlag: React.FC<{code: string}> = ({code}) => {
  const styles = getStyleObj();

  const dynamicImport = FlagsPNG[code];

  return dynamicImport ? (
    <FastImage
      style={{width: 40, height: 50}}
      source={dynamicImport}
      resizeMode={FastImage.resizeMode.contain}
    />
  ) : (
    <View style={styles.empty} />
  );
};

export default DynamicFlag;
