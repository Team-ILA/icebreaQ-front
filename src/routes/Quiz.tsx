import React from 'react';
import MainLayout from '../layouts/MainLayout';
import QuizContainer from '../components/quiz/QuizContainer';
import RouteGuard from '../components/RouteGuard';

function Quiz() {
  return (
    <RouteGuard>
      <MainLayout hideNavBar>
        <QuizContainer />
      </MainLayout>
    </RouteGuard>
  );
}

export default Quiz;
