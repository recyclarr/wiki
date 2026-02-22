import React from 'react';
import styles from './styles.module.css';

interface ReleaseDateProps {
  date?: string;
}

const months = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
];

function formatDate(date: string): string {
  const [year, month, day] = date.split('-').map(Number);
  return `${months[month - 1]} ${day}, ${year}`;
}

// Inline SVG path data instead of using <Icon> from @iconify/react. The Iconify
// component defers rendering until after mount to avoid hydration mismatches,
// which causes a visible flash on page load. Inlining the paths lets the SVG
// render in the static HTML from SSR with no client-side delay.
//
// Source: Material Design Icons via Iconify API (mdi:calendar-month-outline)
const calendarMonthPath =
  'M7 11h2v2H7zm14-6v14c0 1.11-.89 2-2 2H5a2 2 0 0 1-2-2V5c0-1.1.9-2 ' +
  '2-2h1V1h2v2h8V1h2v2h1a2 2 0 0 1 2 2M5 7h14V5H5zm14 12V9H5v10zm-4-6' +
  'v-2h2v2zm-4 0v-2h2v2zm-4 2h2v2H7zm8 2v-2h2v2zm-4 0v-2h2v2z';

// Source: Material Design Icons via Iconify API (mdi:calendar-clock-outline)
const calendarClockPath =
  'M6 1v2H5c-1.11 0-2 .89-2 2v14a2 2 0 0 0 2 2h6.1c1.26 1.24 2.99 2 ' +
  '4.9 2c3.87 0 7-3.13 7-7c0-1.91-.76-3.64-2-4.9V5a2 2 0 0 0-2-2h-1V1' +
  'h-2v2H8V1M5 5h14v2H5m0 2h14v.67c-.91-.43-1.93-.67-3-.67c-3.87 0-7 ' +
  '3.13-7 7c0 1.07.24 2.09.67 3H5m11-7.85c2.68 0 4.85 2.17 4.85 4.85' +
  's-2.17 4.85-4.85 4.85s-4.85-2.17-4.85-4.85s2.17-4.85 4.85-4.85M15 ' +
  '13v3.69l3.19 1.84l.75-1.3l-2.44-1.41V13Z';

function CalendarIcon({ path }: { path: string }) {
  return (
    <svg viewBox="0 0 24 24" width={18} height={18} aria-hidden="true">
      <path fill="currentColor" d={path} />
    </svg>
  );
}

export default function ReleaseDate({ date }: ReleaseDateProps) {
  const unreleased = !date;
  const iconPath = unreleased ? calendarClockPath : calendarMonthPath;
  const label = unreleased ? 'Unreleased' : `Released ${formatDate(date)}`;
  const className = unreleased
    ? `${styles.releaseDate} ${styles.unreleased}`
    : styles.releaseDate;

  return (
    <div className={className}>
      <CalendarIcon path={iconPath} />
      <span>{label}</span>
    </div>
  );
}
