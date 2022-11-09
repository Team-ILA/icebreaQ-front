import React, { useState, useRef } from 'react';
import { requestRegsiter } from '../lib/api/auth';
import useAuthAction from '../hooks/useAuthAction';
import { useNavigate, useLocation } from 'react-router-dom';

const RegisterContainer = () => {
  const passwordRef = useRef<HTMLInputElement>(null);
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [emailInvalid, setEmailInvalid] = useState(false);
  const [passwordInvalid, setPasswordInvalid] = useState(false);
  const { signIn } = useAuthAction();
  const navigate = useNavigate();
  const { state } = useLocation();

  const registerHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    passwordRef.current?.focus();
    requestRegsiter(email, username, password)
      .then(({ data }) => {
        const { email, username } = data;
        signIn({ email, username });
        navigate(state || '/');
      })
      .catch((e) => {
        const { email, password } = e.response.data.errors;
        setEmailInvalid(email !== undefined);
        setPasswordInvalid(password !== undefined);
      });
  };

  const emailChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const userNameChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };

  const passWordChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  return (
    <div className="max-h-92 min-w-[600px] rounded-lg border-2 bg-slate-100 p-6">
      <form onSubmit={registerHandler}>
        <div>
          <input
            type="text"
            className="form-control bg-classNameip-padding m-0 block w-full rounded border border-solid border-gray-300 bg-white px-4 py-2 text-xl font-normal text-gray-700 transition ease-in-out focus:border-blue-600 focus:bg-white focus:text-gray-700 focus:outline-none"
            id="email"
            value={email}
            onChange={emailChangeHandler}
            placeholder="Email address"
          />
        </div>
        {emailInvalid && (
          <div className="text-sm font-bold text-rose-700">
            Please check your email format
          </div>
        )}
        <div className="mt-6">
          <input
            type="text"
            className="form-control bg-classNameip-padding m-0 block w-full rounded border border-solid border-gray-300 bg-white px-4 py-2 text-xl font-normal text-gray-700 transition ease-in-out focus:border-blue-600 focus:bg-white focus:text-gray-700 focus:outline-none"
            id="username"
            value={username}
            onChange={userNameChangeHandler}
            placeholder="Username"
          />
        </div>
        <div className="mt-6">
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
        {passwordInvalid && (
          <div className="mt-2 text-sm font-bold text-rose-700">
            your password should at lest one lower, upper, digit, special
            character. <br />, and the length should be lower than 11
          </div>
        )}

        <div className="mt-10 text-center">
          <button
            type="submit"
            className="inline-block rounded bg-blue-600 px-7 py-3 text-sm font-medium uppercase leading-snug text-white shadow-md transition duration-150 ease-in-out hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg"
          >
            Register
          </button>
        </div>
      </form>
    </div>
  );
};

export default RegisterContainer;
