'use client';

import { FormEvent, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Send } from 'lucide-react';

const MAX_CHARS = 2000;

interface MessageInputProps {
  onSubmit: (message: string) => Promise<void>;
  isLoading: boolean;
}

export function MessageInput({ onSubmit, isLoading }: MessageInputProps) {
  const [input, setInput] = useState('');

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const trimmed = input.trim();
    if (!trimmed || isLoading || trimmed.length > MAX_CHARS) return;

    setInput('');
    await onSubmit(trimmed);
  };

  const overLimit = input.length > MAX_CHARS;

  return (
    <div className="border-t-2 border-blue-500 dark:border-cyan-500 bg-white dark:bg-black shrink-0 transition-all duration-300">
      <form onSubmit={handleSubmit} className="flex gap-2 p-4">
        <Input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your message..."
          disabled={isLoading}
          className={`flex-1 bg-white text-black dark:bg-gray-900 dark:text-white dark:border-gray-700 dark:placeholder-gray-500 transition-all duration-300 ${overLimit ? 'border-red-500 focus-visible:ring-red-500' : ''}`}
          maxLength={MAX_CHARS + 1}
        />
        <Button
          type="submit"
          disabled={isLoading || !input.trim() || overLimit}
          size="icon"
          className="rounded-lg bg-blue-500 dark:bg-cyan-500 text-white hover:bg-blue-600 dark:hover:bg-cyan-600 transition-all duration-300"
        >
          <Send className="h-4 w-4" />
        </Button>
      </form>
      {overLimit && (
        <p className="px-4 pb-2 text-xs text-red-500 dark:text-red-400">
          Message exceeds {MAX_CHARS.toLocaleString()} character limit ({input.length} / {MAX_CHARS})
        </p>
      )}
    </div>
  );
}
