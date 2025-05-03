
import React, { useState, useCallback, useMemo, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { format, startOfMonth, endOfMonth, startOfWeek, endOfWeek, eachDayOfInterval, isSameMonth, addMonths, subMonths } from 'date-fns';
import { ru } from 'date-fns/locale';
import Icon from "@/components/ui/icon";
import { EmotionEvent } from '@/types/test';
import useLocalStorage from '@/hooks/useLocalStorage';
import EmotionDayCell from '@/components/diary/EmotionDayCell';
import EmotionDialog from '@/components/diary/EmotionDialog';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/components/ui/use-toast';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const DiaryPage: React.FC = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [currentDate, setCurrentDate] = useState(new Date());
  const [emotionEvents, setEmotionEvents] = useLocalStorage<EmotionEvent[]>('emotion-diary', []);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // Объединяем локальные и пользовательские эмоции
  const allEmotions = useMemo(() => {
    const userEmotions = user?.emotions || [];
    // Преобразуем даты из строк в объекты Date для пользовательских эмоций
    const processedUserEmotions = userEmotions.map(emotion => ({
      ...emotion,
      date: new Date(emotion.date)
    }));
    
    return [...emotionEvents, ...processedUserEmotions];
  }, [emotionEvents, user?.emotions]);

  // Генерируем дни для текущего месяца
  const calendarDays = useMemo(() => {
    const monthStart = startOfMonth(currentDate);
    const monthEnd = endOfMonth(currentDate);
    const startDate = startOfWeek(monthStart, { locale: ru });
    const endDate = endOfWeek(monthEnd, { locale: ru });

    return eachDayOfInterval({ start: startDate, end: endDate });
  }, [currentDate]);

  // Обработчики навигации
  const goToPreviousMonth = () => setCurrentDate(subMonths(currentDate, 1));
  const goToNextMonth = () => setCurrentDate(addMonths(currentDate, 1));
  const goToCurrentMonth = () => setCurrentDate(new Date());

  // Получить эмоцию для указанной даты
  const getEmotionForDate = useCallback((date: Date): EmotionEvent | undefined => {
    return allEmotions.find(event => 
      new Date(event.date).toDateString() === date.toDateString()
    );
  }, [allEmotions]);

  // Обработчик клика по дню
  const handleDayClick = (date: Date) => {
    setSelectedDate(date);
    setIsDialogOpen(true);
  };

  // Сохранение эмоции
  const handleSaveEmotion = (emotionEvent: EmotionEvent) => {
    try {
      // Удаляем существующую запись для этой даты из локального хранилища, если она есть
      const filteredEvents = emotionEvents.filter(event => 
        new Date(event.date).toDateString() !== new Date(emotionEvent.date).toDateString()
      );
      
      // Добавляем новую запись в локальное хранилище
      setEmotionEvents([...filteredEvents, emotionEvent]);
      
      toast({
        title: "Эмоция сохранена",
        description: "Запись добавлена в ваш дневник эмоций",
      });
    } catch (error) {
      console.error('Ошибка при сохранении эмоции:', error);
      toast({
        title: "Ошибка сохранения",
        description: "Не удалось сохранить запись. Пожалуйста, попробуйте снова.",
        variant: "destructive",
      });
    }
  };

  // Получаем существующую эмоцию для выбранной даты
  const existingEmotion = selectedDate ? getEmotionForDate(selectedDate) : undefined;

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      
      <div className="flex-1 p-4">
        <header className="w-full max-w-5xl mx-auto py-6">
          <h1 className="text-2xl md:text-3xl font-bold text-center text-purple-800">
            Дневник эмоций
          </h1>
          <p className="text-center text-gray-600 mt-2">
            Отслеживайте свои эмоции и получайте рекомендации для улучшения самочувствия
          </p>
        </header>

        <main className="flex-1 w-full max-w-5xl mx-auto">
          <Card className="border-purple-200 shadow-md">
            <CardHeader className="flex flex-row items-center justify-between">
              <div className="flex items-center space-x-4">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={goToPreviousMonth}
                  className="h-8 w-8 p-0"
                >
                  <Icon name="ChevronLeft" className="h-4 w-4" />
                </Button>
                <CardTitle className="text-xl capitalize">
                  {format(currentDate, 'LLLL yyyy', { locale: ru })}
                </CardTitle>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={goToNextMonth}
                  className="h-8 w-8 p-0"
                >
                  <Icon name="ChevronRight" className="h-4 w-4" />
                </Button>
              </div>
              <Button 
                variant="ghost" 
                onClick={goToCurrentMonth}
                className="text-sm"
              >
                Сегодня
              </Button>
            </CardHeader>
            <CardContent>
              {/* Дни недели */}
              <div className="grid grid-cols-7 gap-1 mb-2">
                {['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'].map((day, i) => (
                  <div 
                    key={i} 
                    className="text-center text-sm font-medium py-2 text-gray-600"
                  >
                    {day}
                  </div>
                ))}
              </div>
              
              {/* Календарь */}
              <div className="grid grid-cols-7 gap-2">
                {calendarDays.map((day) => (
                  <EmotionDayCell
                    key={day.toString()} 
                    date={day}
                    emotion={getEmotionForDate(day)}
                    onClick={handleDayClick}
                    isCurrentMonth={isSameMonth(day, currentDate)}
                  />
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Статистика эмоций */}
          <Card className="border-purple-200 shadow-md mt-6">
            <CardHeader>
              <CardTitle className="text-xl">Ваша статистика эмоций</CardTitle>
            </CardHeader>
            <CardContent>
              {allEmotions.length > 0 ? (
                <div>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="bg-blue-50 p-4 rounded-lg text-center">
                      <div className="text-2xl font-bold text-blue-600">{allEmotions.length}</div>
                      <div className="text-sm text-gray-600">Всего записей</div>
                    </div>
                    <div className="bg-green-50 p-4 rounded-lg text-center">
                      <div className="text-2xl font-bold text-green-600">
                        {allEmotions.filter(e => ['happy', 'grateful', 'hopeful', 'excited', 'proud', 'love'].includes(e.emotionId)).length}
                      </div>
                      <div className="text-sm text-gray-600">Позитивные эмоции</div>
                    </div>
                    <div className="bg-red-50 p-4 rounded-lg text-center">
                      <div className="text-2xl font-bold text-red-600">
                        {allEmotions.filter(e => ['anger', 'anxiety', 'sadness', 'fear', 'disappointment'].includes(e.emotionId)).length}
                      </div>
                      <div className="text-sm text-gray-600">Негативные эмоции</div>
                    </div>
                    <div className="bg-purple-50 p-4 rounded-lg text-center">
                      <div className="text-2xl font-bold text-purple-600">
                        {new Set(allEmotions.map(e => e.emotionId)).size}
                      </div>
                      <div className="text-sm text-gray-600">Разных эмоций</div>
                    </div>
                  </div>
                  
                  <p className="text-center mt-6 text-gray-600">
                    Регулярное отслеживание эмоций помогает лучше понять себя и научиться управлять своим эмоциональным состоянием.
                  </p>
                </div>
              ) : (
                <div className="text-center py-6">
                  <Icon name="Calendar" className="h-12 w-12 text-gray-300 mx-auto mb-2" />
                  <h3 className="text-lg font-medium text-gray-700 mb-1">Ваш дневник эмоций пуст</h3>
                  <p className="text-gray-500 mb-4">Нажмите на любой день в календаре, чтобы добавить запись о своей эмоции</p>
                </div>
              )}
            </CardContent>
          </Card>
        </main>
      </div>
      
      {/* Диалог для записи эмоции */}
      <EmotionDialog
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        selectedDate={selectedDate}
        onSaveEmotion={handleSaveEmotion}
        existingEmotion={existingEmotion}
      />
      
      <Footer />
    </div>
  );
};

export default DiaryPage;
