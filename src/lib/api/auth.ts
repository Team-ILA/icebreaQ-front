import apiClient from './apiClient';

export const basicLogin = (email: string, password: string) =>
  apiClient.post<loginResponse>('/api/user/login', {
    email: email,
    password: password,
  });
export type loginResponse = {
  email: string;
  username: string;
};

export const requestLogOut = () => apiClient.post('/api/user/logout');

export const getUserInfo = () => apiClient.get<userInfoResponse>('/api/user/');
export type userInfoResponse = {
  email: string;
  username: string;
};
