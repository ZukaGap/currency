import React, {useMemo} from 'react';
import {StyleProp, Text, View, ViewStyle} from 'react-native';

import getStyleObj from './style';
import FastImage from 'react-native-fast-image';

export interface FuelBulletType {
  name: string;
  price: string;
  company: string;
  customStyle?: StyleProp<ViewStyle>;
  customTitle?: StyleProp<ViewStyle>;
}

const FuelPriceBullet: React.FC<FuelBulletType> = ({
  name,
  price,
  company,
  customStyle,
  customTitle,
}) => {
  const styles = getStyleObj();
  const IMG_PATH = useMemo(() => {
    switch (company) {
      case 'Wissol':
        return require('assets/IMG/WissolLogo.png');
      case 'Portal':
        return require('assets/IMG/PortalLogo.png');
      case 'Socar':
        return require('assets/IMG/SocarLogo.png');
      case 'Rompetrol':
        return require('assets/IMG/RompetrolLogo.png');
      case 'Gulf':
        return require('assets/IMG/GulfLogo.png');
      case 'Lukoil':
        return require('assets/IMG/LukoilLogo.png');

      default:
        return require('assets/IMG/PortalLogo.png');
    }
  }, [company]);

  return (
    <View style={[styles.bulletContainer, styles.row, customStyle]}>
      <FastImage
        style={{width: 40, height: 50}}
        source={IMG_PATH}
        resizeMode={FastImage.resizeMode.contain}
      />
      <View style={[styles.col, {flex: 1}]}>
        <Text numberOfLines={1} style={[styles.title, customTitle]}>
          {company}
        </Text>
        <Text style={[styles.title, customTitle]}>{name}</Text>
      </View>
      <View style={[styles.col]}>
        <Text style={[styles.title, customTitle]}>ფასი</Text>
        <Text style={[styles.title, customTitle]}>{price}</Text>
      </View>
    </View>
  );
};

export default FuelPriceBullet;
