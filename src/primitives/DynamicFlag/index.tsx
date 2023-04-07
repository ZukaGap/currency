import React from 'react';
import {View} from 'react-native';

import getStyleObj from './style';
import Flags from 'assets/Flags';

const DynamicFlag: React.FC<{code: string}> = ({code}) => {
  const styles = getStyleObj();

  const DynamicComponent = Flags[code];

  return DynamicComponent ? (
    <DynamicComponent width={40} height={50} />
  ) : (
    <View style={styles.empty} />
  );
};

export default DynamicFlag;
