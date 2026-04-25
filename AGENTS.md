<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# Agents & Architecture
## Digital Twin Career Agent — Team 1

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | Next.js 16, React 19, Shadcn UI, Tailwind CSS |
| AI Agent | Vercel AI SDK v6 |
| Backend | Next.js API Routes (TypeScript) |
| Database | Neon Postgres (via Vercel Storage) |
| Workflows | Vercel Workflows |
| Voice (Phase 2) | Deepgram STT, ElevenLabs TTS, Twilio |
| Deployment | Vercel |

---

## Project Architecture
```
src/
├── app/                        # Next.js App Router pages
│   ├── page.tsx                # Landing page with chat UI
│   ├── layout.tsx              # Root layout
│   └── api/
│       ├── chat/               # AI streaming endpoint
│       └── tools/              # Tool call handlers
├── components/
│   ├── chat/                   # Chat UI components
│   └── ui/                     # Shadcn UI components
├── lib/
│   ├── ai/                     # Agent config, system prompt, tool definitions
│   ├── db/                     # Neon Postgres client, schema, queries
│   ├── workflows/              # Vercel Workflow definitions
│   └── voice/                  # Phase 2: Deepgram, ElevenLabs, Twilio
```

---

## Agent Interaction Flow
```
Visitor → Web UI / Phone Call
       → AI Agent (Vercel AI SDK v6)
       → Tool Calls (save contact, fetch profile, trigger booking)
       → Neon Postgres (persist conversation + metadata)
       → Response streamed back to visitor
       → Vercel Workflow triggered (follow-up email, analytics)
```

---

## Agent Tools

| Tool | Description |
|---|---|
| `saveContact` | Saves visitor name, email, and intent to the database |
| `fetchProfile` | Retrieves the owner's profile data to present to visitors |
| `triggerBooking` | Initiates a meeting booking workflow |

---

## Requirements Reference
- Full product requirements: [prd.md](./prd.md)
- Repository structure and overview: [readme.md](./readme.md)

---

## Team Members

| Developer | LinkedIn | GitHub |
|---|---|---|
| Dwight Mongaya | [LinkedIn](https://www.linkedin.com/in/dwight-mongaya-9085552b4/) | [GitHub](https://github.com/DwightRTM) |
| John Vincent | [LinkedIn](https://www.linkedin.com/in/jvcreyes) | [GitHub](https://github.com/Jeiseu) |
| Julliene Almojera | [LinkedIn](https://www.linkedin.com/in/julliene-almojera-b73596381?utm_source=share_via&utm_content=profile&utm_medium=member_ios) | [GitHub](https://github.com/jalmojera) |
| Jenesa Cabildo | [LinkedIn](https://ph.linkedin.com/in/jeya-cabildo) | [GitHub](https://github.com/jeneya-cabildo) |
| Alkaeya De La Peña | [LinkedIn](https://www.linkedin.com/in/alkaeya-de-la-pe%C3%B1a-7a625a3b9/) | [GitHub](https://github.com/Alkaeya) |
| Omayra Afrin | [LinkedIn](https://www.linkedin.com/in/omayara-afrin) | [GitHub](https://github.com/OmayaraAfrin) |
| Christian Gem Raganit | [LinkedIn](https://www.linkedin.com/in/christian-gem-raganit-2b2366324?utm_source=share_via&utm_content=profile&utm_medium=member_android) | [GitHub](https://github.com/devichann) |
| Ariana Siddayao | [LinkedIn](https://www.linkedin.com/in/ariana-siddayao-1b90343b8?utm_source=share_via&utm_content=profile&utm_medium=member_ios) | [GitHub](https://github.com/aria-na) |