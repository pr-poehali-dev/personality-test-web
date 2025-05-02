
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import LoginForm from '@/components/auth/LoginForm';
import { useAuth } from '@/contexts/AuthContext';

const LoginPage: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // Если пользователь уже авторизован, перенаправляем на страницу профиля
    if (user) {
      navigate('/profile');
    }
  }, [user, navigate]);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center p-4">
      <div className="my-10">
        <h1 className="text-2xl font-bold text-center text-purple-800 mb-2">
          Вход в личный кабинет
        </h1>
        <p className="text-center text-gray-600 mb-8">
          Войдите или зарегистрируйтесь, чтобы сохранять результаты и вести дневник эмоций
        </p>
        
        <LoginForm />
        
        <p className="text-center text-gray-500 mt-8 max-w-md mx-auto">
          После входа вы сможете сохранять результаты тестов и отслеживать историю дневника эмоций.
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
