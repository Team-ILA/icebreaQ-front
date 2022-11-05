import React from 'react';

type DefaultButtonProps = {
  className?: string;
  content: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
};

const DefaultButton = ({ className, content, onClick }: DefaultButtonProps) => {
  return (
    <button
      className={`bg-violet-500 text-white font-light rounded-xl px-2 ${className}`}
      onClick={onClick}
    >
      {content}
    </button>
  );
};

export default DefaultButton;
