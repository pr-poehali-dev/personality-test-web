
import { Route, Routes } from "react-router-dom";
import { lazy, Suspense } from "react";
import { Toaster } from "@/components/ui/toaster";
import "./App.css";

// Ленивая загрузка страниц для оптимизации
const Index = lazy(() => import("./pages/Index"));
const Test = lazy(() => import("./pages/Test"));
const Results = lazy(() => import("./pages/Results"));
const DiaryPage = lazy(() => import("./pages/DiaryPage"));
const NotFound = lazy(() => import("./pages/NotFound"));

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
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
      <Toaster />
    </>
  );
}

export default App;
