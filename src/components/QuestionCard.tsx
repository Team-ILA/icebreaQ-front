import React from 'react';
import SelectMenus, { SelectMenuItemProps } from './SelectMenus';

type QuestionCardProps = {
  questionNum: number;
};

const questionTypeOptions: SelectMenuItemProps[] = [
  { id: 1, content: 'subjective' },
  { id: 2, content: 'yes or no' },
  { id: 3, content: 'multiple choice' },
];

const QuestionCard = ({ questionNum }: QuestionCardProps) => {
  return (
    <div className="w-full space-y-2 border-2 border-dashed bg-white p-3">
      <p className="font-bold text-gray-600">Question {questionNum}</p>
      <div>
        <p>Type of Question</p>
        <SelectMenus items={questionTypeOptions} />
      </div>
      <p>What is the question?</p>
      <input
        type="text"
        className="form-control bg-classNameip-padding m-0 block w-full rounded border border-solid border-gray-300 bg-white px-3 py-2 text-sm font-normal text-gray-700 transition ease-in-out focus:border-blue-600 focus:bg-white focus:text-gray-700 focus:outline-none"
        id={`question ${questionNum}`}
        placeholder="e.g. Any plans for the weekend?"
      />
    </div>
  );
};

export default QuestionCard;
