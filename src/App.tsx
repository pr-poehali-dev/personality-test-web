
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Index from '@/pages/Index';
import Test from '@/pages/Test';
import Results from '@/pages/Results';
import NotFound from '@/pages/NotFound';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/test" element={<Test />} />
        <Route path="/results" element={<Results />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
