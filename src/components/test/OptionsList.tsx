
import React, { memo } from 'react';
import { Option } from "@/types/test";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

interface OptionsListProps {
  options: Option[];
  selectedOption: string | null;
  onOptionSelect: (value: string) => void;
}

const OptionsList: React.FC<OptionsListProps> = ({ 
  options, 
  selectedOption, 
  onOptionSelect 
}) => {
  // Обработчик клика по всему блоку опции для улучшения UX
  const handleOptionClick = (value: string) => {
    onOptionSelect(value);
  };

  return (
    <RadioGroup 
      className="mt-6 space-y-3"
      value={selectedOption || undefined}
      onValueChange={onOptionSelect}
    >
      {options.map((option) => (
        <div 
          key={option.value} 
          className={`flex items-center space-x-3 rounded-lg border p-4 transition-colors cursor-pointer
            ${selectedOption === option.value 
              ? 'border-purple-400 bg-purple-50' 
              : 'border-gray-200 hover:border-purple-200 hover:bg-purple-50/50'}`}
          onClick={() => handleOptionClick(option.value)}
        >
          <RadioGroupItem value={option.value} id={option.value} />
          <Label 
            htmlFor={option.value} 
            className="flex-1 cursor-pointer text-gray-700"
          >
            {option.text}
          </Label>
        </div>
      ))}
    </RadioGroup>
  );
};

// Мемоизируем компонент для предотвращения перерисовок при неизменных props
export default memo(OptionsList);
