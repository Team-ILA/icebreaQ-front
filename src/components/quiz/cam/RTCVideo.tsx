import React, { useRef, useEffect, useContext } from 'react';
import useAuthValue from '../../../hooks/useAuthValue';
import { VideoItemsContext } from '../../../context/VideoItemsProvider';

type RTCVideoProps = {
  videoId: string;
};

const RTCVideo = ({ videoId }: RTCVideoProps) => {
  const viewRef = useRef<HTMLVideoElement>(null);
  const [videoItems] = useContext(VideoItemsContext);
  const auth = useAuthValue();

  useEffect(() => {
    if (viewRef.current) {
      viewRef.current.srcObject = videoItems[videoId].stream;
    }
  }, [videoItems]);

  return (
    <div className="h-full w-1/3 bg-black p-2 text-center text-white">
      <span>
        {videoItems[videoId].userData === undefined
          ? auth.username
          : videoItems[videoId].userData?.username}
      </span>
      <video
        ref={viewRef}
        autoPlay
        muted={videoItems[videoId].userData === undefined}
      />
    </div>
  );
};

export default RTCVideo;
