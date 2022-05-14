import AsyncStorage from '@react-native-community/async-storage';

export const setLocalValue = async <T extends object>(
  key: string,
  defaultValue: T,
  callback: (defaultValue: T) => void
) => {
  if (callback) {
    try {
      const res = await AsyncStorage.getItem(key);

      const oldValue = res && JSON.parse(res);

      const newValue = callback(!oldValue ? defaultValue : oldValue);

      await AsyncStorage.setItem(key, JSON.stringify(newValue));
    } catch (error) {
      const newValue = callback(defaultValue);

      await AsyncStorage.setItem(key, JSON.stringify(newValue));
    }
  } else {
    await AsyncStorage.setItem(key, JSON.stringify(defaultValue));
  }
};

export const getLocalValue = async <T extends object>(
  key: string,
  defaultValue: T
): Promise<T> => {
  try {
    const res = await AsyncStorage.getItem(key);

    const value = res && JSON.parse(res);

    return !value ? value : defaultValue;
  } catch (error) {
    return defaultValue;
  }
};
