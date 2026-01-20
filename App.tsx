/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */


import { StatusBar, StyleSheet, useColorScheme, View } from 'react-native';
import {
  SafeAreaProvider,
  
} from 'react-native-safe-area-context';
import StorageComponent from './src/components/StorageComponent'
import ProductList from './src/components/ProductList';

function App() {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <SafeAreaProvider>
      <ProductList/>
    </SafeAreaProvider>
  );
}


export default App;
