import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import QuizContainer from '../components/quiz/QuizContainer';

function Quiz() {
  const { quizId } = useParams();
  useEffect(() => {
    console.log(quizId);
  }, []);

  return (
    <MainLayout hideNavBar>
      <QuizContainer />
    </MainLayout>
  );
}

export default Quiz;
