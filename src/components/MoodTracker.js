'use client';

import { useMemo } from 'react';
import { useCalendar } from '../context/CalendarContext';
import { dateKey, generateCalendarDays, MONTH_NAMES } from '../utils/dateUtils';
import { X } from 'lucide-react';

const MOODS = [
  { emoji: '😡', label: 'Angry', color: '#ef4444' },
  { emoji: '😢', label: 'Sad', color: '#3b82f6' },
  { emoji: '😐', label: 'Neutral', color: '#6b7280' },
  { emoji: '😊', label: 'Happy', color: '#10b981' },
  { emoji: '🤩', label: 'Ecstatic', color: '#f59e0b' },
];

export default function MoodTracker() {
  const { 
    currentMonth, currentYear, selectedStart, 
    moods, setMood, dispatch 
  } = useCalendar();

  const targetDate = selectedStart || { 
    year: currentYear, month: currentMonth, day: new Date().getDate() 
  };
  const key = dateKey(targetDate.year, targetDate.month, targetDate.day);
  const currentMood = moods[key] || null;

  const weeks = useMemo(
    () => generateCalendarDays(currentYear, currentMonth),
    [currentYear, currentMonth]
  );

  const handleMoodSelect = (moodIdx) => {
    setMood(targetDate.year, targetDate.month, targetDate.day, moodIdx);
  };

  return (
    <div className="moodSection" id="mood-tracker">
      <div className="moodHeader">
        <h2 className="moodTitle">😊 Mood Tracker</h2>
        <button
          className="iconBtn"
          onClick={() => dispatch({ type: 'CLOSE_PANEL' })}
          title="Close"
          style={{ width: '32px', height: '32px' }}
        >
          <X size={14} />
        </button>
      </div>

      {/* Date display */}
      <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '12px', textAlign: 'center' }}>
        How are you feeling on <strong style={{ color: 'var(--accent-light)' }}>
          {MONTH_NAMES[targetDate.month]} {targetDate.day}
        </strong>?
      </div>

      {/* Mood Picker */}
      <div className="moodPicker">
        {MOODS.map((mood, idx) => (
          <button
            key={idx}
            className={`moodBtn ${currentMood === idx ? 'active' : ''}`}
            onClick={() => handleMoodSelect(idx)}
            title={mood.label}
            id={`mood-btn-${idx}`}
          >
            {mood.emoji}
          </button>
        ))}
      </div>

      {/* Monthly Mood Heatmap */}
      <div style={{ marginTop: '8px' }}>
        <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '8px', fontWeight: '600', letterSpacing: '0.5px', textTransform: 'uppercase' }}>
          {MONTH_NAMES[currentMonth]} Mood Map
        </div>
        <div className="moodHeatmap">
          {weeks.flat().filter(d => d.isCurrentMonth).map((dayData) => {
            const k = dateKey(dayData.year, dayData.month, dayData.day);
            const moodIdx = moods[k];
            const mood = moodIdx !== undefined && moodIdx !== null ? MOODS[moodIdx] : null;
            
            return (
              <div
                key={dayData.day}
                className={`moodCell ${mood ? 'filled' : ''}`}
                style={{
                  backgroundColor: mood ? `${mood.color}30` : undefined,
                  borderLeft: mood ? `2px solid ${mood.color}` : undefined,
                }}
                title={`${dayData.day} ${MONTH_NAMES[currentMonth]}: ${mood ? mood.label : 'No mood logged'}`}
              >
                {mood ? mood.emoji : ''}
              </div>
            );
          })}
        </div>

        {/* Legend */}
        <div className="moodLegend">
          {MOODS.map((mood, idx) => (
            <div key={idx} className="moodLegendItem">
              <span>{mood.emoji}</span>
              <span>{mood.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
