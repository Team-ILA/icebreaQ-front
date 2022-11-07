import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import useAuthValue from '../hooks/useAuthValue';

const RouteGuard = ({ children }: { children: JSX.Element }) => {
  const { pathname } = useLocation();
  const auth = useAuthValue();
  return auth.username !== '' ? (
    children
  ) : (
    <Navigate to="/login" replace state={pathname} />
  );
};

export default RouteGuard;
