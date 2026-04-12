import { SYSTEM_PROMPT } from '@/lib/ai/prompt'

export const maxDuration = 30

const MAX_CHARS = 2000
const MAX_HISTORY = 40

const BLOCKED_PATTERNS = [
  /ignore (all |previous |above |prior )?instructions/i,
  /you are now/i,
  /forget (your |all |previous )?instructions/i,
  /act as (a |an )?(?!career|advisor|coach)/i,
  /jailbreak/i,
  /pretend (you are|to be)/i,
  /new persona/i,
  /override (your |all )?rules/i,
  /\[system\]/i,
  /reveal (your |the )?(system )?prompt/i,
]

function isInjection(text: string): boolean {
  return BLOCKED_PATTERNS.some((pattern) => pattern.test(text))
}

export async function POST(req: Request) {
  try {
    const body = await req.json()

    if (!body || !Array.isArray(body.messages)) {
      return Response.json({ error: 'Invalid request' }, { status: 400 })
    }

    const raw: { role: string; content: string }[] = body.messages

    // Cap history
    const capped = raw.slice(-MAX_HISTORY)

    // Validate and sanitize each message
    const sanitized = capped
      .filter((m) => m.role === 'user' || m.role === 'assistant')
      .map((m) => ({
        role: m.role as 'user' | 'assistant',
        content: String(m.content).slice(0, MAX_CHARS),
      }))

    if (sanitized.length === 0) {
      return Response.json({ error: 'Invalid request' }, { status: 400 })
    }

    const last = sanitized[sanitized.length - 1]
    if (last.role !== 'user') {
      return Response.json({ error: 'Invalid request' }, { status: 400 })
    }

    // Prompt injection check
    if (isInjection(last.content)) {
      return Response.json(
        { error: 'Message violates usage policy' },
        { status: 422 }
      )
    }

    const upstream = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
        'Content-Type': 'application/json',
        'HTTP-Referer': 'https://digital-twin-career-agent.vercel.app',
        'X-Title': 'Digital Twin Career Agent',
      },
      body: JSON.stringify({
        model: 'openai/gpt-4-turbo',
        messages: [{ role: 'system', content: SYSTEM_PROMPT }, ...sanitized],
        stream: true,
      }),
    })

    if (!upstream.ok) {
      return Response.json({ error: 'AI service unavailable' }, { status: 502 })
    }

    return new Response(upstream.body, {
      headers: {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        Connection: 'keep-alive',
      },
    })
  } catch {
    return Response.json({ error: 'Internal server error' }, { status: 500 })
  }
}
