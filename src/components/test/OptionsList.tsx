
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Option } from "@/types/test";

interface OptionsListProps {
  options: Option[];
  selectedOption: string | null;
  onOptionSelect: (value: string) => void;
}

const OptionsList = ({ 
  options, 
  selectedOption, 
  onOptionSelect 
}: OptionsListProps) => {
  return (
    <RadioGroup value={selectedOption || ""} className="space-y-3">
      {options.map((option) => (
        <div 
          key={option.value} 
          className="flex items-start space-x-2 p-3 rounded-md hover:bg-purple-50 transition-colors"
        >
          <RadioGroupItem 
            value={option.value} 
            id={`option-${option.value}`} 
            onClick={() => onOptionSelect(option.value)}
            className="mt-1"
          />
          <Label 
            htmlFor={`option-${option.value}`}
            className="flex-1 cursor-pointer font-normal"
          >
            {option.text}
          </Label>
        </div>
      ))}
    </RadioGroup>
  );
};

export default OptionsList;
