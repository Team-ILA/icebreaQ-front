import React, { useEffect, useRef, useState } from 'react';
// import RTCVideo from './RTCVideo';
import { VideoDetail } from '../../../services/socketConnection';
import RTCVideo from './RTCVideo';

type CamGridProps = {
  videoItems: Map<string, VideoDetail>;
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const CamGrid = ({ videoItems }: CamGridProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const [cur, setCur] = useState<number>(0);
  const nextHandler = () => {
    if (cur * 3 + 1 < videoItems.size) {
      setCur((prev) => prev + 1);
    }
  };
  const prevHandler = () => {
    if (cur > 0) {
      setCur((prev) => prev - 1);
    }
  };
  useEffect(() => {
    if (ref.current) {
      ref.current.scrollLeft = cur * ref.current.offsetWidth;
    }
  }, [cur]);

  if (videoItems.size < 3) {
    return (
      <div className="flex h-44 w-full items-center justify-center">
        {Array.from(videoItems).map(([, value], index) => (
          <RTCVideo key={index} isGrow={false} mediaStream={value.stream} />
        ))}
      </div>
    );
  }

  return (
    <div className="mx-auto flex h-44 w-7/12">
      <button
        onClick={prevHandler}
        className="z-10 m-0 h-full grow bg-slate-200 p-0 text-center text-black opacity-75 transition-all duration-300 ease-in-out hover:bg-blue-900/75 hover:opacity-100 disabled:cursor-not-allowed disabled:opacity-25"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="-ml-5 h-12 w-20"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15 19l-7-7 7-7"
          />
        </svg>
      </button>
      <div ref={ref} className="flex h-full grow overflow-hidden scroll-smooth">
        {Array.from(videoItems).map(([, value], index) => (
          <RTCVideo key={index} isGrow={true} mediaStream={value.stream} />
        ))}
      </div>
      <button
        onClick={nextHandler}
        className="z-10 m-0 h-full grow bg-slate-200 p-0 text-center text-black opacity-75 transition-all duration-300 ease-in-out hover:bg-blue-900/75 hover:opacity-100 disabled:cursor-not-allowed disabled:opacity-25"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="-ml-5 h-12 w-20"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </div>
  );
};

export default CamGrid;
