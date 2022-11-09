import React from 'react';
import { useParams } from 'react-router-dom';
import useAuthValue from '../hooks/useAuthValue';
import MainLayout from '../layouts/MainLayout';
import QuizConnection from '../components/quiz/QuizConntection';
// import RouteGuard from '../components/RouteGuard';
import useConnected from '../hooks/useConnected';

function Quiz() {
  const auth = useAuthValue();
  const { quizId } = useParams();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [connected] = useConnected();

  if (!quizId) {
    return null;
  }

  return (
    // <RouteGuard>
    <MainLayout hideNavBar>
      <QuizConnection quizId={quizId} username={auth.username} />
    </MainLayout>
    // </RouteGuard>
  );
}

export default Quiz;
