import React from 'react';
import { Button } from 'flowbite-react';
import useAuthValue from '../../hooks/useAuthValue';
import useQuestionInfo from '../../hooks/useQuizinfo';

type QuestionWrapperProps = {
  content: string;
  questionNum: number;
  movePrev: () => void;
  moveNext: () => void;
};

const QuestionWrapper = ({
  content,
  questionNum,
  movePrev,
  moveNext,
}: QuestionWrapperProps) => {
  const auth = useAuthValue();
  const [questionInfo] = useQuestionInfo();

  return (
    <div className="my-6 mx-auto h-52 max-w-screen-xl gap-2 rounded-xl bg-gray-300">
      <div className="flex h-full animate-[fadein_1s_ease-in] flex-col items-center justify-center">
        <span className="absolute mb-28 text-3xl">Question {questionNum}</span>
        <span className="mt-6 text-5xl font-bold">{content}</span>
        <div className="relative top-7 flex gap-3">
          {auth.email === questionInfo.creator && (
            <>
              <Button onClick={movePrev}>Prev</Button>
              <Button onClick={moveNext}>Next</Button>{' '}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default QuestionWrapper;
