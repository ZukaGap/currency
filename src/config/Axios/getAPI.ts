import axios from 'axios';
import {
  REACT_NATIVE_API_ROOT_DEV,
  REACT_NATIVE_API_ROOT_PROD,
  REACT_NATIVE_API_MODE,
} from '@env';

const API_URL =
  REACT_NATIVE_API_MODE === 'dev'
    ? REACT_NATIVE_API_ROOT_DEV
    : REACT_NATIVE_API_ROOT_PROD;

export interface CurrenciesType {
  code: string;
  quantity: 1;
  rateFormated: string;
  diffFormated: string;
  rate: number;
  name: string;
  diff: number;
  date: Date;
  validFromDate: Date;
}

export const fetchCurrencies = async (): Promise<CurrenciesType[]> => {
  const response = await axios.get(
    `${API_URL}/currencies/ka/json/?date=2023-03-30`,
  );
  return response?.data?.[0]?.currencies;
};
