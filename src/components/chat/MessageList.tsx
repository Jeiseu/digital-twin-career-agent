'use client';

import { useEffect, useRef } from 'react';
import { Message } from '@/lib/types';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';

interface MessageListProps {
  messages: Message[];
  isLoading: boolean;
}

export function MessageList({ messages, isLoading }: MessageListProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  // Auto-scroll on new messages and while streaming
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: 'smooth', block: 'end' });
    }
  }, [messages, isLoading]);

  return (
    <ScrollArea className="flex-1 min-h-0 p-4 bg-white dark:bg-black transition-all duration-300">
      <div className="space-y-4">
        {messages.length === 0 ? (
          <div className="flex items-center justify-center py-12">
            <div className="text-center text-slate-500 dark:text-slate-400">
              <p className="text-lg font-medium">Start a conversation</p>
              <p className="text-sm">Ask me anything about your career!</p>
            </div>
          </div>
        ) : (
          messages.filter((m) => m.content || (m.role === 'assistant' && isLoading)).map((message, index) => (
            <div
              key={`${index}-${message.role}`}
              className={`flex gap-3 ${
                message.role === 'user' ? 'justify-end' : 'justify-start'
              }`}
            >
              {message.role === 'assistant' && (
                <Avatar className="h-8 w-8 mt-1">
                  <AvatarFallback className="bg-slate-600 dark:bg-slate-700 text-white text-xs font-bold">
                    AI
                  </AvatarFallback>
                </Avatar>
              )}
              <div
                className={`max-w-xs px-4 py-2 rounded-lg ${
                  message.role === 'user'
                    ? 'bg-blue-500 dark:bg-cyan-500 text-white rounded-br-none transition-all duration-300'
                    : 'bg-gray-200 dark:bg-gray-800 text-black dark:text-white rounded-bl-none transition-all duration-300'
                }`}
              >
                <p className="text-sm">
                    {message.content || (
                      <span className="flex gap-1 items-center h-4">
                        <span className="w-2 h-2 bg-slate-400 dark:bg-slate-500 rounded-full animate-bounce"></span>
                        <span className="w-2 h-2 bg-slate-400 dark:bg-slate-500 rounded-full animate-bounce delay-100"></span>
                        <span className="w-2 h-2 bg-slate-400 dark:bg-slate-500 rounded-full animate-bounce delay-200"></span>
                      </span>
                    )}
                  </p>
              </div>
              {message.role === 'user' && (
                <Avatar className="h-8 w-8 mt-1">
                  <AvatarFallback className="bg-slate-300 dark:bg-slate-600 text-slate-900 dark:text-white text-xs font-bold">
                    YOU
                  </AvatarFallback>
                </Avatar>
              )}
            </div>
          ))
        )}
        <div ref={scrollRef} />
      </div>
    </ScrollArea>
  );
}
