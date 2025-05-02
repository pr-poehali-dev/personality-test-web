
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import Icon from '@/components/ui/icon';

interface RecommendationsListProps {
  recommendations: string[];
}

const RecommendationsList: React.FC<RecommendationsListProps> = ({ recommendations }) => {
  if (!recommendations || recommendations.length === 0) {
    return null;
  }

  return (
    <div className="space-y-3">
      <h3 className="text-lg font-semibold text-purple-800">Персональные рекомендации</h3>
      <Card className="border-purple-200">
        <CardContent className="p-4">
          <ul className="space-y-3">
            {recommendations.map((recommendation, index) => (
              <li key={index} className="flex items-start gap-2">
                <Icon name="CheckCircle" className="h-5 w-5 text-green-500 mt-0.5 shrink-0" />
                <span className="text-gray-700">{recommendation}</span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  );
};

export default RecommendationsList;
