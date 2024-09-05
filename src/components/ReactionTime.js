import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';

function ReactionTime() {
  const [waiting, setWaiting] = useState(false);
  const [startTime, setStartTime] = useState(null);
  const [reactionTime, setReactionTime] = useState(null);

  const startTest = () => {
    setReactionTime(null);
    setWaiting(true);
    const delay = Math.floor(Math.random() * 5000) + 2000; // Random delay between 2 and 7 seconds

    setTimeout(() => {
      setStartTime(Date.now());
      setWaiting(false);
    }, delay);
  };

  const handleClick = () => {
    if (!waiting && startTime) {
      const endTime = Date.now();
      setReactionTime(endTime - startTime);
      setStartTime(null);
    }
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h2>Reaction Time Test</h2>
      {reactionTime === null ? (
        <Button variant="contained" onClick={startTest} disabled={waiting}>
          {waiting ? 'Wait for it...' : 'Start Test'}
        </Button>
      ) : (
        <div>
          <h3>Your reaction time is: {reactionTime} ms</h3>
          <Button variant="contained" onClick={startTest}>Try Again</Button>
        </div>
      )}
      <div
        onClick={handleClick}
        style={{
          marginTop: '20px',
          height: '200px',
          backgroundColor: waiting ? 'red' : 'green',
        }}
      />
    </div>
  );
}

export default ReactionTime;
