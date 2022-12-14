import React, { useState, useRef } from 'react';
import { basicLogin } from '../lib/api/auth';
import useAuthAction from '../hooks/useAuthAction';
import { useNavigate, useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';

const LoginContainer = () => {
  const passwordRef = useRef<HTMLInputElement>(null);
  const [invalid, setInvalid] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { signIn } = useAuthAction();
  const navigate = useNavigate();
  const { state } = useLocation();

  const loginHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    passwordRef.current?.focus();
    basicLogin(email, password)
      .then(({ data }) => {
        const { email, username } = data;
        signIn({ email, username });
        navigate(state || '/');
      })
      .catch(() => {
        setInvalid(true);
        setPassword('');
      });
  };

  const emailChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const passWordChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  return (
    <div className="w-1/3 rounded-lg border-2 bg-slate-100 p-6">
      <form onSubmit={loginHandler}>
        <div className="mb-6">
          <input
            type="text"
            className="form-control bg-classNameip-padding m-0 block w-full rounded border border-solid border-gray-300 bg-white px-4 py-2 text-xl font-normal text-gray-700 transition ease-in-out focus:border-blue-600 focus:bg-white focus:text-gray-700 focus:outline-none"
            id="email"
            value={email}
            onChange={emailChangeHandler}
            placeholder="Email address"
          />
        </div>
        <div>
          <input
            type="password"
            className="form-control bg-classNameip-padding m-0 block w-full rounded border border-solid border-gray-300 bg-white px-4 py-2 text-xl font-normal text-gray-700 transition ease-in-out focus:border-blue-600 focus:bg-white focus:text-gray-700 focus:outline-none"
            id="password"
            value={password}
            onChange={passWordChangeHandler}
            ref={passwordRef}
            placeholder="Password"
          />
        </div>

        {invalid && (
          <div className="mt-2 font-bold text-red-500">
            Invalid email or password
          </div>
        )}

        <div className="mt-10 text-center">
          <button
            type="submit"
            className="inline-block rounded bg-blue-600 px-7 py-3 text-sm font-medium uppercase leading-snug text-white shadow-md transition duration-150 ease-in-out hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg"
          >
            Login
          </button>
          <p className="mt-2 mb-0 pt-1 text-sm font-semibold">
            {"Don't have an account? "}
            <Link
              to="/register"
              className="text-red-600 transition duration-200 ease-in-out hover:text-red-700 focus:text-red-700"
            >
              Register
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default LoginContainer;
