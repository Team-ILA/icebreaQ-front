import React, { useRef } from 'react';
import { useList } from 'react-use';
import { HiOutlinePlusCircle } from 'react-icons/hi';
import SelectMenus, { SelectMenuItemProps } from './SelectMenus';
import QuestionCard, { Question } from './QuestionCard';
import DefaultButton from './DefaultButton';

const personnelOptions: SelectMenuItemProps[] = [
  { id: 2, content: '4 people' },
  { id: 3, content: '6 people' },
  { id: 4, content: '8 people' },
  { id: 5, content: '10 people' },
];

const initialQuestion: Question = {
  questionContent: '',
};

const MakeQuizContainer = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [questions, { push, updateAt, removeAt }] = useList<Question>([
    initialQuestion,
  ]);

  const addQuestionHandler = async () => {
    await push(initialQuestion);
    scrollRef.current?.scrollIntoView({
      behavior: 'smooth',
      block: 'end',
      inline: 'end',
    });
  };

  return (
    <div ref={scrollRef} className="pt-[58px]">
      <form className="mx-auto my-7 flex w-1/3 flex-col items-center gap-5 rounded-lg bg-gray-50 p-5">
        <p className="text-2xl font-bold">Making a new quiz</p>
        <div className="w-full space-y-2 rounded border-2 bg-violet-200 p-3">
          <div className="mb-3">
            <p className="font-semibold">Title of Quiz</p>
            <input
              type="text"
              className="form-control bg-classNameip-padding m-0 block w-full rounded border border-solid border-gray-300 bg-white px-3 py-2 text-sm font-normal text-gray-700 transition ease-in-out focus:border-blue-600 focus:bg-white focus:text-gray-700 focus:outline-none"
              id="quiz title"
            />
          </div>
          <div>
            <p>How many people can particiapte in?</p>
            <SelectMenus items={personnelOptions} />
          </div>
        </div>
        {questions.map((question, index) => {
          return (
            <QuestionCard
              question={question}
              index={index}
              key={index}
              updateAt={updateAt}
              removeAt={removeAt}
            />
          );
        })}
        <div
          className="flex w-full items-center justify-center gap-1 border-2 border-dashed bg-white p-3 text-gray-600 hover:cursor-pointer hover:font-bold"
          onClick={addQuestionHandler}
        >
          <HiOutlinePlusCircle size="28" />
          Add a question
        </div>
        <DefaultButton className="h-10 w-full" content="Submit" />
      </form>
    </div>
  );
};

export default MakeQuizContainer;
