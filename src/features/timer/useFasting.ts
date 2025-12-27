import { useState, useEffect } from 'react';
import { useTimerStore } from './timer.store';

export const useFasting = () => {
  const { status, startTime, endTime, durationMinutes } = useTimerStore();
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (status === 'FASTING') {
      interval = setInterval(() => {
        setNow(new Date());
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [status]);

  if (status !== 'FASTING' || !startTime || !endTime) {
    return {
      status,
      elapsedMs: 0,
      remainingMs: 0,
      progress: 0,
      formattedRemaining: '00:00:00',
    };
  }

  const start = new Date(startTime).getTime();
  const end = new Date(endTime).getTime();
  const current = now.getTime();
  
  const totalDuration = end - start;
  const elapsedMs = Math.max(0, current - start);
  const remainingMs = Math.max(0, end - current);
  const progress = Math.min(100, (elapsedMs / totalDuration) * 100);

  const hours = Math.floor(remainingMs / (1000 * 60 * 60));
  const minutes = Math.floor((remainingMs % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((remainingMs % (1000 * 60)) / 1000);

  const formattedRemaining = `${hours.toString().padStart(2, '0')}:${minutes
    .toString()
    .padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

  return {
    status,
    elapsedMs,
    remainingMs,
    progress,
    formattedRemaining,
  };
};
