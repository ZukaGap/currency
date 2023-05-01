import 'react-native-gesture-handler';
import React from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {RecoilRoot} from 'recoil';
import {Host} from 'react-native-portalize';

import Routes from 'navigation/Router';

export default function App() {
  return (
    <SafeAreaProvider>
      <Host>
        <RecoilRoot>
          <Routes />
        </RecoilRoot>
      </Host>
    </SafeAreaProvider>
  );
}
