import React from 'react';
import { Link } from 'react-router-dom';

import Avatar from './Avatar';
import { ReactComponent as NavBarLogo } from '../navbar_logo.svg';

import useAuthValue from '../hooks/useAuthValue';

const NavBar = () => {
  const auth = useAuthValue();

  return (
    <nav className="fixed top-0 z-50 w-full border-b-2 bg-white py-2">
      <div className="mx-auto flex max-w-5xl items-center gap-3">
        <Link to="/">
          <NavBarLogo />
        </Link>
        <div className="grow" />
        {auth.username !== '' ? (
          <Avatar username={auth.username} />
        ) : (
          <>
            <Link to="/login">
              <button className="font-violet-500 h-9 w-28 px-2 font-bold">
                Login
              </button>
            </Link>
            <Link to="/register">
              <button className="font-violet-500 h-9 w-28 rounded-lg border-2 bg-white px-2 font-bold text-violet-900">
                Register
              </button>
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
