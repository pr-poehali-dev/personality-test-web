
import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import Icon from '@/components/ui/icon';
import { useAuth } from '@/contexts/AuthContext';
import { getInitials } from '@/lib/utils';

const Header: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { path: '/', label: 'Главная' },
    { path: '/test', label: 'Пройти тест' },
    { path: '/diary', label: 'Дневник эмоций' },
  ];

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  return (
    <header className="bg-white shadow-sm py-4 sticky top-0 z-50">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Link to="/" className="text-xl font-bold text-purple-800 flex items-center">
          <Icon name="Brain" className="mr-2 h-6 w-6" />
          <span>Психологический помощник</span>
        </Link>

        {/* Десктопное меню */}
        <nav className="hidden md:flex items-center space-x-6">
          {navItems.map((item) => (
            <Button
              key={item.path}
              variant="link"
              className={`text-purple-700 ${
                location.pathname === item.path ? 'font-semibold' : ''
              }`}
              onClick={() => navigate(item.path)}
            >
              {item.label}
            </Button>
          ))}

          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src="" alt={user.name || user.email} />
                    <AvatarFallback className="bg-purple-100 text-purple-800">
                      {getInitials(user.name || user.email)}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>{user.name || user.email}</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => navigate('/profile')}>
                  <Icon name="User" className="mr-2 h-4 w-4" />
                  <span>Профиль</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigate('/profile/results')}>
                  <Icon name="BarChart" className="mr-2 h-4 w-4" />
                  <span>Результаты тестов</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout}>
                  <Icon name="LogOut" className="mr-2 h-4 w-4" />
                  <span>Выйти</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button
              onClick={() => navigate('/login')}
              variant="default"
              className="bg-purple-600 hover:bg-purple-700"
            >
              <Icon name="LogIn" className="mr-2 h-4 w-4" />
              Войти
            </Button>
          )}
        </nav>

        {/* Мобильное меню */}
        <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="md:hidden">
              <Icon name="Menu" className="h-6 w-6" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-[80%] sm:w-[60%]">
            <div className="flex flex-col h-full">
              <div className="flex items-center justify-between mb-6">
                <span className="text-lg font-bold text-purple-800">Меню</span>
              </div>
              <nav className="flex flex-col space-y-4">
                {navItems.map((item) => (
                  <Button
                    key={item.path}
                    variant="ghost"
                    className={`justify-start ${
                      location.pathname === item.path ? 'bg-purple-50 text-purple-700' : ''
                    }`}
                    onClick={() => {
                      navigate(item.path);
                      closeMobileMenu();
                    }}
                  >
                    {item.label}
                  </Button>
                ))}
                <div className="pt-4 border-t border-gray-200">
                  {user ? (
                    <div className="space-y-3">
                      <div className="flex items-center space-x-3 pb-3">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src="" alt={user.name || user.email} />
                          <AvatarFallback className="bg-purple-100 text-purple-800">
                            {getInitials(user.name || user.email)}
                          </AvatarFallback>
                        </Avatar>
                        <span className="font-medium">{user.name || user.email}</span>
                      </div>
                      <Button
                        variant="ghost"
                        className="w-full justify-start"
                        onClick={() => {
                          navigate('/profile');
                          closeMobileMenu();
                        }}
                      >
                        <Icon name="User" className="mr-2 h-4 w-4" />
                        <span>Профиль</span>
                      </Button>
                      <Button
                        variant="ghost"
                        className="w-full justify-start"
                        onClick={() => {
                          navigate('/profile/results');
                          closeMobileMenu();
                        }}
                      >
                        <Icon name="BarChart" className="mr-2 h-4 w-4" />
                        <span>Результаты тестов</span>
                      </Button>
                      <Button
                        variant="destructive"
                        className="w-full"
                        onClick={() => {
                          handleLogout();
                          closeMobileMenu();
                        }}
                      >
                        <Icon name="LogOut" className="mr-2 h-4 w-4" />
                        <span>Выйти</span>
                      </Button>
                    </div>
                  ) : (
                    <Button
                      onClick={() => {
                        navigate('/login');
                        closeMobileMenu();
                      }}
                      className="w-full bg-purple-600 hover:bg-purple-700"
                    >
                      <Icon name="LogIn" className="mr-2 h-4 w-4" />
                      Войти
                    </Button>
                  )}
                </div>
              </nav>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
};

export default Header;
