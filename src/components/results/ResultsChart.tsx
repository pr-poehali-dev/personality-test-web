
import React from 'react';
import { Progress } from "@/components/ui/progress";
import Icon from '@/components/ui/icon';
import { TestResults } from '@/types/test';

interface ResultsChartProps {
  results: TestResults;
}

const ResultsChart: React.FC<ResultsChartProps> = ({ results }) => {
  const categories = [
    {
      name: "Уверенность",
      score: results.confidence,
      description: results.confidence > 70 
        ? "Вы очень уверенный в себе человек, легко принимаете решения и не сомневаетесь в своих силах."
        : results.confidence > 40 
        ? "Ваша уверенность находится на среднем уровне. В знакомых ситуациях вы чувствуете себя комфортно."
        : "Вам часто не хватает уверенности в себе, вы склонны сомневаться в своих решениях.",
      icon: "Medal",
      color: "green"
    },
    {
      name: "Раздражительность",
      score: results.irritability,
      description: results.irritability > 70 
        ? "Вы очень спокойный человек, редко раздражаетесь и хорошо справляетесь со стрессом."
        : results.irritability > 40 
        ? "У вас средний уровень раздражительности. В большинстве ситуаций вы сохраняете спокойствие."
        : "Вы склонны к повышенной раздражительности, легко выходите из равновесия.",
      icon: "ZapOff",
      color: "red"
    },
    {
      name: "Тревожность",
      score: results.anxiety,
      description: results.anxiety > 70 
        ? "У вас низкий уровень тревожности. Вы спокойно относитесь к неопределенности и редко беспокоитесь."
        : results.anxiety > 40 
        ? "Средний уровень тревожности. Вы иногда беспокоитесь, но в целом справляетесь с тревогой."
        : "Высокий уровень тревожности. Вы часто испытываете беспокойство и склонны к переживаниям.",
      icon: "AlertCircle",
      color: "yellow"
    },
    {
      name: "Общительность",
      score: results.personality,
      description: results.personality > 70 
        ? "Вы очень общительный человек, легко находите контакт с людьми и энергичны в социальных ситуациях."
        : results.personality > 40 
        ? "У вас средний уровень общительности. Вы комфортно чувствуете себя как в компании, так и наедине с собой."
        : "Вы скорее интроверт, предпочитаете глубокие отношения с небольшим кругом людей.",
      icon: "Users",
      color: "blue"
    },
    {
      name: "Темперамент",
      score: results.temperament,
      description: results.temperament > 70 
        ? "Ваш темперамент отличается высокой активностью, энергичностью и быстрой реакцией на события."
        : results.temperament > 40 
        ? "У вас сбалансированный темперамент с умеренной активностью и реактивностью."
        : "Ваш темперамент характеризуется спокойствием, размеренностью и созерцательностью.",
      icon: "Heart",
      color: "purple"
    }
  ];

  return (
    <div className="space-y-6">
      {categories.map((category, index) => (
        <div key={index} className="animate-fade-in" style={{ animationDelay: `${index * 150}ms` }}>
          <div className="flex items-center gap-3 mb-2">
            <div className={`bg-${category.color}-100 rounded-full p-2 text-${category.color}-600`}>
              <Icon name={category.icon} size={20} />
            </div>
            <span className="font-medium">{category.name}</span>
            <span className="ml-auto font-semibold">{Math.round(category.score)}%</span>
          </div>
          <Progress 
            value={category.score} 
            className={`h-2.5 bg-${category.color}-100`}
            indicatorClassName={`bg-${category.color}-500`}
          />
          <p className="mt-2 text-gray-600 text-sm">{category.description}</p>
        </div>
      ))}
    </div>
  );
};

export default ResultsChart;
