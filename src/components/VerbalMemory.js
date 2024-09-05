import React, { useState } from 'react';
import { Box, Button, Typography } from '@mui/material';

const words = ['apple', 'banana', 'grape', 'orange', 'pineapple']; // Sample words for memory

const VerbalMemory = () => {
  const [word, setWord] = useState(words[Math.floor(Math.random() * words.length)]);

  const generateNewWord = () => {
    setWord(words[Math.floor(Math.random() * words.length)]);
  };

  return (
    <Box sx={{ textAlign: 'center', padding: '20px' }}>
      <Typography variant="h4">Verbal Memory Test</Typography>
      <Typography variant="h5" sx={{ marginTop: '20px' }}>
        Remember this word: {word}
      </Typography>
      <Button variant="contained" onClick={generateNewWord} sx={{ marginTop: '20px' }}>
        Generate New Word
      </Button>
    </Box>
  );
};

export default VerbalMemory;
