import apiClient from './apiClient';

export const requestMakeQuiz = (
  title: string,
  limit: number,
  questions: string[]
) =>
  apiClient.post<loginResponse>('/api/quiz', {
    title: title,
    limit: limit,
    questions: questions,
  });
export type loginResponse = {
  quizId: string;
};
