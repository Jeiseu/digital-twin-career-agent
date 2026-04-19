'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';

type Theme = 'light' | 'dark';

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
  mounted: boolean;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>('light');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Initialize theme from localStorage or default to light
    const root = document.documentElement;
    const stored = localStorage.getItem('theme') as Theme | null;
    
    if (stored === 'dark') {
      // User previously chose dark mode
      root.classList.add('dark');
      setTheme('dark');
    } else {
      // Default to light mode
      root.classList.remove('dark');
      localStorage.setItem('theme', 'light');
      setTheme('light');
    }
    
    setMounted(true);
  }, []);

  const toggleTheme = () => {
    const root = document.documentElement;
    const current = localStorage.getItem('theme') as Theme | null;
    const isCurrentlyDark = current === 'dark' || root.classList.contains('dark');
    
    if (isCurrentlyDark) {
      // Switch to light
      root.classList.remove('dark');
      localStorage.setItem('theme', 'light');
      setTheme('light');
    } else {
      // Switch to dark
      root.classList.add('dark');
      localStorage.setItem('theme', 'dark');
      setTheme('dark');
    }
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, mounted }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    return {
      theme: 'light' as Theme,
      toggleTheme: () => {},
      mounted: false,
    };
  }
  return context;
}
