import React from 'react';
import {LogBox} from 'react-native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {gestureHandlerRootHOC} from 'react-native-gesture-handler';
import {RecoilRoot} from 'recoil';
import {Host} from 'react-native-portalize';
import FlipperAsyncStorage from 'rn-flipper-async-storage-advanced';

import Routes from 'navigation/Router';
import initTranslate from 'i18n/i18n';

initTranslate();
LogBox.ignoreAllLogs(true);

function App() {
  return (
    <SafeAreaProvider>
      <FlipperAsyncStorage />
      <Host>
        <RecoilRoot>
          <Routes />
        </RecoilRoot>
      </Host>
    </SafeAreaProvider>
  );
}

export default gestureHandlerRootHOC(App);
