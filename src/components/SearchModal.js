'use client';

import { useState, useMemo, useRef, useEffect } from 'react';
import { useCalendar } from '../context/CalendarContext';
import { MONTH_NAMES } from '../utils/dateUtils';
import { Search, X } from 'lucide-react';

export default function SearchModal({ onClose }) {
  const { notes, dispatch } = useCalendar();
  const [query, setQuery] = useState('');
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const results = useMemo(() => {
    if (!query.trim()) return [];
    const q = query.toLowerCase();
    const matches = [];

    for (const [key, noteList] of Object.entries(notes)) {
      for (const note of noteList) {
        if (note.text.toLowerCase().includes(q)) {
          const parts = key.split('-');
          const year = parseInt(parts[0]);
          const month = parseInt(parts[1]) - 1;
          const day = parseInt(parts[2]);
          matches.push({
            key,
            note,
            year,
            month,
            day,
            dateStr: `${MONTH_NAMES[month]} ${day}, ${year}`,
          });
        }
      }
    }

    return matches.sort((a, b) => b.note.id - a.note.id).slice(0, 20);
  }, [query, notes]);

  const handleResultClick = (result) => {
    dispatch({
      type: 'SET_MONTH',
      payload: { month: result.month, year: result.year },
    });
    dispatch({
      type: 'SELECT_DATE',
      payload: { year: result.year, month: result.month, day: result.day },
    });
    dispatch({ type: 'SET_PANEL', payload: 'notes' });
    onClose();
  };

  const highlightMatch = (text) => {
    if (!query.trim()) return text;
    const regex = new RegExp(`(${query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
    const parts = text.split(regex);
    return parts.map((part, i) =>
      regex.test(part) ? <mark key={i}>{part}</mark> : part
    );
  };

  return (
    <div className="searchOverlay" onClick={onClose} id="search-overlay">
      <div className="searchModal" onClick={(e) => e.stopPropagation()}>
        <div className="searchInputWrap">
          <Search size={18} style={{ color: 'var(--text-muted)', flexShrink: 0 }} />
          <input
            ref={inputRef}
            className="searchInput"
            type="text"
            placeholder="Search across all notes..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            id="search-input"
          />
          <span className="searchKbd" onClick={onClose} style={{ cursor: 'pointer' }}>ESC</span>
        </div>

        <div className="searchResults">
          {query.trim() === '' ? (
            <div className="searchEmpty">
              <div style={{ fontSize: '2rem', marginBottom: '8px' }}>🔍</div>
              <div>Type to search across all your notes</div>
              <div style={{ fontSize: '0.75rem', marginTop: '4px', color: 'var(--text-muted)' }}>
                Tip: Use Ctrl+K to open search anytime
              </div>
            </div>
          ) : results.length === 0 ? (
            <div className="searchEmpty">
              <div style={{ fontSize: '2rem', marginBottom: '8px' }}>😕</div>
              <div>No notes found matching &quot;{query}&quot;</div>
            </div>
          ) : (
            results.map((result, idx) => (
              <div
                key={`${result.key}-${result.note.id}`}
                className="searchResultItem"
                onClick={() => handleResultClick(result)}
                style={{ animationDelay: `${idx * 50}ms` }}
              >
                <div className="searchResultDate">{result.dateStr}</div>
                <div className="searchResultText">{highlightMatch(result.note.text)}</div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
