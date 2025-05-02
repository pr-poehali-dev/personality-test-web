
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import Icon from '@/components/ui/icon';
import { MbtiResult } from '@/types/test';

interface MbtiTypeCardProps {
  mbtiResult: MbtiResult;
}

const MbtiTypeCard: React.FC<MbtiTypeCardProps> = ({ mbtiResult }) => {
  const { type, title, description } = mbtiResult;
  
  // Получаем иконку для типа MBTI
  const getMbtiIcon = (mbtiType: string): string => {
    // Первая буква типа определяет базовую категорию иконки
    const firstLetter = mbtiType.charAt(0);
    
    switch(firstLetter) {
      case 'I': return 'BookOpen';     // Интроверт - книга
      case 'E': return 'Users';        // Экстраверт - группа людей
      default: return 'User';
    }
  };
  
  // Определяем цвет для типа MBTI
  const getMbtiColor = (mbtiType: string): string => {
    // Используем третью букву для определения цвета
    const thirdLetter = mbtiType.charAt(2);
    
    switch(thirdLetter) {
      case 'T': return 'blue';      // Мышление - синий
      case 'F': return 'purple';    // Чувство - фиолетовый
      default: return 'indigo';
    }
  };
  
  const iconName = getMbtiIcon(type);
  const color = getMbtiColor(type);
  
  return (
    <Card className={`border-${color}-200 overflow-hidden`}>
      <div className="bg-purple-600 p-4 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-xl font-bold">{type} - {title}</h3>
            <p className="text-purple-100 mt-1">Тип по Майерс-Бриггс</p>
          </div>
          <div className="bg-purple-500 p-2 rounded-full">
            <Icon name={iconName} size={28} className="text-white" />
          </div>
        </div>
      </div>
      
      <CardContent className="pt-4">
        <p className="text-gray-700 max-h-40 overflow-y-auto text-sm">{description}</p>
        
        <div className="mt-4 grid grid-cols-4 gap-2">
          {type.split('').map((letter, index) => (
            <div key={index} className="text-center p-2 rounded-md bg-purple-50 border border-purple-100">
              <span className="text-purple-600 font-semibold">{letter}</span>
              <span className="block text-xs text-gray-500">
                {getLetterMeaning(letter)}
              </span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

// Расшифровка букв MBTI
const getLetterMeaning = (letter: string): string => {
  switch(letter) {
    case 'I': return 'Интроверсия';
    case 'E': return 'Экстраверсия';
    case 'S': return 'Сенсорика';
    case 'N': return 'Интуиция';
    case 'T': return 'Мышление';
    case 'F': return 'Чувство';
    case 'J': return 'Суждение';
    case 'P': return 'Восприятие';
    default: return '';
  }
};

export default MbtiTypeCard;
