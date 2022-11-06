import React from 'react';
import { Link } from 'react-router-dom';
import { ReactComponent as Logo } from '../logo.svg';
import MainLayout from '../layouts/MainLayout';
import LoginContainer from '../components/LoginContainer';

const Login = () => {
  return (
    <MainLayout hideNavBar>
      <div className="mx-auto flex h-screen w-1/2 items-center gap-12">
        <Link className="min-w-fit" to="/">
          <Logo />
        </Link>
        <LoginContainer />
      </div>
    </MainLayout>
  );
};

export default Login;
