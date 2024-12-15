import React from 'react';
import { useQuizStore } from './store/quizStore';
import Landing from './components/Landing';
import QuizStep from './components/QuizStep';

function App() {
  const step = useQuizStore((state) => state.step);

  return (
    <div className="min-h-screen bg-gray-50">
      {step === 0 ? <Landing /> : <QuizStep />}
    </div>
  );
}

export default App;