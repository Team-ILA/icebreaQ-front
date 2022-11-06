import React, { useState } from 'react';
import DefaultButton from './DefaultButton';
import { Link } from 'react-router-dom';

const JoinQuizContainer = () => {
  const [gamePin, setGamePin] = useState('');

  const gamePinChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setGamePin(e.target.value);
  };

  return (
    <div className="flex h-full w-[25vw] items-center">
      <div className="flex h-1/4 w-full flex-col justify-center space-y-3 rounded-lg border-2 bg-slate-100 p-6">
        <div>
          <p>Game PIN</p>
          <input
            type="text"
            onChange={gamePinChangeHandler}
            value={gamePin}
            className="form-control bg-classNameip-padding m-0 block w-full rounded border border-solid border-gray-300 bg-white px-4 py-2 text-xl font-normal text-gray-700 transition ease-in-out focus:border-blue-600 focus:bg-white focus:text-gray-700 focus:outline-none"
            id="gamePin"
          />
        </div>
        <Link to={`/quiz/${gamePin}`}>
          <DefaultButton
            className="w-full p-2 transition duration-150 ease-in-out hover:bg-violet-600 hover:shadow-md focus:bg-violet-600 focus:shadow-md focus:outline-none focus:ring-0 active:bg-violet-700 active:shadow-md"
            content="Join"
          />
        </Link>
        <div className="text-center text-xl">
          <p>or</p>
          <Link className="text-blue-700" to="/makequiz">
            Make a new Quiz
          </Link>
        </div>
      </div>
    </div>
  );
};

export default JoinQuizContainer;
