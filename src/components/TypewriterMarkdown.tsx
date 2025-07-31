'use client';

import 'highlight.js/styles/github.css';
import { useEffect, useState } from 'react';
import Markdown from 'react-markdown';
import rehypeHighlight from 'rehype-highlight';

type Props = {
  text: string;
  speed?: number;
};

export const TypewriterMarkdown = ({ text, speed = 10 }: Props) => {
  const [displayedText, setDisplayedText] = useState('');

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      setDisplayedText((prev) => prev + text.charAt(i));
      i++;
      if (i >= text.length) clearInterval(interval);
    }, speed);

    return () => clearInterval(interval);
  }, [text, speed]);

  return (
    <div className='prose prose-sm max-w-none text-sm leading-relaxed whitespace-pre-wrap'>
      <Markdown rehypePlugins={[rehypeHighlight]}>{displayedText}</Markdown>
    </div>
  );
};
