import {atom} from 'recoil';
import {
  fetchWissolFuelInfo,
  FuelInfoType,
  fetchSocarFuelInfo,
} from 'config/Axios/getAPI';

interface WissolInfoType {
  wissolPrices: FuelInfoType[];
  isLoadingWissolInfo: boolean;
  wissolError: string | null;
}

interface SocarInfoType {
  socarPrices: FuelInfoType[];
  isLoadingSocarInfo: boolean;
  socarError: string | null;
}

export const sendPortalFuelInfoAtom = atom<FuelInfoType[]>({
  key: 'sendPortalFuelInfo',
  default: [],
});

export const sendRompetrolFuelInfoAtom = atom<FuelInfoType[]>({
  key: 'sendRompetrolFuelInfoAtom',
  default: [],
});

export const sendGulfFuelInfoAtom = atom<FuelInfoType[]>({
  key: 'sendGulfFuelInfoAtom',
  default: [],
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

export const socarFuelInfoAtom = atom<SocarInfoType>({
  key: 'socarFuelInfoAtom',
  default: {
    socarPrices: [],
    isLoadingSocarInfo: false,
    socarError: null,
  },
  effects: [
    ({setSelf}) => {
      const fetchData = async () => {
        setSelf(() => ({
          socarPrices: [],
          isLoadingSocarInfo: true,
          socarError: null,
        }));
        try {
          const response = await fetchSocarFuelInfo();
          setSelf(() => ({
            socarPrices: response,
            isLoadingSocarInfo: false,
            socarError: null,
          }));
        } catch (error: any) {
          setSelf(() => ({
            socarPrices: [],
            isLoadingSocarInfo: false,
            socarError: error,
          }));
        }
      };
      fetchData();
    },
  ],
});

export const sendLukoilInfoAtom = atom<FuelInfoType[]>({
  key: 'sendLukoilFuelInfoAtom',
  default: [],
});
