'use client';

import { useChat } from '@/lib/hooks/useChat';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MessageList } from './MessageList';
import { MessageInput } from './MessageInput';

export function ChatWindow() {
  const { messages, isLoading, append } = useChat({
    api: '/api/chat',
  });

  const handleFormSubmit = async (message: string) => {
    await append({
      id: '',
      content: message,
      role: 'user',
    });
  };

  return (
    <Card className="w-full max-w-2xl max-h-[600px] flex flex-col shadow-lg">
      <CardHeader className="border-b border-black">
        <CardTitle className="text-2xl">Career Twin</CardTitle>
      </CardHeader>
      <CardContent className="flex-1 p-0 flex flex-col overflow-hidden">
        <MessageList messages={messages} isLoading={isLoading} />
        <MessageInput onSubmit={handleFormSubmit} isLoading={isLoading} />
      </CardContent>
    </Card>
  );
}
