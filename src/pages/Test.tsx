
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import Icon from "@/components/ui/icon";
import { useNavigate } from "react-router-dom";

const questions = [
  {
    id: 1,
    text: "В компании незнакомых людей я обычно...",
    options: [
      { value: "a", text: "Быстро нахожу общий язык и включаюсь в беседу" },
      { value: "b", text: "Присматриваюсь и постепенно вливаюсь в компанию" },
      { value: "c", text: "Предпочитаю держаться в стороне и наблюдать" },
      { value: "d", text: "Чувствую неловкость и стараюсь покинуть компанию" }
    ],
    category: "personality"
  },
  {
    id: 2,
    text: "Когда я сталкиваюсь с неудачей, я обычно...",
    options: [
      { value: "a", text: "Быстро восстанавливаюсь и двигаюсь дальше" },
      { value: "b", text: "Анализирую причины и делаю выводы" },
      { value: "c", text: "Расстраиваюсь, но стараюсь не показывать это" },
      { value: "d", text: "Долго переживаю и теряю мотивацию" }
    ],
    category: "confidence"
  },
  {
    id: 3,
    text: "Если кто-то нарушает мои планы, я...",
    options: [
      { value: "a", text: "Спокойно адаптируюсь к новой ситуации" },
      { value: "b", text: "Испытываю раздражение, но сдерживаю его" },
      { value: "c", text: "Открыто выражаю своё недовольство" },
      { value: "d", text: "Погружаюсь в плохое настроение надолго" }
    ],
    category: "irritability"
  },
  {
    id: 4,
    text: "Перед важным событием я обычно...",
    options: [
      { value: "a", text: "Сохраняю спокойствие и уверенность" },
      { value: "b", text: "Чувствую легкое волнение, но справляюсь с ним" },
      { value: "c", text: "Много волнуюсь и продумываю все варианты" },
      { value: "d", text: "Испытываю сильную тревогу, плохо сплю" }
    ],
    category: "anxiety"
  },
  {
    id: 5,
    text: "Мой темп речи и движений обычно...",
    options: [
      { value: "a", text: "Очень быстрый и энергичный" },
      { value: "b", text: "Умеренный и гибкий" },
      { value: "c", text: "Неторопливый и размеренный" },
      { value: "d", text: "Медленный и спокойный" }
    ],
    category: "temperament"
  },
  // Добавим еще 5 вопросов для баланса
  {
    id: 6,
    text: "В стрессовой ситуации я обычно...",
    options: [
      { value: "a", text: "Действую быстро и решительно" },
      { value: "b", text: "Сохраняю спокойствие и методично решаю проблему" },
      { value: "c", text: "Нуждаюсь в поддержке, чтобы справиться" },
      { value: "d", text: "Чувствую себя подавленным и растерянным" }
    ],
    category: "confidence"
  },
  {
    id: 7,
    text: "Мне проще всего работать...",
    options: [
      { value: "a", text: "В команде, с активным взаимодействием" },
      { value: "b", text: "Самостоятельно, но периодически обсуждая результаты" },
      { value: "c", text: "В тихой обстановке, без отвлечений" },
      { value: "d", text: "В одиночестве, полностью погрузившись в задачу" }
    ],
    category: "personality"
  },
  {
    id: 8,
    text: "Если кто-то ведет себя некорректно, я...",
    options: [
      { value: "a", text: "Напрямую указываю на это" },
      { value: "b", text: "Стараюсь деликатно намекнуть" },
      { value: "c", text: "Игнорирую, если это не влияет на меня" },
      { value: "d", text: "Сильно раздражаюсь, даже если не показываю этого" }
    ],
    category: "irritability"
  },
  {
    id: 9,
    text: "Перед принятием решения я...",
    options: [
      { value: "a", text: "Принимаю решение быстро, доверяя интуиции" },
      { value: "b", text: "Тщательно взвешиваю все за и против" },
      { value: "c", text: "Советуюсь с близкими или экспертами" },
      { value: "d", text: "Беспокоюсь и откладываю решение до последнего" }
    ],
    category: "anxiety"
  },
  {
    id: 10,
    text: "Мои эмоции обычно...",
    options: [
      { value: "a", text: "Яркие и быстро меняются" },
      { value: "b", text: "Устойчивые и умеренные" },
      { value: "c", text: "Глубокие, но сдержанные внешне" },
      { value: "d", text: "Спокойные, редко проявляются явно" }
    ],
    category: "temperament"
  }
];

const Test = () => {
  const navigate = useNavigate();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  
  const question = questions[currentQuestion];
  const progress = ((currentQuestion + 1) / questions.length) * 100;
  
  const handleOptionSelect = (value: string) => {
    setSelectedOption(value);
  };

  const handleNext = () => {
    if (selectedOption) {
      setAnswers({
        ...answers,
        [question.id]: selectedOption
      });
      
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
        setSelectedOption(null);
      } else {
        // Navigate to results with the answers
        navigate("/results", { state: { answers } });
      }
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
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
            <div className="flex justify-between items-center mb-4">
              <div className="text-sm text-gray-600">
                Вопрос {currentQuestion + 1} из {questions.length}
              </div>
              <div className="text-sm text-purple-600 font-medium">
                {Math.round(progress)}%
              </div>
            </div>
            <Progress value={progress} className="h-2 bg-purple-100" />
            <CardTitle className="text-xl mt-6 text-purple-700">
              {question.text}
            </CardTitle>
          </CardHeader>
          
          <CardContent>
            <RadioGroup value={selectedOption || ""} className="space-y-3">
              {question.options.map((option) => (
                <div key={option.value} className="flex items-start space-x-2 p-3 rounded-md hover:bg-purple-50 transition-colors">
                  <RadioGroupItem 
                    value={option.value} 
                    id={`option-${option.value}`} 
                    onClick={() => handleOptionSelect(option.value)}
                    className="mt-1"
                  />
                  <Label 
                    htmlFor={`option-${option.value}`}
                    className="flex-1 cursor-pointer font-normal"
                  >
                    {option.text}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </CardContent>
          
          <CardFooter className="flex justify-between pt-2">
            <Button
              variant="outline"
              onClick={handlePrevious}
              disabled={currentQuestion === 0}
              className="text-purple-700 border-purple-300"
            >
              <Icon name="ChevronLeft" size={18} />
              Назад
            </Button>
            
            <Button
              onClick={handleNext}
              disabled={!selectedOption}
              className="bg-purple-600 hover:bg-purple-700 text-white"
            >
              {currentQuestion < questions.length - 1 ? "Далее" : "Завершить тест"}
              {currentQuestion < questions.length - 1 ? (
                <Icon name="ChevronRight" size={18} />
              ) : (
                <Icon name="CheckCircle" size={18} />
              )}
            </Button>
          </CardFooter>
        </Card>
      </main>
    </div>
  );
};

export default Test;
