import {atom} from 'recoil';
import {
  fetchCurrencies,
  CurrenciesType,
  fetchCurrencyCodes,
  CurrencyCodesType,
} from 'config/Axios/getAPI';

interface CurrenciesStateType {
  data: CurrenciesType[];
  isLoading: boolean;
  error: string | null;
}

interface CurrencyCodesStateType {
  data: CurrencyCodesType[];
  isLoading: boolean;
  error: string | null;
}

export const currenciesAtom = atom<CurrenciesStateType>({
  key: 'currenciesAtom',
  default: {
    data: [],
    isLoading: false,
    error: null,
  },
  effects: [
    ({setSelf}) => {
      const fetchData = async () => {
        setSelf(() => ({data: [], isLoading: true, error: null}));
        try {
          const response = await fetchCurrencies(new Date());
          setSelf(() => ({
            data: response,
            isLoading: false,
            error: null,
          }));
        } catch (error: any) {
          setSelf(() => ({data: [], isLoading: false, error: error}));
        }
      };
      fetchData();
    },
  ],
});

export const currencyCodesAtom = atom<CurrencyCodesStateType>({
  key: 'currencyCodesAtom',
  default: {
    data: [],
    isLoading: false,
    error: null,
  },
  effects: [
    ({setSelf}) => {
      const fetchData = async () => {
        setSelf(() => ({data: [], isLoading: true, error: null}));
        try {
          const response = await fetchCurrencyCodes();
          setSelf(() => ({
            data: [{code: 'GEL', name: 'ლარი'}, ...response],
            isLoading: false,
            error: null,
          }));
        } catch (error: any) {
          setSelf(() => ({data: [], isLoading: false, error: error}));
        }
      };
      fetchData();
    },
  ],
});

export const sendCurrencyAtom = atom<CurrencyCodesType>({
  key: 'sendCurrency',
  default: {
    code: 'GEL',
    name: 'ლარი',
  },
});

export const receiveCurrencyAtom = atom<CurrencyCodesType>({
  key: 'receiveCurrency',
  default: {
    code: 'USD',
    name: 'აშშ დოლარი',
  },
});
