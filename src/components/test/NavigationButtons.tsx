
import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";

interface NavigationButtonsProps {
  onPrevious: () => void;
  onNext: () => void;
  isPreviousDisabled: boolean;
  isNextDisabled: boolean;
  isLastQuestion: boolean;
}

const NavigationButtons = ({
  onPrevious,
  onNext,
  isPreviousDisabled,
  isNextDisabled,
  isLastQuestion
}: NavigationButtonsProps) => {
  return (
    <div className="flex justify-between pt-2">
      <Button
        variant="outline"
        onClick={onPrevious}
        disabled={isPreviousDisabled}
        className="text-purple-700 border-purple-300"
      >
        <Icon name="ChevronLeft" size={18} />
        Назад
      </Button>
      
      <Button
        onClick={onNext}
        disabled={isNextDisabled}
        className="bg-purple-600 hover:bg-purple-700 text-white"
      >
        {!isLastQuestion ? "Далее" : "Завершить тест"}
        {!isLastQuestion ? (
          <Icon name="ChevronRight" size={18} />
        ) : (
          <Icon name="CheckCircle" size={18} />
        )}
      </Button>
    </div>
  );
};

export default NavigationButtons;
