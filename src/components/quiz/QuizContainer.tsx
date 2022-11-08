import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Spinner } from 'flowbite-react';
import QuizFooter from './footer/QuizFooter';
import QuestionWrapper from './QuestionWrapper';
import { VideoDetail } from '../../services/socketConnection';
import useAuthValue from '../../hooks/useAuthValue';
import Connection, {
  createSocketConnectionInstance,
} from '../../services/socketConnection';
import CamGrid from './cam/CamGrid';

const QuizContainer = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  let socketInstance: Connection | null = null;
  const [, setStreaming] = useState(false);
  const [, setDisplayStream] = useState(false);
  const [isConnected, setConnected] = useState<boolean>(false);
  const [videoItems, setVideoItems] = useState(new Map<string, VideoDetail>());
  const auth = useAuthValue();
  const { quizId } = useParams();

  const startConnection = () => {
    if (quizId) {
      socketInstance = createSocketConnectionInstance({
        updateInstance: updateFromInstance,
        videoItems: videoItems,
        quizId: quizId,
        username: auth.username,
      });
    }
  };

  const updateFromInstance = (key: string, value: any) => {
    if (key === 'streaming') setStreaming(value);
    if (key === 'displayStream') setDisplayStream(value);
    if (key === 'connection') setConnected(value);
    if (key === 'videoItems') setVideoItems(value);
  };

  useEffect(() => {
    return () => {
      socketInstance?.destoryConnection();
    };
  }, []);

  useEffect(() => {
    // console.log(videoItems);
  }, [videoItems]);

  useEffect(() => {
    if (auth.username) {
      socketInstance?.destoryConnection();
      startConnection();
    }
  }, [auth]);

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
        <QuestionWrapper questionNum={1} content="Any plans for the weekend?" />
        <CamGrid videoItems={videoItems} />
        <QuizFooter />
      </div>
    </>
  );
};

export default QuizContainer;
