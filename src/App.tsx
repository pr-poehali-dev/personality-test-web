
import { Route, Routes } from "react-router-dom";
import { lazy, Suspense } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as SonnerToaster } from "@/components/ui/sonner";
import "./App.css";

// Ленивая загрузка страниц для оптимизации
const Index = lazy(() => import("./pages/Index"));
const Test = lazy(() => import("./pages/Test"));
const Results = lazy(() => import("./pages/Results"));
const DiaryPage = lazy(() => import("./pages/DiaryPage"));
const NotFound = lazy(() => import("./pages/NotFound"));
const LoginPage = lazy(() => import("./pages/LoginPage"));
const ProfilePage = lazy(() => import("./pages/ProfilePage"));

function App() {
  return (
    <>
      <Suspense fallback={
        <div className="flex h-screen w-screen items-center justify-center">
          <div className="animate-spin h-12 w-12 border-4 border-purple-500 rounded-full border-t-transparent"></div>
        </div>
      }>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/test" element={<Test />} />
          <Route path="/results" element={<Results />} />
          <Route path="/diary" element={<DiaryPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/profile/results" element={<ProfilePage />} />
          <Route path="/profile/results/:id" element={<ProfilePage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
      <Toaster />
      <SonnerToaster />
    </>
  );
}

export default App;
