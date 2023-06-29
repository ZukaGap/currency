import {atom} from 'recoil';
import {
  fetchCurrencies,
  CurrenciesType,
  fetchCurrencyCodes,
  CurrencyCodesType,
  fetchBOGCurrencies,
} from 'config/Axios/getAPI';

interface CurrenciesStateType {
  data: {
    NBG: CurrenciesType[];
    BOG: CurrenciesType[];
  };
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
    data: {NBG: [], BOG: []},
    isLoading: false,
    error: null,
  },
  effects: [
    ({setSelf}) => {
      const fetchData = async () => {
        setSelf(() => ({
          data: {NBG: [], BOG: []},
          isLoading: true,
          error: null,
        }));
        try {
          const responseNBG = await fetchCurrencies(new Date());
          const responseBOG = await fetchBOGCurrencies();

          setSelf(() => ({
            data: {
              NBG: responseNBG,
              BOG: responseBOG,
            },
            isLoading: false,
            error: null,
          }));
        } catch (error: any) {
          setSelf(() => ({
            data: {NBG: [], BOG: []},
            isLoading: false,
            error: error,
          }));
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
