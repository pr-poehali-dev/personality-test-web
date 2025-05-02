
import { User } from "@/types/test";
import { generateId } from "@/lib/utils";

// Имитация базы данных пользователей (в реальном приложении будет использована настоящая БД)
let users: User[] = [];

// Получение пользователей из localStorage
const loadUsers = (): void => {
  try {
    const savedUsers = localStorage.getItem('users');
    if (savedUsers) {
      users = JSON.parse(savedUsers);
    }
  } catch (error) {
    console.error('Ошибка при загрузке пользователей:', error);
  }
};

// Сохранение пользователей в localStorage
const saveUsers = (): void => {
  try {
    localStorage.setItem('users', JSON.stringify(users));
  } catch (error) {
    console.error('Ошибка при сохранении пользователей:', error);
  }
};

// Инициализация при загрузке
loadUsers();

// Регистрация нового пользователя
export const registerUser = (email: string, name?: string): User | null => {
  // Проверка, существует ли пользователь с таким email
  if (users.some(user => user.email === email)) {
    return null;
  }

  // Создание нового пользователя
  const newUser: User = {
    id: generateId(),
    email,
    name: name || email.split('@')[0],
    createdAt: new Date(),
    testResults: [],
    emotions: []
  };

  // Добавление пользователя в базу и сохранение
  users.push(newUser);
  saveUsers();

  return newUser;
};

// Вход пользователя по email
export const loginUser = (email: string): User | null => {
  const user = users.find(user => user.email === email);
  return user || null;
};

// Обновление данных пользователя
export const updateUser = (updatedUser: User): User | null => {
  const index = users.findIndex(user => user.id === updatedUser.id);
  if (index === -1) return null;

  users[index] = updatedUser;
  saveUsers();

  return users[index];
};

// Получение пользователя по ID
export const getUserById = (userId: string): User | null => {
  return users.find(user => user.id === userId) || null;
};

// Добавление результатов теста для пользователя
export const addTestResult = (userId: string, testResult: any): User | null => {
  const user = getUserById(userId);
  if (!user) return null;

  // Добавляем ID и дату к результату теста
  const resultWithMeta = {
    ...testResult,
    id: generateId(),
    date: new Date()
  };

  // Добавляем результат к пользователю
  user.testResults = user.testResults || [];
  user.testResults.push(resultWithMeta);

  return updateUser(user);
};

// Добавление записи о эмоции для пользователя
export const addEmotionEvent = (userId: string, emotionEvent: any): User | null => {
  const user = getUserById(userId);
  if (!user) return null;

  user.emotions = user.emotions || [];
  user.emotions.push(emotionEvent);

  return updateUser(user);
};

// Получение текущего пользователя из localStorage
export const getCurrentUser = (): User | null => {
  try {
    const currentUserId = localStorage.getItem('currentUserId');
    if (!currentUserId) return null;
    
    return getUserById(currentUserId);
  } catch (error) {
    console.error('Ошибка при получении текущего пользователя:', error);
    return null;
  }
};

// Установка текущего пользователя
export const setCurrentUser = (user: User | null): void => {
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

// Выход пользователя
export const logoutUser = (): void => {
  setCurrentUser(null);
};
