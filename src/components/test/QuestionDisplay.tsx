
import React, { memo } from 'react';
import { Question } from "@/types/test";
import { CardTitle } from "@/components/ui/card";
import OptionsList from "./OptionsList";
import Icon from "@/components/ui/icon";

// Кэширование для категорий вопросов
const categoryIcons: Record<string, string> = {
  'personality': "User",
  'confidence': "Shield",
  'irritability': "Zap",
  'anxiety': "AlertCircle",
  'temperament': "Heart"
};

const categoryNames: Record<string, string> = {
  'personality': "Личность",
  'confidence': "Уверенность",
  'irritability': "Раздражительность",
  'anxiety': "Тревожность",
  'temperament': "Темперамент"
};

interface QuestionDisplayProps {
  question: Question;
  selectedOption: string | null;
  onOptionSelect: (value: string) => void;
}

const QuestionDisplay: React.FC<QuestionDisplayProps> = ({ 
  question, 
  selectedOption, 
  onOptionSelect 
}) => {
  return (
    <>
      <div className="flex items-center mb-2 text-xs font-medium text-purple-500">
        <Icon name={categoryIcons[question.category] || "HelpCircle"} size={14} className="mr-1" />
        <span>{categoryNames[question.category] || "Другое"}</span>
      </div>
      <CardTitle className="text-xl mt-3 text-purple-700">
        {question.text}
      </CardTitle>
      <OptionsList 
        options={question.options}
        selectedOption={selectedOption}
        onOptionSelect={onOptionSelect}
      />
    </>
  );
};

// Мемоизируем компонент для предотвращения перерисовок при неизменных props
export default memo(QuestionDisplay);
