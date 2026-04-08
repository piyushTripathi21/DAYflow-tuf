'use client';

import { CalendarProvider } from '../context/CalendarContext';
import { ThemeProvider } from '../context/ThemeContext';
import CalendarApp from '../components/CalendarApp';

export default function Home() {
  return (
    <ThemeProvider>
      <CalendarProvider>
        <CalendarApp />
      </CalendarProvider>
    </ThemeProvider>
  );
}
