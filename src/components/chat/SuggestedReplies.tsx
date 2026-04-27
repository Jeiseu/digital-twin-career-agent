'use client';

import { memo, useEffect, useState } from 'react';

interface SuggestedRepliesProps {
  lastMessage: string
  onSelect: (reply: string) => void
  isLoading: boolean
}

export const SuggestedReplies = memo(({ lastMessage, onSelect, isLoading }: SuggestedRepliesProps) => {
  const [suggestions, setSuggestions] = useState<string[]>([])
  const [isFetching, setIsFetching] = useState(false)

  useEffect(() => {
    if (!lastMessage || isLoading) return

    const fetchSuggestions = async () => {
      setIsFetching(true)
      try {
        const res = await fetch('/api/suggestions', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ lastMessage }),
        })
        const data = await res.json()
        setSuggestions(data.suggestions ?? [])
      } catch {
        setSuggestions([])
      } finally {
        setIsFetching(false)
      }
    }

    fetchSuggestions()
  }, [lastMessage, isLoading])

  if (isLoading || isFetching) {
    return (
      <div className="flex gap-2 px-4 sm:px-6 py-3">
        {[1, 2, 3].map((i) => (
          <div key={i} className="h-7 w-24 rounded-full bg-neutral-100 dark:bg-neutral-800 animate-pulse" />
        ))}
      </div>
    )
  }

  if (suggestions.length === 0) return null

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