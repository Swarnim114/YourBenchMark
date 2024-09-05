import React, { useState } from 'react';

function TypingTest() {
  const [text, setText] = useState('The quick brown fox jumps over the lazy dog.');
  const [input, setInput] = useState('');
  const [startTime, setStartTime] = useState(null);
  const [wpm, setWpm] = useState(null);

  const handleChange = (e) => {
    const newText = e.target.value;
    if (!startTime) {
      setStartTime(Date.now());
    }
    setInput(newText);
    if (newText === text) {
      const timeTaken = (Date.now() - startTime) / 1000;
      const words = text.split(' ').length;
      setWpm(((words / timeTaken) * 60).toFixed(2));
    }
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h2>Typing Test</h2>
      <p>{text}</p>
      <input type="text" value={input} onChange={handleChange} />
      {wpm && <h3>Your WPM is: {wpm}</h3>}
    </div>
  );
}

export default TypingTest;
