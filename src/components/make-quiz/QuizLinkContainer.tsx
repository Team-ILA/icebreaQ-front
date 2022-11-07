import React from 'react';
import { Link, useSearchParams, Navigate } from 'react-router-dom';
import { Button } from 'flowbite-react';
import CopyToClipBoard from './CopyToClipBoard';

const QuizLinkContainer = () => {
  const [searchParams] = useSearchParams();
  const quizId = searchParams.get('quizId');
  const link = `${process.env.REACT_APP_URL}/quiz/${quizId}`;

  if (!quizId) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="mx-auto mt-52 flex h-screen max-w-xl flex-col items-center pt-[58px]">
      <div className="mb-2 text-center text-2xl font-semibold italic text-slate-900">
        Your quiz was
        <span className="relative">
          <span
            className="absolute -inset-1 block -skew-y-3"
            aria-hidden="true"
          ></span>
          <span className="relative mx-2 font-bold text-green-700">
            successfully
          </span>
        </span>
        created!
      </div>
      <div className="flex w-full items-center justify-center gap-4">
        <input
          type="text"
          value={link}
          className="form-control bg-classNameip-padding m-0 block w-full grow overflow-hidden rounded border border-solid border-gray-300 bg-white px-4 py-2 text-xl font-normal text-gray-700 transition ease-in-out focus:border-blue-600 focus:bg-white focus:text-gray-700 focus:outline-none"
        ></input>
        <CopyToClipBoard link={link} />
      </div>

      <Link className="w-1/3" to={`/quiz/${quizId}`}>
        <Button className="mt-2 h-full w-full">Join Quiz</Button>
      </Link>
    </div>
  );
};

export default QuizLinkContainer;
