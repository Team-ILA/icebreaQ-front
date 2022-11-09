import React from 'react';
import { Link } from 'react-router-dom';
import DefaultButton from './DefaultButton';

const ServiceOverview = () => {
  return (
    <div className="w-full">
      <div className="flex flex-col bg-gradient-to-b from-[#E0F7FE]">
        <div className="my-24 mx-auto flex w-[1000px] flex-col gap-5">
          <h1 className="animate-[fadein_1s_ease-in] font-bold">
            Quiz platform for ice breaking
          </h1>
          <h2 className="mb-2 animate-[fadein_1s_ease-in_forwards] text-2xl font-semibold italic text-slate-900 opacity-0 animation-delay-600">
            Take some time to
            <span className="relative">
              <span
                className="absolute -inset-1 block -skew-y-3"
                aria-hidden="true"
              ></span>
              <span className="relative mx-2 font-bold text-green-700">
                share your thoughts
              </span>
            </span>
            and
            <span className="relative">
              <span
                className="absolute -inset-1 block -skew-y-3"
                aria-hidden="true"
              ></span>
              <span className="relative mx-2 font-bold text-green-700">
                get close to each other
              </span>
            </span>
            <br />
            through a quiz consisting of various questions !
          </h2>
          <Link className="h-16 w-64" to="/join">
            <DefaultButton
              className="h-full w-full text-4xl"
              content="Get Started"
            />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ServiceOverview;
