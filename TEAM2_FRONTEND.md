# 💻 Team 2 — Frontend

## 👥 Members
- Dwight Mongaya
- Christian Raganit
- Juliene Almojera

---

## 🎯 Objective
Build the frontend UI of the Digital Twin system and connect it to the AI and backend APIs.

---

## 🧩 Core Responsibilities

### 1. Chat Interface
- Build a real-time chat UI
- Display messages (user & assistant)
- Add typing/loading indicator
- Input field with send button
- Auto-scroll to latest message

---

### 2. UI System
- Set up Shadcn UI
- Use reusable components:
  - Button
  - Input
  - Card
  - Scroll Area
  - Avatar
- Maintain consistent design system

---

### 3. Layout & Pages
- Create main page layout
- Center chat interface
- Add header/title/description
- Implement Profile/About section
- Ensure mobile responsiveness

---

### 4. API Integration
- Connect to:
  - /api/chat
- Handle:
  - Loading states
  - Error states
  - Empty states

---

### 5. UX Improvements (Phase 2)
- Add animations
- Improve spacing and layout
- Add loading skeletons
- Improve accessibility and readability

---

### 6. Voice Feature (Optional - Phase 3)
- Integrate speech-to-text (Deepgram)
- Capture microphone input
- Send voice input to chat

---

## 🛠️ Tech Stack
- Next.js (App Router)
- React
- TypeScript
- Vercel AI SDK (useChat)
- Shadcn UI
- Tailwind CSS

---

## 📁 Folder Structure
```
src/
  components/
    chat/
      ChatWindow.tsx
      MessageList.tsx
      MessageInput.tsx
```

---

## 🔄 Workflow Rules

### Branching
- Do NOT push directly to main
- Create personal branches:
  - feature/dwight-frontend
  - feature/christian-layout
  - feature/juliene-ui

---

### Daily Workflow
1. Pull latest changes:
```
git checkout main
git pull origin main
```

2. Switch to your branch:
```
git checkout feature/your-branch-name
```

3. Work on your task

4. Commit and push:
```
git add .
git commit -m "feat: describe your work"
git push origin feature/your-branch-name
```

5. Create Pull Request (PR) to main

---

## 👨‍💻 Task Distribution

### Dwight
- ChatWindow component
- API connection (useChat)
- Main page integration

### Christian
- Layout and responsiveness
- Page structure

### Juliene
- UI components and styling
- Design polish

---

## 🚀 Deliverables
- Functional chat UI
- Responsive design (desktop + mobile)
- Connected frontend to backend API
- Clean and modern UI

---

## ✅ Definition of Done
- Chat UI is working
- Messages send and display correctly
- No crashes or major bugs
- Mobile responsive
- Clean UI/UX

---

## ⚠️ Rules
- Do NOT overwrite teammates' work
- Avoid editing the same file simultaneously
- Always pull before starting
- Use clear commit messages

---

## 🧠 Notes
- Backend and AI may not be ready initially — focus on UI first
- Use mock data if needed
- Ensure components are reusable and clean
