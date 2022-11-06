import React from 'react';
import MicToggle from './MicToggle';
import CamToggle from './CamToggle';

const QuizFooter = () => {
  return (
    <div className="fixed bottom-0 flex h-20 w-full items-center gap-4 bg-gray-800 px-10 py-5">
      <MicToggle />
      <CamToggle />
    </div>
  );
};

export default QuizFooter;
