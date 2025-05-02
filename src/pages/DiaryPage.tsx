
import React, { useState, useCallback, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { format, startOfMonth, endOfMonth, startOfWeek, endOfWeek, eachDayOfInterval, isSameMonth, addMonths, subMonths } from 'date-fns';
import { ru } from 'date-fns/locale';
import Icon from "@/components/ui/icon";
import { EmotionEvent } from '@/types/test';
import useLocalStorage from '@/hooks/useLocalStorage';
import EmotionDayCell from '@/components/diary/EmotionDayCell';
import EmotionDialog from '@/components/diary/EmotionDialog';

const DiaryPage: React.FC = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [emotionEvents, setEmotionEvents] = useLocalStorage<EmotionEvent[]>('emotion-diary', []);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

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
    return emotionEvents.find(event => 
      new Date(event.date).toDateString() === date.toDateString()
    );
  }, [emotionEvents]);

  // Обработчик клика по дню
  const handleDayClick = (date: Date) => {
    setSelectedDate(date);
    setIsDialogOpen(true);
  };

  // Сохранение эмоции
  const handleSaveEmotion = (emotionEvent: EmotionEvent) => {
    // Удаляем существующую запись для этой даты, если она есть
    const filteredEvents = emotionEvents.filter(event => 
      new Date(event.date).toDateString() !== new Date(emotionEvent.date).toDateString()
    );
    
    // Добавляем новую запись
    setEmotionEvents([...filteredEvents, emotionEvent]);
  };

  // Получаем существующую эмоцию для выбранной даты
  const existingEmotion = selectedDate ? getEmotionForDate(selectedDate) : undefined;

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 p-4">
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
              <CardTitle className="text-xl">
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
            <div className="grid grid-cols-7 gap-1 mb-1">
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
            <div className="grid grid-cols-7 gap-1">
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
      </main>
      
      {/* Диалог для записи эмоции */}
      <EmotionDialog
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        selectedDate={selectedDate}
        onSaveEmotion={handleSaveEmotion}
        existingEmotion={existingEmotion}
      />
    </div>
  );
};

export default DiaryPage;
