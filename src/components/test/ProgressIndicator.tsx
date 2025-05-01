
import React from 'react';
import { Progress } from "@/components/ui/progress";
import Icon from "@/components/ui/icon";

interface ProgressIndicatorProps {
  currentQuestion: number;
  totalQuestions: number;
}

const ProgressIndicator: React.FC<ProgressIndicatorProps> = ({ 
  currentQuestion, 
  totalQuestions 
}) => {
  const progressPercentage = ((currentQuestion + 1) / totalQuestions) * 100;
  
  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center">
        <div className="text-sm text-purple-700 font-medium flex items-center gap-1">
          <Icon name="ClipboardList" size={16} />
          <span>Вопрос {currentQuestion + 1} из {totalQuestions}</span>
        </div>
        <span className="text-sm font-semibold text-purple-800">{Math.round(progressPercentage)}%</span>
      </div>
      
      <Progress 
        value={progressPercentage} 
        className="h-2 bg-purple-100" 
      />
    </div>
  );
};

export default ProgressIndicator;
