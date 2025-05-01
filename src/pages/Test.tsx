
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { questions } from "@/data/questions";
import { Answers } from "@/types/test";
import ProgressIndicator from "@/components/test/ProgressIndicator";
import QuestionDisplay from "@/components/test/QuestionDisplay";
import NavigationButtons from "@/components/test/NavigationButtons";

const Test: React.FC = () => {
  const navigate = useNavigate();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Answers>({});
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  
  const question = questions[currentQuestion];
  const isLastQuestion = currentQuestion === questions.length - 1;
  
  const handleOptionSelect = (value: string) => {
    setSelectedOption(value);
  };

  const handleNext = () => {
    if (selectedOption) {
      // Save current answer
      setAnswers({
        ...answers,
        [question.id]: selectedOption
      });
      
      if (!isLastQuestion) {
        // Go to next question
        setCurrentQuestion(currentQuestion + 1);
        // Проверяем, есть ли уже ответ на следующий вопрос
        const nextQuestionId = questions[currentQuestion + 1].id;
        setSelectedOption(answers[nextQuestionId] || null);
      } else {
        // Test completed, navigate to results
        navigate("/results", { state: { answers } });
      }
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      // Go to previous question
      setCurrentQuestion(currentQuestion - 1);
      // Restore previous answer if available
      setSelectedOption(answers[questions[currentQuestion - 1].id] || null);
    }
  };

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
  );
};

export default Test;
