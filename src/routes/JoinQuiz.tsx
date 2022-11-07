import React from 'react';
import MainLayout from '../layouts/MainLayout';
import JoinQuizContainer from '../components/JoinQuizContainer';
import RouteGuard from '../components/RouteGuard';

const JoinQuiz = () => {
  return (
    <RouteGuard>
      <MainLayout>
        <div className="mx-auto flex h-screen w-full justify-center text-xl">
          <JoinQuizContainer />
        </div>
      </MainLayout>
    </RouteGuard>
  );
};

export default JoinQuiz;
