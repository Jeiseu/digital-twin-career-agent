'use client';

import { useState } from 'react';
import { useChat } from '@/lib/hooks/useChat';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MessageList } from './MessageList';
import { MessageInput } from './MessageInput';

const QUICK_ACTIONS = [
  {
    label: 'Career Profile Analysis',
    description: 'Build your personalized career profile',
    message: 'I want to do a Career Profile Analysis. Help me build my career profile.',
    icon: '🎯',
  },
  {
    label: 'Skill Gap Detection',
    description: 'Find gaps between your skills and target role',
    message: 'I want to detect my skill gaps. Can you help me compare my skills to my target role?',
    icon: '📊',
  },
  {
    label: 'Interview Preparation',
    description: 'Practice with a mock interview session',
    message: 'I want to practice for an interview. Can we do a mock interview?',
    icon: '🎤',
  },
];

export function ChatWindow() {
  const { messages, isLoading, append } = useChat({ api: '/api/chat' });
  const [cardsVisible, setCardsVisible] = useState(true);

  const handleSubmit = async (message: string) => {
    if (cardsVisible) setCardsVisible(false);
    await append({ id: '', content: message, role: 'user' });
  };

  const handleQuickAction = async (message: string) => {
    setCardsVisible(false);
    await append({ id: '', content: message, role: 'user' });
  };

  return (
    <Card className="w-full max-w-2xl max-h-[600px] flex flex-col shadow-lg">
      <CardHeader className="border-b border-black">
        <CardTitle className="text-2xl">Career Twin</CardTitle>
        <p className="text-sm text-[#737373]">Powered by GPT-4 Turbo</p>
      </CardHeader>
      <CardContent className="flex-1 p-0 flex flex-col overflow-hidden">
        {cardsVisible && messages.length === 0 && (
          <div className="p-4 grid grid-cols-3 gap-3">
            {QUICK_ACTIONS.map((action) => (
              <button
                key={action.label}
                onClick={() => handleQuickAction(action.message)}
                disabled={isLoading}
                className="flex flex-col gap-2 p-4 rounded-xl border-2 border-[#e5e5e5] bg-white hover:border-[#0a0a0a] hover:shadow-md text-left transition-all disabled:opacity-50"
              >
                <span className="text-2xl">{action.icon}</span>
                <span className="text-sm font-semibold text-[#0a0a0a] leading-tight">{action.label}</span>
                <span className="text-xs text-[#737373] leading-snug">{action.description}</span>
              </button>
            ))}
          </div>
        )}
        <MessageList messages={messages} isLoading={isLoading} />
        <MessageInput onSubmit={handleSubmit} isLoading={isLoading} />
      </CardContent>
    </Card>
  );
}
