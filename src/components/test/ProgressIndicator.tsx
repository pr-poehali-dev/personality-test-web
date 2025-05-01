
import { Progress } from "@/components/ui/progress";

interface ProgressIndicatorProps {
  currentQuestion: number;
  totalQuestions: number;
}

const ProgressIndicator = ({ currentQuestion, totalQuestions }: ProgressIndicatorProps) => {
  const progressValue = ((currentQuestion + 1) / totalQuestions) * 100;

  return (
    <div className="mb-4">
      <div className="flex justify-between items-center mb-4">
        <div className="text-sm text-gray-600">
          Вопрос {currentQuestion + 1} из {totalQuestions}
        </div>
        <div className="text-sm text-purple-600 font-medium">
          {Math.round(progressValue)}%
        </div>
      </div>
      <Progress value={progressValue} className="h-2 bg-purple-100" />
    </div>
  );
};

export default ProgressIndicator;
