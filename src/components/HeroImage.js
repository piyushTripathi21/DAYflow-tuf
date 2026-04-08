'use client';

import { useCalendar } from '../context/CalendarContext';
import { MONTH_NAMES, getSeason } from '../utils/dateUtils';

const seasonImages = {
  spring: '/images/spring.png',
  summer: '/images/summer.png',
  autumn: '/images/autumn.png',
  winter: '/images/winter.png',
};

export default function HeroImage() {
  const { currentMonth, currentYear, isFlipping, flipDirection } = useCalendar();
  const season = getSeason(currentMonth);
  const imageSrc = seasonImages[season];

  const flipClass = isFlipping
    ? flipDirection === 'next' ? 'heroFlipNext' : 'heroFlipPrev'
    : '';

  return (
    <div className={`heroContainer ${flipClass}`} id="hero-image">
      <img
        className="heroImage"
        src={imageSrc}
        alt={`${MONTH_NAMES[currentMonth]} ${currentYear} — ${season} season`}
        draggable={false}
      />
      <div className="heroOverlay">
        <div className="heroMonth">{MONTH_NAMES[currentMonth]}</div>
        <div className="heroYear">{currentYear}</div>
      </div>
    </div>
  );
}
