import React, { createContext, useState } from 'react';
import UserDetail from '../lib/socketio/UserDetail';

export type VideoDetail = {
  id: string;
  stream: MediaStream;
  userData?: UserDetail;
};

type VideoItemsType = [
  Record<string, VideoDetail>,
  React.Dispatch<React.SetStateAction<Record<string, VideoDetail>>>
];

export const VideoItemsContext = createContext<VideoItemsType>(
  {} as VideoItemsType
);

const VideoItemsProvider = ({ children }: { children: React.ReactNode }) => {
  const VideoItemsState = useState<Record<string, VideoDetail>>({});

  return (
    <VideoItemsContext.Provider value={VideoItemsState}>
      {children}
    </VideoItemsContext.Provider>
  );
};

export default VideoItemsProvider;
