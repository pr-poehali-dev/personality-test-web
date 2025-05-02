
import React from 'react';
import { format } from 'date-fns';
import { ru } from 'date-fns/locale';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import Icon from '@/components/ui/icon';
import { Emotion, EmotionEvent } from '@/types/test';
import { emotions } from '@/utils/emotions';

interface EmotionDayCellProps {
  date: Date;
  emotion?: EmotionEvent;
  onClick: (date: Date) => void;
  isCurrentMonth: boolean;
}

const EmotionDayCell: React.FC<EmotionDayCellProps> = ({
  date,
  emotion,
  onClick,
  isCurrentMonth,
}) => {
  const isToday = new Date().toDateString() === date.toDateString();
  
  const getEmotionById = (id: string): Emotion | undefined => {
    return emotions.find(e => e.id === id);
  };

  const emotionData = emotion ? getEmotionById(emotion.emotionId) : undefined;
  
  const formattedDate = format(date, 'd', { locale: ru });

  const cellClasses = `
    relative min-h-[60px] border border-gray-200 hover:bg-gray-50
    cursor-pointer transition-colors rounded-md
    ${isCurrentMonth ? '' : 'bg-gray-50 text-gray-400'}
    ${isToday ? 'ring-2 ring-purple-400' : ''}
  `;

  return (
    <div className={cellClasses} onClick={() => onClick(date)}>
      <div className={`absolute top-1 right-2 text-xs ${isToday ? 'font-semibold' : ''}`}>
        {formattedDate}
      </div>
      
      {emotionData && (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="mt-6 flex justify-center">
                <div 
                  className={`h-8 w-8 rounded-full bg-${emotionData.color}-100 flex items-center justify-center`}
                >
                  <Icon 
                    name={emotionData.icon} 
                    className={`h-5 w-5 text-${emotionData.color}-600`} 
                  />
                </div>
              </div>
            </TooltipTrigger>
            <TooltipContent side="bottom">
              <div className="max-w-xs">
                <p className="font-medium">{emotionData.name}</p>
                {emotion.note && (
                  <p className="text-xs mt-1 max-w-[200px] truncate">{emotion.note}</p>
                )}
                <p className="text-xs text-gray-500 mt-1">
                  {format(date, 'EEEE, d MMMM', { locale: ru })}
                </p>
              </div>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      )}
    </div>
  );
};

export default React.memo(EmotionDayCell);
