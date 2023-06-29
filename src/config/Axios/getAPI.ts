import axios, {AxiosResponse} from 'axios';
import {
  REACT_NATIVE_API_ROOT_DEV,
  REACT_NATIVE_API_ROOT_PROD,
  REACT_NATIVE_API_MODE,
} from '@env';
import {format} from 'date-fns';

const API_URL =
  REACT_NATIVE_API_MODE === 'dev'
    ? REACT_NATIVE_API_ROOT_DEV
    : REACT_NATIVE_API_ROOT_PROD;

export interface CurrenciesType {
  code: string;
  quantity: number;
  rateFormated: string;
  diffFormated: string;
  rate: number;
  name: string;
  diff: number;
  date: Date;
  validFromDate: Date;
  buyRate?: number;
  sellRate?: number;
  bank: string;
}

export interface CurrencyCodesType {
  code: string;
  name: string;
}

export interface CurrencyDetails {
  date: Date | null;
  currencies: CurrenciesType[];
}

export interface WissolFuelInfoType {
  fuel_name: string;
  fuel_price: string;
  fuel_type: string;
  body: string;
  shortbody: string;
  fuel_file: string;
}

export interface FuelInfoType {
  id: string;
  code: string;
  name: string;
  price: string;
  company: string;
}

export const fetchCurrencies = async (
  date?: Date,
): Promise<CurrenciesType[]> => {
  const response = await axios.get(
    `${API_URL}/currencies/ka/json/?date=${format(
      date || new Date(),
      'yyyy-MM-dd',
    )}`,
  );
  return response?.data?.[0]?.currencies.map(item => ({
    ...item,
    bank: 'NBG',
  }));
};

export const fetchBOGCurrencies = async (): Promise<CurrenciesType[]> => {
  const response = await axios.get(
    `https://bankofgeorgia.ge/api/currencies/getCurrenciesList/pages/5c0a361ff85d2d574073cf30`,
  );
  return response?.data?.data.map(item => ({
    code: item?.ccy,
    quantity: item?.rateWeight,
    rateFormated: item?.currentRate,
    diffFormated: item?.difference,
    rate: Number(item?.currentRate),
    name: item?.name,
    diff: Number(item?.difference),
    date: new Date(),
    validFromDate: new Date(),
    bank: 'BOG',
    buyRate: item?.dgtlBuyRate,
    sellRate: item?.dgtlSellRate,
  }));
};

export const fetchTBCCurrencies = async (): Promise<CurrenciesType[]> => {
  const response = await axios.get(
    `https://api.tbcbank.ge/v1/exchange-rates/commercial?currency`,
    {headers: {apikey: 'h6ZxP3C4WuuE7s2hj0PdiOSJA9QX2KEU'}},
  );
  return response?.data?.commercialRatesList.map(item => ({
    code: item?.currency,
    quantity: 1,
    rateFormated: 0,
    diffFormated: 0,
    rate: 0,
    name: item?.currency,
    diff: 0,
    date: new Date(),
    validFromDate: new Date(),
    bank: 'TBC',
    buyRate: item?.buy,
    sellRate: item?.sell,
  }));
};

export const fetchCurrencyCodes = async (): Promise<CurrencyCodesType[]> => {
  const response = await axios.get(`${API_URL}/currencies/codes`);
  return response?.data;
};

export const fetchConvertedCurrency = async (
  codeFrom: string,
  codeTo: string,
  quantity: string,
  callBack: (value: string) => void,
): Promise<AxiosResponse> => {
  try {
    const response = await axios.get(
      `${API_URL}/currencies/calculator/?codeFrom=${codeFrom}&codeTo=${codeTo}&quantity=${quantity}`,
    );
    callBack(String(response?.data.toFixed(4)));
    return response?.data;
  } catch (err) {
    return;
  }
};

export const fetchCurrencyDetails = async (
  currencies: string[],
  from: Date,
  to: Date,
): Promise<CurrencyDetails[] | undefined> => {
  try {
    const toTimeParse = format(to, 'yyyy-MM-dd');
    const fromTimeParse = format(from, 'yyyy-MM-dd');
    const parse = currencies?.join('&currencies=');
    const response = await axios.get(
      `${API_URL}/currencies/?currencies=${parse}&start=${fromTimeParse}&end=${toTimeParse}`,
    );

    return response?.data;
  } catch (err) {}
};

export const fetchPortalFuelInfo = async () => {
  try {
    const response = await axios.get('https://portal.com.ge/georgian/newfuel');

    return response.data;
  } catch (err) {}
};

export const fetchLukoilFuelInfo = async () => {
  try {
    const response = await axios.get('http://www.lukoil.ge/');

    return response.data;
  } catch (err) {}
};

export const fetchWissolFuelInfo = async (): Promise<FuelInfoType[]> => {
  const response = await axios.get(
    `http://wissol.ge/adminarea/api/ajaxapi/get_fuel_prices?lang=GEO`,
  );
  const data: FuelInfoType[] = response?.data?.map(item => {
    return {
      id: 'Wissol-' + item?.fuel_name,
      code: '',
      name: item?.fuel_name,
      price: item?.fuel_price,
      company: 'Wissol',
    };
  });

  return data;
};

export const fetchSocarFuelInfo = async (): Promise<FuelInfoType[]> => {
  const response = await axios.get<AxiosResponse>(
    `https://prod-api.sgp.ge/api/v1/fuels/prices`,
  );

  const data: FuelInfoType[] = response?.data?.data?.map(item => {
    return {
      id: item?.id,
      code: item?.code,
      name: item?.name,
      price: item?.price,
      company: 'Socar',
    };
  });

  return data;
};

// https://www.rompetrol.ge/#pricelist
export const fetchRompetrolFuelInfo = async () => {
  try {
    const response = await axios.get<AxiosResponse>(
      'https://www.rompetrol.ge/#pricelist',
    );

    return response.data;
  } catch (err) {}
};

// https://gulf.ge/
export const fetchGulfFuelInfo = async () => {
  try {
    const response = await axios.get('https://gulf.ge/');

    return response.data;
  } catch (err) {}
};
