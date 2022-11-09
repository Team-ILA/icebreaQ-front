import React from 'react';

type ExitButtonProps = {
  destoryConnection: () => void;
};

const ExitButton = ({ destoryConnection }: ExitButtonProps) => {
  const exitHandler = () => {
    location.href = '/join';
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
