import React from 'react';

type DefaultButtonProps = {
  className?: string;
  content: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
};

const DefaultButton = ({ className, content, onClick }: DefaultButtonProps) => {
  return (
    <button
      className={`rounded-xl bg-violet-500 px-2 font-light text-white ${className}`}
      onClick={onClick}
    >
      {content}
    </button>
  );
};

export default DefaultButton;
