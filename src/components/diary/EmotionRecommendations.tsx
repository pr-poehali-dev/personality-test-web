
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Emotion } from '@/types/test';
import Icon from '@/components/ui/icon';

interface EmotionRecommendationsProps {
  emotion: Emotion;
}

const EmotionRecommendations: React.FC<EmotionRecommendationsProps> = ({ emotion }) => {
  return (
    <Card className={`border-${emotion.color}-200 shadow-md overflow-hidden mb-4`}>
      <CardHeader className={`bg-${emotion.color}-50 border-b border-${emotion.color}-100`}>
        <CardTitle className="flex items-center gap-2 text-xl">
          <Icon name={emotion.icon} className={`h-5 w-5 text-${emotion.color}-600`} />
          <span>Рекомендации при {emotion.name.toLowerCase()}</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-4">
        <p className="text-gray-700 mb-4">{emotion.description}</p>
        <h4 className="font-medium text-gray-800 mb-2">Что может помочь:</h4>
        <ul className="space-y-2">
          {emotion.recommendations.map((recommendation, index) => (
            <li key={index} className="flex items-start gap-2">
              <Icon name="CheckCircle" className={`h-5 w-5 text-${emotion.color}-500 mt-0.5 shrink-0`} />
              <span className="text-gray-700">{recommendation}</span>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
};

export default EmotionRecommendations;
