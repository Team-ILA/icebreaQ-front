import React from 'react';
import { Route, Routes } from 'react-router-dom';

import Home from './routes/Home';
import Landing from './routes/Landing';
import Login from './routes/Login';
import Makequiz from './routes/MakeQuiz';
import Quiz from './routes/Quiz';
import JoinQuiz from './routes/JoinQuiz';

function App() {
  return (
    <Routes>
      <Route element={<Landing />} index path="/" />
      <Route element={<Home />} index path="/home" />
      <Route element={<Login />} index path="/login" />
      <Route element={<Makequiz />} path="/makequiz" />
      <Route element={<Quiz />} path="/quiz/:quizId" />
      <Route element={<JoinQuiz />} path="/join" />
    </Routes>
  );
}

export default App;
