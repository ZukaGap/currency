import React from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {gestureHandlerRootHOC} from 'react-native-gesture-handler';
import {RecoilRoot} from 'recoil';
import {Host} from 'react-native-portalize';

import Routes from 'navigation/Router';

function App() {
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

export default gestureHandlerRootHOC(App);
