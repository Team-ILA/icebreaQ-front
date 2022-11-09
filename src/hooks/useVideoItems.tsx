import { useContext } from 'react';
import { VideoItemsContext } from '../context/VideoItemsProvider';

const useVideoItems = () => {
  const value = useContext(VideoItemsContext);
  return value;
};

export default useVideoItems;
