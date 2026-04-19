'use client';

import Link from 'next/link'
import { Moon, Sun } from 'lucide-react'
import { useTheme } from '@/lib/providers/ThemeProvider'

const navLinks = [
  { label: 'Home', href: '#' },
  { label: 'Services', href: '#' },
  { label: 'About', href: '#' },
  { label: 'Contact', href: '#' },
]

function ThemeToggleButton() {
  const { theme, toggleTheme, mounted } = useTheme()

  if (!mounted) {
    return (
      <button
        className="p-2 rounded-lg bg-slate-100 dark:bg-gray-900 text-slate-900 dark:text-cyan-400 hover:bg-slate-200 dark:hover:bg-gray-800 transition-all duration-300"
        disabled
      >
        <Moon className="h-5 w-5" />
      </button>
    )
  }

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-lg bg-slate-100 dark:bg-gray-900 text-slate-900 dark:text-cyan-400 hover:bg-slate-200 dark:hover:bg-gray-800 transition-all duration-300"
      aria-label="Toggle theme"
    >
      {theme === 'dark' ? (
        <Sun className="h-5 w-5" />
      ) : (
        <Moon className="h-5 w-5" />
      )}
    </button>
  )
}

export default function Header() {
  return (
    <header className="w-full bg-white dark:bg-black border-b-2 border-blue-500 dark:border-cyan-500 transition-all duration-300">
      <div className="max-w-6xl mx-auto px-6 py-3 flex items-center justify-between">
        {/* Logo + Brand */}
        <div className="flex items-center gap-3">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/g1logoupdated.png"
            alt="Digital Twin"
            className="size-14 rounded-full bg-slate-900 dark:bg-slate-100 object-contain flex-shrink-0 p-1"
          />
          <span className="text-slate-900 dark:text-white text-lg font-semibold tracking-tight transition-colors duration-300">
            Digital Twin
          </span>
          {/* Online status */}
          <div className="flex items-center gap-1.5 ml-2">
            <span className="relative flex size-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />
              <span className="relative inline-flex size-2 rounded-full bg-green-500" />
            </span>
            <span className="text-sm text-slate-900 dark:text-white transition-colors duration-300">24/7 Active</span>
          </div>
        </div>

        {/* Nav Links */}
        <nav className="hidden sm:flex items-center gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="btn-hover relative text-sm font-normal text-slate-900 dark:text-white hover:text-blue-600 dark:hover:text-cyan-400 transition-colors duration-300 pb-0.5"
            >
              <span className="btn-label">{link.label}</span>
            </Link>
          ))}
        </nav>

        {/* Theme Toggle */}
        <ThemeToggleButton />
      </div>
    </header>
  )
}
