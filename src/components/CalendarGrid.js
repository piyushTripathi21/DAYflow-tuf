'use client';

import { useMemo, useState, useCallback } from 'react';
import { useCalendar } from '../context/CalendarContext';
import { 
  generateCalendarDays, MONTH_NAMES, DAY_NAMES,
  isToday, isSameDate, isDateInRange, dateKey, compareDates,
  formatDateRange
} from '../utils/dateUtils';
import { getHoliday } from '../utils/holidays';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';

export default function CalendarGrid() {
  const {
    currentMonth, currentYear, selectedStart, selectedEnd,
    isSelectingRange, hoveredDate, dispatch,
    notes, moods, pomodoroSessions
  } = useCalendar();

  const [tooltipDay, setTooltipDay] = useState(null);

  const weeks = useMemo(
    () => generateCalendarDays(currentYear, currentMonth),
    [currentYear, currentMonth]
  );

  const handleDayClick = useCallback((dayData) => {
    dispatch({
      type: 'SELECT_DATE',
      payload: { year: dayData.year, month: dayData.month, day: dayData.day }
    });
  }, [dispatch]);

  const handleDayHover = useCallback((dayData) => {
    dispatch({ type: 'SET_HOVERED', payload: dayData ? { year: dayData.year, month: dayData.month, day: dayData.day } : null });
  }, [dispatch]);

  const getPreviewEnd = useCallback(() => {
    if (isSelectingRange && selectedStart && hoveredDate) {
      const cmp = compareDates(selectedStart, hoveredDate);
      return cmp <= 0 ? hoveredDate : null;
    }
    return null;
  }, [isSelectingRange, selectedStart, hoveredDate]);

  const previewEnd = getPreviewEnd();

  return (
    <div className="calendarCard" id="calendar-grid">
      {/* Navigation */}
      <div className="calendarNav">
        <button
          className="navBtn"
          onClick={() => dispatch({ type: 'PREV_MONTH' })}
          aria-label="Previous month"
          id="btn-prev-month"
        >
          <ChevronLeft size={18} />
        </button>
        <div className="calendarNavTitle">
          {MONTH_NAMES[currentMonth]} {currentYear}
        </div>
        <button
          className="navBtn"
          onClick={() => dispatch({ type: 'NEXT_MONTH' })}
          aria-label="Next month"
          id="btn-next-month"
        >
          <ChevronRight size={18} />
        </button>
      </div>

      {/* Day Headers */}
      <div className="dayHeaders">
        {DAY_NAMES.map((name) => (
          <div key={name} className="dayHeader">{name}</div>
        ))}
      </div>

      {/* Weeks Grid */}
      <div className="weeksGrid">
        {weeks.map((week, wi) => (
          <div key={wi} className="weekRow">
            {week.map((dayData, di) => {
              const key = dateKey(dayData.year, dayData.month, dayData.day);
              const today = isToday(dayData.year, dayData.month, dayData.day);
              const holiday = dayData.isCurrentMonth ? getHoliday(dayData.year, dayData.month, dayData.day) : null;
              const dateObj = { year: dayData.year, month: dayData.month, day: dayData.day };

              const isStart = isSameDate(dateObj, selectedStart);
              const isEnd = isSameDate(dateObj, selectedEnd);
              const isSelected = isStart || isEnd;

              // In range (confirmed or preview)
              let inRange = false;
              if (selectedStart && selectedEnd) {
                inRange = isDateInRange(dateObj, selectedStart, selectedEnd);
              } else if (selectedStart && previewEnd) {
                inRange = isDateInRange(dateObj, selectedStart, previewEnd);
              }

              const hasNote = notes[key] && notes[key].length > 0;
              const hasMood = !!moods[key];
              const hasPomodoro = pomodoroSessions[key] > 0;

              let className = 'dayCell';
              if (!dayData.isCurrentMonth) className += ' otherMonth';
              if (today) className += ' today';
              if (isSelected) className += ' selected';
              if (inRange && !isSelected) className += ' inRange';
              if (isStart && selectedEnd) className += ' rangeStart';
              if (isEnd && selectedStart) className += ' rangeEnd';
              if (holiday && !isSelected) className += ' holiday';

              return (
                <div
                  key={`${wi}-${di}`}
                  className={className}
                  onClick={() => handleDayClick(dayData)}
                  onMouseEnter={() => {
                    handleDayHover(dayData);
                    if (holiday) setTooltipDay(key);
                  }}
                  onMouseLeave={() => {
                    handleDayHover(null);
                    setTooltipDay(null);
                  }}
                  id={`day-${key}`}
                  role="button"
                  tabIndex={0}
                  aria-label={`${dayData.day} ${MONTH_NAMES[dayData.month]} ${dayData.year}${holiday ? ` - ${holiday.name}` : ''}`}
                >
                  <span className="dayCellNumber">{dayData.day}</span>
                  
                  {/* Holiday emoji */}
                  {holiday && (
                    <span className="holidayEmoji">{holiday.emoji}</span>
                  )}

                  {/* Indicator dots */}
                  {dayData.isCurrentMonth && (hasNote || hasMood || hasPomodoro) && (
                    <div className="dayCellIndicators">
                      {hasNote && <span className="indicator note" />}
                      {hasMood && <span className="indicator mood" />}
                      {hasPomodoro && <span className="indicator pomodoro" />}
                    </div>
                  )}

                  {/* Holiday tooltip */}
                  {holiday && tooltipDay === key && (
                    <div className="holidayTooltip">
                      {holiday.emoji} {holiday.name}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        ))}
      </div>

      {/* Selection Info Bar */}
      {selectedStart && (
        <div className="selectionBar" id="selection-bar">
          <div>
            <span style={{ color: 'var(--text-muted)' }}>Selected: </span>
            <span className="rangeText">
              {formatDateRange(selectedStart, selectedEnd)}
            </span>
            {isSelectingRange && (
              <span style={{ color: 'var(--text-muted)', marginLeft: '8px', fontSize: '0.75rem' }}>
                Click another date to complete range
              </span>
            )}
          </div>
          <button
            className="clearBtn"
            onClick={() => dispatch({ type: 'CLEAR_SELECTION' })}
            id="btn-clear-selection"
          >
            <X size={12} /> Clear
          </button>
        </div>
      )}
    </div>
  );
}
