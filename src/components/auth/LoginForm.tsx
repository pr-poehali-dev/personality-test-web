
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useAuth } from '@/contexts/AuthContext';
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription } from '@/components/ui/alert';
import Icon from '@/components/ui/icon';

const loginSchema = z.object({
  email: z.string().email('Пожалуйста, введите корректный email'),
});

const registerSchema = z.object({
  name: z.string().min(2, 'Имя должно содержать не менее 2 символов'),
  email: z.string().email('Пожалуйста, введите корректный email'),
});

const LoginForm = () => {
  const { login, register } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<string>('login');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  // Форма для входа
  const loginForm = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
    },
  });

  // Форма для регистрации
  const registerForm = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: '',
      email: '',
    },
  });

  // Обработчик входа
  const onLoginSubmit = async (values: z.infer<typeof loginSchema>) => {
    setLoading(true);
    setError(null);
    
    try {
      const result = await login(values.email);
      
      if (result.success) {
        navigate('/profile');
      } else {
        setError(result.message || 'Ошибка при входе');
      }
    } catch (err) {
      setError('Произошла неожиданная ошибка');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Обработчик регистрации
  const onRegisterSubmit = async (values: z.infer<typeof registerSchema>) => {
    setLoading(true);
    setError(null);
    
    try {
      const result = await register(values.email, values.name);
      
      if (result.success) {
        navigate('/profile');
      } else {
        setError(result.message || 'Ошибка при регистрации');
      }
    } catch (err) {
      setError('Произошла неожиданная ошибка');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="text-center">Личный кабинет</CardTitle>
        <CardDescription className="text-center">
          Войдите или зарегистрируйтесь для доступа к личному кабинету
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-4">
            <TabsTrigger value="login">Вход</TabsTrigger>
            <TabsTrigger value="register">Регистрация</TabsTrigger>
          </TabsList>
          
          <TabsContent value="login">
            <Form {...loginForm}>
              <form onSubmit={loginForm.handleSubmit(onLoginSubmit)} className="space-y-4">
                <FormField
                  control={loginForm.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input placeholder="ваш@email.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                {error && (
                  <Alert variant="destructive">
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}
                
                <Button type="submit" className="w-full" disabled={loading}>
                  {loading ? (
                    <>
                      <Icon name="Loader2" className="mr-2 h-4 w-4 animate-spin" />
                      Вход...
                    </>
                  ) : 'Войти'}
                </Button>
              </form>
            </Form>
          </TabsContent>
          
          <TabsContent value="register">
            <Form {...registerForm}>
              <form onSubmit={registerForm.handleSubmit(onRegisterSubmit)} className="space-y-4">
                <FormField
                  control={registerForm.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Имя</FormLabel>
                      <FormControl>
                        <Input placeholder="Ваше имя" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={registerForm.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input placeholder="ваш@email.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                {error && (
                  <Alert variant="destructive">
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}
                
                <Button type="submit" className="w-full" disabled={loading}>
                  {loading ? (
                    <>
                      <Icon name="Loader2" className="mr-2 h-4 w-4 animate-spin" />
                      Регистрация...
                    </>
                  ) : 'Зарегистрироваться'}
                </Button>
              </form>
            </Form>
          </TabsContent>
        </Tabs>
      </CardContent>
      <CardFooter className="flex justify-center">
        <p className="text-sm text-gray-500">
          {activeTab === 'login' 
            ? "Нет аккаунта? " 
            : "Уже есть аккаунт? "}
          <Button 
            variant="link" 
            className="p-0 h-auto font-normal" 
            onClick={() => setActiveTab(activeTab === 'login' ? 'register' : 'login')}
          >
            {activeTab === 'login' ? "Зарегистрируйтесь" : "Войдите"}
          </Button>
        </p>
      </CardFooter>
    </Card>
  );
};

export default LoginForm;
