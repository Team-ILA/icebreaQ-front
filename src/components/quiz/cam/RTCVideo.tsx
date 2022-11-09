import React, { useRef, useEffect, useContext } from 'react';
import { VideoItemsContext } from '../../../context/VideoItemsProvider';

type RTCVideoProps = {
  videoId: string;
};

const RTCVideo = ({ videoId }: RTCVideoProps) => {
  const viewRef = useRef<HTMLVideoElement>(null);
  const [videoItems] = useContext(VideoItemsContext);

  useEffect(() => {
    if (viewRef.current) {
      viewRef.current.srcObject = videoItems[videoId].stream;
    }
  }, []);

  useEffect(() => {
    if (viewRef.current) {
      viewRef.current.srcObject = videoItems[videoId].stream;
    }
  }, [videoItems]);

  return (
    <video
      className="h-full w-1/3 bg-black p-2"
      ref={viewRef}
      autoPlay
      muted={videoItems[videoId].userData === undefined}
    />
  );
};

export default RTCVideo;
