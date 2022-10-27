import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';

function Quiz() {
  const { quizId } = useParams();

  useEffect(() => {
    // establish socket connection

    // set state using params i.e. axios.get(`url/quiz/{quizid}`)
    console.log(quizId);
  }, []);

  return <div></div>;
}

export default Quiz;
