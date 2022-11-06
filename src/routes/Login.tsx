import React from 'react';
import { ReactComponent as Logo } from '../logo.svg';
import MainLayout from '../layouts/MainLayout';

const Login = () => {
  return (
    <MainLayout hideNavBar>
      <Logo />
    </MainLayout>
  );
};

export default Login;
