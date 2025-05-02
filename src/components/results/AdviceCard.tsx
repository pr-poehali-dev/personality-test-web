
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import Icon from '@/components/ui/icon';

interface AdviceCardProps {
  title: string;
  content: string;
  icon: string;
  color: string;
}

const AdviceCard: React.FC<AdviceCardProps> = ({ title, content, icon, color }) => {
  // Используем безопасное получение классов для цветов
  const getColorClass = (baseColor: string, element: string, shade: number) => {
    return `${element}-${baseColor}-${shade}`;
  };

  return (
    <Card className={`border border-${color}-200`}>
      <CardContent className="p-4">
        <div className="flex items-start gap-3">
          <div className={`bg-${color}-100 p-2 rounded-full mt-1 shrink-0`}>
            <Icon name={icon} className={`h-5 w-5 text-${color}-600`} />
          </div>
          <div>
            <h4 className="font-medium text-gray-800 mb-1">{title}</h4>
            <p className="text-sm text-gray-600">{content}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AdviceCard;
