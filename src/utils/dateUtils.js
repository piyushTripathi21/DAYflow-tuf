/**
 * Date utility functions for the calendar component
 */

export const MONTH_NAMES = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

export const DAY_NAMES = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

export const DAY_NAMES_SHORT = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

/**
 * Get the number of days in a month
 */
export function getDaysInMonth(year, month) {
  return new Date(year, month + 1, 0).getDate();
}

/**
 * Get the day of the week the month starts on (0 = Sunday)
 */
export function getFirstDayOfMonth(year, month) {
  return new Date(year, month, 1).getDay();
}

/**
 * Generate calendar grid data for a month
 * Returns array of weeks, each containing 7 day objects
 */
export function generateCalendarDays(year, month) {
  const daysInMonth = getDaysInMonth(year, month);
  const firstDay = getFirstDayOfMonth(year, month);
  const daysInPrevMonth = getDaysInMonth(year, month - 1);
  
  const days = [];
  
  // Previous month's trailing days
  for (let i = firstDay - 1; i >= 0; i--) {
    days.push({
      day: daysInPrevMonth - i,
      month: month - 1,
      year: month === 0 ? year - 1 : year,
      isCurrentMonth: false,
      isPrevMonth: true,
      isNextMonth: false,
    });
  }
  
  // Current month's days
  for (let i = 1; i <= daysInMonth; i++) {
    days.push({
      day: i,
      month,
      year,
      isCurrentMonth: true,
      isPrevMonth: false,
      isNextMonth: false,
    });
  }
  
  // Next month's leading days
  const remaining = 42 - days.length; // 6 rows × 7 days
  for (let i = 1; i <= remaining; i++) {
    days.push({
      day: i,
      month: month + 1,
      year: month === 11 ? year + 1 : year,
      isCurrentMonth: false,
      isPrevMonth: false,
      isNextMonth: true,
    });
  }
  
  // Group into weeks
  const weeks = [];
  for (let i = 0; i < days.length; i += 7) {
    weeks.push(days.slice(i, i + 7));
  }
  
  return weeks;
}

/**
 * Create a date key string for storage (YYYY-MM-DD)
 */
export function dateKey(year, month, day) {
  return `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
}

/**
 * Check if two dates are the same
 */
export function isSameDate(d1, d2) {
  if (!d1 || !d2) return false;
  return d1.year === d2.year && d1.month === d2.month && d1.day === d2.day;
}

/**
 * Check if a date is between two dates (inclusive)
 */
export function isDateInRange(date, start, end) {
  if (!start || !end) return false;
  const d = new Date(date.year, date.month, date.day);
  const s = new Date(start.year, start.month, start.day);
  const e = new Date(end.year, end.month, end.day);
  return d >= s && d <= e;
}

/**
 * Check if a date is today
 */
export function isToday(year, month, day) {
  const today = new Date();
  return today.getFullYear() === year && today.getMonth() === month && today.getDate() === day;
}

/**
 * Get season for a month (0-indexed)
 */
export function getSeason(month) {
  if (month >= 2 && month <= 4) return 'spring';
  if (month >= 5 && month <= 7) return 'summer';
  if (month >= 8 && month <= 10) return 'autumn';
  return 'winter';
}

/**
 * Format date range as readable string
 */
export function formatDateRange(start, end) {
  if (!start) return '';
  const startStr = `${MONTH_NAMES[start.month]} ${start.day}, ${start.year}`;
  if (!end || isSameDate(start, end)) return startStr;
  const endStr = start.month === end.month && start.year === end.year
    ? `${end.day}, ${end.year}`
    : `${MONTH_NAMES[end.month]} ${end.day}, ${end.year}`;
  return `${MONTH_NAMES[start.month]} ${start.day} — ${endStr}`;
}

/**
 * Compare two date objects, return -1, 0, or 1
 */
export function compareDates(d1, d2) {
  const a = new Date(d1.year, d1.month, d1.day);
  const b = new Date(d2.year, d2.month, d2.day);
  if (a < b) return -1;
  if (a > b) return 1;
  return 0;
}
