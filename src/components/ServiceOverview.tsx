import React from 'react';

import DefaultButton from './DefaultButton';

const ServiceOverview = () => {
  return (
    <div className="w-full">
      <div className="flex flex-col items-center bg-gradient-to-b from-[#E0F7FE]">
        <div className="w-[1000px] my-24 space-y-7">
          <h1 className="font-bold">Quiz platform for ice breaking</h1>
          <h2 className="font-light">
            details of service...
            <br />
            details of service...
          </h2>
          <DefaultButton
            className="w-64 h-16 text-4xl"
            content="Get Started"
          ></DefaultButton>
        </div>
      </div>
    </div>
  );
};

export default ServiceOverview;
