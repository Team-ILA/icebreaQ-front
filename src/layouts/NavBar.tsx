import React from 'react';
import { Link } from 'react-router-dom';

import { ReactComponent as NavBarLogo } from '../navbar_logo.svg';

const NavBar = () => {
  return (
    <nav className="border-b-2">
      <div className="flex mx-52 my-3 items-center gap-3">
        <Link to="/">
          <NavBarLogo />
        </Link>
        <div className="grow" />
        <button className="font-bold w-28 h-9 px-2 font-violet-500">
          Login
        </button>
        <button className="font-bold w-28 h-9 bg-white text-violet-900 border-2 rounded-lg px-2 font-violet-500">
          Register
        </button>
      </div>
    </nav>
  );
};

export default NavBar;
