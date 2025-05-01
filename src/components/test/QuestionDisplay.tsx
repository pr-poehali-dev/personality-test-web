
import { Question } from "@/types/test";
import { CardTitle } from "@/components/ui/card";
import OptionsList from "./OptionsList";

interface QuestionDisplayProps {
  question: Question;
  selectedOption: string | null;
  onOptionSelect: (value: string) => void;
}

const QuestionDisplay = ({ 
  question, 
  selectedOption, 
  onOptionSelect 
}: QuestionDisplayProps) => {
  return (
    <>
      <CardTitle className="text-xl mt-6 text-purple-700">
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
