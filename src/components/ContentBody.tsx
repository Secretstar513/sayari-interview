import React, { useEffect, useRef } from 'react';
import DOMPurify from 'dompurify';
import hljs from 'highlight.js';
import 'highlight.js/styles/github.css';

interface QuestionBodyProps {
  content: string;
}

const QuestionBody = ({ content }: QuestionBodyProps) => {
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (contentRef.current) {
      contentRef.current.querySelectorAll('pre code').forEach((block) => {
        hljs.highlightElement(block as HTMLElement);
      });
    }
  }, [content]);

  return (
    <div
      ref={contentRef}
      dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(content) }}
      style={{
        backgroundColor: '#f6f8fa',
        padding: '16px',
        borderRadius: '4px',
        overflowX: 'auto',
        border: '1px solid #e1e4e8',
      }}
    />
  );
};

export default QuestionBody;
