import {atom} from 'recoil';

import {LanguageType} from 'types/settingsTypes';

export const getSavedLanguageAtom = atom<LanguageType>({
  key: 'getChosenLanguage',
  default: {
    language: '',
  },
});
