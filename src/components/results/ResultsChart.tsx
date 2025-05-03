
import React from 'react';
import { TestResults } from '@/types/test';
import { Progress } from '@/components/ui/progress';

interface ResultsChartProps {
  results: TestResults;
}

const ResultsChart: React.FC<ResultsChartProps> = ({ results }) => {
  const categories = [
    { name: 'Общительность', value: results.personality, color: 'bg-blue-500' },
    { name: 'Темперамент', value: results.temperament, color: 'bg-yellow-500' },
    { name: 'Уверенность', value: results.confidence, color: 'bg-green-500' },
    { name: 'Эмоц. устойчивость', value: results.irritability, color: 'bg-red-500' },
    { name: 'Спокойствие', value: results.anxiety, color: 'bg-purple-500' },
  ];

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-purple-800">Результаты по категориям</h3>
      <div className="space-y-4">
        {categories.map((category, index) => (
          <div key={index} className="space-y-1">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium text-gray-700">{category.name}</span>
              <span className="text-sm font-medium text-gray-700">{Math.round(category.value)}%</span>
            </div>
            <Progress
              value={category.value}
              className="h-2"
              indicatorClassName={category.color}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ResultsChart;
