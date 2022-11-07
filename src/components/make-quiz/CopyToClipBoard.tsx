import React, { useState } from 'react';
import { HiClipboard, HiClipboardCheck } from 'react-icons/hi';
import { Tooltip, Button } from 'flowbite-react';

type UnCheckedButtonProps = {
  link: string;
  setCopied: React.Dispatch<React.SetStateAction<boolean>>;
};

type CheckedButtonProps = {
  link: string;
};

type CopyToClipBoardProps = {
  link: string;
};

const CheckedButton = ({ link }: CheckedButtonProps) => {
  const buttonClickHandler = () => {
    navigator.clipboard.writeText(link);
  };

  return (
    <Tooltip content="Copied!" trigger="click">
      <Button onClick={buttonClickHandler} color="success">
        <HiClipboardCheck size={23} color="white" />
      </Button>
    </Tooltip>
  );
};

const UnCheckedButton = ({ link, setCopied }: UnCheckedButtonProps) => {
  const buttonClickHandler = () => {
    navigator.clipboard.writeText(link);
    setCopied(true);
  };
  return (
    <Tooltip content="Copy to Clipboard">
      <Button onClick={buttonClickHandler} color="gray">
        <HiClipboard size={23} color="black" />
      </Button>
    </Tooltip>
  );
};

const CopyToClipBoard = ({ link }: CopyToClipBoardProps) => {
  const [copied, setCopied] = useState(false);

  if (copied) {
    return <CheckedButton link={link} />;
  }

  return <UnCheckedButton link={link} setCopied={setCopied} />;
};

export default CopyToClipBoard;
