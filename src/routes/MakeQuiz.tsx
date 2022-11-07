import React from 'react';
import MainLayout from '../layouts/MainLayout';
import MakeQuizContainer from '../components/MakeQuizContainer';
import RouteGuard from '../components/RouteGuard';

const MakeQuiz = () => {
  return (
    <RouteGuard>
      <MainLayout>
        <div className="pt-[58px]">
          <MakeQuizContainer />
        </div>
      </MainLayout>
    </RouteGuard>
  );
};

export default MakeQuiz;
