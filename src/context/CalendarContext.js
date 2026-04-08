'use client';
import { createContext, useContext, useReducer, useCallback, useEffect } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { compareDates, dateKey } from '../utils/dateUtils';

const CalendarContext = createContext(null);

const initialState = {
  currentMonth: new Date().getMonth(),
  currentYear: new Date().getFullYear(),
  selectedStart: null,
  selectedEnd: null,
  isSelectingRange: false,
  hoveredDate: null,
  activePanel: null, // 'notes', 'mood', 'pomodoro', 'analytics', 'search'
  flipDirection: null, // 'next' or 'prev'
  isFlipping: false,
};

function calendarReducer(state, action) {
  switch (action.type) {
    case 'SET_MONTH': {
      const direction = action.payload.month > state.currentMonth || 
        (action.payload.year > state.currentYear) ? 'next' : 'prev';
      return {
        ...state,
        currentMonth: action.payload.month,
        currentYear: action.payload.year,
        flipDirection: direction,
        isFlipping: true,
      };
    }
    case 'NEXT_MONTH': {
      let newMonth = state.currentMonth + 1;
      let newYear = state.currentYear;
      if (newMonth > 11) { newMonth = 0; newYear++; }
      return { ...state, currentMonth: newMonth, currentYear: newYear, flipDirection: 'next', isFlipping: true };
    }
    case 'PREV_MONTH': {
      let newMonth = state.currentMonth - 1;
      let newYear = state.currentYear;
      if (newMonth < 0) { newMonth = 11; newYear--; }
      return { ...state, currentMonth: newMonth, currentYear: newYear, flipDirection: 'prev', isFlipping: true };
    }
    case 'FLIP_DONE':
      return { ...state, isFlipping: false };
    case 'SELECT_DATE': {
      const date = action.payload;
      if (!state.selectedStart || (state.selectedStart && state.selectedEnd)) {
        // Start new selection
        return { ...state, selectedStart: date, selectedEnd: null, isSelectingRange: true };
      }
      // Complete range
      const cmp = compareDates(state.selectedStart, date);
      if (cmp <= 0) {
        return { ...state, selectedEnd: date, isSelectingRange: false };
      } else {
        return { ...state, selectedStart: date, selectedEnd: state.selectedStart, isSelectingRange: false };
      }
    }
    case 'CLEAR_SELECTION':
      return { ...state, selectedStart: null, selectedEnd: null, isSelectingRange: false };
    case 'SET_HOVERED':
      return { ...state, hoveredDate: action.payload };
    case 'SET_PANEL':
      return { ...state, activePanel: state.activePanel === action.payload ? null : action.payload };
    case 'CLOSE_PANEL':
      return { ...state, activePanel: null };
    default:
      return state;
  }
}

export function CalendarProvider({ children }) {
  const [state, dispatch] = useReducer(calendarReducer, initialState);
  const [notes, setNotes] = useLocalStorage('calendar-notes', {});
  const [moods, setMoods] = useLocalStorage('calendar-moods', {});
  const [pomodoroSessions, setPomodoroSessions] = useLocalStorage('calendar-pomodoro', {});

  // Auto-clear flip animation
  useEffect(() => {
    if (state.isFlipping) {
      const timer = setTimeout(() => dispatch({ type: 'FLIP_DONE' }), 600);
      return () => clearTimeout(timer);
    }
  }, [state.isFlipping]);

  const addNote = useCallback((year, month, day, note) => {
    const key = dateKey(year, month, day);
    setNotes(prev => ({
      ...prev,
      [key]: [...(prev[key] || []), { id: Date.now(), text: note, createdAt: new Date().toISOString(), pinned: false }]
    }));
  }, [setNotes]);

  const updateNote = useCallback((year, month, day, noteId, updates) => {
    const key = dateKey(year, month, day);
    setNotes(prev => ({
      ...prev,
      [key]: (prev[key] || []).map(n => n.id === noteId ? { ...n, ...updates } : n)
    }));
  }, [setNotes]);

  const deleteNote = useCallback((year, month, day, noteId) => {
    const key = dateKey(year, month, day);
    setNotes(prev => ({
      ...prev,
      [key]: (prev[key] || []).filter(n => n.id !== noteId)
    }));
  }, [setNotes]);

  const setMood = useCallback((year, month, day, mood) => {
    const key = dateKey(year, month, day);
    setMoods(prev => ({ ...prev, [key]: mood }));
  }, [setMoods]);

  const addPomodoroSession = useCallback((year, month, day) => {
    const key = dateKey(year, month, day);
    setPomodoroSessions(prev => ({
      ...prev,
      [key]: (prev[key] || 0) + 1
    }));
  }, [setPomodoroSessions]);

  const value = {
    ...state,
    dispatch,
    notes,
    moods,
    pomodoroSessions,
    addNote,
    updateNote,
    deleteNote,
    setMood,
    addPomodoroSession,
  };

  return (
    <CalendarContext.Provider value={value}>
      {children}
    </CalendarContext.Provider>
  );
}

export function useCalendar() {
  const context = useContext(CalendarContext);
  if (!context) throw new Error('useCalendar must be used within CalendarProvider');
  return context;
}
