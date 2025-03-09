import React from 'react';
import { useTypewriter, Cursor } from 'react-simple-typewriter';

interface TypewriterAnimationProps {
  words: string | string[];
  loop?: boolean;
  delaySpeed?: number;
}

const TypewriterAnimation: React.FC<TypewriterAnimationProps> = ({
  words,
  loop = false,
  delaySpeed = 1500,
}) => {
  // Convert a single string to an array if necessary.
  const wordsArray = typeof words === 'string' ? [words] : words;

  const [text] = useTypewriter({
    words: wordsArray,
    loop,
    delaySpeed,
    typeSpeed:150,
    deleteSpeed:70,
  });

  return (
    <span className='px-2 text-center font-semibold text-purple-500'>
      {text}
      <Cursor cursorColor="#000"  cursorStyle='_' />
    </span>
  );
};

export default TypewriterAnimation;
