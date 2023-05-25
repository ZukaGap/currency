import React, {useMemo} from 'react';
import {Text, View} from 'react-native';

import getStyleObj from './style';
import FastImage from 'react-native-fast-image';

export interface FuelBulletType {
  name: string;
  price: string;
  company: string;
}

const FuelPriceBullet: React.FC<FuelBulletType> = ({name, price, company}) => {
  const styles = getStyleObj();
  const IMG_PATH = useMemo(() => {
    switch (company) {
      case 'Wissol':
        return require('assets/IMG/WissolLogo.png');
      case 'Portal':
        return require('assets/IMG/PortalLogo.png');
      case 'Socar':
        return require('assets/IMG/SocarLogo.png');
      default:
        return require('assets/IMG/PortalLogo.png');
    }
  }, [company]);

  return (
    <View style={[styles.bulletContainer, styles.row]}>
      <FastImage
        style={{width: 40, height: 50}}
        source={IMG_PATH}
        resizeMode={FastImage.resizeMode.contain}
      />
      <View style={[styles.col, {flex: 1}]}>
        <Text numberOfLines={1} style={styles.title}>
          {company}
        </Text>
        <Text style={styles.title}>{name}</Text>
      </View>
      <View style={[styles.col]}>
        <Text style={styles.title}>ფასი</Text>
        <Text style={[styles.title]}>{price}</Text>
      </View>
    </View>
  );
};

export default FuelPriceBullet;
