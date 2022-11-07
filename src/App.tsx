import React, { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';

import { getUserInfo } from './lib/api/auth';
import useAuthAction from './hooks/useAuthAction';

import Home from './routes/Home';
import Landing from './routes/Landing';
import Login from './routes/Login';
import Makequiz from './routes/MakeQuiz';
import Quiz from './routes/Quiz';
import JoinQuiz from './routes/JoinQuiz';
import Completed from './routes/Completed';

function App() {
  const { signIn, signOut } = useAuthAction();
  useEffect(() => {
    getUserInfo()
      .then(({ data }) => {
        const { email, username } = data;
        signIn({ email, username });
      })
      .catch(() => signOut());
  });

  return (
    <Routes>
      <Route element={<Landing />} index path="/" />
      <Route element={<Home />} index path="/home" />
      <Route element={<Login />} index path="/login" />
      <Route element={<Makequiz />} path="/makequiz" />
      <Route element={<Completed />} path="/makequiz/completed" />
      <Route element={<Quiz />} path="/quiz/:quizId" />
      <Route element={<JoinQuiz />} path="/join" />
    </Routes>
  );
}

export default App;
