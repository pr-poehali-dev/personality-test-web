
import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";

const Index: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col bg-purple-50">
      {/* Шапка */}
      <header className="bg-white shadow-sm py-4">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <h1 className="text-xl font-bold text-purple-800">Психологический помощник</h1>
          <nav className="hidden md:flex space-x-6">
            <Button 
              variant="link" 
              onClick={() => navigate("/")}
              className="text-purple-700"
            >
              Главная
            </Button>
            <Button 
              variant="link" 
              onClick={() => navigate("/test")}
              className="text-purple-700"
            >
              Пройти тест
            </Button>
            <Button 
              variant="link" 
              onClick={() => navigate("/diary")}
              className="text-purple-700"
            >
              Дневник эмоций
            </Button>
          </nav>
          <Button 
            variant="ghost" 
            size="icon" 
            className="md:hidden"
          >
            <Icon name="Menu" className="h-6 w-6" />
          </Button>
        </div>
      </header>

      {/* Основная секция */}
      <main className="flex-1">
        {/* Герой секция */}
        <section className="py-16 md:py-24 px-4">
          <div className="container mx-auto max-w-5xl">
            <div className="flex flex-col md:flex-row items-center gap-8 md:gap-16">
              <div className="md:w-1/2">
                <h2 className="text-3xl md:text-4xl font-bold text-purple-900 mb-4">
                  Узнайте больше о своей личности и эмоциях
                </h2>
                <p className="text-gray-700 mb-8">
                  Пройдите наш тест, чтобы лучше понять себя, свой тип личности и эмоциональные характеристики. 
                  Используйте дневник эмоций для отслеживания своего самочувствия и получения персонализированных рекомендаций.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button 
                    onClick={() => navigate("/test")}
                    className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2"
                  >
                    Пройти психологический тест
                    <Icon name="ArrowRight" className="ml-2 h-4 w-4" />
                  </Button>
                  <Button 
                    variant="outline" 
                    onClick={() => navigate("/diary")}
                    className="border-purple-300 text-purple-700"
                  >
                    Открыть дневник эмоций
                    <Icon name="Calendar" className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </div>
              <div className="md:w-1/2 flex justify-center">
                <img 
                  src="https://images.unsplash.com/photo-1546410531-bb4caa6b424d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                  alt="Психология и самопознание" 
                  className="rounded-lg shadow-xl max-w-full h-auto"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Секция с карточками возможностей */}
        <section className="py-16 bg-white px-4">
          <div className="container mx-auto max-w-5xl">
            <h3 className="text-2xl font-bold text-center text-purple-800 mb-12">
              Что вы получите
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-purple-50 rounded-lg p-6 shadow-md">
                <div className="rounded-full bg-purple-100 p-3 inline-block mb-4">
                  <Icon name="Brain" className="h-6 w-6 text-purple-600" />
                </div>
                <h4 className="text-lg font-semibold mb-2">Психологический портрет</h4>
                <p className="text-gray-700">
                  Узнайте свой тип личности MBTI и получите подробное описание ваших психологических характеристик.
                </p>
              </div>
              <div className="bg-purple-50 rounded-lg p-6 shadow-md">
                <div className="rounded-full bg-purple-100 p-3 inline-block mb-4">
                  <Icon name="BarChart" className="h-6 w-6 text-purple-600" />
                </div>
                <h4 className="text-lg font-semibold mb-2">Анализ эмоциональных черт</h4>
                <p className="text-gray-700">
                  Получите подробный анализ вашего темперамента, общительности, тревожности и других ключевых характеристик.
                </p>
              </div>
              <div className="bg-purple-50 rounded-lg p-6 shadow-md">
                <div className="rounded-full bg-purple-100 p-3 inline-block mb-4">
                  <Icon name="CalendarHeart" className="h-6 w-6 text-purple-600" />
                </div>
                <h4 className="text-lg font-semibold mb-2">Дневник эмоций</h4>
                <p className="text-gray-700">
                  Отслеживайте свое эмоциональное состояние день за днем и получайте персонализированные рекомендации.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Подвал */}
      <footer className="bg-purple-800 text-white py-8 px-4">
        <div className="container mx-auto max-w-5xl">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p>&copy; 2025 Психологический помощник</p>
            <div className="flex space-x-4 mt-4 md:mt-0">
              <Button variant="ghost" size="icon">
                <Icon name="Mail" className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon">
                <Icon name="Instagram" className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon">
                <Icon name="Facebook" className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
