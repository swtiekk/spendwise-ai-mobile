import AsyncStorage from '@react-native-async-storage/async-storage';

const prefix = 'spendwise';

/**
 * Local storage service for persisting data on device
 */
export const storageService = {
  /**
   * Save data to local storage
   */
  setItem: async <T>(key: string, value: T): Promise<void> => {
    try {
      const prefixedKey = `${prefix}:${key}`;
      const serialized = JSON.stringify(value);
      await AsyncStorage.setItem(prefixedKey, serialized);
    } catch (error) {
      console.error(`Failed to set ${key}:`, error);
      throw error;
    }
  },

  /**
   * Retrieve data from local storage
   */
  getItem: async <T>(key: string): Promise<T | null> => {
    try {
      const prefixedKey = `${prefix}:${key}`;
      const item = await AsyncStorage.getItem(prefixedKey);
      return item ? JSON.parse(item) : null;
    } catch (error) {
      console.error(`Failed to get ${key}:`, error);
      throw error;
    }
  },

  /**
   * Remove data from local storage
   */
  removeItem: async (key: string): Promise<void> => {
    try {
      const prefixedKey = `${prefix}:${key}`;
      await AsyncStorage.removeItem(prefixedKey);
    } catch (error) {
      console.error(`Failed to remove ${key}:`, error);
      throw error;
    }
  },

  /**
   * Clear all data from local storage
   */
  clear: async (): Promise<void> => {
    try {
      const allKeys = await AsyncStorage.getAllKeys();
      const prefixedKeys = allKeys.filter((k) => k.startsWith(prefix));
      await AsyncStorage.multiRemove(prefixedKeys);
    } catch (error) {
      console.error('Failed to clear storage:', error);
      throw error;
    }
  },

  /**
   * Check if key exists
   */
  hasItem: async (key: string): Promise<boolean> => {
    try {
      const item = await storageService.getItem(key);
      return item !== null;
    } catch {
      return false;
    }
  },
};