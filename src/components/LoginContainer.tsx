import React from 'react';

const LoginContainer = () => {
  return (
    <div className="w-7/12 rounded-lg border-2 bg-slate-100 p-6">
      <form>
        <div className="mb-6">
          <input
            type="text"
            className="form-control bg-classNameip-padding m-0 block w-full rounded border border-solid border-gray-300 bg-white px-4 py-2 text-xl font-normal text-gray-700 transition ease-in-out focus:border-blue-600 focus:bg-white focus:text-gray-700 focus:outline-none"
            id="exampleFormControlInput2"
            placeholder="Email address"
          />
        </div>
        <div className="mb-6">
          <input
            type="password"
            className="form-control bg-classNameip-padding m-0 block w-full rounded border border-solid border-gray-300 bg-white px-4 py-2 text-xl font-normal text-gray-700 transition ease-in-out focus:border-blue-600 focus:bg-white focus:text-gray-700 focus:outline-none"
            id="exampleFormControlInput2"
            placeholder="Password"
          />
        </div>

        <div className="mt-10 text-center">
          <button
            type="button"
            className="inline-block rounded bg-blue-600 px-7 py-3 text-sm font-medium uppercase leading-snug text-white shadow-md transition duration-150 ease-in-out hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg"
          >
            Login
          </button>
          <p className="mt-2 mb-0 pt-1 text-sm font-semibold">
            {"Don't have an account? "}
            <a
              href="#!"
              className="text-red-600 transition duration-200 ease-in-out hover:text-red-700 focus:text-red-700"
            >
              Register
            </a>
          </p>
        </div>
      </form>
    </div>
  );
};

export default LoginContainer;
