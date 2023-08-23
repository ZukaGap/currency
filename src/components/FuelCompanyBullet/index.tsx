import React, {useCallback, useMemo} from 'react';
import {StyleProp, Text, View, ViewStyle} from 'react-native';
import FastImage from 'react-native-fast-image';

import getStyleObj from './style';

interface PriceListType {
  price: string;
  name: string;
}

export interface CompanyFuelBulletType {
  company: string;
  priceList: PriceListType[];
  customStyle?: StyleProp<ViewStyle>;
  customTitle?: StyleProp<ViewStyle>;
}

const FuelCompanyBullet: React.FC<CompanyFuelBulletType> = ({
  company,
  priceList,
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

  const PriceBullet = useCallback(() => {
    return (
      <View style={styles.list}>
        {priceList?.map(item => (
          <View style={styles.priceBullet}>
            <Text style={styles.fuelName}>{item?.name}</Text>
            <Text style={styles.price}>{item?.price}</Text>
          </View>
        ))}
      </View>
    );
  }, [priceList]);

  return (
    <View style={[styles.bulletContainer, styles.col, customStyle]}>
      <View style={styles.header}>
        <FastImage
          style={{width: 40, height: 50}}
          source={IMG_PATH}
          resizeMode={FastImage.resizeMode.contain}
        />
        <Text numberOfLines={1} style={[styles.title, customTitle]}>
          {company}
        </Text>
      </View>
      {PriceBullet()}
    </View>
  );
};

export default FuelCompanyBullet;
