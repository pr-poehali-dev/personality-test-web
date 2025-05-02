
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import Icon from '@/components/ui/icon';
import { useAuth } from '@/contexts/AuthContext';
import { getInitials, formatDate } from '@/lib/utils';
import { TestResults } from '@/types/test';

const ProfilePage: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    // Перенаправляем неавторизованных пользователей на страницу входа
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);

  if (!user) {
    return null; // Не рендерим страницу для неавторизованных пользователей
  }

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="container mx-auto max-w-4xl">
        <h1 className="text-2xl font-bold text-purple-800 mb-6">Личный кабинет</h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Сайдбар с информацией о пользователе */}
          <div className="col-span-1">
            <Card>
              <CardHeader className="pb-4">
                <div className="flex flex-col items-center">
                  <Avatar className="h-24 w-24 mb-4">
                    <AvatarImage src="" alt={user.name || user.email} />
                    <AvatarFallback className="text-2xl bg-purple-100 text-purple-800">
                      {getInitials(user.name || user.email)}
                    </AvatarFallback>
                  </Avatar>
                  <CardTitle className="text-center">{user.name || 'Пользователь'}</CardTitle>
                  <CardDescription className="text-center">{user.email}</CardDescription>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col space-y-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Аккаунт создан:</span>
                    <span className="font-medium">{formatDate(new Date(user.createdAt))}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Тестов пройдено:</span>
                    <span className="font-medium">{user.testResults?.length || 0}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Записей эмоций:</span>
                    <span className="font-medium">{user.emotions?.length || 0}</span>
                  </div>
                  
                  <Separator className="my-2" />
                  
                  <Button 
                    variant="outline" 
                    className="w-full justify-start"
                    onClick={() => navigate('/profile/edit')}
                  >
                    <Icon name="Settings" className="mr-2 h-4 w-4" />
                    Редактировать профиль
                  </Button>
                  <Button 
                    variant="destructive" 
                    className="w-full"
                    onClick={handleLogout}
                  >
                    <Icon name="LogOut" className="mr-2 h-4 w-4" />
                    Выйти
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Основная область контента */}
          <div className="col-span-1 md:col-span-2">
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="w-full grid grid-cols-3">
                <TabsTrigger value="overview">Обзор</TabsTrigger>
                <TabsTrigger value="tests">Тесты</TabsTrigger>
                <TabsTrigger value="emotions">Эмоции</TabsTrigger>
              </TabsList>
              
              <TabsContent value="overview" className="mt-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Добро пожаловать, {user.name || 'Пользователь'}!</CardTitle>
                    <CardDescription>
                      Здесь вы можете видеть общую статистику и последние результаты
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    {!user.testResults || user.testResults.length === 0 ? (
                      <div className="bg-gray-50 p-6 rounded-md text-center">
                        <Icon name="ClipboardCheck" className="h-12 w-12 text-gray-300 mx-auto mb-2" />
                        <h3 className="text-lg font-medium text-gray-700 mb-1">У вас пока нет результатов тестов</h3>
                        <p className="text-gray-500 mb-4">Пройдите психологический тест, чтобы узнать больше о себе</p>
                        <Button onClick={() => navigate('/test')}>
                          Пройти тест
                        </Button>
                      </div>
                    ) : (
                      <div className="space-y-6">
                        <div className="grid grid-cols-2 gap-4">
                          <div className="bg-purple-50 p-4 rounded-md">
                            <div className="text-sm text-purple-700 mb-1">Последний тест</div>
                            <div className="font-medium">{formatDate(new Date(user.testResults[user.testResults.length - 1].date || new Date()))}</div>
                          </div>
                          <div className="bg-blue-50 p-4 rounded-md">
                            <div className="text-sm text-blue-700 mb-1">MBTI тип</div>
                            <div className="font-medium">
                              {user.testResults[user.testResults.length - 1].mbti?.type || 'Не определен'}
                            </div>
                          </div>
                        </div>
                        
                        <Button 
                          variant="outline" 
                          className="w-full"
                          onClick={() => navigate('/profile/results')}
                        >
                          <Icon name="BarChart" className="mr-2 h-4 w-4" />
                          Просмотреть все результаты
                        </Button>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="tests" className="mt-4">
                <Card>
                  <CardHeader>
                    <CardTitle>История тестов</CardTitle>
                    <CardDescription>
                      Все пройденные вами психологические тесты
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    {!user.testResults || user.testResults.length === 0 ? (
                      <div className="text-center py-6">
                        <p className="text-gray-500">У вас пока нет пройденных тестов</p>
                        <Button 
                          onClick={() => navigate('/test')}
                          className="mt-4"
                        >
                          Пройти тест сейчас
                        </Button>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        {user.testResults.map((result: TestResults, index: number) => (
                          <div 
                            key={result.id || index}
                            className="border rounded-md p-4 hover:bg-gray-50 transition-colors cursor-pointer"
                            onClick={() => navigate(`/profile/results/${result.id}`)}
                          >
                            <div className="flex justify-between items-center">
                              <div>
                                <div className="font-medium">
                                  {result.mbti?.type ? `MBTI: ${result.mbti.type}` : 'Психологический тест'}
                                </div>
                                <div className="text-sm text-gray-500">
                                  {formatDate(new Date(result.date || new Date()))}
                                </div>
                              </div>
                              <Icon name="ChevronRight" className="h-5 w-5 text-gray-400" />
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="emotions" className="mt-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Дневник эмоций</CardTitle>
                    <CardDescription>
                      История ваших эмоциональных записей
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    {!user.emotions || user.emotions.length === 0 ? (
                      <div className="text-center py-6">
                        <p className="text-gray-500">У вас пока нет записей в дневнике эмоций</p>
                        <Button 
                          onClick={() => navigate('/diary')}
                          className="mt-4"
                        >
                          Начать вести дневник
                        </Button>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        {user.emotions.slice(0, 5).map((emotion, index) => (
                          <div key={index} className="border rounded-md p-4">
                            <div className="flex justify-between items-center mb-2">
                              <div className="font-medium">
                                {emotion.emotionId.charAt(0).toUpperCase() + emotion.emotionId.slice(1)}
                              </div>
                              <div className="text-sm text-gray-500">
                                {formatDate(new Date(emotion.date))}
                              </div>
                            </div>
                            {emotion.note && (
                              <p className="text-sm text-gray-700 line-clamp-2">{emotion.note}</p>
                            )}
                          </div>
                        ))}
                        
                        {user.emotions.length > 5 && (
                          <Button 
                            variant="outline" 
                            className="w-full"
                            onClick={() => navigate('/diary')}
                          >
                            <span>Просмотреть все записи ({user.emotions.length})</span>
                          </Button>
                        )}
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
