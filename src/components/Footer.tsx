
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

const Footer: React.FC = () => {
  return (
    <footer className="bg-purple-800 text-white py-8 px-4">
      <div className="container mx-auto max-w-5xl">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4 flex items-center">
              <Icon name="Brain" className="mr-2 h-5 w-5" />
              Психологический помощник
            </h3>
            <p className="text-purple-100 text-sm">
              Инструмент для самопознания, отслеживания эмоций и личностного роста.
              Проходите тесты, ведите дневник эмоций и развивайтесь.
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Разделы</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-purple-100 hover:text-white transition-colors text-sm">
                  Главная
                </Link>
              </li>
              <li>
                <Link to="/test" className="text-purple-100 hover:text-white transition-colors text-sm">
                  Пройти тест
                </Link>
              </li>
              <li>
                <Link to="/diary" className="text-purple-100 hover:text-white transition-colors text-sm">
                  Дневник эмоций
                </Link>
              </li>
              <li>
                <Link to="/profile" className="text-purple-100 hover:text-white transition-colors text-sm">
                  Личный кабинет
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Контакты</h3>
            <div className="space-y-3">
              <p className="flex items-center text-sm text-purple-100">
                <Icon name="Mail" className="mr-2 h-4 w-4" />
                info@psychology-helper.com
              </p>
              <div className="flex space-x-2">
                <Button variant="ghost" size="icon" className="text-purple-100 hover:text-white hover:bg-purple-700">
                  <Icon name="Facebook" className="h-5 w-5" />
                </Button>
                <Button variant="ghost" size="icon" className="text-purple-100 hover:text-white hover:bg-purple-700">
                  <Icon name="Instagram" className="h-5 w-5" />
                </Button>
                <Button variant="ghost" size="icon" className="text-purple-100 hover:text-white hover:bg-purple-700">
                  <Icon name="Twitter" className="h-5 w-5" />
                </Button>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-8 pt-4 border-t border-purple-700 flex flex-col md:flex-row justify-between items-center">
          
          <p className="text-sm text-purple-200">
            &copy; {new Date().getFullYear()} Психологический помощник. Все права защищены.
          </p>
          <div className="mt-4 md:mt-0 flex flex-wrap space-x-4 text-sm text-purple-200">
            <Link to="/privacy" className="hover:text-white">
              Политика конфиденциальности
            </Link>
            <Link to="/terms" className="hover:text-white">
              Условия использования
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
