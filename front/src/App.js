import React, { useState } from 'react';
import moment from 'moment-timezone';
import './App.css';
import Clock from './Clock';

function App() {
  const [clocks, setClocks] = useState([]);
  const [showAddClockPopup, setShowAddClockPopup] = useState(false);
  const [newClockLabel, setNewClockLabel] = useState('');
  const [newClockTimezone, setNewClockTimezone] = useState('');

  const timezones = moment.tz.names().map((tz) => ({
    value: tz,
    label: `${tz} (GMT${moment.tz(tz).format('Z')})`,
  }));

  const handleAddClock = () => {
    setShowAddClockPopup(true);
  };

  const handleCancel = () => {
    setShowAddClockPopup(false);
    setNewClockLabel('');
    setNewClockTimezone('');
  };

  const handleSaveClock = () => {
    const newClock = {
      label: newClockLabel,
      timezone: newClockTimezone,
    };
    setClocks([...clocks, newClock]);
    setShowAddClockPopup(false);
    setNewClockLabel('');
    setNewClockTimezone('');
  };

  return (
    <div className="app">
      <div className="clock-list-container">
        <div className="clock-list-header">
          <button className="modify-button">Modify</button>
          <button className="add-button" onClick={handleAddClock}>+</button>
        </div>
        <h1>Clocks</h1>
        <div className="clock-list">
          {clocks.map((clock, index) => (
            <Clock key={index} label={clock.label} timezone={clock.timezone} />
          ))}
        </div>
      </div>

      {showAddClockPopup && (
        <div className="popup">
          <div className="popup-content">
            <h2>New Clock</h2>
            <label>
              Label:
              <input
                type="text"
                value={newClockLabel}
                onChange={(e) => setNewClockLabel(e.target.value)}
              />
            </label>
            <label>
              Time Zone:
              <select
                value={newClockTimezone}
                onChange={(e) => setNewClockTimezone(e.target.value)}
              >
                <option value="">Select Time Zone</option>
                {timezones.map((tz) => (
                  <option key={tz.value} value={tz.value}>
                    {tz.label}
                  </option>
                ))}
              </select>
            </label>
            <div className="popup-buttons">
              <button className="modify-button" onClick={handleCancel}>Cancel</button>
              <button className="add-button" onClick={handleSaveClock}>Add Clock</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
