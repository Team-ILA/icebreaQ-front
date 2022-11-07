import { useContext } from 'react';
import { AuthValueContext } from '../context/AuthProvider';

const useAuthValue = () => {
  const value = useContext(AuthValueContext);
  return value;
};

export default useAuthValue;
