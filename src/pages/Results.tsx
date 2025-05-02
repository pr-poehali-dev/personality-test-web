
import React, { useEffect, useState, useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import Icon from "@/components/ui/icon";
import { Separator } from "@/components/ui/separator";
import { Question, TestResults, MbtiResult } from "@/types/test";
import MbtiTypeCard from "@/components/test/MbtiTypeCard";
import ResultsChart from "@/components/results/ResultsChart";
import RecommendationsList from "@/components/results/RecommendationsList";
import AdviceCard from "@/components/results/AdviceCard";
import { getMbtiTypeFromResults, getMbtiDescription, getMbtiRecommendations } from "@/utils/questionUtils";
import { AllPersonalityResults } from "@/components/results/ResultDescription";

const Results: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [results, setResults] = useState<TestResults | null>(null);
  const [personality, setPersonality] = useState<string>("");
  const [mbtiResult, setMbtiResult] = useState<MbtiResult | null>(null);
  const [recommendations, setRecommendations] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const answers = location.state?.answers;
    
    if (!answers) {
      navigate("/");
      return;
    }

    // Устанавливаем начальное состояние загрузки
    setLoading(true);

    // Используем dynamic import для асинхронной загрузки вопросов
    import("@/data/questions").then(({ questions }) => {
      const calculatedResults = calculateScores(questions, answers);
      
      // Определяем тип MBTI
      const mbtiType = getMbtiTypeFromResults(calculatedResults);
      const { title, description } = getMbtiDescription(mbtiType);
      
      // Получаем рекомендации на основе типа MBTI
      const personalRecommendations = getMbtiRecommendations(mbtiType);
      
      setResults(calculatedResults);
      setMbtiResult({
        type: mbtiType,
        title,
        description
      });
      setRecommendations(personalRecommendations);
      setLoading(false);
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

    // Кэшируем категории вопросов для оптимизации
    const questionsMap: Record<number, Question> = {};
    const categoryCounters: Record<string, number> = {
      personality: 0,
      temperament: 0,
      confidence: 0,
      irritability: 0,
      anxiety: 0
    };
    
    // Создаем карту вопросов и считаем количество вопросов в каждой категории
    questions.forEach(q => {
      questionsMap[q.id] = q;
      categoryCounters[q.category]++;
    });

    // Суммирование баллов по категориям
    for (const questionId in answers) {
      const question = questionsMap[parseInt(questionId)];
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
    const normalized_scores = {
      personality: (scores.personality / (categoryCounters.personality * 4)) * 100,
      temperament: (scores.temperament / (categoryCounters.temperament * 4)) * 100,
      confidence: (scores.confidence / (categoryCounters.confidence * 4)) * 100,
      irritability: (scores.irritability / (categoryCounters.irritability * 4)) * 100,
      anxiety: (scores.anxiety / (categoryCounters.anxiety * 4)) * 100
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

    return normalized_scores;
  };

  // Генерируем советы на основе результатов теста
  const adviceCards = useMemo(() => {
    if (!results) return [];

    const advices = [];

    // Советы по коммуникации на основе личности
    if (results.personality > 70) {
      advices.push({
        title: "Совет по коммуникации",
        content: "Используйте вашу общительность для налаживания новых контактов, но не забывайте давать другим высказаться. Практикуйте активное слушание.",
        icon: "MessageCircle",
        color: "blue"
      });
    } else if (results.personality < 40) {
      advices.push({
        title: "Совет по коммуникации",
        content: "Цените свою склонность к глубоким беседам. Планируйте социальные активности заранее и оставляйте время для восстановления энергии.",
        icon: "MessageCircle",
        color: "blue"
      });
    }

    // Советы по управлению стрессом
    if (results.anxiety < 40) {
      advices.push({
        title: "Управление стрессом",
        content: "У вас высокий уровень тревожности. Практикуйте медитацию и дыхательные упражнения. Ведите дневник беспокойств, чтобы визуализировать свои страхи.",
        icon: "Leaf",
        color: "green"
      });
    }

    // Советы по уверенности в себе
    if (results.confidence < 50) {
      advices.push({
        title: "Развитие уверенности",
        content: "Ведите журнал успехов, даже малых. Практикуйте позитивные утверждения и старайтесь выходить из зоны комфорта постепенно, ставя небольшие достижимые цели.",
        icon: "Trophy",
        color: "amber"
      });
    }

    // Советы по управлению эмоциями
    if (results.irritability < 50) {
      advices.push({
        title: "Управление эмоциями",
        content: "Практикуйте технику паузы перед реакцией. При раздражении сделайте глубокий вдох и сосчитайте до 10, прежде чем ответить. Регулярные физические упражнения помогут снизить общий уровень раздражительности.",
        icon: "HeartPulse",
        color: "red"
      });
    }

    // Дополнительные стратегические советы
    advices.push({
      title: "Стратегия развития",
      content: "Основываясь на вашем профиле, мы рекомендуем фокусироваться на развитии эмоционального интеллекта и практиковать осознанность в повседневной жизни.",
      icon: "Compass",
      color: "purple"
    });

    return advices;
  }, [results]);

  if (loading || !results) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="relative w-16 h-16 mx-auto mb-4">
            <Icon name="Loader2" size={64} className="animate-spin text-purple-600 absolute" />
            <Icon name="Brain" size={32} className="text-purple-300 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
          </div>
          <p className="text-gray-600 font-medium">Анализируем ваши ответы...</p>
          <p className="text-gray-500 text-sm mt-2">Это может занять несколько секунд</p>
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
        <Card className="border-purple-200 shadow-md overflow-hidden">
          <CardHeader className="bg-gradient-to-r from-purple-600 to-purple-800 text-white">
            <CardTitle className="text-2xl text-center">
              Ваш психологический профиль
            </CardTitle>
          </CardHeader>
          
          <CardContent className="p-6 space-y-6">
            {/* MBTI Type Card */}
            {mbtiResult && (
              <div className="mb-6">
                <MbtiTypeCard mbtiResult={mbtiResult} />
              </div>
            )}
            
            {/* Традиционный тип личности */}
            <div className="bg-purple-50 p-4 rounded-lg border border-purple-100 text-center">
              <div className="text-purple-800 text-lg font-medium mb-1">Классический тип личности</div>
              <div className="text-xl font-bold text-purple-900">{personality}</div>
            </div>
            
            <Separator className="my-6 bg-purple-100" />
            
            {/* Детальные описания характеристик */}
            <AllPersonalityResults results={results} />
            
            <Separator className="my-6 bg-purple-100" />
            
            {/* Results Charts */}
            <ResultsChart results={results} />
            
            {/* Recommendations */}
            <RecommendationsList recommendations={recommendations} />

            {/* Советы по развитию */}
            <div className="mt-8">
              <h3 className="text-lg font-semibold text-purple-800 mb-4">Советы по развитию</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {adviceCards.map((advice, index) => (
                  <AdviceCard
                    key={index}
                    title={advice.title}
                    content={advice.content}
                    icon={advice.icon}
                    color={advice.color}
                  />
                ))}
              </div>
            </div>
          </CardContent>
          
          <CardFooter className="flex flex-wrap justify-center gap-3 p-6 bg-gray-50">
            <Button 
              onClick={() => navigate("/")} 
              variant="outline"
              className="border-purple-300 text-purple-700"
            >
              <Icon name="Home" size={18} className="mr-1.5" />
              На главную
            </Button>
            <Button 
              onClick={() => navigate("/test")} 
              className="bg-purple-600 hover:bg-purple-700 text-white"
            >
              Пройти тест снова
              <Icon name="RefreshCw" size={18} className="ml-1.5" />
            </Button>
            <Button 
              onClick={() => navigate("/diary")}
              variant="outline"
              className="border-purple-300 text-purple-700"
            >
              <Icon name="Calendar" size={18} className="mr-1.5" />
              Дневник эмоций
            </Button>
            <Button 
              onClick={() => window.print()} 
              variant="outline"
              className="border-blue-300 text-blue-700"
            >
              <Icon name="Printer" size={18} className="mr-1.5" />
              Распечатать результаты
            </Button>
          </CardFooter>
        </Card>
      </main>
    </div>
  );
};

export default Results;
