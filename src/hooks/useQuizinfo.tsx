import { useContext } from 'react';
import { QuizInfoContext } from '../context/QuizInfoProvider';

const useQuizInfo = () => {
  const value = useContext(QuizInfoContext);
  return value;
};

export default useQuizInfo;
