// src/storage/preferences.js
import AsyncStorage from '@react-native-async-storage/async-storage';

const THEME_KEY = 'prefs:theme'; // keep keys namespaced

export async function saveTheme(theme) {
  // theme: "light" | "dark"

  // setItem => Save the data, String -> "dark" or "light"
  // set - String, Boolean, Number , 
  // Use JSON.stringify to transform (Array of Object) into String before saving
  // 1st argument - key / filename
  // 2nd argument -> data

    // for iOS -> UserDefauls
    // for Android ->  Shared Pref
  await AsyncStorage.setItem(THEME_KEY, theme);
}

export async function loadTheme() {
    // getItem => retrieve the data based on the key  -> null | String/number/boolean
    
  // Use JSON.parse toa transform the saved (Array or Object) before showing it in UI
  // 1st argument - key / filename
  // 2nd argument -> data
  
  const value = await AsyncStorage.getItem(THEME_KEY);
  return value; // null if not set
}

export async function clearTheme() {
    // clear the Asyncstorage
  await AsyncStorage.removeItem(THEME_KEY);
}
