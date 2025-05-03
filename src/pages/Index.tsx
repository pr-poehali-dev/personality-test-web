
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import Icon from "@/components/ui/icon";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 p-4">
      <header className="w-full max-w-4xl mx-auto py-6">
        <h1 className="text-3xl md:text-4xl font-bold text-center text-purple-800">
          Психологический тест личности
        </h1>
      </header>

      <main className="flex-1 w-full max-w-4xl mx-auto">
        <Card className="border-purple-200 shadow-md">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl text-purple-700">
              Узнайте свой психологический профиль
            </CardTitle>
            <CardDescription className="text-gray-600 text-lg">
              Тест поможет определить ваш тип личности, темперамент, уровень уверенности, 
              раздражительности и тревожности
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex flex-col md:flex-row gap-6 items-center">
              <div className="flex-1 space-y-4">
                <div className="flex items-center gap-3">
                  <div className="bg-purple-100 rounded-full p-2 text-purple-600">
                    <Icon name="Brain" size={24} />
                  </div>
                  <span className="font-medium">Тип личности</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="bg-blue-100 rounded-full p-2 text-blue-600">
                    <Icon name="Flame" size={24} />
                  </div>
                  <span className="font-medium">Темперамент</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="bg-green-100 rounded-full p-2 text-green-600">
                    <Icon name="Medal" size={24} />
                  </div>
                  <span className="font-medium">Уверенность</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="bg-red-100 rounded-full p-2 text-red-600">
                    <Icon name="ZapOff" size={24} />
                  </div>
                  <span className="font-medium">Раздражительность</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="bg-yellow-100 rounded-full p-2 text-yellow-600">
                    <Icon name="AlertCircle" size={24} />
                  </div>
                  <span className="font-medium">Тревожность</span>
                </div>
              </div>
              <div className="flex-1">
                <img 
                  src="https://images.unsplash.com/photo-1596526131083-e8c633c948d2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80" 
                  alt="Психологический тест" 
                  className="rounded-lg shadow-sm w-full h-auto max-h-64 object-cover"
                />
              </div>
            </div>
            
            <div className="bg-purple-50 p-4 rounded-lg border border-purple-100">
              <p className="text-purple-800">
                <strong>Этот тест поможет вам:</strong>
              </p>
              <ul className="list-disc list-inside mt-2 space-y-1 text-gray-700">
                <li>Лучше понять свои психологические особенности</li>
                <li>Определить сильные стороны своей личности</li>
                <li>Осознать области для личностного роста</li>
                <li>Получить рекомендации по саморазвитию</li>
              </ul>
            </div>
          </CardContent>
          <CardFooter className="flex justify-center pb-6">
            <Button 
              onClick={() => navigate("/test")} 
              className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-6 h-auto text-lg"
            >
              Начать тест
              <Icon name="ArrowRight" size={20} />
            </Button>
          </CardFooter>
        </Card>
      </main>

      <footer className="w-full max-w-4xl mx-auto py-6 text-center text-gray-500 text-sm">
        © 2025 Психологический тест личности
      </footer>
    </div>
  );
};

export default Index;
