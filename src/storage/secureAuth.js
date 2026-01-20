// src/storage/secureAuth.js
import EncryptedStorage from 'react-native-encrypted-storage';

const TOKEN_KEY = 'auth:token';

export async function saveToken(token) {

    // for iOS -> keychain
    // for Android -> Secured Shared Pref
  await EncryptedStorage.setItem(TOKEN_KEY, token);
}

export async function loadToken() {
  const value = await EncryptedStorage.getItem(TOKEN_KEY);
  console.log('token retrieved');
  console.log(value);
  return value; // null if none
}

export async function deleteToken() {
  await EncryptedStorage.removeItem(TOKEN_KEY);
}
