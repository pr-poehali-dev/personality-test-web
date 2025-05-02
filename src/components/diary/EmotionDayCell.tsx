
import React from "react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import Icon from "@/components/ui/icon";
import { Emotion, EmotionEvent } from "@/types/test";
import { emotions } from "@/utils/emotions";

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

  return (
    <div
      className={`relative p-1 min-h-[60px] border border-gray-200 hover:bg-gray-50 cursor-pointer transition-colors
        ${isCurrentMonth ? "" : "bg-gray-50 text-gray-400"}
        ${isToday ? "ring-2 ring-purple-400 font-semibold" : ""}`}
      onClick={() => onClick(date)}
    >
      <div className="absolute top-1 right-1 text-xs text-gray-500">
        {date.getDate()}
      </div>
      
      {emotionData && (
        <div className="mt-5 flex justify-center">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <div className={`h-8 w-8 rounded-full bg-${emotionData.color}-100 flex items-center justify-center`}>
                  <Icon 
                    name={emotionData.icon} 
                    className={`h-5 w-5 text-${emotionData.color}-600`} 
                  />
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <p className="font-medium">{emotionData.name}</p>
                <p className="text-xs">{emotion.note || "Нет заметки"}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      )}
    </div>
  );
};

export default EmotionDayCell;
