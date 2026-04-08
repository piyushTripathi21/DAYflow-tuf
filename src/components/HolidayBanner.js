'use client';

import { useMemo } from 'react';
import { getNextHoliday } from '../utils/holidays';

export default function HolidayBanner() {
  const holiday = useMemo(() => getNextHoliday(), []);

  if (!holiday) return null;

  return (
    <div className="holidayBanner" id="holiday-banner">
      <span className="emoji">{holiday.emoji}</span>
      <div style={{ flex: 1 }}>
        <div style={{ fontWeight: '600' }}>{holiday.name}</div>
        <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
          {holiday.daysUntil === 0
            ? '🎉 Today!'
            : holiday.daysUntil === 1
            ? 'Tomorrow!'
            : <>in <span className="countdown">{holiday.daysUntil} days</span></>
          }
        </div>
      </div>
    </div>
  );
}
