import {atom} from 'recoil';
import {fetchCurrencies, CurrenciesType} from '../../config/Axios/getAPI';

interface CurrenciesStateType {
  data: CurrenciesType[];
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
  effects_UNSTABLE: [
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
