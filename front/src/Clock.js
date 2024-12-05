import React, { useState, useEffect } from 'react';

function Clock({ label, timezone }) {
  const [currentTime, setCurrentTime] = useState('');

  useEffect(() => {
    const updateClock = () => {
      const time = new Date().toLocaleTimeString('en-US', {
        timeZone: timezone,
        hour12: false,
      });
      setCurrentTime(time);
    };

    updateClock();
    const interval = setInterval(updateClock, 1000);

    return () => clearInterval(interval);
  }, [timezone]);

  return (
    <div className="clock-item">
      <span className="clock-label">{label}</span>
      <span className="clock-time">{currentTime}</span>
    </div>
  );
}

function ClockList({ clocks }) {
  return (
    <div className="clock-list">
      {clocks.map((clock, index) => (
        <div className="clock-item" key={index}>
          <Clock label={clock.label} timezone={clock.timezone} />
        </div>
      ))}
    </div>
  );
}

export default Clock;
