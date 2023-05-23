import {atom} from 'recoil';
import {
  fetchCurrencies,
  CurrenciesType,
  fetchCurrencyCodes,
  CurrencyCodesType,
  WissolFuelInfoType,
  fetchWissolFuelInfo,
} from 'config/Axios/getAPI';
import {PortalInfoType} from 'utils/websiteParsers/portalFuel';

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

interface ConvertCurrencyType {
  convertedValue: number | null;
  isLoading: boolean;
  error: string | null;
}

interface WissolInfoType {
  wissolPrices: WissolFuelInfoType[];
  isLoadingWissolInfo: boolean;
  wissolError: string | null;
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

export const sendPortalFuelInfoAtom = atom<PortalInfoType>({
  key: 'sendPortalFuelInfo',
  default: {
    company: 'Portal',
    www: 'https://portal.com.ge/georgian/newfuel',
    production: [],
  },
});

export const wissolFuelInfoAtom = atom<WissolInfoType>({
  key: 'wissolFuelInfoAtom',
  default: {
    wissolPrices: [],
    isLoadingWissolInfo: false,
    wissolError: null,
  },
  effects: [
    ({setSelf}) => {
      const fetchData = async () => {
        setSelf(() => ({
          wissolPrices: [],
          isLoadingWissolInfo: true,
          wissolError: null,
        }));
        try {
          const response = await fetchWissolFuelInfo();
          console.log('object');
          setSelf(() => ({
            wissolPrices: response,
            isLoadingWissolInfo: false,
            wissolError: null,
          }));
        } catch (error: any) {
          setSelf(() => ({
            wissolPrices: [],
            isLoadingWissolInfo: false,
            wissolError: error,
          }));
        }
      };
      fetchData();
    },
  ],
});
