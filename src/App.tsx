import 'react-native-gesture-handler';
import React from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {RecoilRoot} from 'recoil';

import Routes from 'navigation/Router';

export default function App() {
  return (
    <RecoilRoot>
      <SafeAreaProvider>
        <Routes />
      </SafeAreaProvider>
    </RecoilRoot>
  );
}
