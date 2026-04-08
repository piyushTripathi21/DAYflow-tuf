'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { useCalendar } from '../context/CalendarContext';
import { Play, Pause, RotateCcw, X } from 'lucide-react';

const WORK_TIME = 25 * 60; // 25 minutes
const BREAK_TIME = 5 * 60; // 5 minutes

export default function PomodoroTimer({ onClose }) {
  const { addPomodoroSession, selectedStart, currentMonth, currentYear } = useCalendar();
  const [timeLeft, setTimeLeft] = useState(WORK_TIME);
  const [isRunning, setIsRunning] = useState(false);
  const [isBreak, setIsBreak] = useState(false);
  const [sessions, setSessions] = useState(0);
  const intervalRef = useRef(null);

  const totalTime = isBreak ? BREAK_TIME : WORK_TIME;
  const progress = (totalTime - timeLeft) / totalTime;
  const circumference = 2 * Math.PI * 60; // radius 60
  const strokeDashoffset = circumference * (1 - progress);

  const targetDate = selectedStart || {
    year: currentYear,
    month: currentMonth,
    day: new Date().getDate(),
  };

  useEffect(() => {
    if (isRunning && timeLeft > 0) {
      intervalRef.current = setInterval(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      clearInterval(intervalRef.current);
      // Play notification sound
      try {
        const ctx = new (window.AudioContext || window.webkitAudioContext)();
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.frequency.value = isBreak ? 523 : 440;
        gain.gain.value = 0.3;
        osc.start();
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.8);
        osc.stop(ctx.currentTime + 0.8);
      } catch (e) {}

      if (!isBreak) {
        // Work session complete
        setSessions(prev => prev + 1);
        addPomodoroSession(targetDate.year, targetDate.month, targetDate.day);
        setIsBreak(true);
        setTimeLeft(BREAK_TIME);
        setIsRunning(true);
      } else {
        // Break complete
        setIsBreak(false);
        setTimeLeft(WORK_TIME);
        setIsRunning(false);
      }
    }

    return () => clearInterval(intervalRef.current);
  }, [isRunning, timeLeft, isBreak, addPomodoroSession, targetDate]);

  const toggleTimer = useCallback(() => {
    setIsRunning(prev => !prev);
  }, []);

  const resetTimer = useCallback(() => {
    clearInterval(intervalRef.current);
    setIsRunning(false);
    setIsBreak(false);
    setTimeLeft(WORK_TIME);
  }, []);

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
  };

  return (
    <div className="pomodoroWidget" id="pomodoro-timer">
      <div className="pomodoroCard" style={{ position: 'relative' }}>
        <button
          className="iconBtn pomodoroClose"
          onClick={onClose}
          style={{ width: '28px', height: '28px', position: 'absolute', top: '8px', right: '8px' }}
        >
          <X size={14} />
        </button>

        <div className="pomodoroTitle">
          🍅 {isBreak ? 'Break Time' : 'Focus Time'}
        </div>

        {/* Timer Ring */}
        <div className="timerRing">
          <svg className="timerRingSvg" viewBox="0 0 140 140">
            <circle className="timerRingBg" cx="70" cy="70" r="60" />
            <circle
              className={`timerRingProgress ${isBreak ? 'break' : ''}`}
              cx="70" cy="70" r="60"
              style={{
                strokeDasharray: circumference,
                strokeDashoffset: strokeDashoffset,
              }}
            />
          </svg>
          <div className="timerDisplay">{formatTime(timeLeft)}</div>
        </div>

        <div className="timerLabel">
          {isBreak ? 'Relax & recharge' : 'Stay focused'}
        </div>

        {/* Controls */}
        <div className="pomodoroActions">
          <button className="pomodoroBtn primary" onClick={toggleTimer} id="btn-pomodoro-toggle">
            {isRunning ? <Pause size={16} /> : <Play size={16} />}
            {isRunning ? 'Pause' : 'Start'}
          </button>
          <button className="pomodoroBtn" onClick={resetTimer} id="btn-pomodoro-reset">
            <RotateCcw size={16} />
            Reset
          </button>
        </div>

        {/* Sessions count */}
        <div className="pomodoroSessions">
          🔥 {sessions} session{sessions !== 1 ? 's' : ''} completed today
        </div>
      </div>
    </div>
  );
}
