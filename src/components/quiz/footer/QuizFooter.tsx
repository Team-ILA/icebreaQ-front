import React from 'react';
import MicToggle from './MicToggle';
import CamToggle from './CamToggle';
import AnswerInput from './AnswerInput';
import ExitButton from './ExitButton';

type QuizFooterProps = {
  submitAnswer: (answer: string) => void;
  destoryConnection: () => void;
};

const QuizFooter = ({ submitAnswer, destoryConnection }: QuizFooterProps) => {
  return (
    <div className="fixed bottom-0 flex h-20 w-full items-center gap-4 bg-gray-800 px-10 py-5">
      <MicToggle />
      <CamToggle />
      <AnswerInput submitAnswer={submitAnswer} />
      <ExitButton destoryConnection={destoryConnection} />
    </div>
  );
};

export default QuizFooter;
