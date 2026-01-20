import React, { useEffect, useState } from 'react';
import {  Text, FlatList } from 'react-native';
import { initDatabase } from '../db/database';
import { getProducts } from '../db/productRepository';
import { SafeAreaView , SafeAreaProvider} from 'react-native-safe-area-context';

export default function App() {
 const [products, setProducts] = useState([]);

 useEffect(() => {
   (async () => {
     await initDatabase();
     const data = await getProducts();
     setProducts(data);
   })();
 }, []);

 return (
   <SafeAreaProvider>
   <SafeAreaView style={{ flex: 1, padding: 16 }}>
     <FlatList
       data={products}
       keyExtractor={item => item.id.toString()}
       renderItem={({ item }) => (
         <Text>{item.name} – RM {item.price}</Text>
       )}
     />
   </SafeAreaView>
   </SafeAreaProvider>
 );
}
