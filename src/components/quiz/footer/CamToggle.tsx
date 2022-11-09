import React from 'react';
import { HiOutlineVideoCamera } from 'react-icons/hi';
import useCamStatus from '../../../hooks/useCamStatus';

const CamToggle = () => {
  const [camStatus, setCamStatus] = useCamStatus();

  return (
    <div>
      <label
        htmlFor="cam-toggle"
        className="relative inline-flex cursor-pointer items-center"
      >
        <input
          type="checkbox"
          value=""
          id="cam-toggle"
          className="peer sr-only"
          checked={!camStatus}
          onChange={() => setCamStatus(!camStatus)}
        />
        <div className="peer flex h-10 w-10 items-center justify-center rounded-full bg-gray-600 transition-colors after:invisible after:absolute after:h-5 after:w-[2.3px] after:rotate-[-45deg] after:border-[0.5px] after:border-red-600 after:bg-white after:content-[''] peer-checked:bg-red-600 peer-checked:after:visible peer-checked:hover:bg-red-500">
          <HiOutlineVideoCamera size={17} color="white" />
        </div>
      </label>
    </div>
  );
};

export default CamToggle;
