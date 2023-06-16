import 'react-native-gesture-handler';
import React from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {RecoilRoot} from 'recoil';
import {Host} from 'react-native-portalize';

import Routes from 'navigation/Router';

export default function App() {
  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <SafeAreaProvider>
        <Host>
          <RecoilRoot>
            <Routes />
          </RecoilRoot>
        </Host>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
