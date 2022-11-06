import React from 'react';
import MainLayout from '../layouts/MainLayout';
import MakeQuizContainer from '../components/MakeQuizContainer';

const MakeQuiz = () => {
  return (
    <MainLayout>
      <div className="pt-[58px]">
        <MakeQuizContainer />
      </div>
    </MainLayout>
  );
};

export default MakeQuiz;
