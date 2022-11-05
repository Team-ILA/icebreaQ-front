import React from 'react';

import DefaultButton from './DefaultButton';

const ServiceOverview = () => {
  return (
    <div className="w-full">
      <div className="flex flex-col items-center bg-gradient-to-b from-[#E0F7FE]">
        <div className="my-24 w-[1000px] space-y-7">
          <h1 className="animate-[fadein_1s_ease-in] font-bold">
            Quiz platform for ice breaking
          </h1>
          <h2 className="animate-[fadein_1s_ease-in_forwards] font-light opacity-0 animation-delay-600">
            details of service...
            <br />
            details of service...
          </h2>
          <DefaultButton
            className="h-16 w-64 text-4xl"
            content="Get Started"
          ></DefaultButton>
        </div>
      </div>
    </div>
  );
};

export default ServiceOverview;
