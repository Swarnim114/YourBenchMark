import React, { useState } from 'react';
import Button from '@mui/material/Button';

function VisualMemoryTest() {
  const [grid, setGrid] = useState(Array(9).fill(false));
  const [highlighted, setHighlighted] = useState([]);
  const [stage, setStage] = useState('ready'); // 'ready', 'memorizing', 'input'

  const generateGrid = () => {
    const newGrid = [...grid];
    const indices = [Math.floor(Math.random() * 9), Math.floor(Math.random() * 9)];
    indices.forEach((index) => {
      newGrid[index] = true;
    });
    setHighlighted(indices);
    setGrid(newGrid);
    setStage('memorizing');
    setTimeout(() => {
      setGrid(Array(9).fill(false));
      setStage('input');
    }, 2000); // Show for 2 seconds
  };

  const checkAnswer = (index) => {
    if (highlighted.includes(index)) {
      alert('Correct!');
    } else {
      alert('Wrong!');
    }
    setStage('ready');
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h2>Visual Memory Test</h2>
      {stage === 'ready' ? (
        <Button variant="contained" onClick={generateGrid}>Start Test</Button>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 100px)', gap: '10px' }}>
          {grid.map((active, index) => (
            <div
              key={index}
              onClick={() => stage === 'input' && checkAnswer(index)}
              style={{
                width: '100px',
                height: '100px',
                backgroundColor: active ? 'blue' : 'grey',
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default VisualMemoryTest;
