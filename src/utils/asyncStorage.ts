import AsyncStorage from '@react-native-async-storage/async-storage';

export const writeStorage = async (key: string, data: string) => {
  await AsyncStorage.setItem(key, JSON.stringify(data));
};

export const getFromStorage = async (key: string): Promise<string> => {
  return JSON.parse((await AsyncStorage.getItem(key)) || '');
};

export const removeStorage = async (key: string) => {
  await AsyncStorage.removeItem(key);
};
