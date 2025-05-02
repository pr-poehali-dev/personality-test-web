
import React from 'react';
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import Icon from "@/components/ui/icon";
import { emotions } from "@/utils/emotions";
import { Emotion } from "@/types/test";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface EmotionSelectorProps {
  onSelectEmotion: (emotion: Emotion) => void;
}

const EmotionSelector: React.FC<EmotionSelectorProps> = ({ onSelectEmotion }) => {
  const [activeCategory, setActiveCategory] = React.useState("all");

  // Группируем эмоции по категориям
  const emotionCategories = {
    "all": emotions,
    "positive": emotions.filter(e => ["calm", "happy", "excited", "grateful", "love", "hopeful", "proud"].includes(e.id)),
    "negative": emotions.filter(e => ["anger", "anxiety", "sadness", "fear", "guilt", "shame", "disappointment", "frustration", "burnout"].includes(e.id)),
    "neutral": emotions.filter(e => ["confusion", "overwhelm", "surprise", "curiosity", "boredom"].includes(e.id))
  };

  const displayedEmotions = emotionCategories[activeCategory as keyof typeof emotionCategories] || emotions;

  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">Выберите эмоцию</h3>
      
      <Tabs value={activeCategory} onValueChange={setActiveCategory} className="mb-4">
        <TabsList className="w-full grid grid-cols-4">
          <TabsTrigger value="all">Все</TabsTrigger>
          <TabsTrigger value="positive">Позитивные</TabsTrigger>
          <TabsTrigger value="negative">Негативные</TabsTrigger>
          <TabsTrigger value="neutral">Нейтральные</TabsTrigger>
        </TabsList>
      </Tabs>

      <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-8 gap-2">
        {displayedEmotions.map((emotion) => (
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
