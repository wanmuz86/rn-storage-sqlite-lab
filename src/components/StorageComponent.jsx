
import React, {useEffect, useState} from 'react';
import { Text, View, Button, StyleSheet} from 'react-native';
import {saveTheme, loadTheme, clearTheme} from '../storage/preferences';
import {saveToken, loadToken, deleteToken} from '../storage/secureAuth';


export default function StorageComponent() {

const [theme, setTheme] = useState('light');
 const [token, setToken] = useState(null);

  // Load stored values on app start
 useEffect(() => {
   (async () => {
     const storedTheme = await loadTheme();
     if (storedTheme) setTheme(storedTheme);

     const storedToken = await loadToken();
     if (storedToken) setToken(storedToken);
   })();
 }, []);
  const isDark = theme === 'dark';


  return (
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
