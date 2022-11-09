import React from 'react';
import { Spinner } from 'flowbite-react';
import QuizFooter from './footer/QuizFooter';
import QuestionWrapper from './QuestionWrapper';
import AnswerList from './answers/AnswerList';
import useConnected from '../../hooks/useConnected';
import useQuizInfo from '../../hooks/useQuizinfo';
import CamGrid from './cam/CamGrid';
import useVideoItems from '../../hooks/useVideoItems';

type QuizContainerProps = {
  submitAnswer: (answer: string) => void;
  destoryConnection: () => void;
  moveNext: () => void;
  movePrev: () => void;
};

const QuizContainer = ({
  submitAnswer,
  destoryConnection,
  moveNext,
  movePrev,
}: QuizContainerProps) => {
  const [isConnected] = useConnected();
  const [quizInfo] = useQuizInfo();
  const [videoItems] = useVideoItems();

  if (!isConnected) {
    return (
      <div className="grid min-h-screen place-items-center">
        <div className="flex w-1/3 items-center justify-center gap-4">
          <Spinner size="xl" />
          <div className="text-4xl text-gray-800">loading...</div>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="h-screen">
        <button onClick={() => console.log(videoItems)}>hihi</button>
        <QuestionWrapper
          moveNext={moveNext}
          movePrev={movePrev}
          questionNum={quizInfo.current_question.questionNum}
          content={quizInfo.current_question.content}
        />
        <AnswerList />
        <CamGrid />
        <QuizFooter
          submitAnswer={submitAnswer}
          destoryConnection={destoryConnection}
        />
      </div>
    </>
  );
};

export default QuizContainer;
