import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import QuizContainer from '../components/quiz/QuizContainer';
import RouteGuard from '../components/RouteGuard';

function Quiz() {
  const { quizId } = useParams();
  useEffect(() => {
    console.log(quizId);
  }, []);

  return (
    <RouteGuard>
      <MainLayout hideNavBar>
        <QuizContainer />
      </MainLayout>
    </RouteGuard>
  );
}

export default Quiz;
