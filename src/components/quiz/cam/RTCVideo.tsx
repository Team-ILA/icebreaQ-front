import React, { useRef, useEffect } from 'react';

type RTCVideoProps = {
  mediaStream: MediaStream;
  isGrow: boolean;
};

const RTCVideo = ({ mediaStream, isGrow }: RTCVideoProps) => {
  const viewRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (viewRef.current) {
      viewRef.current.srcObject = mediaStream;
    }
  }, []);

  if (!isGrow) {
    return <video className="h-full p-2" ref={viewRef} autoPlay />;
  }

  return (
    <video className="h-full w-1/3 grow p-2" ref={viewRef} autoPlay></video>
  );
};

export default RTCVideo;
