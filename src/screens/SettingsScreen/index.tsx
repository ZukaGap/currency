import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useTranslation} from 'react-i18next';
import {useRecoilState} from 'recoil';

import {DrawerWrapper, TabSwitchButton} from 'components';
import {getFromStorage} from 'utils/asyncStorage';
import {USER_LANGUAGE} from 'constants/storage';
import {getSavedLanguageAtom} from 'store/atom/getSettingsInfoAtom';

import getStyleObj from './style';
import {Drawer} from 'assets/SVG';
import {sizes} from 'styles/sizes';
import {colors} from 'styles/colors';

const SettingsScreen: React.FC = () => {
  const insets = useSafeAreaInsets();
  const styles = getStyleObj(insets);
  const drawerRef = useRef(null);
  const {t, i18n} = useTranslation();
  const [savedLanguage, setSavedLanguage] =
    useRecoilState(getSavedLanguageAtom);

  const graphsData = useMemo(() => {
    return [
      {
        label: t('screens.settings.geo'),
        value: 0, //'ka-US',
      },
      {
        label: t('screens.settings.eng'),
        value: 1, //'en',
      },
    ];
  }, [t]);

  return (
    <DrawerWrapper ref={drawerRef}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => {
            drawerRef?.current.openDrawer();
          }}>
          <Drawer width={sizes.is} height={sizes.is} fill={colors.purple} />
        </TouchableOpacity>
        <Text style={styles.title}>{t('screens.settings.name')}</Text>
      </View>
      <View style={styles.settingBody}>
        <TabSwitchButton
          defaultValue={savedLanguage?.language === 'en' ? 1 : 0}
          tabData={graphsData}
          onChange={item => {
            i18n.changeLanguage(item.value ? 'en' : 'ka-US');
          }}
        />
      </View>
    </DrawerWrapper>
  );
};

export default SettingsScreen;
