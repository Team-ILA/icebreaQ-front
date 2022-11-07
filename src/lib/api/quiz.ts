import apiClient from './apiClient';

export const requestMakeQuiz = (
  title: string,
  limit: number,
  questions: string[]
) =>
  apiClient.post<makeQuizReponse>('/quiz', {
    title: title,
    limit: limit,
    questions: questions,
  });
export type makeQuizReponse = {
  quizId: string;
};

export const getQuizInfo = (quizId: string) =>
  apiClient.get<quizReponse>(`/quiz/${quizId}`);

export type quizReponse = {
  quizId: string;
  creator: string;
  QA: {
    question: string;
    answer: string[];
  }[];
  current_question: number;
  published_date: Date;
  active_users: number[];
  title: string;
  limit: number;
};
