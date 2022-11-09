import React, { useState } from 'react';

type AnswerInputProps = {
  submitAnswer: (answer: string) => void;
};

const AnswerInput = ({ submitAnswer }: AnswerInputProps) => {
  const [input, setInput] = useState('');
  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setInput((input) => {
      submitAnswer(input);
      return '';
    });
  };
  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) =>
    setInput(e.target.value);

  return (
    <div className="mx-52 grow">
      <form onSubmit={submitHandler}>
        <input
          className="form-control bg-classNameip-padding m-0 block w-full rounded border border-solid border-gray-300 bg-white px-4 py-2 text-xl font-normal text-gray-700 transition ease-in-out focus:border-blue-600 focus:bg-white focus:text-gray-700 focus:outline-none"
          id="answerInput"
          value={input}
          onChange={changeHandler}
          placeholder="Type your answer and press enter"
        />
        <button className="sr-only" type="submit" />
      </form>
    </div>
  );
};

export default AnswerInput;
