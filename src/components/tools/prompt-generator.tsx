'use client';

import { useState } from 'react';
import Markdown from 'react-markdown';
import rehypeHighlight from 'rehype-highlight';

import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';

const styles = ['Funny', 'Formal', 'Creative', 'Professional'] as const;
type PromptStyle = (typeof styles)[number];

export default function GeneratePrompt() {
  const [prompt, setPrompt] = useState('');
  const [style, setStyle] = useState<PromptStyle>('Creative');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);
    setResponse('');
    setError('');
    setCopied(false);

    try {
      const res = await fetch('/api/generate-prompt', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt, style }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Something went wrong');
      setResponse(data.responses);
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : 'Something went wrong';
      setError(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = async () => {
    if (!response) return;
    await navigator.clipboard.writeText(response);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <main className='mx-auto max-w-3xl space-y-6 p-6'>
      <div className='space-y-2'>
        <label className='font-semibold'>Prompt Style</label>
        <Select value={style} onValueChange={(val: PromptStyle) => setStyle(val)}>
          <SelectTrigger className='w-full'>
            <SelectValue placeholder='Select a style' />
          </SelectTrigger>
          <SelectContent>
            {styles.map((s) => (
              <SelectItem key={s} value={s}>
                {s}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <Textarea
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder='Describe what you want...'
        rows={6}
        className='min-h-24 resize-none'
      />

      <Button onClick={handleSubmit} disabled={loading || !prompt.trim()}>
        {loading ? 'Generating...' : 'Generate'}
      </Button>

      {error && <p className='text-red-600'>Error: {error}</p>}
      {response && (
        <div className='relative mt-6'>
          <div className='absolute top-0 right-0'>
            <Button onClick={handleCopy} variant='secondary' size='sm' className='text-sm'>
              {copied ? 'Copied!' : 'Copy'}
            </Button>
          </div>

          <div className='bg-foreground-muted prose prose-blue max-w-none overflow-auto rounded border p-4 break-words'>
            <Markdown
              rehypePlugins={[rehypeHighlight]}
              components={{
                strong: ({ children }) => <strong className='font-semibold'>{children}</strong>,
                ul: ({ children }) => <ul className='list-disc pl-6'>{children}</ul>,
                ol: ({ children }) => <ol className='list-decimal pl-6'>{children}</ol>,
                li: ({ children }) => <li className='mb-1'>{children}</li>,
                p: ({ children }) => <p className='mb-3'>{children}</p>,
                h2: ({ children }) => <h2 className='mt-4 text-xl font-bold'>{children}</h2>,
              }}
            >
              {response}
            </Markdown>
          </div>
        </div>
      )}
    </main>
  );
}
