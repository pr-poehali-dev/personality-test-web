
import React, { useState, useCallback, useMemo, useEffect, lazy, Suspense } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import ProgressIndicator from "@/components/test/ProgressIndicator";
import NavigationButtons from "@/components/test/NavigationButtons";
import Icon from "@/components/ui/icon";
import { Answers } from "@/types/test";

// Используем ленивую загрузку для вопросов и компонентов отображения
const QuestionDisplay = lazy(() => import("@/components/test/QuestionDisplay"));

const Test: React.FC = () => {
  const navigate = useNavigate();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Answers>({});
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [questions, setQuestions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Загружаем вопросы при монтировании компонента
  useEffect(() => {
    // Асинхронно загружаем вопросы
    import("@/data/questions").then(({ questions }) => {
      setQuestions(questions);
      setLoading(false);
    });
  }, []);

  // Мемоизируем текущий вопрос для предотвращения лишних рендеров
  const question = useMemo(() => 
    questions.length > 0 ? questions[currentQuestion] : null, 
  [questions, currentQuestion]);
  
  const isLastQuestion = useMemo(() => 
    questions.length > 0 ? currentQuestion === questions.length - 1 : false, 
  [questions, currentQuestion]);

  // Обработчик выбора варианта ответа
  const handleOptionSelect = useCallback((value: string) => {
    setSelectedOption(value);
  }, []);

  // Обработчик перехода к следующему вопросу
  const handleNext = useCallback(() => {
    if (!selectedOption || !question) return;

    // Сохраняем текущий ответ
    const updatedAnswers = {
      ...answers,
      [question.id]: selectedOption
    };
    setAnswers(updatedAnswers);
    
    if (!isLastQuestion) {
      // Переходим к следующему вопросу
      setCurrentQuestion(prev => prev + 1);
      
      // Проверяем, есть ли уже ответ на следующий вопрос
      const nextQuestion = questions[currentQuestion + 1];
      if (nextQuestion) {
        const nextQuestionId = nextQuestion.id;
        setSelectedOption(updatedAnswers[nextQuestionId] || null);
      }
    } else {
      // Тест завершен, переходим к результатам
      navigate("/results", { state: { answers: updatedAnswers } });
    }
  }, [selectedOption, question, answers, isLastQuestion, questions, currentQuestion, navigate]);

  // Обработчик перехода к предыдущему вопросу
  const handlePrevious = useCallback(() => {
    if (currentQuestion > 0) {
      // Переходим к предыдущему вопросу
      setCurrentQuestion(prev => prev - 1);
      
      // Восстанавливаем предыдущий ответ, если он есть
      const prevQuestion = questions[currentQuestion - 1];
      if (prevQuestion) {
        setSelectedOption(answers[prevQuestion.id] || null);
      }
    }
  }, [currentQuestion, questions, answers]);

  // Отображаем индикатор загрузки, пока вопросы не загружены
  if (loading || !question) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <Icon name="Loader2" size={36} className="animate-spin mx-auto text-purple-600" />
          <p className="mt-4 text-gray-600">Загружаем тест...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 p-4">
      <header className="w-full max-w-3xl mx-auto py-6">
        <h1 className="text-2xl md:text-3xl font-bold text-center text-purple-800">
          Психологический тест
        </h1>
      </header>

      <main className="flex-1 w-full max-w-3xl mx-auto">
        <Card className="border-purple-200 shadow-md">
          <CardHeader>
            <ProgressIndicator 
              currentQuestion={currentQuestion} 
              totalQuestions={questions.length} 
            />
          </CardHeader>
          
          <CardContent>
            <Suspense fallback={<div className="p-4 text-center">Загрузка вопроса...</div>}>
              <QuestionDisplay 
                question={question}
                selectedOption={selectedOption}
                onOptionSelect={handleOptionSelect}
              />
            </Suspense>
          </CardContent>
          
          <CardFooter>
            <NavigationButtons 
              onPrevious={handlePrevious}
              onNext={handleNext}
              isPreviousDisabled={currentQuestion === 0}
              isNextDisabled={!selectedOption}
              isLastQuestion={isLastQuestion}
            />
          </CardFooter>
        </Card>
      </main>
    </div>
  );
};

// Используем React.memo для оптимизации рендеринга
export default React.memo(Test);
