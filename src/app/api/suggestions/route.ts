import { anthropic } from '@ai-sdk/anthropic'
import { generateText } from 'ai'

export async function POST(req: Request) {
  try {
    const { lastMessage } = await req.json()

    if (!lastMessage) {
      return Response.json({ suggestions: [] })
    }

    const { text } = await generateText({
      model: anthropic('claude-haiku-4-5-20251001'),
      prompt: `Based on this message from a career agent AI: "${lastMessage}"
      
Generate exactly 3 short suggested reply buttons a visitor might want to click next.
Rules:
- Each suggestion must be under 8 words
- They should feel natural and conversational
- They should relate directly to what was just said
- Return ONLY a JSON array of 3 strings, nothing else
Example: ["Tell me more about your experience", "I'd like to book a call", "What's your availability?"]`,
    })

    const cleaned = text.replace(/```json|```/g, '').trim()
    const suggestions = JSON.parse(cleaned)

    return Response.json({ suggestions })
  } catch (error) {
    console.error('Suggestions error:', error)
    return Response.json({ suggestions: [] })
  }
}