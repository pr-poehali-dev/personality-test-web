
import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const Index: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col bg-purple-50">
      {/* Шапка */}
      <Header />

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

        {/* Секция личный кабинет */}
        <section className="py-16 bg-purple-50 px-4">
          <div className="container mx-auto max-w-5xl">
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="md:w-1/2">
                <img 
                  src="https://images.unsplash.com/photo-1551836022-d5d88e9218df?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                  alt="Личный кабинет" 
                  className="rounded-lg shadow-xl max-w-full h-auto"
                />
              </div>
              <div className="md:w-1/2">
                <h3 className="text-2xl font-bold text-purple-800 mb-4">
                  Личный кабинет
                </h3>
                <p className="text-gray-700 mb-6">
                  Создайте личный кабинет, чтобы сохранять результаты тестов и вести дневник эмоций. 
                  Отслеживайте свой прогресс и получайте доступ к своим данным с любого устройства.
                </p>
                <ul className="space-y-3 mb-6">
                  <li className="flex items-start">
                    <Icon name="CheckSquare" className="h-5 w-5 text-purple-600 mt-0.5 mr-2 shrink-0" />
                    <span>Сохранение всех результатов тестов</span>
                  </li>
                  <li className="flex items-start">
                    <Icon name="CheckSquare" className="h-5 w-5 text-purple-600 mt-0.5 mr-2 shrink-0" />
                    <span>Отслеживание прогресса и изменений со временем</span>
                  </li>
                  <li className="flex items-start">
                    <Icon name="CheckSquare" className="h-5 w-5 text-purple-600 mt-0.5 mr-2 shrink-0" />
                    <span>Ведение дневника эмоций с синхронизацией</span>
                  </li>
                </ul>
                <Button 
                  onClick={() => navigate("/login")}
                  className="bg-purple-600 hover:bg-purple-700 text-white"
                >
                  <Icon name="UserPlus" className="mr-2 h-4 w-4" />
                  Создать аккаунт
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Подвал */}
      <Footer />
    </div>
  );
};

export default Index;
