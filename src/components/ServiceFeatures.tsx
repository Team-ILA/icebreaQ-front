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
      className={`flex h-[373px] w-[850px]  justify-between ${
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

const features: FeatureItemProps[] = [
  {
    title: 'Feature 1',
    content: 'detail of feature',
    imgSrc: 'https://via.placeholder.com/360x373.png?text=placeholder',
  },
  {
    title: 'Feature 2',
    content: 'detail of feature',
    imgSrc: 'https://via.placeholder.com/360x373.png?text=placeholder',
  },
];

const ServiceFeatures = () => {
  return (
    <>
      <div className="w-full">
        <div className="mx-auto flex w-[900px] flex-col gap-20 px-7 pb-52">
          {features.map((props: FeatureItemProps, idx: number) => (
            <FeatureItem
              key={props.title}
              {...props}
              reverse={idx % 2 ? true : false}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default ServiceFeatures;
