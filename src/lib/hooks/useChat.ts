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
      const userMessage: Message = {
        ...message,
        id: message.id || Date.now().toString(),
      };

      const nextMessages = [...messages, userMessage];
      setMessages(nextMessages);
      setIsLoading(true);

      // Placeholder for the streaming assistant message
      const assistantId = (Date.now() + 1).toString();
      setMessages((prev) => [
        ...prev,
        { id: assistantId, role: 'assistant', content: '' },
      ]);

      try {
        const response = await fetch(api, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ messages: nextMessages }),
        });

        if (!response.ok) {
          const err = await response.json().catch(() => ({}));
          throw new Error(err?.error || 'Request failed');
        }

        if (!response.body) throw new Error('No response body');

        const reader = response.body.getReader();
        const decoder = new TextDecoder();
        let buffer = '';

        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          buffer += decoder.decode(value, { stream: true });
          const lines = buffer.split('\n');
          buffer = lines.pop() ?? '';

          for (const line of lines) {
            if (!line.startsWith('data:')) continue;
            const data = line.slice(5).trim();
            if (data === '[DONE]') break;

            try {
              const parsed = JSON.parse(data);
              const token: string =
                parsed?.choices?.[0]?.delta?.content ?? '';
              if (!token) continue;

              setMessages((prev) =>
                prev.map((m) =>
                  m.id === assistantId
                    ? { ...m, content: m.content + token }
                    : m
                )
              );
            } catch {
              // malformed chunk — skip
            }
          }
        }
      } catch (error) {
        // Remove the empty assistant placeholder on error
        setMessages((prev) => prev.filter((m) => m.id !== assistantId));
        console.error('Chat error:', error);
      } finally {
        setIsLoading(false);
      }
    },
    [messages, api]
  );

  return { messages, isLoading, append };
}
