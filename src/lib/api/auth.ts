import apiClient from './apiClient';

export const basicLogin = (email: string, password: string) =>
  apiClient.post('/api/user/login', {
    email: email,
    password: password,
  });
export type loginResponse = {
  email: string;
  username: string;
};

export const requestLogOut = () => apiClient.post('/api/user/logout');
