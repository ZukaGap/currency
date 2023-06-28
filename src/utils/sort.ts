import {CompanyFuelBulletType} from 'components/FuelCompanyBullet';
import {FuelBulletType} from 'components/FuelPriceBullet';

export const sortToHigh = (array: FuelBulletType[]): FuelBulletType[] => {
  let newArray = [...array];
  return newArray?.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
};

export const sortToLow = (array: FuelBulletType[]): FuelBulletType[] => {
  let newArray = [...array];
  return newArray?.sort((a, b) => parseFloat(b.price) - parseFloat(a.price));
};

interface FuelCompanies {
  portal: FuelBulletType;
  socar: FuelBulletType;
  rompetrol: FuelBulletType;
  wissol: FuelBulletType;
  gulf: FuelBulletType;
  lukoil: FuelBulletType;
}

const filterPriceName = company => {
  return company?.map(item => ({
    price: item?.price,
    name: item?.name,
  }));
};

export const sortToHighByBrands = ({
  portal,
  socar,
  rompetrol,
  wissol,
  gulf,
  lukoil,
}: FuelCompanies): CompanyFuelBulletType[] => {
  // return newArray?.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
  const sortedSocar = {
    company: 'Socar',
    priceList: filterPriceName(sortToHigh(socar)),
  };
  const sortedPortal = {
    company: 'Portal',
    priceList: filterPriceName(sortToHigh(portal)),
  };
  const sortedRompetrol = {
    company: 'Rompetrol',
    priceList: filterPriceName(sortToHigh(rompetrol)),
  };
  const sortedWissol = {
    company: 'Wissol',
    priceList: filterPriceName(sortToHigh(wissol)),
  };
  const sortedGulf = {
    company: 'Gulf',
    priceList: filterPriceName(sortToHigh(gulf)),
  };
  const sortedLukoil = {
    company: 'Lukoil',
    priceList: filterPriceName(sortToHigh(lukoil)),
  };

  return [
    sortedSocar,
    sortedPortal,
    sortedRompetrol,
    sortedWissol,
    sortedGulf,
    sortedLukoil,
  ];
};

export const sortToLowByBrands = ({
  portal,
  socar,
  rompetrol,
  wissol,
  gulf,
  lukoil,
}: FuelCompanies): CompanyFuelBulletType[] => {
  // return newArray?.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
  const sortedSocar = {
    company: 'Socar',
    priceList: filterPriceName(sortToLow(socar)),
  };
  const sortedPortal = {
    company: 'Portal',
    priceList: filterPriceName(sortToLow(portal)),
  };
  const sortedRompetrol = {
    company: 'Rompetrol',
    priceList: filterPriceName(sortToLow(rompetrol)),
  };
  const sortedWissol = {
    company: 'Wissol',
    priceList: filterPriceName(sortToLow(wissol)),
  };
  const sortedGulf = {
    company: 'Gulf',
    priceList: filterPriceName(sortToLow(gulf)),
  };
  const sortedLukoil = {
    company: 'Lukoil',
    priceList: filterPriceName(sortToLow(lukoil)),
  };

  return [sortedSocar, sortedPortal, sortedRompetrol, sortedWissol, sortedGulf];
};
