
import { useState, useEffect } from 'react';

function useLocalStorage<T>(key: string, initialValue: T): [T, (value: T) => void] {
  // Получаем сохраненное значение или используем initialValue
  const readValue = (): T => {
    if (typeof window === 'undefined') {
      return initialValue;
    }

    try {
      const item = window.localStorage.getItem(key);
      return item ? (JSON.parse(item) as T) : initialValue;
    } catch (error) {
      console.warn(`Ошибка при чтении localStorage ключа "${key}":`, error);
      return initialValue;
    }
  };

  // Храним состояние
  const [storedValue, setStoredValue] = useState<T>(readValue);

  // Функция для обновления как состояния, так и localStorage
  const setValue = (value: T) => {
    try {
      // Сохраняем в state
      setStoredValue(value);
      
      // Сохраняем в localStorage
      if (typeof window !== 'undefined') {
        window.localStorage.setItem(key, JSON.stringify(value));
      }
    } catch (error) {
      console.warn(`Ошибка при установке localStorage ключа "${key}":`, error);
    }
  };

  // Синхронизируем с localStorage при изменении ключа
  useEffect(() => {
    setStoredValue(readValue());
  }, [key]);

  return [storedValue, setValue];
}

export default useLocalStorage;
