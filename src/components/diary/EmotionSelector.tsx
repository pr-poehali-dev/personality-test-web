
import React from 'react';
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import Icon from "@/components/ui/icon";
import { emotions } from "@/utils/emotions";
import { Emotion } from "@/types/test";

interface EmotionSelectorProps {
  onSelectEmotion: (emotion: Emotion) => void;
}

const EmotionSelector: React.FC<EmotionSelectorProps> = ({ onSelectEmotion }) => {
  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">Выберите эмоцию</h3>
      <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-10 gap-2">
        {emotions.map((emotion) => (
          <TooltipProvider key={emotion.id} delayDuration={300}>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="outline"
                  size="icon"
                  className={`h-10 w-10 rounded-full bg-${emotion.color}-100 border-${emotion.color}-300 hover:bg-${emotion.color}-200`}
                  onClick={() => onSelectEmotion(emotion)}
                >
                  <Icon name={emotion.icon} className={`h-5 w-5 text-${emotion.color}-600`} />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>{emotion.name}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        ))}
      </div>
    </div>
  );
};

export default EmotionSelector;
