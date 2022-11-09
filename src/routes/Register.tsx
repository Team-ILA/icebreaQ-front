import React, { useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { ReactComponent as Logo } from '../logo.svg';
import MainLayout from '../layouts/MainLayout';
import RegisterContainer from '../components/RegisterContainer';
import useAuthValue from '../hooks/useAuthValue';

const Register = () => {
  const auth = useAuthValue();
  const navigate = useNavigate();
  const { state } = useLocation();

  useEffect(() => {
    if (auth.username !== '') {
      navigate(state || '/');
    }
  }, [auth]);

  return (
    <MainLayout hideNavBar>
      <div className="mx-auto flex h-screen items-center justify-center gap-12">
        <Link className="min-w-fit" to="/">
          <Logo />
        </Link>
        <RegisterContainer />
      </div>
    </MainLayout>
  );
};

export default Register;
