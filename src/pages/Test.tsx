
import React, { useState, useCallback, useMemo, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import ProgressIndicator from "@/components/test/ProgressIndicator";
import NavigationButtons from "@/components/test/NavigationButtons";
import QuestionDisplay from "@/components/test/QuestionDisplay";
import Header from "@/components/Header";
import Icon from "@/components/ui/icon";
import { Answers } from "@/types/test";

const Test: React.FC = () => {
  const navigate = useNavigate();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Answers>({});
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [questions, setQuestions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [nextClicked, setNextClicked] = useState(false);

  // Загружаем вопросы при монтировании компонента
  useEffect(() => {
    // Асинхронно загружаем вопросы
    import("@/data/questions").then(({ questions }) => {
      setQuestions(questions);
      setLoading(false);
    }).catch(error => {
      console.error("Ошибка при загрузке вопросов:", error);
      setLoading(false);
    });
  }, []);

  // Сбрасываем nextClicked при изменении выбора опции
  useEffect(() => {
    setNextClicked(false);
  }, [selectedOption]);

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

  // Обработчик перехода к следующему вопросу с предотвращением двойных нажатий
  const handleNext = useCallback(() => {
    // Если кнопка уже была нажата или нет выбранного варианта, не обрабатываем
    if (nextClicked || !selectedOption || !question) return;
    
    setNextClicked(true);

    // Сохраняем текущий ответ
    const updatedAnswers = {
      ...answers,
      [question.id]: selectedOption
    };
    setAnswers(updatedAnswers);
    
    if (!isLastQuestion) {
      // Переходим к следующему вопросу
      setCurrentQuestion(prev => prev + 1);
      
      // Всегда сбрасываем выбор для следующего вопроса
      const nextQuestionIndex = currentQuestion + 1;
      if (nextQuestionIndex < questions.length) {
        const nextQuestion = questions[nextQuestionIndex];
        if (nextQuestion) {
          const nextQuestionId = nextQuestion.id;
          const savedAnswer = updatedAnswers[nextQuestionId];
          setSelectedOption(savedAnswer || null);
        } else {
          setSelectedOption(null);
        }
      } else {
        setSelectedOption(null);
      }
    } else {
      // Тест завершен, переходим к результатам
      navigate("/results", { state: { answers: updatedAnswers } });
    }
  }, [selectedOption, question, answers, isLastQuestion, questions, currentQuestion, navigate, nextClicked]);

  // Обработчик перехода к предыдущему вопросу
  const handlePrevious = useCallback(() => {
    if (currentQuestion > 0) {
      // Сохраняем текущий ответ перед переходом назад
      if (selectedOption && question) {
        setAnswers(prev => ({
          ...prev,
          [question.id]: selectedOption
        }));
      }
      
      // Переходим к предыдущему вопросу
      setCurrentQuestion(prev => prev - 1);
      
      // Восстанавливаем предыдущий ответ, если он есть
      const prevQuestionIndex = currentQuestion - 1;
      if (prevQuestionIndex >= 0 && prevQuestionIndex < questions.length) {
        const prevQuestion = questions[prevQuestionIndex];
        if (prevQuestion) {
          const prevQuestionId = prevQuestion.id;
          setSelectedOption(answers[prevQuestionId] || null);
        }
      }
    }
  }, [currentQuestion, questions, answers, selectedOption, question]);

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
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header />
      
      <div className="flex-1 p-4">
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
              <QuestionDisplay 
                question={question}
                selectedOption={selectedOption}
                onOptionSelect={handleOptionSelect}
              />
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
    </div>
  );
};

export default React.memo(Test);
