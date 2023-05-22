import axios from 'axios';
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
}

export interface CurrencyCodesType {
  code: string;
  name: string;
}

export interface CurrencyDetails {
  date: Date | null;
  currencies: CurrenciesType[];
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
  return response?.data?.[0]?.currencies;
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
): Promise<number> => {
  try {
    const response = await axios.get(
      `${API_URL}/currencies/calculator/?codeFrom=${codeFrom}&codeTo=${codeTo}&quantity=${quantity}`,
    );
    callBack(String(response?.data.toFixed(4)));
    return response?.data;
  } catch (err) {
    return 0;
  }
};

export const fetchCurrencyDetails = async (
  currencies: string[],
  start: Date,
  end: Date,
  callBack: (value: CurrencyDetails[]) => void,
) => {
  try {
    const endTimeParse = format(end, 'yyyy-MM-dd');
    const startTimeParse = format(start, 'yyyy-MM-dd');
    const parse = currencies?.join('&currencies=');
    const response = await axios.get(
      `${API_URL}/currencies/?currencies=${parse}&start=${startTimeParse}&end=${endTimeParse}`,
    );
    callBack(response?.data);
  } catch (err) {}
};

export const fetchPortalFuelInfo = async () => {
  try {
    const response = await axios.get('https://portal.com.ge/georgian/newfuel');

    return response.data;
  } catch (err) {}
};
