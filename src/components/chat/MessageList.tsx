'use client';

import { useEffect, useRef, useMemo, memo } from 'react';
import React from 'react';
import ReactMarkdown from 'react-markdown';
import { Volume2, VolumeX } from 'lucide-react';
import { Message } from '@/lib/types';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useTTS } from '@/lib/hooks/useTTS';

interface MessageListProps {
  messages: Message[];
  isLoading: boolean;
}

const MessageBubble = memo(({ message, index }: { message: Message; index: number }) => {
  const { speak, stop, isSpeaking } = useTTS()

  return (
    <div
      className={`flex gap-3 message-animation ${
        message.role === 'user' ? 'justify-end' : 'justify-start'
      }`}
    >
      {message.role === 'assistant' && (
        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-neutral-200 dark:bg-neutral-800 flex items-center justify-center mt-1">
          <span className="text-xs font-semibold text-neutral-600 dark:text-neutral-300">AI</span>
        </div>
      )}

      <div
        className={`max-w-xs lg:max-w-md xl:max-w-lg px-4 py-3 rounded-2xl break-words ${
          message.role === 'user'
            ? 'bg-neutral-900 dark:bg-blue-600 text-white rounded-br-none'
            : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-900 dark:text-neutral-50 rounded-bl-none'
        }`}
      >
        {message.role === 'assistant' ? (
          <>
            <div className="text-sm prose prose-sm dark:prose-invert max-w-none prose-p:m-0 prose-p:leading-relaxed prose-ul:my-2 prose-li:m-0 prose-a:text-blue-600 dark:prose-a:text-blue-400">
              <ReactMarkdown>{message.content}</ReactMarkdown>
            </div>
            <button
              onClick={() => isSpeaking ? stop() : speak(message.content)}
              className="mt-2 flex items-center gap-1 text-xs text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-200 transition-colors"
              aria-label={isSpeaking ? 'Stop speaking' : 'Read aloud'}
            >
              {isSpeaking ? (
                <><VolumeX className="w-3 h-3" /> Stop</>
              ) : (
                <><Volume2 className="w-3 h-3" /> Listen</>
              )}
            </button>
          </>
        ) : (
          <p className="text-sm leading-relaxed">{message.content}</p>
        )}
      </div>

      {message.role === 'user' && (
        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-neutral-800 dark:bg-neutral-700 flex items-center justify-center mt-1">
          <span className="text-xs font-semibold text-white dark:text-neutral-200">YOU</span>
        </div>
      )}
    </div>
  )
})

MessageBubble.displayName = 'MessageBubble';

export function MessageList({ messages, isLoading }: MessageListProps) {
  const endRef = useRef<HTMLDivElement>(null);

  const filteredMessages = useMemo(
    () => messages.filter((m) => m.content),
    [messages]
  );

  useEffect(() => {
    const timer = setTimeout(() => {
      endRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 0);
    return () => clearTimeout(timer);
  }, [filteredMessages.length, isLoading]);

  return (
    <ScrollArea className="flex-1 w-full h-full">
      <div className="flex flex-col p-4 sm:p-6 space-y-4">
        {filteredMessages.length === 0 && !isLoading && (
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="text-center space-y-3">
              <div className="text-5xl">💼</div>
              <h3 className="text-lg font-semibold text-neutral-900 dark:text-white">
                Welcome to Career Twin
              </h3>
              <p className="text-sm text-neutral-600 dark:text-neutral-300 max-w-xs mx-auto">
                Ask me anything about your career, skills, or professional development
              </p>
            </div>
          </div>
        )}

        {filteredMessages.map((message, index) => (
          <MessageBubble key={`${index}-${message.role}`} message={message} index={index} />
        ))}

        {isLoading && (
          <div className="flex gap-3 justify-start message-animation">
            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-neutral-200 dark:bg-neutral-800 flex items-center justify-center mt-1">
              <span className="text-xs font-semibold text-neutral-600 dark:text-neutral-300">AI</span>
            </div>
            <div className="bg-neutral-100 dark:bg-neutral-800 px-4 py-3 rounded-2xl rounded-bl-none">
              <div className="flex gap-1">
                <div className="w-2 h-2 bg-neutral-400 dark:bg-neutral-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                <div className="w-2 h-2 bg-neutral-400 dark:bg-neutral-500 rounded-full animate-bounce" style={{ animationDelay: '100ms' }} />
                <div className="w-2 h-2 bg-neutral-400 dark:bg-neutral-500 rounded-full animate-bounce" style={{ animationDelay: '200ms' }} />
              </div>
            </div>
          </div>
        )}

        <div ref={endRef} className="h-0" />
      </div>
    </ScrollArea>
  );
}