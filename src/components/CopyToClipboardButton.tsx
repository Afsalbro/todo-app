import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';

interface CopyToClipboardButtonProps {
  content: string; 
}

const CopyToClipboardButton: React.FC<CopyToClipboardButtonProps> = ({ content }) => {
  const [isCopied, setIsCopied] = useState(false);

  const handleCopyToClipboard = () => {
    navigator.clipboard.writeText(content).then(() => {
      setIsCopied(true);
      setTimeout(() => {
        setIsCopied(false);
      }, 2000); 
    });
  };

  return (
    <Button variant="secondary" onClick={handleCopyToClipboard}>
      {isCopied ? 'Copied!' : 'Copy to Clipboard'}
    </Button>
  );
};

export default CopyToClipboardButton;