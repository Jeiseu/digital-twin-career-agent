'use client';

import { useState, useCallback } from 'react';
import { Message } from '@/lib/types';

interface UseChatOptions {
  api: string;
}

export function useChat({ api }: UseChatOptions) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const append = useCallback(
    async (message: Message) => {
      // Add user message to the state
      const userMessage = { ...message, id: message.id || Date.now().toString() };
      setMessages((prev) => [...prev, userMessage]);
      setIsLoading(true);

      try {
        const response = await fetch(api, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            messages: [...messages, userMessage],
          }),
        });

        if (!response.ok) {
          throw new Error('Failed to fetch response');
        }

        if (!response.body) {
          throw new Error('No response body');
        }

        let assistantMessage = '';
        const reader = response.body.getReader();
        const decoder = new TextDecoder();

        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          const chunk = decoder.decode(value);
          assistantMessage += chunk;
        }

        // Add assistant message to the state
        setMessages((prev) => [
          ...prev,
          {
            id: (Date.now() + 1).toString(),
            role: 'assistant',
            content: assistantMessage,
          },
        ]);
      } catch (error) {
        console.error('Chat error:', error);
      } finally {
        setIsLoading(false);
      }
    },
    [messages, api]
  );

  return {
    messages,
    isLoading,
    append,
  };
}
