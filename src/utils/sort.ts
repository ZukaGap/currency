import {FuelBulletType} from 'components/FuelPriceBullet';

export const sortToHigh = (array: FuelBulletType[]): FuelBulletType[] => {
  let newArray = [...array];
  return newArray?.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
};

export const sortToLow = (array: FuelBulletType[]): FuelBulletType[] => {
  let newArray = [...array];
  return newArray?.sort((a, b) => parseFloat(b.price) - parseFloat(a.price));
};
