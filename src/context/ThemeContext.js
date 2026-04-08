'use client';
import { createContext, useContext, useState, useEffect, useCallback } from 'react';

const ThemeContext = createContext(null);

const themes = {
  dark: {
    name: 'Midnight',
    '--bg-primary': '#0a0a0f',
    '--bg-secondary': '#12121a',
    '--bg-card': '#1a1a2e',
    '--bg-card-hover': '#222240',
    '--bg-elevated': '#16213e',
    '--text-primary': '#e8e8f0',
    '--text-secondary': '#a0a0b8',
    '--text-muted': '#6a6a80',
    '--accent': '#7c3aed',
    '--accent-light': '#a78bfa',
    '--accent-dark': '#5b21b6',
    '--accent-glow': 'rgba(124, 58, 237, 0.3)',
    '--border': 'rgba(255, 255, 255, 0.08)',
    '--border-active': 'rgba(124, 58, 237, 0.5)',
    '--range-bg': 'rgba(124, 58, 237, 0.15)',
    '--today-bg': 'rgba(124, 58, 237, 0.25)',
    '--holiday-bg': 'rgba(245, 158, 11, 0.15)',
    '--shadow': '0 8px 32px rgba(0, 0, 0, 0.4)',
    '--shadow-lg': '0 24px 64px rgba(0, 0, 0, 0.6)',
    '--glass-bg': 'rgba(255, 255, 255, 0.03)',
    '--glass-border': 'rgba(255, 255, 255, 0.06)',
    '--success': '#10b981',
    '--warning': '#f59e0b',
    '--danger': '#ef4444',
    '--gradient-primary': 'linear-gradient(135deg, #7c3aed 0%, #2563eb 100%)',
    '--gradient-secondary': 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)',
    '--gradient-accent': 'linear-gradient(135deg, #7c3aed 0%, #ec4899 100%)',
  },
  light: {
    name: 'Daylight',
    '--bg-primary': '#f8f9fc',
    '--bg-secondary': '#ffffff',
    '--bg-card': '#ffffff',
    '--bg-card-hover': '#f3f4f6',
    '--bg-elevated': '#f0f2f8',
    '--text-primary': '#1a1a2e',
    '--text-secondary': '#4a4a6a',
    '--text-muted': '#9a9ab0',
    '--accent': '#6366f1',
    '--accent-light': '#818cf8',
    '--accent-dark': '#4f46e5',
    '--accent-glow': 'rgba(99, 102, 241, 0.2)',
    '--border': 'rgba(0, 0, 0, 0.08)',
    '--border-active': 'rgba(99, 102, 241, 0.4)',
    '--range-bg': 'rgba(99, 102, 241, 0.1)',
    '--today-bg': 'rgba(99, 102, 241, 0.15)',
    '--holiday-bg': 'rgba(245, 158, 11, 0.12)',
    '--shadow': '0 4px 16px rgba(0, 0, 0, 0.08)',
    '--shadow-lg': '0 16px 48px rgba(0, 0, 0, 0.12)',
    '--glass-bg': 'rgba(255, 255, 255, 0.8)',
    '--glass-border': 'rgba(0, 0, 0, 0.06)',
    '--success': '#10b981',
    '--warning': '#f59e0b',
    '--danger': '#ef4444',
    '--gradient-primary': 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
    '--gradient-secondary': 'linear-gradient(135deg, #f8f9fc 0%, #e8ecf4 100%)',
    '--gradient-accent': 'linear-gradient(135deg, #6366f1 0%, #ec4899 100%)',
  },
  glass: {
    name: 'Glassmorphism',
    '--bg-primary': '#0f0f1a',
    '--bg-secondary': 'rgba(255, 255, 255, 0.05)',
    '--bg-card': 'rgba(255, 255, 255, 0.07)',
    '--bg-card-hover': 'rgba(255, 255, 255, 0.12)',
    '--bg-elevated': 'rgba(255, 255, 255, 0.08)',
    '--text-primary': '#f0f0f8',
    '--text-secondary': '#b0b0c8',
    '--text-muted': '#707088',
    '--accent': '#06b6d4',
    '--accent-light': '#22d3ee',
    '--accent-dark': '#0891b2',
    '--accent-glow': 'rgba(6, 182, 212, 0.3)',
    '--border': 'rgba(255, 255, 255, 0.1)',
    '--border-active': 'rgba(6, 182, 212, 0.5)',
    '--range-bg': 'rgba(6, 182, 212, 0.12)',
    '--today-bg': 'rgba(6, 182, 212, 0.2)',
    '--holiday-bg': 'rgba(245, 158, 11, 0.15)',
    '--shadow': '0 8px 32px rgba(0, 0, 0, 0.3)',
    '--shadow-lg': '0 24px 64px rgba(0, 0, 0, 0.5)',
    '--glass-bg': 'rgba(255, 255, 255, 0.06)',
    '--glass-border': 'rgba(255, 255, 255, 0.12)',
    '--success': '#10b981',
    '--warning': '#f59e0b',
    '--danger': '#ef4444',
    '--gradient-primary': 'linear-gradient(135deg, #06b6d4 0%, #8b5cf6 100%)',
    '--gradient-secondary': 'linear-gradient(135deg, rgba(15,15,26,0.8) 0%, rgba(30,30,50,0.8) 100%)',
    '--gradient-accent': 'linear-gradient(135deg, #06b6d4 0%, #d946ef 100%)',
  },
  retro: {
    name: 'Retro',
    '--bg-primary': '#1a1410',
    '--bg-secondary': '#231d16',
    '--bg-card': '#2d2519',
    '--bg-card-hover': '#3a3020',
    '--bg-elevated': '#352c1e',
    '--text-primary': '#f5e6c8',
    '--text-secondary': '#c4a882',
    '--text-muted': '#8a7560',
    '--accent': '#e88c30',
    '--accent-light': '#f0a050',
    '--accent-dark': '#c06a10',
    '--accent-glow': 'rgba(232, 140, 48, 0.3)',
    '--border': 'rgba(245, 230, 200, 0.1)',
    '--border-active': 'rgba(232, 140, 48, 0.5)',
    '--range-bg': 'rgba(232, 140, 48, 0.12)',
    '--today-bg': 'rgba(232, 140, 48, 0.2)',
    '--holiday-bg': 'rgba(220, 80, 60, 0.15)',
    '--shadow': '0 8px 32px rgba(0, 0, 0, 0.5)',
    '--shadow-lg': '0 24px 64px rgba(0, 0, 0, 0.7)',
    '--glass-bg': 'rgba(245, 230, 200, 0.04)',
    '--glass-border': 'rgba(245, 230, 200, 0.08)',
    '--success': '#6ab04c',
    '--warning': '#f9ca24',
    '--danger': '#eb4d4b',
    '--gradient-primary': 'linear-gradient(135deg, #e88c30 0%, #eb4d4b 100%)',
    '--gradient-secondary': 'linear-gradient(135deg, #1a1410 0%, #2d2519 100%)',
    '--gradient-accent': 'linear-gradient(135deg, #e88c30 0%, #f9ca24 100%)',
  },
};

export function ThemeProvider({ children }) {
  const [currentTheme, setCurrentTheme] = useState('dark');
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('calendar-theme');
    if (saved && themes[saved]) {
      setCurrentTheme(saved);
    }
    setIsHydrated(true);
  }, []);

  useEffect(() => {
    if (!isHydrated) return;
    const theme = themes[currentTheme];
    const root = document.documentElement;
    Object.entries(theme).forEach(([key, value]) => {
      if (key.startsWith('--')) {
        root.style.setProperty(key, value);
      }
    });
    localStorage.setItem('calendar-theme', currentTheme);
  }, [currentTheme, isHydrated]);

  const cycleTheme = useCallback(() => {
    const keys = Object.keys(themes);
    const idx = keys.indexOf(currentTheme);
    setCurrentTheme(keys[(idx + 1) % keys.length]);
  }, [currentTheme]);

  const value = {
    currentTheme,
    setTheme: setCurrentTheme,
    cycleTheme,
    themeName: themes[currentTheme]?.name || 'Midnight',
    themes: Object.entries(themes).map(([key, val]) => ({ key, name: val.name })),
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) throw new Error('useTheme must be used within ThemeProvider');
  return context;
}
