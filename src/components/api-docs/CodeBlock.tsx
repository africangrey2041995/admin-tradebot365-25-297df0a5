
import React, { useState } from 'react';
import { Check, Copy } from 'lucide-react';
import { cn } from '@/lib/utils';

interface CodeBlockProps {
  code: string;
  language?: string;
  title?: string;
  showLineNumbers?: boolean;
}

const CodeBlock = ({ 
  code, 
  language = 'json', 
  title,
  showLineNumbers = true 
}: CodeBlockProps) => {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="mb-4 rounded-md border border-zinc-800 bg-zinc-950">
      {title && (
        <div className="border-b border-zinc-800 bg-zinc-900 px-4 py-2 text-xs font-semibold text-zinc-400">
          {title}
        </div>
      )}
      <div className="relative">
        <button
          onClick={copyToClipboard}
          className="absolute right-3 top-3 rounded border border-zinc-700 bg-zinc-800 p-1.5 text-zinc-300 hover:bg-zinc-700 transition-colors"
        >
          {copied ? <Check size={14} /> : <Copy size={14} />}
        </button>
        <pre className={cn(
          "p-4 overflow-x-auto font-mono text-sm text-zinc-300",
          showLineNumbers && "pl-12 relative"
        )}>
          {showLineNumbers && (
            <div className="absolute left-0 top-0 w-8 h-full flex flex-col text-right pr-2 text-zinc-600 border-r border-zinc-800">
              {code.split('\n').map((_, i) => (
                <span key={i} className="px-2">{i + 1}</span>
              ))}
            </div>
          )}
          <code className={`language-${language}`}>{code}</code>
        </pre>
      </div>
    </div>
  );
};

export default CodeBlock;
