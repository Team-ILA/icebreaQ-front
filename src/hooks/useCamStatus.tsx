import { useContext } from 'react';
import { CamStatusContext } from '../context/CamStatusProvider';

const useCamStatus = () => {
  const value = useContext(CamStatusContext);
  return value;
};

export default useCamStatus;
