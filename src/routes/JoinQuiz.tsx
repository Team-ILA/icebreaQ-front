import React from 'react';
import MainLayout from '../layouts/MainLayout';
import JoinQuizContainer from '../components/JoinQuizContainer';

const JoinQuiz = () => {
  return (
    <MainLayout>
      <div className="mx-auto flex h-screen w-full justify-center text-xl">
        <JoinQuizContainer />
      </div>
    </MainLayout>
  );
};

export default JoinQuiz;
