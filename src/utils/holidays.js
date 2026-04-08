/**
 * Indian Public Holidays for 2025-2027
 * Includes national holidays and major festivals
 */

const holidays = {
  // 2025
  '2025-01-01': { name: 'New Year\'s Day', emoji: '🎉', type: 'national' },
  '2025-01-14': { name: 'Makar Sankranti', emoji: '🪁', type: 'festival' },
  '2025-01-26': { name: 'Republic Day', emoji: '🇮🇳', type: 'national' },
  '2025-03-14': { name: 'Holi', emoji: '🎨', type: 'festival' },
  '2025-03-31': { name: 'Eid ul-Fitr', emoji: '🌙', type: 'festival' },
  '2025-04-06': { name: 'Ram Navami', emoji: '🙏', type: 'festival' },
  '2025-04-10': { name: 'Mahavir Jayanti', emoji: '🕉️', type: 'festival' },
  '2025-04-14': { name: 'Ambedkar Jayanti', emoji: '📘', type: 'national' },
  '2025-04-18': { name: 'Good Friday', emoji: '✝️', type: 'festival' },
  '2025-05-01': { name: 'May Day', emoji: '👷', type: 'national' },
  '2025-05-12': { name: 'Buddha Purnima', emoji: '🧘', type: 'festival' },
  '2025-06-07': { name: 'Eid ul-Adha', emoji: '🌙', type: 'festival' },
  '2025-08-15': { name: 'Independence Day', emoji: '🇮🇳', type: 'national' },
  '2025-08-16': { name: 'Janmashtami', emoji: '🪈', type: 'festival' },
  '2025-08-27': { name: 'Ganesh Chaturthi', emoji: '🐘', type: 'festival' },
  '2025-10-02': { name: 'Gandhi Jayanti', emoji: '🕊️', type: 'national' },
  '2025-10-02': { name: 'Dussehra', emoji: '🏹', type: 'festival' },
  '2025-10-20': { name: 'Diwali', emoji: '🪔', type: 'festival' },
  '2025-11-05': { name: 'Guru Nanak Jayanti', emoji: '🙏', type: 'festival' },
  '2025-12-25': { name: 'Christmas', emoji: '🎄', type: 'festival' },
  
  // 2026
  '2026-01-01': { name: 'New Year\'s Day', emoji: '🎉', type: 'national' },
  '2026-01-14': { name: 'Makar Sankranti', emoji: '🪁', type: 'festival' },
  '2026-01-26': { name: 'Republic Day', emoji: '🇮🇳', type: 'national' },
  '2026-03-03': { name: 'Holi', emoji: '🎨', type: 'festival' },
  '2026-03-20': { name: 'Eid ul-Fitr', emoji: '🌙', type: 'festival' },
  '2026-03-26': { name: 'Ram Navami', emoji: '🙏', type: 'festival' },
  '2026-03-31': { name: 'Mahavir Jayanti', emoji: '🕉️', type: 'festival' },
  '2026-04-03': { name: 'Good Friday', emoji: '✝️', type: 'festival' },
  '2026-04-14': { name: 'Ambedkar Jayanti', emoji: '📘', type: 'national' },
  '2026-05-01': { name: 'May Day', emoji: '👷', type: 'national' },
  '2026-05-31': { name: 'Buddha Purnima', emoji: '🧘', type: 'festival' },
  '2026-05-27': { name: 'Eid ul-Adha', emoji: '🌙', type: 'festival' },
  '2026-08-15': { name: 'Independence Day', emoji: '🇮🇳', type: 'national' },
  '2026-08-06': { name: 'Janmashtami', emoji: '🪈', type: 'festival' },
  '2026-08-17': { name: 'Ganesh Chaturthi', emoji: '🐘', type: 'festival' },
  '2026-09-21': { name: 'Dussehra', emoji: '🏹', type: 'festival' },
  '2026-10-02': { name: 'Gandhi Jayanti', emoji: '🕊️', type: 'national' },
  '2026-10-09': { name: 'Diwali', emoji: '🪔', type: 'festival' },
  '2026-10-25': { name: 'Guru Nanak Jayanti', emoji: '🙏', type: 'festival' },
  '2026-12-25': { name: 'Christmas', emoji: '🎄', type: 'festival' },

  // 2027
  '2027-01-01': { name: 'New Year\'s Day', emoji: '🎉', type: 'national' },
  '2027-01-14': { name: 'Makar Sankranti', emoji: '🪁', type: 'festival' },
  '2027-01-26': { name: 'Republic Day', emoji: '🇮🇳', type: 'national' },
  '2027-03-22': { name: 'Holi', emoji: '🎨', type: 'festival' },
  '2027-04-14': { name: 'Ambedkar Jayanti', emoji: '📘', type: 'national' },
  '2027-08-15': { name: 'Independence Day', emoji: '🇮🇳', type: 'national' },
  '2027-10-02': { name: 'Gandhi Jayanti', emoji: '🕊️', type: 'national' },
  '2027-12-25': { name: 'Christmas', emoji: '🎄', type: 'festival' },
};

/**
 * Get holiday info for a date
 */
export function getHoliday(year, month, day) {
  const key = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
  return holidays[key] || null;
}

/**
 * Get all holidays for a given month
 */
export function getMonthHolidays(year, month) {
  const prefix = `${year}-${String(month + 1).padStart(2, '0')}`;
  return Object.entries(holidays)
    .filter(([key]) => key.startsWith(prefix))
    .map(([key, val]) => ({
      ...val,
      date: key,
      day: parseInt(key.split('-')[2]),
    }));
}

/**
 * Get the next upcoming holiday from today
 */
export function getNextHoliday() {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  let closest = null;
  let closestDate = null;
  
  for (const [key, val] of Object.entries(holidays)) {
    const d = new Date(key + 'T00:00:00');
    if (d >= today) {
      if (!closestDate || d < closestDate) {
        closestDate = d;
        closest = { ...val, date: key, dateObj: d };
      }
    }
  }
  
  if (closest) {
    const diff = Math.ceil((closestDate - today) / (1000 * 60 * 60 * 24));
    closest.daysUntil = diff;
  }
  
  return closest;
}
