import React from 'react';

const AnswerInput = () => {
  return (
    <div className="mx-52 grow">
      <input
        className="form-control bg-classNameip-padding m-0 block w-full rounded border border-solid border-gray-300 bg-white px-4 py-2 text-xl font-normal text-gray-700 transition ease-in-out focus:border-blue-600 focus:bg-white focus:text-gray-700 focus:outline-none"
        id="answerInput"
        placeholder="Type your answer and press enter"
      />
    </div>
  );
};

export default AnswerInput;
