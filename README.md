# 📅 Chronos — Interactive Calendar Component

A premium, feature-rich interactive wall calendar built with **Next.js 14**, designed as a frontend engineering challenge submission.

![Calendar Preview](./docs/preview.png)

## ✨ Features

### Core Requirements
- **🖼️ Wall Calendar Aesthetic** — Beautiful seasonal hero images with a physical calendar feel
- **📆 Day Range Selector** — Click-to-select date ranges with visual start/end/in-between states and hover preview
- **📝 Integrated Notes** — Per-date notes with pin, delete, and keyboard shortcuts (Enter to save)
- **📱 Fully Responsive** — Desktop (side-by-side panels) → Mobile (stacked, touch-optimized)

### Unique Standout Features
- **🎨 4 Premium Themes** — Midnight (dark), Daylight (light), Glassmorphism, Retro — all with smooth CSS transitions
- **😊 Mood Tracker** — Log daily moods with emoji picker + monthly mood heatmap
- **🍅 Pomodoro Timer** — Floating 25/5 focus timer with SVG progress ring and sound notifications
- **📊 Monthly Analytics** — Dashboard with notes count, focus hours, mood streaks, and mood distribution chart
- **🔍 Smart Search** — Ctrl+K command palette to search all notes across all months
- **🎏 Holiday Markers** — Indian public holidays with emoji badges, tooltips, and countdown to next holiday
- **🔄 3D Flip Animation** — Page-turn transition when switching months
- **💾 Persistent Data** — All notes, moods, and sessions saved to localStorage

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 14 (App Router) |
| Language | JavaScript (ES2024) |
| Styling | Vanilla CSS with CSS Custom Properties |
| State Management | React Context + useReducer |
| Icons | Lucide React |
| Typography | Inter + Playfair Display (Google Fonts) |
| Persistence | localStorage |

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm 9+

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/interactive-calendar.git
cd interactive-calendar

# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Production Build

```bash
npm run build
npm start
```

## 📖 Usage Guide

### Date Selection
1. **Single Date**: Click any date to select it
2. **Date Range**: Click a start date, then click an end date to select a range
3. **Clear Selection**: Click the "Clear" button in the selection bar

### Notes
- Click the 📝 icon in the header to open the Notes panel
- Select a date, then type and press Enter (or click Add Note)
- Pin important notes with the 📌 button
- Delete notes with the 🗑️ button

### Mood Tracking
- Click the 😊 icon in the header
- Select a date, then pick your mood emoji
- View your monthly mood heatmap below the picker

### Pomodoro Timer
- Click the ⏱️ icon to open the floating timer
- 25 minutes of focus → 5 minutes break
- Sessions are auto-logged to the selected date
- Audio notification when timer completes

### Search
- Press `Ctrl+K` (or `⌘+K` on Mac) to open search
- Type to instantly search across all notes
- Click a result to jump to that date

### Themes
- Click the 🎨 palette icon in the header
- Choose from 4 themes: Midnight, Daylight, Glassmorphism, Retro
- Theme preference is saved automatically

## 🏗️ Architecture

```
src/
├── app/                  # Next.js app router
│   ├── layout.js         # Root layout with SEO metadata
│   ├── page.js           # Main page (client component)
│   └── globals.css       # Design system + all styles
├── components/           # UI components
│   ├── CalendarApp.js    # Main orchestrator
│   ├── CalendarGrid.js   # Month grid + range selection
│   ├── HeroImage.js      # Seasonal hero with flip animation
│   ├── NotesPanel.js     # Notes CRUD interface
│   ├── MoodTracker.js    # Mood picker + heatmap
│   ├── PomodoroTimer.js  # Focus timer with progress ring
│   ├── Analytics.js      # Monthly stats dashboard
│   ├── SearchModal.js    # Command palette search
│   ├── ThemeSwitcher.js  # Theme dropdown
│   └── HolidayBanner.js  # Holiday countdown
├── context/              # State management
│   ├── CalendarContext.js # Calendar state (useReducer)
│   └── ThemeContext.js    # Theme state + CSS variables
├── hooks/
│   └── useLocalStorage.js # localStorage persistence hook
└── utils/
    ├── dateUtils.js       # Date math + formatting
    └── holidays.js        # Indian holiday data
```

### Design Decisions
- **CSS Custom Properties** over CSS-in-JS for instant theme switching without re-renders
- **useReducer** over useState for complex state transitions (date selection state machine)
- **No external UI library** — every component is hand-crafted for full control
- **localStorage** for persistence — no backend needed, instant load
- **CSS animations** over JS animation libraries — better performance, no bundle bloat

## 📱 Responsive Breakpoints

| Breakpoint | Layout |
|---|---|
| > 968px | 2-column grid (hero + panels left, calendar right) |
| 640–968px | Single column, stacked |
| < 640px | Compact mobile with reduced padding |
| < 380px | Extra-compact for small phones |

## 📝 License

MIT

---

Built with ❤️ for the Frontend Engineering Challenge
