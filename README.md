# Dayflow - Interactive Calendar Component

An interactive wall calendar built with Next.js for the Frontend Engineering Challenge.

## How to Run

```bash
git clone https://github.com/piyushTripathi21/DAYflow-tuf.git
cd DAYflow-tuf
npm install
npm run dev
```

Then open http://localhost:3000 in your browser.

## What I Built

I went for a wall calendar look — there's a big seasonal hero image on the left that changes based on the month (spring, summer, autumn, winter), and the calendar grid sits on the right side. On mobile it stacks vertically.

### Core Features

- **Date range selection** — click a start date, then an end date. The range highlights in between with different colors for start, end, and middle dates. There's also a hover preview while selecting.
- **Notes** — each date can have multiple notes. You can pin important ones and delete old ones. Notes persist in localStorage so they survive page reloads.
- **Responsive layout** — desktop is side-by-side, tablet/mobile is stacked. Tested down to 380px width.

### Extra Features I Added

- **Mood tracker** — log how you're feeling each day with emojis, and see a monthly heatmap of your moods
- **Pomodoro timer** — a floating 25/5 focus timer with a circular progress ring. It plays a beep when done and logs sessions per date
- **Theme switching** — 4 themes (dark, light, glassmorphism, retro). Uses CSS custom properties so switching is instant with no re-renders
- **Holiday markers** — shows Indian public holidays on the calendar with emoji badges and tooltips. Also has a countdown banner to the next holiday
- **Search** — press Ctrl+K to search across all your notes from any month
- **Analytics** — a small dashboard showing notes count, focus time, mood streaks etc. for the current month
- **Flip animation** — 3D page-turn effect when you navigate between months

## Tech Choices

- **Next.js (App Router)** — since the assignment asked for React/Next.js
- **Vanilla CSS with CSS variables** — I avoided Tailwind/styled-components because CSS custom properties let me do instant theme switching without any JS re-renders. All the design tokens (colors, spacing, shadows) are defined as variables
- **React Context + useReducer** — the date selection logic is basically a state machine (idle → selecting → range complete), so useReducer felt more natural than a bunch of useState calls
- **localStorage** — for saving notes, moods, and pomodoro sessions. No backend needed
- **Lucide React** — lightweight icon library, much smaller than Font Awesome
- **Google Fonts (Inter + Playfair Display)** — Inter for UI text, Playfair for headings to give it that premium calendar feel

## Project Structure

```
src/
├── app/              → layout, page, global styles
├── components/       → all UI components (CalendarGrid, NotesPanel, MoodTracker, etc.)
├── context/          → CalendarContext (state) + ThemeContext (themes)
├── hooks/            → useLocalStorage custom hook
└── utils/            → date helpers, holiday data
```

## Responsive Breakpoints

- Desktop (>968px): two-column layout
- Tablet (640-968px): single column
- Mobile (<640px): compact with smaller fonts and padding
