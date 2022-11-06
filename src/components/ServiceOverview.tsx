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
          <h2 className="animate-[fadein_1s_ease-in_forwards] font-light opacity-0 animation-delay-600">
            details of service...
            <br />
            details of service...
          </h2>
          <Link to="/join">
            <DefaultButton
              className="h-16 w-64 text-4xl"
              content="Get Started"
            />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ServiceOverview;
