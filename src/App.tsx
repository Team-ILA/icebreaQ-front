import React from 'react';
import { Route, Routes } from 'react-router-dom';

import Home from './routes/Home';
import Makequiz from './routes/MakeQuiz';
import Quiz from './routes/Quiz';

function App() {
  return (
    <Routes>
      <Route element={<Home />} index path="/" />
      <Route element={<Makequiz />} path="/makequiz" />
      <Route element={<Quiz />} path="/quiz/:quizid" />
    </Routes>
  );
}

export default App;
