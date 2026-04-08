'use client';

import { useState, useRef, useEffect } from 'react';
import { useTheme } from '../context/ThemeContext';
import { Palette } from 'lucide-react';

const themeColors = {
  dark: '#7c3aed',
  light: '#6366f1',
  glass: '#06b6d4',
  retro: '#e88c30',
};

export default function ThemeSwitcher() {
  const { currentTheme, setTheme, themes } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="themeSwitcher" ref={dropdownRef}>
      <button
        className="iconBtn"
        onClick={() => setIsOpen(prev => !prev)}
        title="Switch theme"
        id="btn-theme"
      >
        <Palette size={18} />
      </button>

      {isOpen && (
        <div className="themeDropdown" id="theme-dropdown">
          {themes.map(({ key, name }) => (
            <button
              key={key}
              className={`themeOption ${currentTheme === key ? 'active' : ''}`}
              onClick={() => {
                setTheme(key);
                setIsOpen(false);
              }}
              id={`theme-${key}`}
            >
              <div
                className="themeDot"
                style={{ backgroundColor: themeColors[key], borderColor: themeColors[key] }}
              />
              {name}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
