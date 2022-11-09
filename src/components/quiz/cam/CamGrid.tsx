import React, { useEffect, useRef, useState } from 'react';
import RTCVideo from './RTCVideo';
import useVideoItems from '../../../hooks/useVideoItems';

const CamGrid = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [cur, setCur] = useState<number>(0);
  const [videoItems] = useVideoItems();
  const nextHandler = () => {
    if (cur * 3 + 1 < Object.keys(videoItems).length) {
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

  return (
    <div className="mx-auto mt-10 flex h-44 w-7/12">
      <button
        onClick={prevHandler}
        className="z-10 m-0 h-full w-12 bg-slate-200 p-0 text-center text-black opacity-75 transition-all duration-300 ease-in-out hover:bg-blue-900/75 hover:opacity-100 disabled:cursor-not-allowed disabled:opacity-25"
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
        {Object.keys(videoItems).map((key, index) => (
          <RTCVideo key={index} videoId={key} />
        ))}
      </div>
      <button
        onClick={nextHandler}
        className="z-10 m-0 h-full w-12 bg-slate-200 p-0 text-center text-black opacity-75 transition-all duration-300 ease-in-out hover:bg-blue-900/75 hover:opacity-100 disabled:cursor-not-allowed disabled:opacity-25"
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
