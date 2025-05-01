
import React from 'react';
import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";

interface NavigationButtonsProps {
  onPrevious: () => void;
  onNext: () => void;
  isPreviousDisabled: boolean;
  isNextDisabled: boolean;
  isLastQuestion: boolean;
}

const NavigationButtons: React.FC<NavigationButtonsProps> = ({
  onPrevious,
  onNext,
  isPreviousDisabled,
  isNextDisabled,
  isLastQuestion
}) => {
  return (
    <div className="flex w-full justify-between">
      <Button
        onClick={onPrevious}
        disabled={isPreviousDisabled}
        variant="outline"
        className="border-purple-200 text-purple-700"
      >
        <Icon name="ChevronLeft" size={18} className="mr-1" />
        Назад
      </Button>
      
      <Button
        onClick={onNext}
        disabled={isNextDisabled}
        className="bg-purple-600 hover:bg-purple-700 text-white"
      >
        {isLastQuestion ? (
          <>
            Завершить
            <Icon name="CheckCircle" size={18} className="ml-1" />
          </>
        ) : (
          <>
            Далее
            <Icon name="ChevronRight" size={18} className="ml-1" />
          </>
        )}
      </Button>
    </div>
  );
};

export default NavigationButtons;
