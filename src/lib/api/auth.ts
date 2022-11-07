import apiClient from './apiClient';

export const basicLogin = (email: string, password: string) =>
  apiClient.post<loginResponse>('/user/login', {
    email: email,
    password: password,
  });
export type loginResponse = {
  email: string;
  username: string;
};

export const requestLogOut = () => apiClient.post('/user/logout');

export const getUserInfo = () => apiClient.get<userInfoResponse>('/user/');
export type userInfoResponse = {
  email: string;
  username: string;
};
