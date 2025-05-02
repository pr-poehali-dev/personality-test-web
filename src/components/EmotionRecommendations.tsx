
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Emotion } from '@/types/test';
import Icon from '@/components/ui/icon';

interface EmotionRecommendationsProps {
  emotion: Emotion;
}

const EmotionRecommendations: React.FC<EmotionRecommendationsProps> = ({ emotion }) => {
  const [activeTab, setActiveTab] = useState<string>("quick");

  return (
    <Card className="border-gray-200 shadow-md overflow-hidden mb-4">
      <CardHeader className={`bg-${emotion.color}-50 border-b border-${emotion.color}-100`}>
        <CardTitle className="flex items-center gap-2 text-xl">
          <Icon name={emotion.icon} className={`h-5 w-5 text-${emotion.color}-600`} />
          <span>Рекомендации при {emotion.name.toLowerCase()}</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-4">
        <p className="text-gray-700 mb-4">{emotion.description}</p>
        
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="w-full grid grid-cols-2 mb-4">
            <TabsTrigger value="quick" className="text-sm">Быстрые рекомендации</TabsTrigger>
            <TabsTrigger value="advanced" className="text-sm">Расширенные стратегии</TabsTrigger>
          </TabsList>
          
          <TabsContent value="quick" className="mt-0">
            <div className="space-y-2">
              <h4 className="font-medium text-gray-800 mb-2">Что может помочь:</h4>
              <ul className="space-y-2">
                {emotion.recommendations.map((recommendation, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <Icon name="CheckCircle" className={`h-5 w-5 text-${emotion.color}-500 mt-0.5 shrink-0`} />
                    <span className="text-gray-700">{recommendation}</span>
                  </li>
                ))}
              </ul>
            </div>
          </TabsContent>
          
          <TabsContent value="advanced" className="mt-0">
            {emotion.copingStrategies && emotion.copingStrategies.length > 0 ? (
              <Accordion type="single" collapsible className="w-full">
                {emotion.copingStrategies.map((strategy, index) => (
                  <AccordionItem key={index} value={`strategy-${index}`}>
                    <AccordionTrigger className="text-sm font-medium text-gray-800 hover:text-gray-900">
                      Стратегия {index + 1}
                    </AccordionTrigger>
                    <AccordionContent className="text-gray-700">
                      {strategy}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            ) : (
              <p className="text-gray-500 italic">Расширенные стратегии в разработке.</p>
            )}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default EmotionRecommendations;
