import { useContext } from 'react';
import { SocketContext } from '../context/SocketProvider';

const useSocket = () => {
  const value = useContext(SocketContext);
  return value;
};

export default useSocket;
