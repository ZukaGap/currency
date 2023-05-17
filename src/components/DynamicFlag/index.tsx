import React from 'react';
import {View} from 'react-native';

import getStyleObj from './style';
import Flags from '../../assets/CountrySVG';

const DynamicFlag: React.FC<{code: string}> = ({code}) => {
  const styles = getStyleObj();

  const DynamicComponent = Flags[code];

  return DynamicComponent ? (
    <DynamicComponent />
  ) : (
    <View style={styles.empty} />
  );
};

//width={40} height={50}
//style={styles.flagContainer}

export default DynamicFlag;
