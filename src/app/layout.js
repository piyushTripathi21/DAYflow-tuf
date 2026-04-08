import './globals.css';

export const metadata = {
  title: 'Dayflow — Interactive Calendar',
  description: 'A premium, interactive wall calendar component with mood tracking, Pomodoro timer, weather integration, holiday markers, and smart notes. Built with Next.js.',
  keywords: 'calendar, interactive, mood tracker, pomodoro, notes, holidays, wall calendar',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#0a0a0f" />
        <link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>📅</text></svg>" />
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}
