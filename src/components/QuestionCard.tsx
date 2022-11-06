import React from 'react';
import { HiTrash } from 'react-icons/hi';

export interface Question {
  questionContent: string;
}

type QuestionCardProps = {
  question: Question;
  index: number;
  updateAt: (index: number, item: Question) => void;
  removeAt: (index: number) => void;
};

const QuestionCard = ({
  question,
  index,
  updateAt,
  removeAt,
}: QuestionCardProps) => {
  const questionChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) =>
    updateAt(index, {
      questionContent: e.target.value,
    });

  return (
    <div className="w-full border-2 border-dashed bg-white p-3">
      <div className="mb-2 flex">
        <p className="font-bold text-gray-600">Question {index + 1}</p>
        <div className="grow"></div>
        <span className="hover:cursor-pointer hover:text-red-500">
          <HiTrash onClick={() => removeAt(index)} size={25} />
        </span>
      </div>
      <div>
        <p className="mb-1">What is the question?</p>
        <input
          type="text"
          className="form-control bg-classNameip-padding m-0 block w-full rounded border border-solid border-gray-300 bg-white px-3 py-2 text-sm font-normal text-gray-700 transition ease-in-out focus:border-blue-600 focus:bg-white focus:text-gray-700 focus:outline-none"
          id={`question ${index}`}
          value={question.questionContent}
          onChange={questionChangeHandler}
          placeholder="e.g. Any plans for the weekend?"
        />
      </div>
    </div>
  );
};

export default QuestionCard;
