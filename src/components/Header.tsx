'use client';

import { useState } from 'react'
import { ThemeToggle } from './ThemeToggle'
import { Button } from './ui/button'
import Modal from './Modal'

const teams = {
  ai: {
    title: 'AI Team',
    members: [
      { name: 'John Vincent', linkedin: 'https://www.linkedin.com/in/jvcreyes', github: 'https://github.com/Jeiseu' },
      { name: 'Omayra Afrin', linkedin: 'https://www.linkedin.com/in/omayara-afrin', github: 'https://github.com/OmayaraAfrin' }
    ]
  },
  frontend: {
    title: 'Frontend Team',
    members: [
      { name: 'Dwight Mongaya', linkedin: 'https://www.linkedin.com/in/dwight-mongaya-9085552b4/', github: 'https://github.com/DwightRTM' },
      { name: 'Christian Gem Raganit', linkedin: 'https://www.linkedin.com/in/christian-gem-raganit-2b2366324?utm_source=share_via&utm_content=profile&utm_medium=member_android', github: 'https://github.com/devichann' },
      { name: 'Julliene Almojera', linkedin: 'https://www.linkedin.com/in/julliene-almojera-b73596381?utm_source=share_via&utm_content=profile&utm_medium=member_ios', github: 'https://github.com/jalmojera' }
    ]
  },
  backend: {
    title: 'Backend Team',
    members: [
      { name: 'Ariana Siddayao', linkedin: 'https://www.linkedin.com/in/ariana-siddayao-1b90343b8?utm_source=share_via&utm_content=profile&utm_medium=member_ios', github: 'https://github.com/aria-na' },
      { name: 'Jenesa Cabildo', linkedin: 'https://ph.linkedin.com/in/jeya-cabildo', github: 'https://github.com/jeneya-cabildo' },
      { name: 'Alkaeya De La Peña', linkedin: 'https://www.linkedin.com/in/alkaeya-de-la-pe%C3%B1a-7a625a3b9/', github: 'https://github.com/Alkaeya' }
    ]
  }
}

export default function Header() {
  const [activeModal, setActiveModal] = useState<'about' | 'contact' | null>(null)

  const handleStartChatting = () => {
    const chatElement = document.getElementById('chat-window')
    if (chatElement) {
      chatElement.scrollIntoView({ behavior: 'smooth' })
      // Focus on the chat input if available
      const chatInput = chatElement.querySelector('input')
      if (chatInput) {
        setTimeout(() => chatInput.focus(), 500)
      }
    }
  }

  return (
    <>
      <header className="w-full bg-white dark:bg-neutral-950 border-b border-neutral-200 dark:border-neutral-800 transition-colors duration-200">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          {/* Logo + Brand */}
          <div className="flex items-center gap-3">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/g1logoupdated.png"
              alt="Digital Twin"
              className="w-12 h-12 rounded-full bg-neutral-900 dark:bg-neutral-800 object-contain flex-shrink-0 p-1"
            />
            <div className="flex flex-col gap-0.5">
              <span className="text-neutral-900 dark:text-white text-base font-semibold tracking-tight">
                Digital Twin
              </span>
              {/* Online status */}
              <div className="flex items-center gap-1.5">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500" />
                </span>
                <span className="text-xs text-neutral-500 dark:text-neutral-400 font-medium">24/7 Active</span>
              </div>
            </div>
          </div>

          {/* Nav Links + Theme Toggle */}
          <nav className="hidden sm:flex items-center gap-6">
            <button
              onClick={() => setActiveModal('about')}
              className="text-sm font-medium text-neutral-600 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-white transition-colors duration-200"
            >
              About
            </button>
            <button
              onClick={() => setActiveModal('contact')}
              className="text-sm font-medium text-neutral-600 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-white transition-colors duration-200"
            >
              Contact
            </button>
            <Button
              onClick={handleStartChatting}
              className="bg-green-600 hover:bg-green-700 text-white"
              size="sm"
            >
              Start Chatting
            </Button>
            <ThemeToggle />
          </nav>

          {/* Mobile Theme Toggle */}
          <div className="sm:hidden">
            <ThemeToggle />
          </div>
        </div>
      </header>

      {/* Modals */}
      <Modal
        isOpen={activeModal === 'about'}
        onClose={() => setActiveModal(null)}
        title="About Digital Twin"
      >
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold text-neutral-900 dark:text-white mb-2">
              About Our Chatbot
            </h3>
            <p className="text-neutral-700 dark:text-neutral-300 mb-3">
              Digital Twin is an intelligent AI-powered career agent designed to help visitors explore career opportunities and connect with our team.
            </p>
            <p className="text-neutral-700 dark:text-neutral-300">
              Our chatbot is available 24/7 to answer your questions, provide information, and guide you through your career journey with us.
            </p>
          </div>

          <div className="border-t border-neutral-200 dark:border-neutral-800 pt-6">
            <h3 className="text-lg font-semibold text-neutral-900 dark:text-white mb-4">
              Meet Our Team
            </h3>
            <div className="space-y-6">
              {Object.values(teams).map((team) => (
                <div key={team.title}>
                  <h4 className="font-semibold text-neutral-900 dark:text-white mb-2">
                    {team.title}
                  </h4>
                  <ul className="space-y-1 ml-2">
                    {team.members.map((member) => (
                      <li key={member.name} className="text-neutral-700 dark:text-neutral-300">
                        • {member.name}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Modal>

      <Modal
        isOpen={activeModal === 'contact'}
        onClose={() => setActiveModal(null)}
        title="Get in Touch"
      >
        <div className="space-y-8">
          {Object.values(teams).map((team) => (
            <div key={team.title}>
              <h3 className="text-lg font-semibold text-neutral-900 dark:text-white mb-4">
                {team.title}
              </h3>
              <div className="space-y-3">
                {team.members.map((member) => (
                  <div key={member.name} className="flex items-center justify-between p-3 rounded-lg bg-neutral-100 dark:bg-neutral-800">
                    <span className="font-medium text-neutral-900 dark:text-white">
                      {member.name}
                    </span>
                    <div className="flex gap-2">
                      <a
                        href={member.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center px-3 py-1.5 rounded-md bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium transition-colors duration-200"
                      >
                        LinkedIn
                      </a>
                      <a
                        href={member.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center px-3 py-1.5 rounded-md bg-neutral-800 hover:bg-neutral-900 dark:bg-neutral-700 dark:hover:bg-neutral-600 text-white text-sm font-medium transition-colors duration-200"
                      >
                        GitHub
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Modal>
    </>
  )
}
