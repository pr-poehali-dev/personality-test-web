
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import Icon from "@/components/ui/icon";
import { Separator } from "@/components/ui/separator";
import { Progress } from "@/components/ui/progress";
import { Question } from "@/types/test";

interface ResultCategory {
  name: string;
  score: number;
  description: string;
  icon: string;
  color: string;
}

const Results: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [results, setResults] = useState<ResultCategory[]>([]);
  const [personality, setPersonality] = useState<string>("");

  useEffect(() => {
    const answers = location.state?.answers;
    
    if (!answers) {
      navigate("/");
      return;
    }

    // Импортируем вопросы из отдельного модуля
    import("@/data/questions").then(({ questions }) => {
      const calculatedResults = calculateScores(questions, answers);
      setResults(calculatedResults);
    });
  }, [location.state, navigate]);

  const calculateScores = (questions: Question[], answers: Record<number, string>) => {
    // Инициализация начальных баллов
    const scores = {
      personality: 0,
      temperament: 0,
      confidence: 0,
      irritability: 0,
      anxiety: 0
    };
    
    // Вес ответов: a=4, b=3, c=2, d=1
    const weights: Record<string, number> = { a: 4, b: 3, c: 2, d: 1 };

    // Суммирование баллов по категориям
    for (const questionId in answers) {
      const question = questions.find(q => q.id === parseInt(questionId));
      if (question) {
        const answer = answers[questionId];
        // Для некоторых категорий нужно инвертировать баллы
        if (question.category === 'irritability' || question.category === 'anxiety') {
          scores[question.category] += 5 - weights[answer]; // Инвертируем (5 - вес)
        } else {
          scores[question.category] += weights[answer];
        }
      }
    }

    // Нормализация баллов к шкале 0-100
    const questions_by_category = {
      personality: questions.filter(q => q.category === 'personality').length,
      temperament: questions.filter(q => q.category === 'temperament').length,
      confidence: questions.filter(q => q.category === 'confidence').length,
      irritability: questions.filter(q => q.category === 'irritability').length,
      anxiety: questions.filter(q => q.category === 'anxiety').length
    };

    const normalized_scores = {
      personality: (scores.personality / (questions_by_category.personality * 4)) * 100,
      temperament: (scores.temperament / (questions_by_category.temperament * 4)) * 100,
      confidence: (scores.confidence / (questions_by_category.confidence * 4)) * 100,
      irritability: (scores.irritability / (questions_by_category.irritability * 4)) * 100,
      anxiety: (scores.anxiety / (questions_by_category.anxiety * 4)) * 100
    };

    // Определение типа личности
    const personality_score = normalized_scores.personality;
    const temperament_score = normalized_scores.temperament;
    
    let personalityType = "";
    
    if (personality_score > 75 && temperament_score > 75) {
      personalityType = "Экстраверт-Холерик";
    } else if (personality_score > 75 && temperament_score <= 75) {
      personalityType = "Экстраверт-Сангвиник";
    } else if (personality_score <= 75 && personality_score > 40 && temperament_score > 50) {
      personalityType = "Амбиверт с чертами Холерика";
    } else if (personality_score <= 75 && personality_score > 40 && temperament_score <= 50) {
      personalityType = "Амбиверт с чертами Флегматика";
    } else if (personality_score <= 40 && temperament_score > 40) {
      personalityType = "Интроверт-Меланхолик";
    } else {
      personalityType = "Интроверт-Флегматик";
    }
    
    setPersonality(personalityType);

    return [
      {
        name: "Уверенность",
        score: normalized_scores.confidence,
        description: normalized_scores.confidence > 70 
          ? "Вы очень уверенный в себе человек, легко принимаете решения и не сомневаетесь в своих силах."
          : normalized_scores.confidence > 40 
          ? "Ваша уверенность находится на среднем уровне. В знакомых ситуациях вы чувствуете себя комфортно."
          : "Вам часто не хватает уверенности в себе, вы склонны сомневаться в своих решениях.",
        icon: "Medal",
        color: "green"
      },
      {
        name: "Раздражительность",
        score: normalized_scores.irritability,
        description: normalized_scores.irritability > 70 
          ? "Вы очень спокойный человек, редко раздражаетесь и хорошо справляетесь со стрессом."
          : normalized_scores.irritability > 40 
          ? "У вас средний уровень раздражительности. В большинстве ситуаций вы сохраняете спокойствие."
          : "Вы склонны к повышенной раздражительности, легко выходите из равновесия.",
        icon: "ZapOff",
        color: "red"
      },
      {
        name: "Тревожность",
        score: normalized_scores.anxiety,
        description: normalized_scores.anxiety > 70 
          ? "У вас низкий уровень тревожности. Вы спокойно относитесь к неопределенности и редко беспокоитесь."
          : normalized_scores.anxiety > 40 
          ? "Средний уровень тревожности. Вы иногда беспокоитесь, но в целом справляетесь с тревогой."
          : "Высокий уровень тревожности. Вы часто испытываете беспокойство и склонны к переживаниям.",
        icon: "AlertCircle",
        color: "yellow"
      }
    ];
  };

  if (results.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <Icon name="Loader2" size={36} className="animate-spin mx-auto text-purple-600" />
          <p className="mt-4 text-gray-600">Анализируем результаты...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 p-4">
      <header className="w-full max-w-3xl mx-auto py-6">
        <h1 className="text-2xl md:text-3xl font-bold text-center text-purple-800">
          Результаты теста
        </h1>
      </header>

      <main className="flex-1 w-full max-w-3xl mx-auto space-y-6">
        <Card className="border-purple-200 shadow-md">
          <CardHeader>
            <CardTitle className="text-2xl text-purple-700 text-center">
              Ваш психологический профиль
            </CardTitle>
          </CardHeader>
          
          <CardContent className="space-y-6">
            <div className="bg-purple-50 p-5 rounded-lg border border-purple-100 text-center">
              <div className="text-purple-800 text-lg font-medium mb-2">Тип личности</div>
              <div className="text-2xl font-bold text-purple-900">{personality}</div>
            </div>
            
            <Separator className="my-6 bg-purple-100" />
            
            <div className="space-y-6">
              {results.map((result, index) => (
                <div key={index}>
                  <div className="flex items-center gap-3 mb-2">
                    <div className={`bg-${result.color}-100 rounded-full p-2 text-${result.color}-600`}>
                      <Icon name={result.icon} size={24} />
                    </div>
                    <span className="font-medium text-lg">{result.name}</span>
                    <span className="ml-auto font-semibold">{Math.round(result.score)}%</span>
                  </div>
                  <Progress value={result.score} className={`h-2 bg-${result.color}-100`} />
                  <p className="mt-2 text-gray-600 text-sm">{result.description}</p>
                </div>
              ))}
            </div>
            
            <div className="bg-blue-50 p-4 rounded-lg border border-blue-100 mt-6">
              <p className="text-blue-800 font-medium mb-2">Рекомендации:</p>
              <ul className="list-disc list-inside space-y-1 text-gray-700 text-sm">
                <li>Регулярно практикуйте самоанализ и рефлексию</li>
                <li>Развивайте эмоциональный интеллект</li>
                <li>Изучите литературу по психологии личности</li>
                <li>Обратите внимание на развитие коммуникативных навыков</li>
              </ul>
            </div>
          </CardContent>
          
          <CardFooter className="flex justify-center pb-6">
            <Button 
              onClick={() => navigate("/")} 
              variant="outline"
              className="mr-3 border-purple-300 text-purple-700"
            >
              <Icon name="Home" size={18} className="mr-1" />
              На главную
            </Button>
            <Button 
              onClick={() => navigate("/test")} 
              className="bg-purple-600 hover:bg-purple-700 text-white"
            >
              Пройти тест снова
              <Icon name="RefreshCw" size={18} className="ml-1" />
            </Button>
          </CardFooter>
        </Card>
      </main>
    </div>
  );
};

export default Results;
