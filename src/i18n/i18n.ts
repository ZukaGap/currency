import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';

import en from './en/translation';
import ka from './ka/translation';
import {getFromStorage, writeStorage} from '../utils/asyncStorage';
import {USER_LANGUAGE} from 'constants/storage';

const GetLocale = localeString => {
  return localeString.split('_')[0];
};

// creating a language detection plugin
const languageDetector = {
  type: 'languageDetector',
  async: true, // flags below detection to be async
  detect: async callback => {
    let locale = 'ka-US';
    let savedLanguage = null;

    try {
      savedLanguage = await getFromStorage(USER_LANGUAGE);
    } catch (err) {}

    // if (Platform.OS === 'ios') {
    //   locale = GetLocale(
    //     NativeModules.SettingsManager.settings.AppleLanguages[0],
    //   );
    // } else if (Platform.OS === 'android') {
    //   locale = GetLocale(NativeModules.I18nManager.localeIdentifier);
    // }

    if (savedLanguage) {
      locale = savedLanguage;
    }
    callback(locale.replace('_', '-'));
  },
  init: () => {},
  cacheUserLanguage: async function (language) {
    try {
      await writeStorage(USER_LANGUAGE, language);
    } catch (error) {
      console.error(error);
    }
  },
};

const initTranslate = () => {
  i18n
    .use(initReactI18next)
    .use(languageDetector)
    .init({
      compatibilityJSON: 'v3',
      fallbackLng: 'ka-US',
      resources: {
        en,
        'ka-US': ka,
      },

      // have a eval namespace used around the full app
      ns: ['currency'],
      defaultNS: 'currency',

      debug: true,

      // cache: {
      //   enabled: true,
      // },
      react: {
        useSuspense: false,
      },
      interpolation: {
        escapeValue: false, // not needed for react as it does escape per default to prevent xss!
      },
    });
};

export default initTranslate;
