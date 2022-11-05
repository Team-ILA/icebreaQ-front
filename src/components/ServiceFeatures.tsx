import React from 'react';

type FeatureItemProps = {
  imgSrc: string;
  title: string;
  content: string;
  reverse?: boolean;
};

const FeatureItem = ({ imgSrc, reverse, title, content }: FeatureItemProps) => {
  return (
    <div
      className={`flex justify-between w-[850px]  h-[373px] ${
        reverse ? 'flex-row-reverse' : 'flex-row'
      }`}
    >
      <div className="w-[400px]">
        <h3 className="font-bold">{title}</h3>
        <h3>{content}</h3>
      </div>
      <img className="w-[400px] object-fill" src={imgSrc}></img>
    </div>
  );
};

const ServiceFeatures = () => {
  return (
    <>
      <div className="w-full">
        <div className="px-7 pb-52 flex flex-col items-center gap-20">
          <FeatureItem
            title="Feature 1"
            content="detail of feature"
            reverse={true}
            imgSrc="https://via.placeholder.com/360x373.png?text=placeholder"
          />
          <FeatureItem
            title="Feature 2"
            content="detail of feature"
            imgSrc="https://via.placeholder.com/360x373.png?text=placeholder"
          />
        </div>
      </div>
    </>
  );
};

export default ServiceFeatures;
