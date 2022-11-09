import { useContext } from 'react';
import { AudioStatusContext } from '../context/AudioStatusProvider';

const useAudioStatus = () => {
  const value = useContext(AudioStatusContext);
  return value;
};

export default useAudioStatus;
