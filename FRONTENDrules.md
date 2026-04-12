# Frontend Rules — Digital Twin

## Color Palette (60-30-10)

| Role       | Color     | Hex       | Usage                                            |
|------------|-----------|-----------|--------------------------------------------------|
| Dominant   | White     | `#FFFFFF` | Page background, chat area, assistant bubbles bg |
| Secondary  | Black     | `#0A0A0A` | Header bar, user bubbles, primary text, buttons  |
| Accent     | Gray      | `#F5F5F5` | Assistant bubble bg, input bg, muted elements    |
| Border     | Light Gray| `#E5E5E5` | Borders, dividers, input borders                 |
| Muted text | Mid Gray  | `#737373` | Timestamps, placeholders, secondary text         |

## Typography
git remote set-url origin https://devichann:<YOUR_TOKEN>@github.com/Jeiseu/digital-twin-career-agent.git
git push origin feature/dev1-chat-ui
- Use Geist Sans (loaded via next/font/google)
- No bold fonts except where absolutely necessary
- Default font-weight: `normal` (400) everywhere
- Heading text: `font-normal` — no semibold, no bold
- Body text: `text-sm` (14px) with `leading-relaxed`
- Keep text clean and light

## Buttons

- Background: `#0A0A0A` (black), text: white
- Border-radius: `rounded-lg`
- Font-weight: `font-normal` (never bold)
- Hover effect: underline sweeps in from left, text fades to a loading spinner, and reverses on mouse leave
- Use the `btn-hover` utility class defined in globals.css

## Chat Bubbles

- User messages: black bg (`#0A0A0A`), white text, right-aligned
- Assistant messages: light gray bg (`#F5F5F5`), black text, left-aligned
- Both: `rounded-2xl`, `max-w-[75%]`, `text-sm leading-relaxed`

## Layout

- Full-height centered card layout
- Card: white bg, light gray border, subtle shadow
- Header: solid black bar with white text (font-normal)
- No colors — strictly monochrome (no blue, no gradients)

## Naming

- Do NOT hardcode any person's name in the frontend
- The persona/name is Team 1's responsibility (AI agent layer)
- Use generic labels like "Digital Twin" in the header

## General

- Mobile-responsive layout
- Minimal, clean, professional aesthetic
- Prefer Tailwind utility classes over custom CSS
- Use shadcn/ui components (button, input, card, scroll-area, avatar)
