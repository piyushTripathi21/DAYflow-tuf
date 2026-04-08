'use client';

import { useMemo } from 'react';
import { useCalendar } from '../context/CalendarContext';
import { dateKey, getDaysInMonth, MONTH_NAMES } from '../utils/dateUtils';
import { X } from 'lucide-react';

const MOODS = ['😡', '😢', '😐', '😊', '🤩'];

export default function Analytics() {
  const { currentMonth, currentYear, notes, moods, pomodoroSessions, dispatch } = useCalendar();
  const daysInMonth = getDaysInMonth(currentYear, currentMonth);

  const stats = useMemo(() => {
    let totalNotes = 0;
    let totalSessions = 0;
    const moodCounts = [0, 0, 0, 0, 0];
    let daysWithMood = 0;
    let streak = 0;
    let maxStreak = 0;

    for (let d = 1; d <= daysInMonth; d++) {
      const key = dateKey(currentYear, currentMonth, d);
      
      // Notes
      if (notes[key]) totalNotes += notes[key].length;
      
      // Pomodoro
      if (pomodoroSessions[key]) totalSessions += pomodoroSessions[key];
      
      // Moods
      if (moods[key] !== undefined && moods[key] !== null) {
        moodCounts[moods[key]]++;
        daysWithMood++;
        streak++;
        if (streak > maxStreak) maxStreak = streak;
      } else {
        streak = 0;
      }
    }

    const dominantMood = moodCounts.indexOf(Math.max(...moodCounts));
    const focusHours = Math.round((totalSessions * 25) / 60 * 10) / 10;

    return { totalNotes, totalSessions, moodCounts, daysWithMood, maxStreak, dominantMood, focusHours };
  }, [currentMonth, currentYear, notes, moods, pomodoroSessions, daysInMonth]);

  return (
    <div className="analyticsSection" id="analytics-panel">
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
        <h2 className="analyticsTitle" style={{ marginBottom: 0 }}>
          📊 {MONTH_NAMES[currentMonth]} Analytics
        </h2>
        <button
          className="iconBtn"
          onClick={() => dispatch({ type: 'CLOSE_PANEL' })}
          title="Close"
          style={{ width: '32px', height: '32px' }}
        >
          <X size={14} />
        </button>
      </div>

      <div className="statsGrid">
        <div className="statCard">
          <div className="statEmoji">📝</div>
          <div className="statValue">{stats.totalNotes}</div>
          <div className="statLabel">Notes</div>
        </div>
        <div className="statCard">
          <div className="statEmoji">🍅</div>
          <div className="statValue">{stats.totalSessions}</div>
          <div className="statLabel">Focus Sessions</div>
        </div>
        <div className="statCard">
          <div className="statEmoji">⏱️</div>
          <div className="statValue">{stats.focusHours}h</div>
          <div className="statLabel">Focus Time</div>
        </div>
        <div className="statCard">
          <div className="statEmoji">{stats.daysWithMood > 0 ? MOODS[stats.dominantMood] : '—'}</div>
          <div className="statValue">{stats.daysWithMood}</div>
          <div className="statLabel">Moods Logged</div>
        </div>
        <div className="statCard">
          <div className="statEmoji">🔥</div>
          <div className="statValue">{stats.maxStreak}</div>
          <div className="statLabel">Best Streak</div>
        </div>
        <div className="statCard">
          <div className="statEmoji">📅</div>
          <div className="statValue">{daysInMonth}</div>
          <div className="statLabel">Days in Month</div>
        </div>
      </div>

      {/* Mood Distribution Bar */}
      {stats.daysWithMood > 0 && (
        <div style={{ marginTop: '20px' }}>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '8px', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
            Mood Distribution
          </div>
          <div style={{ display: 'flex', gap: '4px', height: '32px', borderRadius: 'var(--radius-md)', overflow: 'hidden' }}>
            {stats.moodCounts.map((count, idx) => {
              if (count === 0) return null;
              const pct = (count / stats.daysWithMood) * 100;
              const colors = ['#ef4444', '#3b82f6', '#6b7280', '#10b981', '#f59e0b'];
              return (
                <div
                  key={idx}
                  style={{
                    flex: pct,
                    background: colors[idx],
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '0.75rem',
                    color: 'white',
                    fontWeight: '600',
                    transition: 'flex 0.5s ease',
                    minWidth: count > 0 ? '24px' : 0,
                  }}
                  title={`${MOODS[idx]} ${count} day${count > 1 ? 's' : ''} (${Math.round(pct)}%)`}
                >
                  {pct > 15 ? MOODS[idx] : ''}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
