import React, { createContext, useState } from 'react';

export type QuizInfo = {
  current_question: {
    questionNum: number;
    content: string;
  };
  answers: string[];
  title: string;
  creator: string;
};

type QuizInfoType = [QuizInfo, React.Dispatch<React.SetStateAction<QuizInfo>>];

const initialValue: QuizInfo = {
  current_question: {
    questionNum: 1,
    content: '',
  },
  answers: [],
  title: '',
  creator: '',
};

export const QuizInfoContext = createContext<QuizInfoType>({} as QuizInfoType);

const QuizInfoProvider = ({ children }: { children: React.ReactNode }) => {
  const quizInfoState = useState<QuizInfo>(initialValue);

  return (
    <QuizInfoContext.Provider value={quizInfoState}>
      {children}
    </QuizInfoContext.Provider>
  );
};

export default QuizInfoProvider;
