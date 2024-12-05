import React, { useState, useEffect } from 'react';
import moment from 'moment-timezone';

function Clock({ id, label, timezone, isModifyMode, onDelete, referenceClockId, setReferenceClockId, referenceTimezone }) {
  const [currentTime, setCurrentTime] = useState('');
  const [day, setDay] = useState('');
  const [delta, setDelta] = useState('');

  useEffect(() => {
    const updateClock = () => {
      const now = new Date();

      const timeInTimezone = moment.tz(now, timezone);
      setCurrentTime(timeInTimezone.format('HH:mm:ss'));

      const timeInReferenceTimezone = moment.tz(now, referenceTimezone);

      const deltaMinutes = timeInTimezone.utcOffset() - timeInReferenceTimezone.utcOffset();
      const deltaHours = deltaMinutes / 60;
      const deltaString = deltaHours >= 0 ? `+${deltaHours} h` : `${deltaHours} h`;
      setDelta(deltaString);

      const dateDifference = timeInTimezone.startOf('day').diff(timeInReferenceTimezone.startOf('day'), 'days');
      let dayString = 'Today';
      if (dateDifference === -1) {
        dayString = 'Yesterday';
      } else if (dateDifference === 1) {
        dayString = 'Tomorrow';
      }
      setDay(dayString);
    };

    updateClock();
    const interval = setInterval(updateClock, 1000);

    return () => clearInterval(interval);
  }, [timezone, referenceTimezone]);

  const handleDelete = (e) => {
    e.stopPropagation();
    onDelete(id);
  };

  const handleSelectReference = () => {
    setReferenceClockId(id);
  };

  return (
    <div className="clock-item" onClick={handleSelectReference}>
      {isModifyMode && (
        <button className="delete-button" onClick={handleDelete}>
          -
        </button>
      )}
      <div className="clock-content">
        <div className="clock-timezone">{timezone}, {day}, {delta}</div>
        <div className="clock-label">
          {label}
          {referenceClockId === id && (
          <svg
            className="reference-indicator"
            width="20"
            height="20"
            viewBox="0 0 51 75"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M0 26C0 11.6406 11.4167 0 25.5 0C39.5833 0 51 11.6406 51 26C51 27.3603 50.8976 28.6961 50.7001 30C49.4468 40.4517 42.5074 51.4826 25.5 75C6.30447 49.9787 1.71594 40.8649 0.299912 30C0.10245 28.6961 0 27.3603 0 26ZM25.5 43C34.6127 43 42 35.3888 42 26C42 16.6112 34.6127 9 25.5 9C16.3873 9 9 16.6112 9 26C9 35.3888 16.3873 43 25.5 43Z"
              fill="white"
            />
          </svg>
        )}
        </div>
      </div>
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
