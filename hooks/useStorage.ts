import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';
import { Platform } from 'react-native';

// For web
const webStorage = {
  getItem: (key: string) => Promise.resolve(localStorage.getItem(key)),
  setItem: (key: string, value: string) => Promise.resolve(localStorage.setItem(key, value)),
  removeItem: (key: string) => Promise.resolve(localStorage.removeItem(key)),
};

// For mobile (you can replace this later)
// Or use SecureStore if you need encryption

const nativeStorage = {
  getItem: (key: string) => AsyncStorage.getItem(key),
  setItem: (key: string, value: string) => AsyncStorage.setItem(key, value),
  removeItem: (key: string) => AsyncStorage.removeItem(key),
};

// Unified export
const storage = Platform.OS === 'web' ? webStorage : nativeStorage;

export function usePersistentState<T>(key: string, initialValue: T) {
  const [value, setValue] = useState<T>(initialValue);

  useEffect(() => {
    storage.getItem(key).then((stored) => {
      if (stored) setValue(JSON.parse(stored));
    });
  }, [key]);

  useEffect(() => {
    storage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue] as const;
}
