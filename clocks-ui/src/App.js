import React, { useState, useEffect } from 'react';
import moment from 'moment-timezone';
import './App.css';
import Clock from './Clock';
import axios from 'axios';

function App() {
  const [clocks, setClocks] = useState([]);
  const [showAddClockPopup, setShowAddClockPopup] = useState(false);
  const [newClockLabel, setNewClockLabel] = useState('');
  const [newClockTimezone, setNewClockTimezone] = useState('');
  const [isModifyMode, setIsModifyMode] = useState(false);
  const [referenceClockId, setReferenceClockId] = useState(null);

  const timezones = moment.tz.names().map((tz) => ({
    value: tz,
    label: `${tz} (GMT${moment.tz(tz).format('Z')})`,
  }));

  useEffect(() => {
    fetchClocks();
  }, []);

  const fetchClocks = async () => {
    try {
      console.log('REACT_APP_CLOCKS_API_HOST:', process.env.REACT_APP_CLOCKS_API_HOST);

      const response = await axios.get(`${process.env.REACT_APP_CLOCKS_API_HOST}/clocks`);
      setClocks(response.data);
      if (response.data.length > 0 && !referenceClockId) {
        setReferenceClockId(response.data[0].id);
      }
    } catch (error) {
      console.error('Error fetching clocks:', error);
    }
  };

  const addClock = async (newClock) => {
    try {
      const response = await axios.post(`${process.env.REACT_APP_CLOCKS_API_HOST}/clocks`, null, {
        params: newClock,
      });
      
      fetchClocks();
      
      if (clocks.length === 0) {
        setReferenceClockId(response.data.id);
      }
    } catch (error) {
      console.error('Error saving clock:', error);
    }
  };

  const handleAddClock = () => {
    setShowAddClockPopup(true);
  };

  const handleCancel = () => {
    setShowAddClockPopup(false);
    setNewClockLabel('');
    setNewClockTimezone('');
  };

  const handleSaveClock = async () => {
    const newClock = {
      label: newClockLabel,
      timezone: newClockTimezone,
    };

    try {
      await addClock(newClock);
      handleCancel();
    } catch (error) {
      console.error('Error saving clock:', error);
    }
  };

  const handleModify = () => {
    setIsModifyMode((prev) => !prev);
  };

  const deleteClock = async (id) => {
    try {
      await axios.delete('http://localhost:8080/clocks', {
        params: { id },
      });
      
      setClocks((prevClocks) => {
        const updatedClocks = prevClocks.filter((clock) => clock.id !== id);
        
        if (id === referenceClockId) {
          if (updatedClocks.length > 0) {
            setReferenceClockId(updatedClocks[0].id);
          } else {
            setReferenceClockId(null);
          }
        }
        
        return updatedClocks;
      });
    } catch (error) {
      console.error('Error deleting clock:', error);
    }
  };

  const referenceClock = clocks.find((clock) => clock.id === referenceClockId);
  const referenceTimezone = referenceClock ? referenceClock.timezone : 'UTC';

  return (
    <div className="app">
      <div className="clock-list-container">
        <div className="clock-list-header">
          <button className="modify-button" onClick={handleModify}>
            {isModifyMode ? 'OK' : 'Modify'}
          </button>
          <button className="add-button" onClick={handleAddClock}>+</button>
        </div>
        <h1>Clocks</h1>
        <div className="clock-list">
          {clocks.map((clock) => (
            <Clock
              key={clock.id}
              id={clock.id}
              label={clock.label}
              timezone={clock.timezone}
              isModifyMode={isModifyMode}
              onDelete={deleteClock}
              referenceClockId={referenceClockId}
              setReferenceClockId={setReferenceClockId}
              referenceTimezone={referenceTimezone}
            />
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
