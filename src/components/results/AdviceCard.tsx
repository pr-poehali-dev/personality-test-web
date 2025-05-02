
import React from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import Icon from '@/components/ui/icon';

interface AdviceProps {
  title: string;
  content: string;
  icon: string;
  color: string;
}

const AdviceCard: React.FC<AdviceProps> = ({ title, content, icon, color }) => {
  return (
    <Card className={`border-${color}-200 hover:shadow-md transition-shadow duration-300`}>
      <CardHeader className={`flex flex-row items-center space-x-4 bg-${color}-50 p-4`}>
        <div className={`p-2 rounded-full bg-${color}-100`}>
          <Icon name={icon} className={`h-5 w-5 text-${color}-600`} />
        </div>
        <h3 className={`font-semibold text-${color}-700`}>{title}</h3>
      </CardHeader>
      <CardContent className="pt-4 pb-5">
        <p className="text-gray-600 text-sm">{content}</p>
      </CardContent>
    </Card>
  );
};

export default AdviceCard;
