import React, { useState } from 'react';
import { Box, Button, Typography } from '@mui/material';

const NumberMemory = () => {
  const [number, setNumber] = useState(Math.floor(Math.random() * 1000)); // Random number for memory

  const generateNewNumber = () => {
    setNumber(Math.floor(Math.random() * 1000));
  };

  return (
    <Box sx={{ textAlign: 'center', padding: '20px' }}>
      <Typography variant="h4">Number Memory Test</Typography>
      <Typography variant="h5" sx={{ marginTop: '20px' }}>
        Remember this number: {number}
      </Typography>
      <Button variant="contained" onClick={generateNewNumber} sx={{ marginTop: '20px' }}>
        Generate New Number
      </Button>
    </Box>
  );
};

export default NumberMemory;
