
import React, {useEffect, useState} from 'react';
import { Text, View, Button, StyleSheet} from 'react-native';
import {saveTheme, loadTheme, clearTheme} from '../storage/preferences';
import {saveToken, loadToken, deleteToken} from '../storage/secureAuth';


export default function StorageComponent() {

    // create the state default it to light ...
const [theme, setTheme] = useState('light');

// create the token , default it to null
 const [token, setToken] = useState(null);

  // Load stored values on app start

  // useEffect -> Component / Page lifecycle

 useEffect(() => {
    // The initialiazation can be done on useEffect

    // IIFE -> Immediate invoked function execution
   (async () => {
    // load the Theme from the storage
     const storedTheme = await loadTheme();

     // load dark or light in the component state
     if (storedTheme) setTheme(storedTheme);

     const storedToken = await loadToken();
     if (storedToken) setToken(storedToken);
   })();


   // useEffect with [] -> Once per componenent load
   // [counter] = > Will be invoked everytime the value of state/counter change
   // useEffect(()=> { }) -> Everytime it will run
 
}, []);
  const isDark = theme === 'dark';


  return (
    // add the styles container +.   if darik is true ? styles.dark : styles.light 
    <View  style={[styles.container, isDark ? styles.dark : styles.light]}>
      <Text style={[styles.title, isDark ? styles.textDark : styles.textLight]}>
       Storage Lab
     </Text>

     <View style={styles.section}>
       <Text style={[styles.sectionTitle, isDark ? styles.textDark : styles.textLight]}>
         AsyncStorage (Preference)
       </Text>
       <Text style={isDark ? styles.textDark : styles.textLight}>
         Current theme: {theme}
       </Text>

       <Button
         title="Toggle Theme"
         onPress={async () => {
           const next = theme === 'light' ? 'dark' : 'light';
           setTheme(next);
           await saveTheme(next);
         }}
       />
       <View style={{height: 8}} />
       <Button
         title="Clear Saved Theme"
         onPress={async () => {
            // call the clearTheme method from the StorageComponent
           await clearTheme();
           setTheme('light');
         }}
       />
     </View>

     <View style={styles.section}>
       <Text style={[styles.sectionTitle, isDark ? styles.textDark : styles.textLight]}>
         Secure Storage (Token)
       </Text>

       <Text style={isDark ? styles.textDark : styles.textLight}>
         Token status: {token ? '✅ stored' : '❌ none'}
       </Text>

       <Button
         title="Login (Save Token)"
         onPress={async () => {
           const fakeToken = `jwt_${Date.now()}`;
           await saveToken(fakeToken);
           setToken(fakeToken);
         }}
       />
       <View style={{height: 8}} />
       <Button
         title="Logout (Delete Token)"
         onPress={async () => {
           await deleteToken();
           setToken(null);
         }}
       />
     </View>

    </View>
  )
}

const styles = StyleSheet.create({
 container: {flex: 1, padding: 16, justifyContent: 'center'},
 title: {fontSize: 24, fontWeight: '700', marginBottom: 20},
 section: {marginTop: 18, gap: 8},
 sectionTitle: {fontSize: 18, fontWeight: '600'},
 light: {backgroundColor: '#fff'},
 dark: {backgroundColor: '#111'},
 textLight: {color: '#111'},
 textDark: {color: '#fff'},
});
