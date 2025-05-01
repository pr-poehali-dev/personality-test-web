
import React from 'react';
import { Question } from "@/types/test";
import { CardTitle } from "@/components/ui/card";
import OptionsList from "./OptionsList";
import Icon from "@/components/ui/icon";

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
  // Определение иконки для категории вопроса
  const getCategoryIcon = (category: string) => {
    switch(category) {
      case 'personality': return "User";
      case 'confidence': return "Shield";
      case 'irritability': return "Zap";
      case 'anxiety': return "AlertCircle";
      case 'temperament': return "Heart";
      default: return "HelpCircle";
    }
  };

  // Определение названия категории
  const getCategoryName = (category: string) => {
    switch(category) {
      case 'personality': return "Личность";
      case 'confidence': return "Уверенность";
      case 'irritability': return "Раздражительность";
      case 'anxiety': return "Тревожность";
      case 'temperament': return "Темперамент";
      default: return "Другое";
    }
  };

  return (
    <>
      <div className="flex items-center mb-2 text-xs font-medium text-purple-500">
        <Icon name={getCategoryIcon(question.category)} size={14} className="mr-1" />
        <span>{getCategoryName(question.category)}</span>
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

export default QuestionDisplay;
