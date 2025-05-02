
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User } from '@/types/test';
import { getCurrentUser, loginUser, registerUser, logoutUser, updateUser, addTestResult, addEmotionEvent } from '@/utils/authentication';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string) => Promise<{ success: boolean; message?: string }>;
  register: (email: string, name?: string) => Promise<{ success: boolean; message?: string }>;
  logout: () => void;
  updateUserInfo: (updatedUser: User) => Promise<boolean>;
  addTestResultToUser: (testResult: any) => Promise<boolean>;
  addEmotionEventToUser: (emotionEvent: any) => Promise<boolean>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Проверка наличия текущего пользователя при загрузке
  useEffect(() => {
    const loadUser = async () => {
      const currentUser = getCurrentUser();
      setUser(currentUser);
      setLoading(false);
    };

    loadUser();
  }, []);

  // Функция входа
  const login = async (email: string): Promise<{ success: boolean; message?: string }> => {
    try {
      const user = loginUser(email);
      
      if (!user) {
        return { success: false, message: "Пользователь не найден. Пожалуйста, зарегистрируйтесь." };
      }

      setUser(user);
      setCurrentUser(user);
      return { success: true };
    } catch (error) {
      console.error('Ошибка при входе:', error);
      return { success: false, message: "Произошла ошибка при входе. Пожалуйста, попробуйте снова." };
    }
  };

  // Функция регистрации
  const register = async (email: string, name?: string): Promise<{ success: boolean; message?: string }> => {
    try {
      const newUser = registerUser(email, name);
      
      if (!newUser) {
        return { success: false, message: "Пользователь с таким email уже существует." };
      }

      setUser(newUser);
      setCurrentUser(newUser);
      return { success: true };
    } catch (error) {
      console.error('Ошибка при регистрации:', error);
      return { success: false, message: "Произошла ошибка при регистрации. Пожалуйста, попробуйте снова." };
    }
  };

  // Функция выхода
  const logout = () => {
    logoutUser();
    setUser(null);
  };

  // Обновление информации о пользователе
  const updateUserInfo = async (updatedUser: User): Promise<boolean> => {
    try {
      const updated = updateUser(updatedUser);
      if (updated) {
        setUser(updated);
        return true;
      }
      return false;
    } catch (error) {
      console.error('Ошибка при обновлении пользователя:', error);
      return false;
    }
  };

  // Добавление результата теста
  const addTestResultToUser = async (testResult: any): Promise<boolean> => {
    if (!user) return false;
    
    try {
      const updated = addTestResult(user.id, testResult);
      if (updated) {
        setUser(updated);
        return true;
      }
      return false;
    } catch (error) {
      console.error('Ошибка при добавлении результата теста:', error);
      return false;
    }
  };

  // Добавление записи о эмоции
  const addEmotionEventToUser = async (emotionEvent: any): Promise<boolean> => {
    if (!user) return false;
    
    try {
      const updated = addEmotionEvent(user.id, emotionEvent);
      if (updated) {
        setUser(updated);
        return true;
      }
      return false;
    } catch (error) {
      console.error('Ошибка при добавлении эмоции:', error);
      return false;
    }
  };

  const setCurrentUser = (user: User | null) => {
    try {
      if (user) {
        localStorage.setItem('currentUserId', user.id);
      } else {
        localStorage.removeItem('currentUserId');
      }
    } catch (error) {
      console.error('Ошибка при установке текущего пользователя:', error);
    }
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      loading, 
      login, 
      register, 
      logout, 
      updateUserInfo,
      addTestResultToUser,
      addEmotionEventToUser
    }}>
      {children}
    </AuthContext.Provider>
  );
};

// Хук для использования контекста аутентификации
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
