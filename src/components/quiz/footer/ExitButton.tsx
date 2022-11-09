import React from 'react';
import { useNavigate } from 'react-router-dom';

type ExitButtonProps = {
  destoryConnection: () => void;
};

const ExitButton = ({ destoryConnection }: ExitButtonProps) => {
  const navigate = useNavigate();
  const exitHandler = () => {
    navigate('/join');
    destoryConnection();
  };
  return (
    <button
      onClick={exitHandler}
      className={`h-full w-32 rounded-md bg-red-600 px-2 font-bold text-white`}
    >
      Exit
    </button>
  );
};

export default ExitButton;
