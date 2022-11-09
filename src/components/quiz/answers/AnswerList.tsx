import React from 'react';
import useQuizInfo from '../../../hooks/useQuizinfo';

const AnswerList = () => {
  const [quizInfo] = useQuizInfo();
  const colors = [
    'bg-[#3E6D9C]',
    'bg-[#FD841F]',
    'bg-[#E14D2A]',
    'bg-[#001253]',
  ];

  return (
    <div className="mx-auto h-[350px] min-w-[400px] max-w-[800px] overflow-hidden border-2 p-2">
      <div className="text-4xl font-bold text-blue-500">Answers</div>
      <div className="m-2 mt-4 h-full overflow-scroll">
        {[...quizInfo.answers].reverse().map((ans, index) => {
          return (
            <div
              key={index}
              className={`mt-4 h-12 w-full overflow-hidden text-ellipsis ${
                colors[index % 4]
              } p-2 text-3xl text-white shadow-md`}
            >
              {ans}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AnswerList;
