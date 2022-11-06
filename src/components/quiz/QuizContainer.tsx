import React from 'react';
import QuizFooter from './footer/QuizFooter';
import QuestionWrapper from './QuestionWrapper';

const QuizContainer = () => {
  return (
    <div className="h-screen">
      <QuestionWrapper questionNum={1} content="Any plans for the weekend?" />
      <QuizFooter />
    </div>
  );
};

export default QuizContainer;
