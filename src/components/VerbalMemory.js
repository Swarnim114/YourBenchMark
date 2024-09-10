import React, { useState, useEffect } from 'react';
import { Box, Button, Typography } from '@mui/material';

const VerbalMemory = () => {
  const [started, setStarted] = useState(false);
  const [word, setWord] = useState('');
  const [oldWords, setOldWords] = useState([]);
  const [gameOver, setGameOver] = useState(false);

  const wordList = [
    'apple', 'banana', 'grape', 'orange', 'pineapple',
    'dog', 'cat', 'mouse', 'elephant', 'giraffe',
    'house', 'car', 'tree', 'flower', 'book',
  ];

  const generateWord = () => {
    const randomIndex = Math.floor(Math.random() * wordList.length);
    return wordList[randomIndex];
  };

  const handleStart = () => {
    setStarted(true);
    setWord(generateWord());
  };

  const handleNew = () => {
    if (oldWords.includes(word)) {
      setGameOver(true);
    } else {
      setOldWords([...oldWords, word]);
      setWord(generateWord());
    }
  };

  const handleOld = () => {
    if (!oldWords.includes(word)) {
      setGameOver(true);
    } else {
      setOldWords([...oldWords, word]);
      setWord(generateWord());
    }
  };

  return (
    <Box sx={{ textAlign: 'center', mt: 5 }}>
      {!started && (
        <>
          <Typography variant="h2" gutterBottom>
            Welcome to Verbal Memory Game!
          </Typography>
          <Typography variant="h6" gutterBottom>
            Click on the start button to begin.
          </Typography>
          <Button variant="contained" onClick={handleStart}>
            Start
          </Button>
        </>
      )}
      {started && !gameOver && (
        <>
          <Typography variant="h3" gutterBottom>
            {word}
          </Typography>
          <Button variant="contained" onClick={handleNew}>
            New
          </Button>
          <Button variant="contained" onClick={handleOld}>
            Old
          </Button>
        </>
      )}
      {gameOver && (
        <>
          <Typography variant="h2" gutterBottom>
            Game Over!
          </Typography>
          <Typography variant="h6" gutterBottom>
            You failed to remember the words correctly.
          </Typography>
        </>
      )}
    </Box>
  );
};

export default VerbalMemory;
