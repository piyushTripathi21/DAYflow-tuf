'use client';

import { useState, useEffect, useCallback } from 'react';
import { useCalendar } from '../context/CalendarContext';
import { useTheme } from '../context/ThemeContext';
import HeroImage from './HeroImage';
import CalendarGrid from './CalendarGrid';
import NotesPanel from './NotesPanel';
import MoodTracker from './MoodTracker';
import PomodoroTimer from './PomodoroTimer';
import Analytics from './Analytics';
import SearchModal from './SearchModal';
import ThemeSwitcher from './ThemeSwitcher';
import HolidayBanner from './HolidayBanner';
import { 
  Search, StickyNote, BarChart3, Timer, 
  Palette, Sparkles
} from 'lucide-react';

export default function CalendarApp() {
  const { activePanel, dispatch } = useCalendar();
  const [showSearch, setShowSearch] = useState(false);
  const [showPomodoro, setShowPomodoro] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        setShowSearch(prev => !prev);
      }
      if (e.key === 'Escape') {
        setShowSearch(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const togglePanel = useCallback((panel) => {
    dispatch({ type: 'SET_PANEL', payload: panel });
  }, [dispatch]);

  if (!mounted) {
    return (
      <div className="mainContainer" style={{ alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ 
          fontSize: '2rem', 
          animation: 'pulse 1.5s infinite',
          fontFamily: "'Playfair Display', serif"
        }}>
          Loading Dayflow...
        </div>
      </div>
    );
  }

  return (
    <div className="mainContainer">
      {/* Header */}
      <header className="appHeader" id="app-header">
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <Sparkles size={20} style={{ color: 'var(--accent-light)' }} />
          <h1 className="appTitle">Dayflow</h1>
        </div>
        <div className="headerActions">
          <button 
            className={`iconBtn ${activePanel === 'notes' ? 'active' : ''}`}
            onClick={() => togglePanel('notes')}
            title="Notes"
            id="btn-notes"
          >
            <StickyNote size={18} />
          </button>
          <button 
            className={`iconBtn ${activePanel === 'mood' ? 'active' : ''}`}
            onClick={() => togglePanel('mood')}
            title="Mood Tracker"
            id="btn-mood"
          >
            <span style={{ fontSize: '16px' }}>😊</span>
          </button>
          <button 
            className={`iconBtn ${showPomodoro ? 'active' : ''}`}
            onClick={() => setShowPomodoro(prev => !prev)}
            title="Pomodoro Timer"
            id="btn-pomodoro"
          >
            <Timer size={18} />
          </button>
          <button 
            className={`iconBtn ${activePanel === 'analytics' ? 'active' : ''}`}
            onClick={() => togglePanel('analytics')}
            title="Analytics"
            id="btn-analytics"
          >
            <BarChart3 size={18} />
          </button>
          <button 
            className="iconBtn"
            onClick={() => setShowSearch(true)}
            title="Search notes (Ctrl+K)"
            id="btn-search"
          >
            <Search size={18} />
          </button>
          <ThemeSwitcher />
        </div>
      </header>

      {/* Main Calendar Layout */}
      <div className="calendarLayout" id="calendar-layout">
        {/* Left Column: Hero Image + Holiday Banner + Extra Panels */}
        <div className="calendarLeft">
          <HeroImage />
          <HolidayBanner />
          
          {activePanel === 'notes' && <NotesPanel />}
          {activePanel === 'mood' && <MoodTracker />}
          {activePanel === 'analytics' && <Analytics />}
        </div>

        {/* Right Column: Calendar Grid */}
        <div className="calendarRight">
          <CalendarGrid />
        </div>
      </div>

      {/* Floating Widgets */}
      {showPomodoro && (
        <PomodoroTimer onClose={() => setShowPomodoro(false)} />
      )}

      {/* Search Modal */}
      {showSearch && (
        <SearchModal onClose={() => setShowSearch(false)} />
      )}
    </div>
  );
}
