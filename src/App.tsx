import 'react-native-gesture-handler';
import React from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import Routes from 'navigation/Router';

export default function App() {
  return (
    <SafeAreaProvider>
      <Routes />
    </SafeAreaProvider>
  );
}
