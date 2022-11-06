import React from 'react';

type QuestionWrapperProps = {
  content: string;
  questionNum: number;
};

const QuestionWrapper = ({ content, questionNum }: QuestionWrapperProps) => {
  return (
    <div className="my-6 mx-auto h-52 max-w-screen-xl gap-2 rounded-xl bg-gray-300">
      <div className="flex h-full animate-[fadein_1s_ease-in] flex-col items-center justify-center">
        <span className="absolute mb-28 text-3xl">Question {questionNum}</span>
        <span className="text-5xl font-bold">{content}</span>
      </div>
    </div>
  );
};

export default QuestionWrapper;
