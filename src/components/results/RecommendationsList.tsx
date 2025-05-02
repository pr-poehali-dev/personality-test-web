
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import Icon from '@/components/ui/icon';

interface RecommendationsListProps {
  recommendations: string[];
}

const RecommendationsList: React.FC<RecommendationsListProps> = ({ recommendations }) => {
  return (
    <Card className="bg-blue-50 border-blue-100">
      <CardContent className="p-4">
        <div className="flex items-center mb-3">
          <Icon name="Lightbulb" size={20} className="text-blue-600 mr-2" />
          <h3 className="text-blue-800 font-medium">Персональные рекомендации</h3>
        </div>
        
        <ul className="space-y-2">
          {recommendations.map((recommendation, index) => (
            <li key={index} className="flex items-start text-gray-700 text-sm">
              <span className="mr-2 text-blue-500 mt-0.5">
                <Icon name="CheckCircle2" size={14} />
              </span>
              {recommendation}
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
};

export default RecommendationsList;
