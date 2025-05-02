
import { useState, useEffect } from 'react';

function useLocalStorage<T>(key: string, initialValue: T): [T, (value: T | ((val: T) => T)) => void] {
  // Получаем сохраненное значение из localStorage
  const readValue = (): T => {
    if (typeof window === 'undefined') {
      return initialValue;
    }

    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.warn(`Ошибка чтения localStorage ключа "${key}":`, error);
      return initialValue;
    }
  };

  // Устанавливаем начальное состояние
  const [storedValue, setStoredValue] = useState<T>(readValue);

  // Функция для обновления состояния и localStorage
  const setValue = (value: T | ((val: T) => T)) => {
    try {
      // Разрешаем функцию как значение
      const valueToStore =
        value instanceof Function ? value(storedValue) : value;
      
      // Сохраняем в состояние
      setStoredValue(valueToStore);
      
      // Сохраняем в localStorage
      if (typeof window !== 'undefined') {
        window.localStorage.setItem(key, JSON.stringify(valueToStore));
      }
    } catch (error) {
      console.warn(`Ошибка записи localStorage ключа "${key}":`, error);
    }
  };

  useEffect(() => {
    setStoredValue(readValue());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return [storedValue, setValue];
}

export default useLocalStorage;
