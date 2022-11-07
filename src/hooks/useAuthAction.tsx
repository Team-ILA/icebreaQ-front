import { useContext } from 'react';
import { AuthActionContext } from '../context/AuthProvider';

const useAuthAction = () => {
  const value = useContext(AuthActionContext);
  return value;
};

export default useAuthAction;
