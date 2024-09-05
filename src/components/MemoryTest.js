import React, { useState } from 'react';
import Button from '@mui/material/Button';

function MemoryTest() {
  const [sequence, setSequence] = useState([]);
  const [userInput, setUserInput] = useState('');
  const [stage, setStage] = useState('ready'); // 'ready', 'memorizing', 'input'

  const generateSequence = () => {
    const newSequence = Array.from({ length: 5 }, () => Math.floor(Math.random() * 10));
    setSequence(newSequence);
    setStage('memorizing');
    setTimeout(() => setStage('input'), 3000); // Show for 3 seconds
  };

  const handleInput = (e) => setUserInput(e.target.value);

  const checkAnswer = () => {
    if (sequence.join('') === userInput) {
      alert('Correct!');
    } else {
      alert('Wrong!');
    }
    setStage('ready');
    setUserInput('');
    setSequence([]);
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h2>Memory Test</h2>
      {stage === 'ready' ? (
        <Button variant="contained" onClick={generateSequence}>Start Test</Button>
      ) : stage === 'memorizing' ? (
        <h3>Memorize this: {sequence.join(' ')}</h3>
      ) : (
        <div>
          <input type="text" value={userInput} onChange={handleInput} />
          <Button variant="contained" onClick={checkAnswer}>Submit</Button>
        </div>
      )}
    </div>
  );
}

export default MemoryTest;
