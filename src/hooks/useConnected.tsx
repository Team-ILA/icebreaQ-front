import { useContext } from 'react';
import { ConnectedContext } from '../context/ConnectedProvider';

const useConnected = () => {
  const value = useContext(ConnectedContext);
  return value;
};

export default useConnected;
