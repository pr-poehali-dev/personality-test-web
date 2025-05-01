
import { Progress } from "@/components/ui/progress";

interface ProgressIndicatorProps {
  currentQuestion: number;
  totalQuestions: number;
}

const ProgressIndicator = ({ 
  currentQuestion, 
  totalQuestions 
}: ProgressIndicatorProps) => {
  const progressPercentage = ((currentQuestion + 1) / totalQuestions) * 100;
  
  return (
    <div className="w-full space-y-2">
      <div className="flex justify-between text-sm text-purple-700">
        <span>Вопрос {currentQuestion + 1} из {totalQuestions}</span>
        <span>{Math.round(progressPercentage)}%</span>
      </div>
      <Progress value={progressPercentage} className="h-2 bg-purple-100" />
      
      {/* Информация о категориях вопросов */}
      <div className="flex flex-wrap gap-2 mt-3 text-xs text-gray-500">
        <span className="px-2 py-1 bg-purple-50 rounded-full">Тип личности</span>
        <span className="px-2 py-1 bg-green-50 rounded-full">Уверенность</span>
        <span className="px-2 py-1 bg-red-50 rounded-full">Раздражительность</span>
        <span className="px-2 py-1 bg-yellow-50 rounded-full">Тревожность</span>
        <span className="px-2 py-1 bg-blue-50 rounded-full">Темперамент</span>
      </div>
    </div>
  );
};

export default ProgressIndicator;

