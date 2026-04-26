'use client';

import { memo } from 'react';

const SUGGESTED_REPLIES: Record<string, string[]> = {
  greeting: [
    "Tell me about Ciel's experience",
    "What are Ciel's key skills?",
    "I'd like to book a meeting",
    "I'm a recruiter looking for talent",
  ],
  skills: [
    "What projects has Ciel built?",
    "Is Ciel available for full-time roles?",
    "I'd like to book a meeting",
  ],
  experience: [
    "What tech stack does Ciel use?",
    "Is Ciel open to freelance work?",
    "I'd like to book a meeting",
  ],
  booking: [
    "Yes, let's book a meeting",
    "Tell me more about Ciel first",
    "What's Ciel's availability?",
  ],
  default: [
    "Tell me more",
    "I'd like to book a meeting",
    "What are Ciel's skills?",
    "Is Ciel available?",
  ],
}

function getSuggestions(lastMessage: string): string[] {
  const lower = lastMessage.toLowerCase()
  if (lower.includes('hi') || lower.includes('hello') || lower.includes('welcome')) {
    return SUGGESTED_REPLIES.greeting
  }
  if (lower.includes('skill') || lower.includes('stack') || lower.includes('tech')) {
    return SUGGESTED_REPLIES.skills
  }
  if (lower.includes('experience') || lower.includes('background') || lower.includes('project')) {
    return SUGGESTED_REPLIES.experience
  }
  if (lower.includes('book') || lower.includes('meeting') || lower.includes('schedule')) {
    return SUGGESTED_REPLIES.booking
  }
  return SUGGESTED_REPLIES.default
}

interface SuggestedRepliesProps {
  lastMessage: string
  onSelect: (reply: string) => void
  isLoading: boolean
}

export const SuggestedReplies = memo(({ lastMessage, onSelect, isLoading }: SuggestedRepliesProps) => {
  if (isLoading) return null

  const suggestions = getSuggestions(lastMessage)

  return (
    <div className="flex flex-wrap gap-2 px-4 sm:px-6 py-3">
      {suggestions.map((reply) => (
        <button
          key={reply}
          onClick={() => onSelect(reply)}
          className="text-xs px-3 py-1.5 rounded-full border border-neutral-200 dark:border-neutral-700 text-neutral-600 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
        >
          {reply}
        </button>
      ))}
    </div>
  )
})

SuggestedReplies.displayName = 'SuggestedReplies'